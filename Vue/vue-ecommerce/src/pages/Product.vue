<template>
  <div class="product-page">
    <div v-if="this.$store.state.productList.loading" class="loader-container">
      <div class="loader"></div>
    </div>
    <div v-else class="product-grid">
      <ProductCard
        v-for="product in this.$store.state.productList.products"
        :key="product.id"
        :title="product.title"
        :image="product.images[0]"
        :price="product.price"
        :id="product.id"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Product",
  components: {
    ProductCard,
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style scoped>
.product-page {
  padding: 30px 100px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
