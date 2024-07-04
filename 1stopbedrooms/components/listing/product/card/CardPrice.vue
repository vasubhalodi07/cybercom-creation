<template>
  <div class="product-price">
    ${{ price.finalPrice }}
    <span v-if="price.msrp">${{ price.msrp }}</span>
  </div>
</template>

<script>
export default {
  name: "CardPrice",
  props: {
    price: Object,
  },
};
</script>

<style scoped>
.product-price {
  font-size: 20px;
  font-weight: 800;
  padding-top: 5px;
}

.product-price span {
  font-size: 15px;
  font-weight: 500;
  color: #464545;
  text-decoration: line-through;
}
</style>
