import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image
    }
  }
`;

export const GET_CATEGORY_ID = gql`
  query GetCategoryById($id: ID!) {
    category(id: $id) {
      id
      name
      image
    }
  }
`;
