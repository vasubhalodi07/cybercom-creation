<template>
  <div
    class="card"
    @mouseenter="hoverImage(item.id)"
    @mouseleave="unhoverImage"
  >
    <CardImage :item="displayItem" :isHovered="isHovered" />
    <CardDetails
      :item="item"
      :displayItem="displayItem"
      :isHovered="isHovered"
      @hoverProduct="handleThumbnailHover"
    />
  </div>
</template>

<script>
import CardImage from "~/components/listing/product/card/CardImage.vue";
import CardDetails from "~/components/listing/product/card/CardDetails.vue";

export default {
  name: "CardItem",
  components: {
    CardImage,
    CardDetails,
  },
  data() {
    return {
      hoveredItemId: 0,
      displayItem: this.item,
      isHovered: false,
    };
  },
  props: {
    item: Object,
  },
  methods: {
    hoverImage(id) {
      this.hoveredItemId = id;
      this.isHovered = true;
    },
    unhoverImage() {
      this.isHovered = false;
    },
    handleThumbnailHover(webId) {
      const hoveredProduct = this.item.items.find(
        (item) => item.webId == webId
      );
      if (hoveredProduct) {
        this.displayItem = hoveredProduct;
      }
    },
  },
};
</script>

<style scoped>
.card {
  overflow: hidden;
  text-align: center;
}
</style>
