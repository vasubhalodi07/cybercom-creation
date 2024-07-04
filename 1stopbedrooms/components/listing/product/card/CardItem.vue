<template>
  <div
    class="card"
    @mouseenter="hoverImage(item.id)"
    @mouseleave="unhoverImage"
  >
    <CardImage :item="item" :hoveredItemId="hoveredItemId" />
    <CardDetails :item="item" :hoveredItemId="hoveredItemId" />
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
    };
  },
  props: {
    item: Object,
  },
  methods: {
    hoverImage(id) {
      this.hoveredItemId = parseInt(id);
    },
    unhoverImage() {
      this.hoveredItemId = 0;
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
