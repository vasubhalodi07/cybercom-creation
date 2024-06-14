<template>
    <div>
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
import { GET_FILTER_PRODUCT_LIST } from '~/graphql/queries/product';

export default {
    data() {
        return {
            filterOption: [],
            loading: false,
            selectedFilters: []
        }
    },
    async created() {
        await this.fetchFilterOption();
        this.initializeFiltersFromQuery();
    },
    watch: {
        selectedFilters: {
            handler() {
                this.updateQueryParams();
            },
            deep: true
        }
    },
    methods: {
        async fetchFilterOption() {
            this.loading = true;
            try {
                const { data } = await this.$apollo.query({
                    query: GET_FILTER_PRODUCT_LIST,
                });
                this.filterOption = data.listing.listingCategory.filtersBlock;
            } catch (error) {
                console.log("Error fetching data:", error);
            } finally {
                this.loading = false;
            }
        },
        initializeFiltersFromQuery() {
            const query = this.$route.query;
            const filters = [];
            Object.keys(query).forEach(key => {
                filters.push({
                    attributeCode: key,
                    value: query[key].split(',')
                });
            });
            this.selectedFilters = filters;
        },
        toggleFilter(value, attributeCode, event) {
            const filterIndex = this.selectedFilters.findIndex(filter => filter.attributeCode === attributeCode);

            if (event.target.checked) {
                if (filterIndex === -1) {
                    this.selectedFilters.push({ attributeCode: attributeCode, value: [value] });
                } else {
                    this.selectedFilters[filterIndex].value.push(value);
                }
            } else {
                if (filterIndex !== -1) {
                    const valueIndex = this.selectedFilters[filterIndex].value.indexOf(value);
                    if (valueIndex !== -1) {
                        this.selectedFilters[filterIndex].value.splice(valueIndex, 1);
                    }
                    if (this.selectedFilters[filterIndex].value.length === 0) {
                        this.selectedFilters.splice(filterIndex, 1);
                    }
                }
            }
            this.updateQueryParams();
        },
        isFilterSelected(attributeCode, value) {
            const filterIndex = this.selectedFilters.findIndex(
                (filter) => filter.attributeCode === attributeCode
            );
            return filterIndex !== -1 && this.selectedFilters[filterIndex].value.includes(value);
        },
        updateQueryParams() {
            const preservedParams = ['sortBy', 'perPage', 'page'];
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

            this.$router.push({ query });
        }
    },
}
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
</style>
