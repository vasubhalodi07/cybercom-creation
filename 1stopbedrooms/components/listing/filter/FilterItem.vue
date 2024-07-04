<template>
    <div class="filter-item">
        <input type="checkbox" :value="item.attrValue" :checked="isFilterSelected(option.attrCode, item.attrValue)"
            @change="handleToggle($event)" :disabled="productLoading" />
        <label>{{ item.attrLabel }} ({{ item.itemCount }})</label>
    </div>
</template>

<script>
export default {
    name: "FilterItem",
    props: {
        item: Object,
        option: Object,
        productLoading: Boolean,
        selectedFilters: Array
    },
    methods: {
        isFilterSelected(attributeCode, value) {
            const filterIndex = this.selectedFilters.findIndex(
                filter => filter.attributeCode === attributeCode
            );
            return filterIndex !== -1 && this.selectedFilters[filterIndex].value.includes(value);
        },
        handleToggle(event) {
            this.$emit('toggle-filter', {
                value: this.item.attrValue,
                attributeCode: this.option.attrCode,
                checked: event.target.checked
            });
        }
    }
};
</script>

<style scoped>
.filter-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.filter-item input {
    margin-right: 10px;
}

.filter-item input[type="checkbox"] {
    appearance: none;
    margin-right: 10px;
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    border-radius: 3px;
    position: relative;
}

.filter-item input[type="checkbox"]:checked {
    background-color: #0f249a;
    border-color: #0f249a;
}

.filter-item input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 4px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.filter-item input[type="checkbox"]:disabled {
    opacity: 0.5;
    cursor: none;
}
</style>
