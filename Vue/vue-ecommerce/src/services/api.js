import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getProducts(search, categoryId) {
    if (search !== null && categoryId !== null) {
      return apiClient.get(
        "/products?title=" + search + "&categoryId=" + categoryId
      );
    }
    if (search !== null && categoryId === null) {
      return apiClient.get("/products?title=" + search);
    }
    if (search === null && categoryId !== null) {
      return apiClient.get("/products?categoryId=" + categoryId);
    }
    return apiClient.get("/products");
  },

  getProductById(id) {
    return apiClient.get(`/products/${id}`);
  },

  addProduct(body) {
    return apiClient.post(`/products`, body);
  },

  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`);
  },

  updateProduct(id, body) {
    return apiClient.put(`/products/${id}`, body);
  },

  // Users
  fetchUsers() {
    return apiClient.get(`/users`);
  },

  fetchUserById(id) {
    return apiClient.get(`/users/${id}`);
  },

  addUser(body) {
    return apiClient.post(`/users`, body);
  },

  // Categories
  fetchCategories() {
    return apiClient.get(`/categories`);
  },
};
