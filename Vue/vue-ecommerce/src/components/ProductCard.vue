<template>
  <div
    class="product-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="navigateToProductDetail(id)"
  >
    <div :class="{ 'product-image-container': true, elevated: isHovered }">
      <img
        :src="imageSrc"
        :alt="title"
        class="product-image"
        @error="onImageError"
      />
    </div>
    <div class="product-details">
      <h2 class="product-title">{{ title }}</h2>
      <p class="product-price">$ {{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
      imageSrc: this.image,
    };
  },
  methods: {
    navigateToProductDetail(id) {
      this.$router.push({
        name: "ProductDetail",
        params: { id },
      });
    },
    onImageError() {
      this.imageSrc =
        "https://img.freepik.com/free-photo/wooden-product-display-podium-with-blurred-nature-leaves-background-generative-ai_91128-2268.jpg";
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product-image-container {
  transition: transform 0.3s ease;
}

.product-image-container.elevated {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-details {
  padding: 16px;
}

.product-title {
  font-size: 1em;
  margin-bottom: 8px;
}

.product-price {
  font-size: 1em;
  color: #3b55c9;
  margin-bottom: 8px;
}
</style>
