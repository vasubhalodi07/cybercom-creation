import { GET_PRODUCT_LIST } from '~/graphql/queries/product';

export const state = () => ({
    products: [],
    loading: false,
    error: null,
    sortBy: 'RELEVANCE',
    perPage: 'PER_PAGE_36',
    page: 1,
});

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    SET_SORT_BY(state, sortBy) {
        state.sortBy = sortBy;
    },
    SET_PER_PAGE(state, perPage) {
        state.perPage = perPage;
    },
    SET_PAGE(state, page) {
        state.page = page;
    },
};

export const actions = {
    async fetchProducts({ commit, state }, facet) {
        commit('SET_LOADING', true);
        try {
            const { data } = await this.app.apolloProvider.defaultClient.query({
                query: GET_PRODUCT_LIST,
                variables: {
                    sortBy: state.sortBy,
                    perPage: state.perPage,
                    page: state.page,
                    facet: facet,
                }
            });
            commit('SET_PRODUCTS', data.listing.listingCategory);
        } catch (error) {
            console.error('Error fetching data:', error);
            commit('SET_ERROR', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    changeSortBy({ commit }, sortBy) {
        commit('SET_SORT_BY', sortBy);
    },

    changePerPage({ commit }, perPage) {
        commit('SET_PER_PAGE', perPage);
    },

    changePage({ commit }, page) {
        commit('SET_PAGE', page);
    },
};

export const getters = {};