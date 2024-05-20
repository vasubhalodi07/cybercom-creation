<template>
  <div>
    <div>Product Detail Dynamic Routing</div>
    <div>{{ productId }}</div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "ProductDetails",
  data() {
    const route = useRoute();

    return {
      productId: route.params.id,
    };
  },
};
</script>

<style scoped></style>
