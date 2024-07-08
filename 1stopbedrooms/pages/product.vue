<template>
  <div class="product-container">
    <FilterOption class="filter-section" />
    <ProductList class="product-list-section" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import FilterOption from "~/components/listing/FilterOption.vue";
import ProductList from "~/components/listing/ProductList.vue";

export default {
  components: {
    FilterOption,
    ProductList,
  },
  async created() {
    await this.initializeFiltersFromQuery();
    await this.fetchProducts();
    await this.fetchFilterOption();
  },
  methods: {
    ...mapActions("product", ["fetchProducts"]),
    ...mapActions("filter", [
      "fetchFilterOption",
      "editSelectedFilters",
      "removeFilter",
      "resetFilter",
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
