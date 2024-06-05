import gql from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $price: Float!
    $description: String!
    $categoryId: Int!
    $images: [String!]
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
  mutation UpdateProduct($title: String!, $price: Float!) {
    updateProduct(title: $title, price: $price) {
      id
      title
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct(
    id: ID!
  ) {
    deleteProduct(id: $id)
  }
`;
