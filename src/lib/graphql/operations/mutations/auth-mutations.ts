import { gql } from '@apollo/client';

/**
 * Auth-related GraphQL Mutations
 * These mutations use the /graphql/sales-reports endpoint (via gateway)
 * and follow the salesReports prefix convention
 */

export const LOGIN_MUTATION = gql`
  mutation SalesReportsLogin($username: String, $email: String, $password: String!, $requireOtp: Boolean, $app: String) {
    salesReportsLogin(username: $username, email: $email, password: $password, requireOtp: $requireOtp, app: $app) {
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
  mutation SalesReportsRefreshToken($refreshToken: String!) {
    salesReportsRefreshToken(refreshToken: $refreshToken) {
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
  mutation SalesReportsLogout {
    salesReportsLogout {
      success
      message
    }
  }
`;
