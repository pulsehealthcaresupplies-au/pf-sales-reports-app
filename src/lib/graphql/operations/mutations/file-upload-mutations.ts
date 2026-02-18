import { gql } from '@apollo/client';

/**
 * GraphQL mutations for chunked file uploads
 */

export const INITIALIZE_FILE_UPLOAD = gql`
  mutation InitializeFileUpload($input: InitializeFileUploadInput!) {
    initializeFileUpload(input: $input) {
      sessionId
      filename
      totalSize
      totalChunks
      chunkSize
      uploadedChunks
      usage
      status
      progress
      createdAt
      expiresAt
      metadata
    }
  }
`;

export const UPLOAD_FILE_CHUNK = gql`
  mutation UploadFileChunk($input: UploadFileChunkInput!) {
    uploadFileChunk(input: $input) {
      sessionId
      chunkIndex
      success
      message
      uploadedChunks
      totalChunks
      progress
    }
  }
`;

export const COMPLETE_FILE_UPLOAD = gql`
  mutation CompleteFileUpload($sessionId: ID!, $metadata: JSON) {
    completeFileUpload(sessionId: $sessionId, metadata: $metadata) {
      sessionId
      fileId
      filename
      url
      size
      mimeType
      uploadedAt
      usage
      metadata
    }
  }
`;

export const CANCEL_FILE_UPLOAD = gql`
  mutation CancelFileUpload($sessionId: ID!) {
    cancelFileUpload(sessionId: $sessionId)
  }
`;

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!, $usage: FileUploadUsage!, $metadata: JSON) {
    uploadFile(file: $file, usage: $usage, metadata: $metadata) {
      sessionId
      fileId
      filename
      url
      size
      mimeType
      uploadedAt
      usage
      metadata
    }
  }
`;

export const UPLOAD_MULTIPLE_FILES = gql`
  mutation UploadMultipleFiles($files: [Upload!]!, $usage: FileUploadUsage!, $metadata: JSON) {
    uploadMultipleFiles(files: $files, usage: $usage, metadata: $metadata) {
      sessionId
      fileId
      filename
      url
      size
      mimeType
      uploadedAt
      usage
      metadata
    }
  }
`;
