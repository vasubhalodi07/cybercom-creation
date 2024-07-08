<template>
  <div class="image-container">
    <img
      :src="currentImage?.src"
      :alt="currentImage?.alt || 'Image'"
      @error="imageError = true"
      v-show="!imageError"
    />
    <ImageTag :item="item" />
    <div v-if="imageError" class="placeholder">No Image Available</div>
  </div>
</template>

<script>
import ImageTag from "~/components/listing/product/tag/ImageTag.vue";

export default {
  name: "CardImage",
  components: {
    ImageTag,
  },
  props: {
    item: Object,
    isHovered: Boolean,
  },
  data() {
    return {
      imageError: false,
    };
  },
  computed: {
    currentImage() {
      if (this.isHovered && this.item.images.hoverImage?.src) {
        return this.item.images.hoverImage;
      }
      return (
        this.item.images.mainImage || { src: "", alt: "No Image Available" }
      );
    },
  },
  watch: {
    isHovered() {
      this.imageError = false;
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
  color: #888;
}
</style>
