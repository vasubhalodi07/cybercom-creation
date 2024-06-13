<template>
  <div>
    <div class="bg-blue-100 text-center py-20">
      <h1 class="text-4xl text-black font-bold mb-4">Welcome to Our Store</h1>
      <p class="text-lg mb-6">Discover the best products at unbeatable prices</p>
      <button class="bg-blue-200 font-semibold py-2 px-4 rounded-md">
        <NuxtLink to="/product">Shop Now</NuxtLink>
      </button>
    </div>

    <div class="bg-gray-100 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Highest-Rated Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in highestRatedProducts" :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden">
            <img :src="product.image" alt="Product Image" class="w-full h-40 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-700">{{ product.name }}</h3>
              <div class="flex items-center mt-2">
                <span class="text-gray-900 font-medium">${{ product.price.toFixed(2) }}</span>
                <span class="ml-auto text-gray-500 text-sm">{{ product.rating }} ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      highestRatedProducts: [
        {
          id: 1,
          name: 'Top Product 1',
          price: 99.99,
          rating: 5.0,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Top Product 2',
          price: 89.99,
          rating: 4.9,
          image: 'https://via.placeholder.com/150',
        },
      ],
    }
  },
  created() {
    if (this.isLoggedIn && !this.user.data) {
      this.fetchUsers();
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      user: state => state.user,
      loading: state => state.user.loading
    })
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch("userProfile", {
        token: this.$store.state.access_token,
        app: this.$nuxt
      })
    }
  }
}
</script>
