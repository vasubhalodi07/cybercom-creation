import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query GetProducts($title: String, $categoryId: Float){
    products(title: $title, categoryId: $categoryId) {
      id
      title
      price
      images
      category {
        name
        image
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;
