<template>
  <div class="rating">
    <span v-for="star in fullStars" :key="star" class="star full">★</span>
    <span v-if="hasHalfStar" class="star half">★</span> ({{ number }})
  </div>
</template>

<script>
export default {
  name: "CardRating",
  props: {
    rating: Number,
    number: Number,
  },
  computed: {
    fullStars() {
      return Math.floor(this.rating / 20);
    },
    hasHalfStar() {
      return this.rating % 20 >= 10;
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  padding-top: 5px;
}

.star {
  font-size: 24px;
  color: #ffc107;
}

.star.half {
  position: relative;
  display: inline-block;
  overflow: hidden;
  color: #ffc107;
  width: 7px;
}
</style>
