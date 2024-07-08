<template>
  <div class="thumbnail-container">
    <div
      v-for="(item, index) of dynamicAttribute.items"
      :key="index"
      class="thumbnail-item"
      @mouseenter="hoverProduct(item.webId)"
    >
      <img :src="item.image" :alt="item.image" class="thumbnail-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "THUMBNAIL",
  props: {
    dynamicAttribute: {
      type: Object,
      required: true,
    },
  },
  methods: {
    hoverProduct(webId) {
      this.$emit("hoverProduct", webId);
    },
  },
};
</script>

<style scoped>
.thumbnail-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.thumbnail-item {
  padding: 10px 0px 3px 0px;
}

.thumbnail-image {
  width: 40px;
  height: auto;
  border-radius: 5px;
  transition: border 0.3s;
}

.thumbnail-image:hover {
  border: 2px solid darkblue;
}
</style>
