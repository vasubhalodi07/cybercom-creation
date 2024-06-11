import gql from "graphql-tag";

export const USER_PROFILE = gql`
  query UserProfile {
    myProfile {
      id
      name
      email
      avatar
      role
      creationAt
    }
  }
`;
