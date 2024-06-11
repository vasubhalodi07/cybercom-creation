import { USER_LOGIN } from "~/graphql/mutations/auth";
import { USER_PROFILE } from "~/graphql/queries/auth";

export const state = () => ({
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  user: {
    data: null,
    loading: false,
  },
});

export const mutations = {
  SET_ACCESS_TOKEN(state, access_token) {
    state.access_token = access_token;
    state.isLoggedIn = !!access_token;
  },
  SET_REFRESH_TOKEN(state, refresh_token) {
    state.refresh_token = refresh_token;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },

  SET_USER(state, user) {
    state.user.data = user;
  },
  SET_USER_LOADING(state, loading) {
    state.user.loading = loading;
  },

  LOGOUT(state) {
    state.access_token = null;
    state.refresh_token = null;
    state.isLoggedIn = false;
    state.user.data = null;
  },
};

export const actions = {
  nuxtServerInit({ commit, dispatch }, { app }) {
    const access_token = app.$cookies.get("access_token");
    const refresh_token = app.$cookies.get("refresh_token");
    const user = app.$cookies.get("user");

    if (access_token) {
      commit("SET_ACCESS_TOKEN", access_token);
    }
    if (refresh_token) {
      commit("SET_REFRESH_TOKEN", refresh_token);
    }
    if (user) {
      commit("SET_USER", user);
    } else if (access_token && !user) {
      return dispatch("userProfile", { token: access_token, app });
    }
  },

  async login({ commit, dispatch }, { email, password, app }) {
    commit("SET_LOADING", true);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.mutate({
        mutation: USER_LOGIN,
        variables: {
          email: email,
          password: password,
        },
      });

      let access_token = data.login.access_token;
      let refresh_token = data.login.refresh_token;
      commit("SET_ACCESS_TOKEN", access_token);
      commit("SET_REFRESH_TOKEN", refresh_token);
      dispatch("setCookieToken", {
        data: access_token,
        tokenName: "access_token",
        app,
      });
      dispatch("setCookieToken", {
        data: refresh_token,
        tokenName: "refresh_token",
        app,
      });
    } catch (error) {
      console.log(error);
      commit("SET_ERROR", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async userProfile({ commit, dispatch }, { token, app }) {
    commit("SET_USER_LOADING", true);
    try {
      const client = this.app.apolloProvider.defaultClient;
      const { data } = await client.query({
        query: USER_PROFILE,
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      console.log(data);
      
      commit("SET_USER", data.myProfile);
      dispatch("setCookieUser", { user: data.myProfile, app });
    } catch (err) {
      console.log(err);
    } finally {
      commit("SET_USER_LOADING", false);
    }
  },

  setCookieToken({ commit }, { data, tokenName, app }) {
    app.$cookies.set(tokenName, data, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  },

  setCookieUser({ commit }, { user, app }) {
    app.$cookies.set("user", JSON.stringify(user), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  },

  async userLogout({ commit, dispatch }, app) {
    commit("LOGOUT");
    dispatch("clearCookies", app);
  },

  clearCookies({ commit }, app) {
    app.$cookies.remove("access_token");
    app.$cookies.remove("refresh_token");
    app.$cookies.remove("user");
  },
};

export const getters = {};
