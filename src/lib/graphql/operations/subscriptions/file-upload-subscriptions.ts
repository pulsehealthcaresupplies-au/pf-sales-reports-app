import { gql } from '@apollo/client';

/**
 * GraphQL subscriptions for file upload progress tracking
 */

export const FILE_UPLOAD_PROGRESS = gql`
  subscription FileUploadProgress($sessionId: ID!) {
    fileUploadProgress(sessionId: $sessionId) {
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

export const FILE_UPLOAD_COMPLETED = gql`
  subscription FileUploadCompleted($usage: FileUploadUsage) {
    fileUploadCompleted(usage: $usage) {
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
