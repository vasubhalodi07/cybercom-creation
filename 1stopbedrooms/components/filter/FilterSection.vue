<template>
    <div class="filter-section">
        <div class="filter-title" @click="$emit('toggle-section', index)">
            {{ option.title }}
            <span class="arrow">{{ openSections.includes(index) ? '▲' : '▼' }}</span>
        </div>
        <div v-if="openSections.includes(index)" class="filter-options">
            <FilterItem v-for="(item, itemIndex) in option.facets" :key="itemIndex" :item="item" :option="option"
                @toggle-filter="$emit('toggle-filter', $event)" :product-loading="productLoading"
                :selected-filters="selectedFilters" />
        </div>
    </div>
</template>

<script>
import FilterItem from '~/components/filter/FilterItem.vue';

export default {
    name: "FilterSection",
    components: {
        FilterItem
    },
    props: {
        option: Object,
        index: Number,
        openSections: Array,
        productLoading: Boolean,
        selectedFilters: Array
    }
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

.arrow {
    font-size: 12px;
}
</style>
