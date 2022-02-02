import { gql } from "@apollo/client/core";

export const getCategories = gql`
  query getCategories {
    categories {
      categoryId
      categoryName
      image {
        url
      }
    }
  }
`;

export const getItems = gql`
  query getItems {
    items {
      itemId
      itemName
      description
      price
      image {
        url
      }
      category {
        categoryId
      }
    }
  }
`;
