import gql from "graphql-tag";

export const USER_LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refresh_token: String!) {
    refreshToken(refreshToken: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;
