/**
 * Hook for chunked file uploads with progress tracking and real-time status updates
 */

import { useState, useCallback, useRef } from 'react';
import { useMutation, useSubscription } from '@apollo/client/react';
import {
  INITIALIZE_FILE_UPLOAD,
  UPLOAD_FILE_CHUNK,
  COMPLETE_FILE_UPLOAD,
  CANCEL_FILE_UPLOAD,
  UPLOAD_FILE,
} from '@/lib/graphql/operations/mutations/file-upload-mutations';
import { FILE_UPLOAD_PROGRESS } from '@/lib/graphql/operations/subscriptions/file-upload-subscriptions';
import type {
  FileUploadProgressSubscriptionResponse,
  InitializeFileUploadResponse,
  UploadFileChunkResponse,
  CompleteFileUploadResponse,
  UploadFileResponse,
} from '@/lib/graphql/operations/types/file-upload-types';

export type FileUploadUsage =
  | 'PRODUCT_IMPORT'
  | 'PRODUCT_EXPORT'
  | 'INVENTORY_IMPORT'
  | 'INVENTORY_EXPORT'
  | 'ORDER_IMPORT'
  | 'ORDER_EXPORT'
  | 'PROFILE_IMAGE'
  | 'BRAND_LOGO'
  | 'PRODUCT_IMAGE'
  | 'BANNER_IMAGE'
  | 'REPORT'
  | 'INVOICE'
  | 'BILL'
  | 'LABEL'
  | 'DOCUMENT'
  | 'GENERAL';

export type FileUploadStatus =
  | 'IDLE'
  | 'INITIALIZING'
  | 'UPLOADING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface ChunkedUploadOptions {
  usage: FileUploadUsage;
  chunkSize?: number; // Default: 5MB
  metadata?: Record<string, any>;
  onProgress?: (progress: number, status: FileUploadStatus) => void;
  onComplete?: (result: FileUploadResult) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  useSimpleUpload?: boolean; // Use simple upload for files < 10MB
}

export interface FileUploadResult {
  sessionId: string;
  fileId?: string;
  filename: string;
  url?: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  usage: FileUploadUsage;
  metadata?: Record<string, any>;
}

export interface ChunkedUploadState {
  status: FileUploadStatus;
  progress: number;
  sessionId: string | null;
  error: string | null;
  uploadedChunks: number;
  totalChunks: number;
  filename: string | null;
  fileSize: number;
}

const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
const SIMPLE_UPLOAD_THRESHOLD = 10 * 1024 * 1024; // 10MB

