import { createStore } from "vuex";
import Service from "../services/api";

const store = createStore({
  state: {
    user: {
      id: localStorage.getItem("id") || null,
      name: localStorage.getItem("name") || null,
      role: localStorage.getItem("role") || null,
    },
    auth: {
      loading: false,
    },
    productList: {
      products: [],
      loading: false,
    },
    productDetail: {
      product: {},
      loading: false,
      imageSrc: null,
    },
    categoriesList: {
      categories: [],
      loading: false,
    },
    cart: {
      items: [],
      loading: false,
    },
  },
  mutations: {
    // Login
    setUser(state, data) {
      state.user.id = data.id;
      state.user.role = data.role;
      state.user.name = data.name;
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
    },
    logout(state) {
      state.user.id = null;
      state.user.role = null;
      state.user.name = null;
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
    },
    setAuthLoading(state, loading) {
      state.auth.loading = loading;
    },

    // Products
    setProducts(state, products) {
      state.productList.products = products;
    },
    setProductsLoading(state, loading) {
      state.productList.loading = loading;
    },
    addProduct(state, product) {
      state.productList.products.push(product);
    },
    setProductDetail(state, product) {
      state.productDetail.product = product;
    },
    setProductDetailLoading(state, loading) {
      state.productDetail.loading = loading;
    },
    setProductImage(state, imageSrc) {
      state.productDetail.imageSrc = imageSrc;
    },

    // Categories
    setCategories(state, categories) {
      state.categoriesList.categories = categories;
    },
    setCategoriesLoading(state, loading) {
      state.categoriesList.loading = loading;
    },

    // Cart
    setCartItems(state, items) {
      state.cart.items = items;
      localStorage.setItem("cart", JSON.stringify(items));
    },
    setCartLoading(state, loading) {
      state.cart.loading = loading;
    },
  },
  actions: {
    // Products
    async fetchProducts({ commit }) {
      commit("setProductsLoading", true);
      try {
        const res = await Service.getProducts(null, null);
        commit("setProducts", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        commit("setProductsLoading", false);
      }
    },
    async fetchProductById({ commit }, id) {
      commit("setProductDetailLoading", true);
      try {
        const res = await Service.getProductById(id);
        commit("setProductDetail", res.data);
        commit("setProductImage", res.data.images[0]);
      } catch (err) {
        console.error(err);
      } finally {
        commit("setProductDetailLoading", false);
      }
    },
    async addProduct({ commit }, body) {
      commit("setProductsLoading", true);
      try {
        const res = await Service.addProduct(body);
        commit("addProduct", res.data);
        alert("Product added successfully!");
      } catch (err) {
        console.error(err);
      } finally {
        commit("setProductsLoading", false);
      }
    },
    async deleteProduct({ dispatch }, id) {
      try {
        await Service.deleteProduct(id);
        dispatch("fetchProducts");
      } catch (err) {
        console.error(err);
      }
    },
    async updateProduct({ dispatch }, { id, updatedData }) {
      try {
        await Service.updateProduct(id, updatedData);
        dispatch("fetchProductById", id);
      } catch (err) {
        console.error(err);
      }
    },
    async addToCart({ state, commit }, product_id) {
      const user_id = state.user.id;
      if (!user_id && !product_id) {
        alert("Having issue in adding a product into cart!");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      let itemIndex = cart.findIndex(
        (item) => item.product_id == product_id && item.user_id == user_id
      );

      if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
        alert("Cart updated!");
      } else {
        const newItem = {
          cart_id: new Date().toISOString(),
          quantity: 1,
          user_id: user_id,
          product_id: product_id,
        };
        cart.push(newItem);
        alert("Cart Created!");
      }
      commit("setCartItems", cart);
    },

    // Cart
    async fetchCart({ commit, state }) {
      commit("setCartLoading", true);
      const id = state.user.id;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      try {
        const res = await Service.getProducts(null, null);
        const items = cart
          .map((cartItem) => {
            const product = res.data.find(
              (p) => p.id == cartItem.product_id && cartItem.user_id == id
            );

            if (product) {
              return {
                ...product,
                cart_id: cartItem.cart_id,
                quantity: cartItem.quantity,
                imageSrc: product.images[0],
              };
            }
            return null;
          })
          .filter((item) => item !== null);
        commit("setCartItems", items);
      } catch (err) {
        console.error(err);
      } finally {
        commit("setCartLoading", false);
      }
    },
    async removeCart({ dispatch }, cart_id) {
      let response = confirm("Are you sure you want to remove this cart?");
      if (response) {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart = cart.filter((item) => item.cart_id !== cart_id);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch("fetchCart");
      }
    },

    // Categories
    async fetchCategories({ commit }) {
      commit("setCategoriesLoading", true);
      try {
        const res = await Service.fetchCategories();
        commit("setCategories", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        commit("setCategoriesLoading", false);
      }
    },

    // Authentication
    async login({ commit }, { body, router }) {
      commit("setAuthLoading", true);
      try {
        const res = await Service.fetchUsers();
        const checkAuth = res.data.find(
          (record) =>
            record.email === body.email && record.password === body.password
        );
        if (checkAuth) {
          const data = {
            id: checkAuth.id,
            role: checkAuth.role,
            name: checkAuth.name,
          };
          commit("setUser", data);
          router.push({ name: "Home" });
        }
      } catch (err) {
        console.error(err);
      } finally {
        commit("setAuthLoading", false);
      }
    },

    async register({ commit }, { body, router }) {
      commit("setAuthLoading", true);
      try {
        await Service.addUser(body);
        alert("User registered successfully!");
        router.push({ name: "Login" });
      } catch (err) {
        console.error(err);
      } finally {
        commit("setAuthLoading", false);
      }
    },
  },
  modules: {},
  getters: {
    productDetail: (state) => state.productDetail.product,
    productDetailLoading: (state) => state.productDetail.loading,
    productImage: (state) => state.productDetail.imageSrc,
    cartItems: (state) => state.cart.items,
    cartLoading: (state) => state.cart.loading,
  },
});

export default store;
