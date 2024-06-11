import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from "~/graphql/queries/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "~/graphql/mutations/product";

export const state = () => ({
  products: [],
  loading: false,
  error: null,
  productById: {},
  modelLoading: false,
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

  SET_PRODUCT_BY_ID(state, product) {
    state.productById = product;
  },
  SET_MODEL_LOADING(state, loading) {
    state.modelLoading = loading;
  },
};

export const actions = {
  async fetchProducts({ commit }, { title, categoryId }) {
    commit("SET_PRODUCTS", []);
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.query({
        query: GET_PRODUCTS,
        variables: {
          title: title || null,
          categoryId: categoryId ? parseFloat(categoryId) : null,
        },
      });
      commit("SET_PRODUCTS", data.products);
      return data;
    } catch (error) {
      commit("SET_ERROR", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchProductById({ commit }, id) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.query({
        query: GET_PRODUCT_BY_ID,
        variables: {
          id: id,
        },
      });
      if (!data.product) {
        throw new Error("Product not found");
      }
      commit("SET_PRODUCT_BY_ID", data.product);
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_LOADING", false);
    }
  },
  
  async createProduct(
    { commit },
    { title, price, description, categoryId, images }
  ) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: CREATE_PRODUCT,
        variables: {
          title: title,
          price: parseFloat(price),
          description: description,
          categoryId: parseFloat(categoryId),
          images: images,
        },
      });
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async updateProduct({ commit }, { id, title, price }) {
    commit("SET_MODEL_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id: id,
          title: title,
          price: parseFloat(price),
        },
      });
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_MODEL_LOADING", false);
    }
  },

  async deleteProduct({ commit }, id) {
    commit("SET_MODEL_LOADING", true);
    commit("SET_ERROR", null);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: DELETE_PRODUCT,
        variables: {
          id: id,
        },
      });
      return data;
    } catch (err) {
      commit("SET_ERROR", err);
      throw err;
    } finally {
      commit("SET_MODEL_LOADING", false);
    }
  },
};

export const getters = {
  products: (state) => state.products,
  loading: (state) => state.loading,
  error: (state) => state.error,
};
