import gql from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $price: Float!
    $description: String!
    $categoryId: Float!
    $images: [String!]!
  ) {
    addProduct(
      data: {
        title: $title
        price: $price
        description: $description
        categoryId: $categoryId
        images: $images
      }
    ) {
      id
      title
      price
      description
      images
      category {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $title: String!, $price: Float!) {
    updateProduct(id: $id, changes: { title: $title, price: $price }) {
      id
      title
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
