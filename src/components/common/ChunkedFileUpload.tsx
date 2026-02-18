/**
 * Chunked File Upload Component with Progress Animation and Status Sync
 * Supports drag & drop, progress tracking, and real-time status updates
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useChunkedUpload, FileUploadUsage, FileUploadStatus } from '@/hooks/useChunkedUpload';
import { cn } from '@/lib/utils';
import { 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  File,
  FileCheck,
  FileX
} from 'lucide-react';

export interface ChunkedFileUploadProps {
  usage: FileUploadUsage;
  onComplete?: (result: any) => void;
  onError?: (error: Error) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  chunkSize?: number;
  metadata?: Record<string, any>;
  className?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  showPreview?: boolean;
}

const STATUS_COLORS: Record<FileUploadStatus, string> = {
  IDLE: 'bg-gray-100 text-gray-600',
  INITIALIZING: 'bg-blue-100 text-blue-600',
  UPLOADING: 'bg-blue-100 text-blue-600',
  PROCESSING: 'bg-purple-100 text-purple-600',
  COMPLETED: 'bg-green-100 text-green-600',
  FAILED: 'bg-red-100 text-red-600',
  CANCELLED: 'bg-gray-100 text-gray-600',
};

const STATUS_ICONS: Record<FileUploadStatus, React.ReactNode> = {
  IDLE: <Upload className="w-5 h-5" />,
  INITIALIZING: <Loader2 className="w-5 h-5 animate-spin" />,
  UPLOADING: <Loader2 className="w-5 h-5 animate-spin" />,
  PROCESSING: <Loader2 className="w-5 h-5 animate-spin" />,
  COMPLETED: <CheckCircle2 className="w-5 h-5" />,
  FAILED: <AlertCircle className="w-5 h-5" />,
  CANCELLED: <X className="w-5 h-5" />,
};

export function ChunkedFileUpload({
  usage,
  onComplete,
  onError,
  accept,
  maxSize = 500 * 1024 * 1024, // 500MB default
  chunkSize,
  metadata,
  className,
  label = 'Drag & drop file here, or click to select',
  hint,
  disabled = false,
  showPreview = false,
}: ChunkedFileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    upload,
    cancel,
    reset,
    status,
    progress,
    error,
    uploadedChunks,
    totalChunks,
    filename,
    fileSize,
    isUploading,
  } = useChunkedUpload({
    usage,
    chunkSize,
    metadata,
    onComplete: (result) => {
      setSelectedFile(null);
      onComplete?.(result);
    },
    onError: (err) => {
      onError?.(err);
    },
  });

  const handleFileSelect = useCallback(
    async (file: File) => {
      if (file.size > maxSize) {
        onError?.(new Error(`File size exceeds maximum of ${maxSize / 1024 / 1024}MB`));
        return;
      }

      setSelectedFile(file);
      try {
        await upload(file);
      } catch (err) {
        // Error handled by hook
      }
    },
    [upload, maxSize, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileSelect(acceptedFiles[0]);
      }
    },
    accept,
    maxSize,
    maxFiles: 1,
    disabled: disabled || isUploading,
  });

  const handleCancel = useCallback(() => {
    cancel();
    reset();
    setSelectedFile(null);
  }, [cancel, reset]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isActive = status === 'UPLOADING' || status === 'PROCESSING' || status === 'INITIALIZING';
  const isComplete = status === 'COMPLETED';
  const hasError = status === 'FAILED';

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer',
          'hover:border-blue-400 hover:bg-blue-50/50',
          isDragActive && 'border-blue-500 bg-blue-50',
          disabled && 'opacity-50 cursor-not-allowed',
          isActive && 'border-blue-500 bg-blue-50',
          isComplete && 'border-green-500 bg-green-50',
          hasError && 'border-red-500 bg-red-50'
        )}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {STATUS_ICONS[status]}
            </motion.div>
          </AnimatePresence>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">{label}</p>
            {hint && <p className="text-xs text-gray-500">{hint}</p>}
            {selectedFile && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <File className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{selectedFile.name}</span>
                <span className="text-xs text-gray-400">({formatFileSize(selectedFile.size)})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">
                {status === 'INITIALIZING' && 'Initializing...'}
                {status === 'UPLOADING' && `Uploading... ${uploadedChunks}/${totalChunks} chunks`}
                {status === 'PROCESSING' && 'Processing file...'}
              </span>
              <span className="text-gray-500">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className={cn('h-full rounded-full transition-colors', {
                  'bg-blue-500': status === 'UPLOADING',
                  'bg-purple-500': status === 'PROCESSING',
                  'bg-blue-400': status === 'INITIALIZING',
                })}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Chunk Progress */}
            {totalChunks > 1 && status === 'UPLOADING' && (
              <div className="flex gap-1">
                {Array.from({ length: totalChunks }).map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn('h-1 flex-1 rounded', {
                      'bg-green-500': index < uploadedChunks,
                      'bg-gray-300': index >= uploadedChunks,
                    })}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.05 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Message */}
      <AnimatePresence>
        {(isComplete || hasError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'flex items-center gap-2 p-3 rounded-lg',
              isComplete && 'bg-green-50 text-green-700',
              hasError && 'bg-red-50 text-red-700'
            )}
          >
            {isComplete ? (
              <>
                <FileCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Upload completed successfully!</span>
              </>
            ) : (
              <>
                <FileX className="w-5 h-5" />
                <span className="text-sm font-medium">{error || 'Upload failed'}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      {(isActive || hasError) && (
        <div className="flex justify-end gap-2">
          {isActive && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          {(isComplete || hasError) && (
            <button
              onClick={() => {
                reset();
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload Another File
            </button>
          )}
        </div>
      )}

      {/* Status Badge */}
      {status !== 'IDLE' && (
        <div className="flex items-center justify-center">
          <span
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium',
              STATUS_COLORS[status]
            )}
          >
            {STATUS_ICONS[status]}
            {status}
          </span>
        </div>
      )}
    </div>
  );
}
