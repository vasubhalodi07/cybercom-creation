<template>
  <div class="product-container">
    <FilterOption class="filter-section" />
    <ProductList class="product-list-section" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FilterOption from "~/components/FilterOption.vue";
import ProductList from "~/components/ProductList.vue";

export default {
  components: {
    FilterOption,
    ProductList,
  },
  methods: {
    ...mapActions("filter", ["removeFilter", "resetFilter"]),

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
