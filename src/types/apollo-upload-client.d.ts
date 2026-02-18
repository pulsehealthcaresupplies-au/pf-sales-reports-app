declare module 'apollo-upload-client/UploadHttpLink.mjs' {
  import { ApolloLink } from '@apollo/client';
  
  interface UploadHttpLinkOptions {
    uri?: string | ((operation: unknown) => string);
    credentials?: RequestCredentials;
    fetchOptions?: RequestInit;
    [key: string]: unknown;
  }
  
  export default class UploadHttpLink extends ApolloLink {
    constructor(options?: UploadHttpLinkOptions);
  }
}
