<template>
  <div class="card-grid">
    <CardItem v-for="item in products" :key="item.id" :item="item" />
  </div>
</template>

<script>
import CardItem from "~/components/listing/product/card/CardItem.vue";

export default {
  name: "CardGrid",
  components: {
    CardItem,
  },
  props: {
    products: Array,
  },
};
</script>

<style scoped>
.card-grid {
  display: grid;
  gap: 50px 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1199px) and (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 899px) and (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 599px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
