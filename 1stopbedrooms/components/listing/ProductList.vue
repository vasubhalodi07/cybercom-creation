<template>
  <div class="container">
    <div v-if="loading">
      <ProductListSkeleton />
    </div>
    <div v-else>
      <Header
        :itemsCount="products?.itemsCount"
        :itemsTitle="products?.title"
        :initialSortBy="sortBy"
        @change-sortby-method="changeSortByMethod"
      />

      <SelectedFilters
        :selectedFilterDisplay="selectedFilterDisplay"
        @removeFilter="removeFilter"
        @clearFilters="clearFilters"
      />

      <CardGrid
        :products="products?.items"
        v-if="products?.items && products?.items.length > 0"
      />

      <div class="per-page-filter">
        <SelectField
          :value="perPage"
          :options="perPageOptions"
          @change="changePerPageMethod"
          label="Items per page"
          fieldId="per-page-select"
        />
      </div>

      <Pagination
        :currentPage="page"
        :totalPages="products && products.pages"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import Header from "~/components/listing/product/Header.vue";
import SelectedFilters from "~/components/listing/product/SelectedFilters.vue";
import CardGrid from "~/components/listing/product/card/CardGrid.vue";
import Pagination from "~/components/listing/product/Pagination.vue";

import SelectField from "~/components/shared/input/SelectField.vue";
import ProductListSkeleton from "~/components/shared/skeleton/ProductListSkeleton.vue";

export default {
  components: {
    Header,
    SelectedFilters,
    CardGrid,
    Pagination,
    SelectField,
    ProductListSkeleton,
  },
  data() {
    return {
      perPageOptions: [
        { value: "PER_PAGE_36", text: "36" },
        { value: "PER_PAGE_48", text: "48" },
        { value: "PER_PAGE_72", text: "72" },
      ],
    };
  },
  async created() {
    this.initializeStoreFromQuery();
  },
  watch: {
    "$route.query": {
      handler() {
        this.initializeStoreFromQuery();
        this.fetchProducts(this.buildFilterQueryParams());
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    ...mapState("product", {
      products: (state) => state.products,
      loading: (state) => state.loading,
      error: (state) => state.error,
      sortBy: (state) => state.sortBy,
      perPage: (state) => state.perPage,
      page: (state) => state.page,
    }),
    ...mapState("filter", {
      selectedFilterDisplay: (state) => state.selectedFilterDisplay,
      selectedFilters: (state) => state.selectedFilters,
    }),
  },
  methods: {
    ...mapActions("product", [
      "fetchProducts",
      "changeSortBy",
      "changePerPage",
      "changePage",
    ]),
    ...mapMutations("product", [
      "SET_HOVERED_ITEM_ID",
      "REMOVE_FILTER",
      "CLEAR_FILTERS",
    ]),

    ...mapActions("filter", ["removeFilterAction", "resetFilterAction"]),

    initializeStoreFromQuery() {
      const { sortBy, perPage, page } = this.$route.query;
      if (sortBy) {
        this.changeSortBy(sortBy);
      }
      if (perPage) {
        this.changePerPage(perPage);
      }
      if (page) {
        this.changePage(parseInt(page));
      }
    },

    updateRouteQuery() {
      this.$router.push({
        query: {
          ...this.$route.query,
          sortBy: this.sortBy,
          perPage: this.perPage,
          page: this.page,
        },
      });
    },

    changeSortByMethod(value) {
      this.changeSortBy(value);
      this.updateRouteQuery();
    },

    changePerPageMethod(value) {
      this.changePage(1);
      this.changePerPage(value);
      this.updateRouteQuery();
    },

    handlePageChange(page) {
      this.changePage(page);
      this.updateRouteQuery();
      this.scrollToTop();
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    removeFilter(filter) {
      this.removeFilterAction(filter);
    },

    clearFilters() {
      this.resetFilterAction();
    },

    buildFilterQueryParams() {
      const filters = [];
      const query = this.$route.query;
      Object.keys(query).forEach((key) => {
        if (key !== "sortBy" && key !== "perPage" && key !== "page") {
          filters.push({
            attributeCode: key,
            value: query[key].split(","),
          });
        }
      });
      return filters;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px;
  flex-direction: column;
}

.per-page-filter {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}

select {
  padding: 10px;
}
</style>
