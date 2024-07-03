<template>
    <div class="filter-option">
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-for="(option, index) in filterOption" :key="index" class="filter-section">
                <div class="filter-title">{{ option.title }}</div>
                <div class="filter-options">
                    <div v-for="(item, index) in option.facets" :key="index" class="filter-item">
                        <input type="checkbox" :value="item.attrValue"
                            :checked="isFilterSelected(option.attrCode, item.attrValue)"
                            @change="toggleFilter(item.attrValue, option.attrCode, $event)" />
                        <label>{{ item.attrLabel }} ({{ item.itemCount }})</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    async created() {
        await this.fetchFilterOption();
        this.initializeFiltersFromQuery();
        this.updateSelectedFilterDisplay();
    },
    watch: {
        selectedFilters: {
            handler() {
                this.updateQueryParams(true);
                this.updateSelectedFilterDisplay();
            },
            deep: true
        }
    },
    computed: {
        ...mapState('filter', {
            filterOption: state => state.filterOption,
            loading: state => state.loading,
            error: state => state.error,
            selectedFilters: state => state.selectedFilters,
            selectedFilterDisplay: state => state.selectedFilterDisplay
        })
    },
    methods: {
        ...mapActions('filter', ['fetchFilterOption', 'editSelectedFilters', 'editSelectedFilterDisplay']),

        initializeFiltersFromQuery() {
            const query = this.$route.query;
            const filters = [];
            Object.keys(query).forEach(key => {
                if (key !== 'page') {
                    filters.push({
                        attributeCode: key,
                        value: query[key].split(',')
                    });
                }
            });
            this.editSelectedFilters(filters);
        },

        toggleFilter(value, attributeCode, event) {
            let filters = JSON.parse(JSON.stringify(this.selectedFilters));
            const filterIndex = filters.findIndex(filter => filter.attributeCode === attributeCode);

            if (event.target.checked) {
                if (filterIndex === -1) {
                    filters.push({ attributeCode: attributeCode, value: [value] });
                } else {
                    if (!filters[filterIndex].value.includes(value)) {
                        filters[filterIndex].value.push(value);
                    }
                }
            } else {
                if (filterIndex !== -1) {
                    const valueIndex = filters[filterIndex].value.indexOf(value);
                    if (valueIndex !== -1) {
                        filters[filterIndex].value.splice(valueIndex, 1);
                    }
                    if (filters[filterIndex].value.length === 0) {
                        filters.splice(filterIndex, 1);
                    }
                }
            }

            this.editSelectedFilters(filters);
        },

        isFilterSelected(attributeCode, value) {
            const filterIndex = this.selectedFilters.findIndex(
                filter => filter.attributeCode === attributeCode
            );
            return filterIndex !== -1 && this.selectedFilters[filterIndex].value.includes(value);
        },

        updateQueryParams(resetPage = false) {
            const preservedParams = ['sortBy', 'perPage'];
            const query = {};
            preservedParams.forEach(param => {
                if (this.$route.query[param]) {
                    query[param] = this.$route.query[param];
                }
            });
            this.selectedFilters.forEach(filter => {
                if (filter.value.length > 0) {
                    query[filter.attributeCode] = filter.value.join(',');
                }
            });
            if (resetPage) {
                query.page = 1;
            } else {
                query.page = this.$route.query.page || 1;
            }
            this.$router.push({ query });
        },

        updateSelectedFilterDisplay() {
            const selectedFilterDisplay = [];
            this.selectedFilters.forEach(filter => {
                const option = this.filterOption.find(opt => opt.attrCode === filter.attributeCode);
                if (option) {
                    filter.value.forEach(value => {
                        const facet = option.facets.find(facet => facet.attrValue === value);
                        if (facet) {
                            selectedFilterDisplay.push({
                                attributeCode: filter.attributeCode,
                                value: value,
                                label: facet.attrLabel
                            });
                        }
                    });
                }
            });
            this.editSelectedFilterDisplay(selectedFilterDisplay);
        },
    }
};
</script>

<style scoped>
.filter-section {
    margin-bottom: 20px;
}

.filter-title {
    font-weight: bold;
    margin-bottom: 10px;
}

.filter-options {
    max-height: 150px;
    width: 250px;
    overflow-y: auto;
    overflow-x: auto;
}

.filter-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.filter-item input {
    margin-right: 10px;
}

.selected-filters {
    margin-top: 20px;
}

.selected-filters>div {
    margin-bottom: 5px;
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

.filter-options::-webkit-scrollbar-button:start:decrement {
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon points="10,0 20,20 0,20" /%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-size: 10px;
    background-position: center;
}

.filter-options::-webkit-scrollbar-button:end:increment {
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon points="0,0 20,0 10,20" /%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-size: 10px;
    background-position: center;
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
</style>