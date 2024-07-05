import gql from "graphql-tag";
import { LISTING_DETAILS_FRAGMENT, LISTING_FILTERS_FRAGEMENT } from "../fragments/listingDetails";

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
        __typename
        ...ListingDetails
      }
    }
  }
  ${LISTING_DETAILS_FRAGMENT}
`;

export const GET_FILTER_PRODUCT_LIST = gql`
  query getFilterList(
    $facet: [catalogSearchFacetInput]
  ) {
    listing {
      listingCategory(slug: "bedroom/beds", request: { facet: $facet }) {
        ...ListingFilters
      }
    }
  }
  ${LISTING_FILTERS_FRAGEMENT}
`;
