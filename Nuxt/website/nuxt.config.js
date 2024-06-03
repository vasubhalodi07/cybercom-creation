export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "website",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  loading: {
    color: "#fefffe",
    height: "1.5px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/auth-next", "@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: "https://api.escuelajs.co/api/v1/",
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "access_token",
          global: true,
          required: true,
          type: "Bearer",
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: "auth/login", method: "post" },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "auth/profile", method: "get" },
        },
      },
    },
    debug: true,
  },
};
