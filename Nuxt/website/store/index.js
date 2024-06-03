const state = () => ({
  products: {
    loading: false,
    data: [],
  },
  productById: {
    loading: false,
    data: {},
  },
  cart: {
    loading: false,
    data: [],
  },
  categories: {
    loading: false,
    data: [],
  },
  loading: false,
});

const mutations = {
  setProductData(state, data) {
    state.products.data = data;
  },
  setProductLoading(state, data) {
    state.products.loading = data;
  },

  setProductByIdData(state, data) {
    state.productById.data = data;
  },
  setProductByIdLoading(state, data) {
    state.productById.loading = data;
  },

  setCartData(state, data) {
    state.cart.data = data;
  },
  setCartLoading(state, data) {
    state.cart.loading = data;
  },

  removeCartByIndex(state, data) {
    state.cart.data.splice(data, 1);
  },

  setCategoriesData(state, data) {
    state.categories.data = data;
  },
  setCategoriesLoading(state, data) {
    state.categories.loading = data;
  },

  setLoading(state, data) {
    state.loading = data;
  },
};

const actions = {
  // products
  async fetchProducts({ commit }, requestData) {
    commit("setProductLoading", true);

    let url = "https://api.escuelajs.co/api/v1/products";
    if (requestData.title) {
      url = `https://api.escuelajs.co/api/v1/products?title=${requestData.title}`;
    } else if (requestData.category) {
      url = `https://api.escuelajs.co/api/v1/products?categoryId=${requestData.category}`;
    } else if (requestData.title && requestData.category) {
      url = `https://api.escuelajs.co/api/v1/products?title=${requestData.title}&categoryId=${requestData.category}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const responseData = await response.json();
    commit("setProductData", responseData);
    commit("setProductLoading", false);
  },

  async fetchProductById({ commit }, id) {
    commit("setProductByIdLoading", true);
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    commit("setProductByIdData", data);
    commit("setProductByIdLoading", false);
  },

  async deleteProduct({ commit }, id) {
    commit("setLoading", true);
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    commit("removeCartByIndex", id);
    commit("setLoading", false);
  },

  // cart
  async addToCartWithLocalStorage({ commit }, body) {
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let cartExist = cart.findIndex(
        (item) =>
          item.user_id == body.user_id && item.product_id == body.product_id
      );

      if (cartExist !== -1) {
        cart[cartExist].quantity = cart[cartExist].quantity + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("cart updated!");
        return;
      }

      cart.push(body);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("product added into cart!");
    } catch (err) {
      alert("facing issue in adding product into cart!");
    }
  },

  async fetchCarts({ commit }, id) {
    commit("setCartLoading", true);
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    let cart = JSON.parse(localStorage.getItem("cart"));

    const cartInfo = cart
      .map((cartItem) => {
        if (cartItem.user_id == id) {
          const product = data.find(
            (product) => product.id === cartItem.product_id
          );
          if (product) {
            return {
              ...cartItem,
              product: product,
            };
          }
          return null;
        }
      })
      .filter(Boolean);

    commit("setCartData", cartInfo);
    commit("setCartLoading", false);
  },

  removeCart({ commit }, index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    commit("removeCartByIndex", index);
  },

  // categories
  async fetchCategories({ commit }) {
    commit("setCategoriesLoading", true);
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    commit("setCategoriesData", data);
    commit("setCategoriesLoading", false);
  },
};

const getters = {
  getProductState: (state) => {
    return state.products;
  },
  getProductByIdState: (state) => {
    return state.productById;
  },

  getCartState: (state) => {
    return state.cart;
  },

  getCategoriesState: (state) => {
    return state.categories;
  },

  getLoading: (state) => {
    return state.loading;
  },

  calculateTotalPrice: (state) => {
    console.log(state.cart.data);
    return state.cart.data.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
