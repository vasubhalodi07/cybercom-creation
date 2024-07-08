import { GET_FILTER_PRODUCT_LIST } from "../graphql/queries/product";

export const state = () => ({
    filterOption: [],
    loading: false,
    error: null,
    selectedFilters: [],
    selectedFilterDisplay: []
})

export const mutations = {
    SET_FILTER_OPTION(state, filterOption) {
        state.filterOption = filterOption;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    SET_SELECTED_FILTERS(state, selectedFilters) {
        state.selectedFilters = selectedFilters;
    },
    SET_SELECTED_FILTER_DISPLAY(state, selectedFilterDisplay) {
        state.selectedFilterDisplay = selectedFilterDisplay;
    }
}

export const actions = {
    async fetchFilterOption({ commit, state }) {
        commit('SET_LOADING', true);
        commit("SET_ERROR", null);
        try {
            const { data } = await this.app.apolloProvider.defaultClient.query({
                query: GET_FILTER_PRODUCT_LIST,
                variables: {
                    facet: state.selectedFilters
                }
            });
            commit('SET_FILTER_OPTION', data.listing.listingCategory.filtersBlock);
        } catch (error) {
            console.error('Error fetching data:', error);
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    updateSelectedFilterDisplay({ commit, state }) {
        const selectedFilterDisplay = [];
        state.selectedFilters.forEach((filter) => {
            const option = state.filterOption.find((opt) => opt.attrCode === filter.attributeCode);
            if (option) {
                filter.value.forEach((value) => {
                    const facet = option.facets.find((facet) => facet.attrValue === value);
                    if (facet) {
                        selectedFilterDisplay.push({
                            attributeCode: filter.attributeCode,
                            value: value,
                            label: facet.attrLabel
                        });
                    }
                })
            }
        })
        commit('SET_SELECTED_FILTER_DISPLAY', selectedFilterDisplay);
    },

    editSelectedFilters({ commit }, filters) {
        commit("SET_SELECTED_FILTERS", filters);
    },

    removeFilterAction({ commit, state }, filter) {
        let filters = JSON.parse(JSON.stringify(state.selectedFilters));
        const index = filters.findIndex(
            f => f.attributeCode === filter.attributeCode && f.value.includes(filter.value)
        );

        if (index !== -1) {
            const valueIndex = filters[index].value.indexOf(filter.value);
            if (valueIndex !== -1) {
                filters[index].value.splice(valueIndex, 1);
                if (filters[index].value.length === 0) {
                    filters.splice(index, 1);
                }
                commit('SET_SELECTED_FILTERS', filters);
            }
        }
    },

    resetFiltersAction({ commit }) {
        commit('SET_SELECTED_FILTER_DISPLAY', []);
    }
}