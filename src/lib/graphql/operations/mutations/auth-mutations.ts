import { gql } from '@apollo/client';

/**
 * Auth-related GraphQL Mutations
 * These mutations use the /graphql/auth endpoint
 */

export const LOGIN_MUTATION = gql`
  mutation Login($username: String, $email: String, $password: String!, $requireOtp: Boolean, $app: String) {
    login(username: $username, email: $email, password: $password, requireOtp: $requireOtp, app: $app) {
      accessToken
      refreshToken
      expiresAt
      hashPhrase
      user {
        id
        email
        phone
        username
        firstName
        lastName
        role
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      expiresAt
      hashPhrase
      user {
        id
        email
        phone
        username
        firstName
        lastName
        role
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;
