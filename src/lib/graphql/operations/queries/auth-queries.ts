import { gql } from '@apollo/client';

/**
 * Auth-related GraphQL Queries
 * These queries use the /graphql/auth endpoint
 */

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      username
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;
