<template>
  <div class="filter-section">
    <div class="filter-title" @click="$emit('toggle-section', index)">
      {{ option.title }}
      <span class="arrow">{{ openSections.includes(index) ? "▲" : "▼" }}</span>
    </div>
    <div v-if="openSections.includes(index)" class="filter-options">
      <div v-if="option.title === 'Brand'" class="brand-search">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Search Brand"
          @input="filterBrands"
          class="search-input"
        />
      </div>
      <FilterItem
        v-for="(item, itemIndex) in filteredItems"
        :key="itemIndex"
        :item="item"
        :option="option"
        @toggle-filter="$emit('toggle-filter', $event)"
        :product-loading="productLoading"
        :selected-filters="selectedFilters"
      />
    </div>
  </div>
</template>

<script>
import FilterItem from "~/components/listing/filter/FilterItem.vue";

export default {
  name: "FilterSection",
  components: {
    FilterItem,
  },
  props: {
    option: Object,
    index: Number,
    openSections: Array,
    productLoading: Boolean,
    selectedFilters: Array,
  },
  data() {
    return {
      searchTerm: "",
      filteredItems: this.option.facets,
    };
  },
  methods: {
    filterBrands() {
      this.filteredItems = this.option.facets.filter((item) =>
        item.attrLabel.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  watch: {
    option: {
      handler() {
        this.filteredItems = this.option.facets;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.filter-section {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.filter-title {
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.filter-options {
  max-height: 150px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.filter-options::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

.filter-options::-webkit-scrollbar-track {
  background-color: transparent;
}

.filter-options::-webkit-scrollbar-thumb {
  background-color: #87888d;
  border-radius: 5px;
}

.filter-options::-webkit-scrollbar-button {
  background-color: transparent;
}

.arrow {
  font-size: 12px;
}

.brand-search {
  margin-bottom: 10px;
}

.search-input {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
