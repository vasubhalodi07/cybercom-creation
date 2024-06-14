import gql from "graphql-tag";

export const GET_PRODUCT_LIST = gql`
  query getProductList(
    $sortBy: catalogSearchFilterSort
    $perPage: catalogSearchResultItemPerPage
    $page: Int
    $facet: [catalogSearchFacetInput]
  ) {
    listing {
      listingCategory(
        slug: "bedroom/beds"
        request: {
          page: $page
          perPage: $perPage
          sortBy: $sortBy
          facet: $facet
        }
      ) {
        itemsCount
        perPage
        pages
        page
        items {
          id
          webId
          name
          brand {
            id
            name
          }
          reviews {
            number
            rating
            votes {
              voteName
              voteCount
              votePercent
            }
          }
          images {
            hoverImage {
              style
              alt
              src
            }
            mainImage {
              style
              alt
              src
            }
          }
          price {
            price
            regularPrice
            finalPrice
            msrp
            showMsrp
            discount
            getExcludePromo
            getSale
          }
        }
      }
    }
  }
`;

export const GET_FILTER_PRODUCT_LIST = gql`
  query getFilterList {
    listing {
      listingCategory(slug: "bedroom/beds", request: { facet: {} }) {
        itemsCount
        perPage
        pages
        page
        minPrice
        maxPrice
        filtersBlock {
          title
          attrCode
          facets {
            itemCount
            attrLabel
            attrValue
            virtualCategoryLink
          }
        }
      }
    }
  }
`;