export function useChunkedUpload(options: ChunkedUploadOptions) {
  const {
    usage,
    chunkSize = DEFAULT_CHUNK_SIZE,
    metadata = {},
    onProgress,
    onComplete,
    onError,
    onCancel,
    useSimpleUpload = true,
  } = options;

  const [state, setState] = useState<ChunkedUploadState>({
    status: 'IDLE',
    progress: 0,
    sessionId: null,
    error: null,
    uploadedChunks: 0,
    totalChunks: 0,
    filename: null,
    fileSize: 0,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const _chunkQueueRef = useRef<Array<{ index: number; chunk: Blob }>>([]);
  const isUploadingRef = useRef(false);

  const [initializeUpload] = useMutation<InitializeFileUploadResponse>(INITIALIZE_FILE_UPLOAD);
  const [uploadChunk] = useMutation<UploadFileChunkResponse>(UPLOAD_FILE_CHUNK);
  const [completeUpload] = useMutation<CompleteFileUploadResponse>(COMPLETE_FILE_UPLOAD);
  const [cancelUpload] = useMutation(CANCEL_FILE_UPLOAD);
  const [simpleUpload] = useMutation<UploadFileResponse>(UPLOAD_FILE);

  // Subscribe to progress updates
  const { data: progressData } = useSubscription<FileUploadProgressSubscriptionResponse>(FILE_UPLOAD_PROGRESS, {
    variables: { sessionId: state.sessionId },
    skip: !state.sessionId || state.status === 'COMPLETED' || state.status === 'FAILED',
    onData: ({ data: subscriptionResult }) => {
      const payload = subscriptionResult?.data;
      if (payload?.fileUploadProgress) {
        const progress = payload.fileUploadProgress;
        setState((prev) => {
          const newStatus = (progress.status as FileUploadStatus) || prev.status;
          const newProgress = progress.progress || prev.progress;
          onProgress?.(newProgress, newStatus);
          return {
            ...prev,
            progress: newProgress,
            uploadedChunks: progress.uploadedChunks || prev.uploadedChunks,
            status: newStatus,
          };
        });
      }
    },
  });

  const calculateChunkHash = async (chunk: Blob): Promise<string> => {
    const buffer = await chunk.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const uploadChunkWithRetry = async (
    sessionId: string,
    chunkIndex: number,
    chunk: Blob,
    isLastChunk: boolean,
    retries = 3
  ): Promise<void> => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const chunkHash = await calculateChunkHash(chunk);
        
        const result = await uploadChunk({
          variables: {
            input: {
              sessionId,
              chunkIndex,
              chunk,
              chunkHash,
              isLastChunk,
            },
          },
        });

        const resultData = result.data;
        if (resultData?.uploadFileChunk?.success) {
          const progress = resultData.uploadFileChunk.progress || 0;
          const uploadedChunks = resultData.uploadFileChunk.uploadedChunks;
          setState((prev) => ({
            ...prev,
            progress,
            uploadedChunks: uploadedChunks ?? prev.uploadedChunks,
          }));
          onProgress?.(progress, 'UPLOADING');
          return; // Success
        } else {
          throw new Error(resultData?.uploadFileChunk?.message || 'Chunk upload failed');
        }
      } catch (error: any) {
        if (attempt === retries - 1) {
          throw error;
        }
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  };

  const uploadFileChunks = async (file: File, sessionId: string): Promise<void> => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    setState((prev) => ({ ...prev, totalChunks }));

    // Upload chunks sequentially (can be parallelized later)
    for (let i = 0; i < totalChunks; i++) {
      if (abortControllerRef.current?.signal.aborted) {
        throw new Error('Upload cancelled');
      }

      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const isLastChunk = i === totalChunks - 1;

      await uploadChunkWithRetry(sessionId, i, chunk, isLastChunk);
    }
  };

  const upload = useCallback(
    async (file: File): Promise<FileUploadResult> => {
      // Reset state
      setState({
        status: 'IDLE',
        progress: 0,
        sessionId: null,
        error: null,
        uploadedChunks: 0,
        totalChunks: 0,
        filename: file.name,
        fileSize: file.size,
      });

      abortControllerRef.current = new AbortController();
      isUploadingRef.current = true;

      try {
        // Use simple upload for small files
        if (useSimpleUpload && file.size < SIMPLE_UPLOAD_THRESHOLD) {
          setState((prev) => ({ ...prev, status: 'UPLOADING', progress: 0 }));

          const result = await simpleUpload({
            variables: {
              file,
              usage,
              metadata,
            },
          });

          if (result.data?.uploadFile) {
            const uploadResult = result.data.uploadFile;
            setState({
              status: 'COMPLETED',
              progress: 100,
              sessionId: uploadResult.sessionId,
              error: null,
              uploadedChunks: 1,
              totalChunks: 1,
              filename: file.name,
              fileSize: file.size,
            });
            const resultTyped: FileUploadResult = { ...uploadResult, usage: uploadResult.usage as FileUploadUsage };
            onComplete?.(resultTyped);
            return resultTyped;
          } else {
            throw new Error('Upload failed');
          }
        }

        // Chunked upload for large files
        setState((prev) => ({ ...prev, status: 'INITIALIZING' }));

        // Initialize upload session
        const initResult = await initializeUpload({
          variables: {
            input: {
              filename: file.name,
              totalSize: file.size,
              chunkSize,
              usage,
              mimeType: file.type,
              metadata,
            },
          },
        });

        if (!initResult.data?.initializeFileUpload) {
          throw new Error('Failed to initialize upload session');
        }

        const session = initResult.data.initializeFileUpload;
        const sessionId = session.sessionId;

        setState((prev) => ({
          ...prev,
          status: 'UPLOADING',
          sessionId,
          totalChunks: session.totalChunks,
        }));

        // Upload chunks
        await uploadFileChunks(file, sessionId);

        // Complete upload
        setState((prev) => ({ ...prev, status: 'PROCESSING' }));

        const completeResult = await completeUpload({
          variables: {
            sessionId,
            metadata,
          },
        });

        if (completeResult.data?.completeFileUpload) {
          const uploadResult = completeResult.data.completeFileUpload;
          setState({
            status: 'COMPLETED',
            progress: 100,
            sessionId,
            error: null,
            uploadedChunks: session.totalChunks,
            totalChunks: session.totalChunks,
            filename: file.name,
            fileSize: file.size,
          });
          const resultTyped: FileUploadResult = { ...uploadResult, usage: uploadResult.usage as FileUploadUsage };
          onComplete?.(resultTyped);
          return resultTyped;
        } else {
          throw new Error('Failed to complete upload');
        }
      } catch (error: any) {
        const errorMessage = error.message || 'Upload failed';
        setState((prev) => ({
          ...prev,
          status: 'FAILED',
          error: errorMessage,
        }));
        onError?.(error);
        throw error;
      } finally {
        isUploadingRef.current = false;
      }
    },
    [usage, chunkSize, metadata, onProgress, onComplete, onError, useSimpleUpload]
  );

  const cancel = useCallback(async () => {
    if (state.sessionId && isUploadingRef.current) {
      try {
        abortControllerRef.current?.abort();
        await cancelUpload({
          variables: { sessionId: state.sessionId },
        });
        setState((prev) => ({
          ...prev,
          status: 'CANCELLED',
          error: null,
        }));
        onCancel?.();
      } catch (error: any) {
        console.error('Failed to cancel upload:', error);
      }
    }
  }, [state.sessionId, cancelUpload, onCancel]);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    setState({
      status: 'IDLE',
      progress: 0,
      sessionId: null,
      error: null,
      uploadedChunks: 0,
      totalChunks: 0,
      filename: null,
      fileSize: 0,
    });
    isUploadingRef.current = false;
  }, []);

  return {
    upload,
    cancel,
    reset,
    ...state,
    isUploading: isUploadingRef.current,
  };
}
