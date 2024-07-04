<template>
  <div class="container">
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <Header
        :itemsCount="products?.itemsCount"
        :itemsTitle="products?.title"
        :initialSortBy="localSortBy"
        @change-sortby-method="changeSortByMethod"
      />

      <SelectedFilters
        :selectedFilterDisplay="selectedFilterDisplay"
        @removeFilter="removeFilter"
        @clearFilters="clearFilters"
      />
      
      <CardGrid
        :products="products?.items"
        :hoveredItemId="hoveredItemId"
        @hoverImage="hoverImage"
        @unhoverImage="unhoverImage"
      />

      <div class="per-page-filter">
        <SelectField
          :value="localPerPage"
          :options="perPageOptions"
          @change="changePerPageMethod"
          label="Items per page"
          fieldId="per-page-select"
        />
      </div>

      <Pagination :currentPage="page" :totalPages="products && products.pages" @page-changed="handlePageChange" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import Header from "~/components/listing/Header.vue";
import SelectedFilters from "~/components/listing/SelectedFilters.vue";
import Pagination from "~/components/listing/Pagination.vue";
import CardGrid from "~/components/listing/CardGrid.vue";
import SelectField from "~/components/listing/SelectField.vue";

export default {
  components: {
    Header,
    SelectedFilters,
    Pagination,
    CardGrid,
    SelectField
  },
  data() {
    return {
      hoveredItemId: null,
      localSortBy: this.$route.query.sortBy || 'RELEVANCE',
      localPerPage: this.$route.query.perPage || 'PER_PAGE_36',
      perPageOptions: [
        { value: "PER_PAGE_36", text: "36" },
        { value: "PER_PAGE_48", text: "48" },
        { value: "PER_PAGE_72", text: "72" }
      ]
    };
  },
  async created() {
    this.initializeStoreFromQuery();
    this.fetchProducts(this.buildFilterQueryParams());
  },
  watch: {
    '$route.query': {
      handler() {
        this.localSortBy = this.$route.query.sortBy || 'RELEVANCE';
        this.localPerPage = this.$route.query.perPage || 'PER_PAGE_36';
        this.fetchProducts(this.buildFilterQueryParams());
      },
      immediate: true,
      deep: true,
    }
  },
  computed: {
    ...mapState('product', {
      products: state => state.products,
      loading: state => state.loading,
      error: state => state.error,
      sortBy: state => state.sortBy,
      perPage: state => state.perPage,
      page: state => state.page,
    }),
    ...mapState('filter', {
      selectedFilterDisplay: state => state.selectedFilterDisplay,
      selectedFilters: state => state.selectedFilters,
    })
  },
  methods: {
    ...mapActions('product', ['fetchProducts', 'changeSortBy', 'changePerPage', 'changePage']),
    ...mapMutations('product', ['SET_HOVERED_ITEM_ID', 'REMOVE_FILTER', 'CLEAR_FILTERS']),

    ...mapActions('filter', ['removeFilterAction', 'resetFilterAction']),

    initializeStoreFromQuery() {
      const { sortBy, perPage, page } = this.$route.query;
      if (sortBy) {
        this.localSortBy = sortBy;
        this.changeSortBy(sortBy);
      }
      if (perPage) {
        this.localPerPage = perPage;
        this.changePerPage(perPage);
      }
      if (page) {
        this.changePage(parseInt(page));
      }
    },

    buildFilterQueryParams() {
      const filters = [];
      const query = this.$route.query;
      Object.keys(query).forEach(key => {
        if (key !== 'sortBy' && key !== 'perPage' && key !== 'page') {
          filters.push({
            attributeCode: key,
            value: query[key].split(',')
          });
        }
      });
      return filters;
    },

    updateRouteQuery() {
      this.$router.push({ query: { ...this.$route.query, sortBy: this.sortBy, perPage: this.perPage, page: this.page } });
    },

    changeSortByMethod(value) {
      this.localSortBy = value;
      this.changeSortBy(value);
      this.updateRouteQuery();
    },
    
    changePerPageMethod(value) {
      this.localPerPage = value;
      this.changePage(1);
      this.changePerPage(this.localPerPage);
      this.updateRouteQuery();
    },

    handlePageChange(page) {
      this.changePage(page);
      this.updateRouteQuery();
      this.scrollToTop();
    },

    hoverImage(id) {
      this.hoveredItemId = parseInt(id);
    },
    
    unhoverImage() {
      this.hoveredItemId = null;
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    removeFilter(filter) {
      this.removeFilterAction(filter);
    },

    clearFilters() {
      this.resetFilterAction();
    },
  }
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
