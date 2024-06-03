<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 product-page">
      <div class="flex justify-between mb-8">
        <div>
          <input type="type" placeholder="Search..." v-model="searchQuery"
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
          <select id="category" v-model="categoryId"
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option v-if="categories.loading"></option>
            <option value="">Select Category</option>
            <option v-for="(category, index) in categories.data" :key="index" :value="category.id">{{ category.name
              }}</option>
          </select>
        </div>
      </div>

      <div v-if="products.loading">
        <Loader />
      </div>
      <div v-else-if="!products.data.length">
        product not found!
      </div>
      <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <ProductCard v-for="product in products.data" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      categoryId: ''
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  watch: {
    searchQuery(newValue) {
      this.fetchProducts();
    },
    categoryId(newValue) {
      this.fetchProducts();
    }
  },
  computed: {
    products() {
      return this.$store.getters.getProductState;
    },
    categories() {
      return this.$store.getters.getCategoriesState;
    }
  },
  methods: {
    async fetchProducts() {
      this.$store.dispatch('fetchProducts', {
        title: this.searchQuery,
        category: this.categoryId
      });
    },
    async fetchCategories() {
      this.$store.dispatch('fetchCategories');
    }
  }
};
</script>

<style scoped>
.product-page {
  padding-top: 50px;
}
</style>
