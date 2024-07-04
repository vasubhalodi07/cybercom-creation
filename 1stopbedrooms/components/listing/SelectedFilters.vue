<template>
    <div v-if="selectedFilterDisplay.length" class="selected-filters">
        <div v-for="(filter, index) in selectedFilterDisplay" :key="index" class="filter-item">
            {{ filter.label }}
            <button @click="$emit('removeFilter', filter)">×</button>
        </div>
        <button class="clear-filter-button" @click="$emit('clearFilters')">Clear Filters</button>
    </div>
</template>

<script>
export default {
    name: "SelectedFilters",
    props: {
        selectedFilterDisplay: Array
    }
};
</script>

<style scoped>
.selected-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 25px;
}

.filter-item {
    background: #f1f1f1;
    padding: 10px 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
}

.filter-item button {
    background: none;
    border: none;
    font-size: 17px;
    margin-left: 10px;
    cursor: pointer;
}

.filter-item button:hover {
    color: red;
}

.clear-filter-button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #0f249a;
}

.clear-filter-button:hover {
    text-decoration: underline;
}
</style>