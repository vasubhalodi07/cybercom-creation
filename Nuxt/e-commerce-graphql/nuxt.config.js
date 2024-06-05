export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "e-commerce-graphql",
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
  ],

  // Apollo module configuration: https://github.com/nuxt-community/apollo-module
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "https://api.escuelajs.co/graphql",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isServer }) {
      if (!isServer) {
        config.node = {
          fs: "empty",
        };
      }
    },
  },
};

// apollo: {
//     products: {
//         query: GET_PRODUCTS,
//         loadingKey: 'productLoading',
//         variables() {
//             const variables = { title: this.searchQuery };
//             if (this.categoryId !== '' && !isNaN(parseFloat(this.categoryId))) {
//                 variables.categoryId = parseFloat(this.categoryId);
//             }
//             return variables;
//         },
//         error(error) {
//             this.error = error;
//         },
//     },
// },

// Apollo
// Apollo Context: $apollo
// Apollo Client: apolloClient
