import { GET_CATEGORIES } from "~/graphql/queries/category";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../graphql/mutations/category";

export const state = () => ({
  categories: [],
  loading: false,
  error: null,
  modalLoading: false,
});

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_MODAL_LOADING(state, loading) {
    state.modalLoading = loading;
  },
  ADD_CATEGORY(state, category) {
    state.categories.push(category);
  },
  UPDATE_CATEGORY(state, updatedCategory) {
    const index = state.categories.findIndex(
      (cat) => cat.id === updatedCategory.id
    );
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },
  DELETE_CATEGORY(state, categoryId) {
    state.categories = state.categories.filter((cat) => cat.id !== categoryId);
  },
};

export const actions = {
  async fetchCategories({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.query({
        query: GET_CATEGORIES,
      });
      commit("SET_CATEGORIES", data.categories);
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createCategory({ commit }, { name, image }) {
    commit("SET_MODAL_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          name: name,
          image: image,
        },
      });
      commit("ADD_CATEGORY", data.addCategory);
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_MODAL_LOADING", false);
    }
  },

  async updateCategory({ commit }, { id, name, image }) {
    commit("SET_MODAL_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: UPDATE_CATEGORY,
        variables: {
          id: id,
          name: name,
          image: image,
        },
      });
      commit("UPDATE_CATEGORY", data.updateCategory);
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_MODAL_LOADING", false);
    }
  },

  async deleteCategory({ commit }, id) {
    commit("SET_MODAL_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: DELETE_CATEGORY,
        variables: {
          id: id,
        },
      });
      commit("DELETE_CATEGORY", id);
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_MODAL_LOADING", false);
    }
  },
};

export const getters = {
  categories: (state) => state.categories,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
