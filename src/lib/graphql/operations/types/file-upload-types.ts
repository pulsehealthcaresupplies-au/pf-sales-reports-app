/**
 * TypeScript types for file upload GraphQL operations
 * These types match the GraphQL schema for file upload mutations and subscriptions
 */

export interface FileUploadProgressData {
  fileUploadProgress: {
    sessionId: string;
    filename: string;
    totalSize: number;
    totalChunks: number;
    chunkSize: number;
    uploadedChunks: number;
    usage: string;
    status: string;
    progress: number;
    createdAt: string;
    expiresAt: string;
    metadata?: Record<string, any>;
  };
}

/** Subscription payload: root has fileUploadProgress (GraphQL subscription root) */
export type FileUploadProgressSubscriptionResponse = FileUploadProgressData;

export interface InitializeFileUploadInput {
  filename: string;
  totalSize: number;
  chunkSize: number;
  usage: string;
  mimeType?: string;
  metadata?: Record<string, any>;
}

export interface InitializeFileUploadResponse {
  initializeFileUpload: {
    sessionId: string;
    filename: string;
    totalSize: number;
    totalChunks: number;
    chunkSize: number;
    uploadedChunks: number;
    usage: string;
    status: string;
    progress: number;
    createdAt: string;
    expiresAt: string;
    metadata?: Record<string, any>;
  };
}

export interface UploadFileChunkInput {
  sessionId: string;
  chunkIndex: number;
  chunk: File | Blob;
  chunkHash: string;
  isLastChunk: boolean;
}

export interface UploadFileChunkResponse {
  uploadFileChunk: {
    sessionId: string;
    chunkIndex: number;
    success: boolean;
    message?: string;
    uploadedChunks: number;
    totalChunks: number;
    progress: number;
  };
}

export interface CompleteFileUploadResponse {
  completeFileUpload: {
    sessionId: string;
    fileId?: string;
    filename: string;
    url?: string;
    size: number;
    mimeType: string;
    uploadedAt: string;
    usage: string;
    metadata?: Record<string, any>;
  };
}

export interface UploadFileResponse {
  uploadFile: {
    sessionId: string;
    fileId?: string;
    filename: string;
    url?: string;
    size: number;
    mimeType: string;
    uploadedAt: string;
    usage: string;
    metadata?: Record<string, any>;
  };
}

export interface CancelFileUploadResponse {
  cancelFileUpload: boolean;
}
