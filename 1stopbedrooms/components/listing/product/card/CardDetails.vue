<template>
  <div class="details">
    <div class="product-name" :class="{ active: hoveredItemId == item.id }">
      {{ item.name }}
    </div>
    <div v-if="hoveredItemId == item.id" class="web-id">
      web ID: {{ item.webId }}
    </div>
    <div v-else class="product-brand-name">By {{ item.brand.name }}</div>
    <CardPrice :price="item.price" />
    <CardRating
      v-if="item.reviews.rating > 0"
      :rating="item.reviews.rating"
      :number="item.reviews.number"
    />
  </div>
</template>

<script>
import CardPrice from "~/components/listing/product/card/CardPrice.vue";
import CardRating from "~/components/listing/product/card/CardRating.vue";

export default {
  name: "CardDetails",
  components: {
    CardPrice,
    CardRating,
  },
  props: {
    item: Object,
    hoveredItemId: Number,
  },
};
</script>

<style scoped>
.details {
  text-align: left;
}

.product-name {
  font-size: 16px;
  letter-spacing: 1.2px;
  line-height: 20px;
  padding-top: 5px;
}

.product-brand-name {
  font-size: 14px;
  padding: 5px 0px;
}

.web-id {
  padding: 5px 0px;
  font-size: 14px;
}

.active {
  text-decoration: underline;
}
</style>
