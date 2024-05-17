<template>
  <div>
    <div class="product-grid">
      <div
        class="product-details"
        v-for="product in products"
        v-bind:key="product.id"
      >
        <div>#{{ product.id }}</div>
        <div>{{ product.name }}</div>
        <div>{{ product.price }}</div>
        <div v-on:click="deleteProduct(product.id)">delete</div>
        <div @click="updateProduct(product.id)">edit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FetchProduct",
  data() {
    return {};
  },
  props: ["products"],
  methods: {
    deleteProduct(id) {
      this.$emit("delete-product", id);
    },
    updateProduct(id) {
      this.$emit("update-product", id);
    },
  },
};
</script>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px;
}

.product-details {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
