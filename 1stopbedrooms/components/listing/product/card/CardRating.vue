<template>
  <div class="rating">
    <div class="stars">
      <span v-for="star in fullStars" :key="star" class="star full">★</span>
      <span v-if="hasHalfStar" class="star half">★</span>
    </div>
    <span class="number">({{ number }})</span>
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
  position: relative;
  padding-top: 5px;
}

.stars {
  display: flex;
}

.star {
  font-size: 24px;
  color: #ffc107;
  position: relative;
}

.star.half {
  display: inline-block;
  overflow: hidden;
  width: 12px;
}

.number {
  font-size: 14px;
  color: #333;
  background: white;
  padding-left: 5px;
}
</style>
