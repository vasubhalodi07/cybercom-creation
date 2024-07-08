<template>
  <div class="product-container">
    <FilterOption
      class="filter-section"
      :open-sections="openSections"
      :loading="loading"
    />
    <ProductList class="product-list-section" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FilterOption from "~/components/listing/FilterOption.vue";
import ProductList from "~/components/listing/ProductList.vue";

export default {
  components: {
    FilterOption,
    ProductList,
  },
  data() {
    return {
      openSections: [],
      loading: true,
    };
  },
  async created() {
    await this.initializeFiltersFromQuery();
    await this.fetchDataInParallel();
    this.initializeOpenSections();
    this.updateSelectedFilterDisplay();
    this.loading = false;
  },
  methods: {
    ...mapActions("product", ["fetchProducts"]),
    ...mapActions("filter", [
      "fetchFilterOption",
      "editSelectedFilters",
      "removeFilter",
      "resetFilter",
      "updateSelectedFilterDisplay",
    ]),

    initializeFiltersFromQuery() {
      const query = this.$route.query;
      const filters = [];
      Object.keys(query).forEach((key) => {
        if (key !== "page") {
          filters.push({
            attributeCode: key,
            value: query[key].split(","),
          });
        }
      });
      this.editSelectedFilters(filters);
    },

    handleRemoveFilter(filter) {
      this.removeFilter(filter);
    },

    handleClearFilter() {
      this.resetFilter();
    },

    async fetchDataInParallel() {
      try {
        await Promise.all([this.fetchProducts(), this.fetchFilterOption()]);
      } catch (error) {
        console.error("Error fetching data in parallel:", error);
      }
    },

    initializeOpenSections() {
      this.openSections = this.$store.state.filter.filterOption.map(
        (_, index) => index
      );
    },
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  gap: 20px;
  padding: 20px 50px;
}

.filter-section {
  flex: 0 0 300px;
}

.product-list-section {
  flex: 1;
}
</style>
