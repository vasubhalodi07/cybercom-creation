<template>
    <div class="product-container">
        <FilterOption />
        <ProductList />
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    methods: {
        ...mapActions('filter', ['removeFilter', 'resetFilter']),

        handleRemoveFilter(filter) {
            this.removeFilter(filter);
        },

        handleClearFilter() {
            this.resetFilter();
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
