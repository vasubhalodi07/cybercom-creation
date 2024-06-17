<template>
    <div class="product-container">
        <FilterOption ref="filterOption" @update-selected-filters="updateSelectedFilters" />
        <ProductList :selectedFilters="selectedFilters" @remove-filter="handleRemoveFilter" @clear-filter="handleClearFilter" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedFilters: []
        }
    },
    methods: {
        updateSelectedFilters(filters) {
            this.selectedFilters = filters;
        },
        handleRemoveFilter(filter) {
            this.$refs.filterOption.removeFilter(filter);
        },
        handleClearFilter() {
            this.$refs.filterOption.clearFilter();
        }
    }
}
</script>

<style scoped>
.product-container {
    display: flex;
    gap: 20px;
    padding: 20px 50px;
}
</style>
