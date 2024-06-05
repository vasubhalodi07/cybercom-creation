import gql from "graphql-tag";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $image: String!) {
    addCategory(data: { name: $name, image: $image }) {
      id
      name
      image
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!, $image: String!) {
    updateCategory(id: $id, changes: { name: $name, image: $image }) {
      id
      name
      image
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
