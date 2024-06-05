import { GET_CATEGORIES } from "../graphql/queries/category";

export const state = () => ({
  categories: [],
  loading: false,
  error: null,
});

export const mutations = {
  SET_CATEGORIES(state, category) {
    state.categories = category;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

export const actions = {
  async fetchCategories({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = client.query({
        query: GET_CATEGORIES,
      });
      commit("SET_CATEGORIES", data.categories);
    } catch (err) {
      console.log(err);
      commit("SET_ERROR", err);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

export const getters = {
  categories: (state) => state.categories,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
