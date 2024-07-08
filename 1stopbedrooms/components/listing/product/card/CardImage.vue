<template>
  <div class="image-container">
    <img
      :src="currentImage.src"
      :alt="currentImage.alt"
      @load="imageLoaded = true"
      v-show="imageLoaded"
    />
    <div v-if="!imageLoaded" class="placeholder">Loading...</div>
  </div>
</template>

<script>
export default {
  name: "CardImage",
  props: {
    item: Object,
    isHovered: Boolean,
  },
  data() {
    return {
      imageLoaded: false,
    };
  },
  computed: {
    currentImage() {
      console.log(this.isHovered);
      return this.isHovered
        ? this.item.images.hoverImage
        : this.item.images.mainImage;
    },
  },
};
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 300px;
  background-color: #f2f3f3;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.placeholder {
  position: absolute;
  font-size: 18px;
}
</style>
