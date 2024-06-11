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
  // product
  setProductData(state, data) {
    state.products.data = data;
  },
  setProductLoading(state, data) {
    state.products.loading = data;
  },

  // productById
  setProductByIdData(state, data) {
    state.productById.data = data;
  },
  setProductByIdLoading(state, data) {
    state.productById.loading = data;
  },

  // cart
  setCartData(state, data) {
    state.cart.data = data;
  },
  setCartLoading(state, data) {
    state.cart.loading = data;
  },
  removeCartByIndex(state, data) {
    state.cart.data.splice(data, 1);
  },

  // Categories
  setCategoriesData(state, data) {
    state.categories.data = data;
  },
  setCategoriesLoading(state, data) {
    state.categories.loading = data;
  },

  // Model Loading
  setLoading(state, data) {
    state.loading = data;
  },
};

const actions = {
  // products
  async fetchProducts({ commit }, requestData) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  },

  async fetchProductById({ commit }, id) {
    try {
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
    } catch (err) {
      console.log(err);
      commit("setProductByIdLoading", false);
    }
  },

  async deleteProduct({ commit }, id) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  },

  async updateProduct({ commit }, { id, data }) {
    try {
      commit("setLoading", true);
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
    }
  },

  async createProduct({ commit }, data) {
    try {
      commit("setLoading", true);
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
    }
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
    try {
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
    } catch (err) {
      console.log(err);
    }
  },

  removeCart({ commit }, index) {
    try {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      commit("removeCartByIndex", index);
    } catch (err) {
      console.log(err);
    }
  },

  // categories
  async fetchCategories({ commit }) {
    try {
      commit("setCategoriesLoading", true);
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      commit("setCategoriesData", data);
      commit("setCategoriesLoading", false);
    } catch (err) {
      console.log(err);
    }
  },

  async createCategories({ commit }, data) {
    try {
      console.log(data);
      const data1 = {
        name: data.name,
        image: data.image,
      }

      commit("setLoading", true);
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories",
        {
          method: "POST",
          body: JSON.stringify(data1),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create category");
      }
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
      commit("setLoading", false);
    }
  },

  async deleteCategories({ commit }, id) {
    try {
      commit("setLoading", true);
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
      commit("setLoading", false);
    }
  },

  async editCategories({ commit }, { id, name }) {
    try {
      commit("setLoading", true);
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: name,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit category");
      }
      commit("setLoading", false);
    } catch (err) {
      console.log(err);
      commit("setLoading", false);
    }
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
