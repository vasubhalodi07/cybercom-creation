import { GET_PRODUCTS } from "~/graphql/queries/product";

export const state = () => ({
  carts: [],
  loading: false,
  error: null,
});

export const mutations = {
  SET_CARTS(state, carts) {
    state.carts = carts;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },

  removeCartByIndex(state, data) {
    state.carts.splice(data, 1);
  },
};

export const actions = {
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
        return "update";
      }

      cart.push(body);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("product added into cart!");
      return "add";
    } catch (err) {
      alert("facing issue in adding product into cart!");
    }
  },

  async fetchCarts({ commit }, id) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.query({
        query: GET_PRODUCTS,
      });
      let cart = JSON.parse(localStorage.getItem("cart"));

      const cartInfo = cart
        .map((cartItem) => {
          if (cartItem.user_id == id) {
            const product = data.products.find(
              (product) => product.id == cartItem.product_id
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

      commit("SET_CARTS", cartInfo);
      commit("SET_LOADING", false);
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
};

export const getters = {
  calculateTotalPrice: (state) => {
    return state.carts.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  },
};
