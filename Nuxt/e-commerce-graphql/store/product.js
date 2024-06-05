import { GET_PRODUCTS } from "~/graphql/queries/product";

export const state = () => ({
  products: [],
  loading: false,
  error: null,
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
};

export const actions = {
  async fetchProducts({ commit }, { title, categoryId }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.query({
        query: GET_PRODUCTS,
        variable() {
          const variables = { title: title };
          if (this.categoryId !== "" && !isNaN(parseFloat(categoryId))) {
            variables.categoryId = parseFloat(categoryId);
          }
          return variables;
        },
      });
      commit("SET_PRODUCTS", data.products);
    } catch (error) {
      commit("SET_ERROR", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

export const getters = {
  products: (state) => state.products,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
