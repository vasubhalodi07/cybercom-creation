<template>
  <div class="discount-tag">
    <img class="icon" src="@/static/DiscountSVG.svg" alt="Discount Icon" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "DiscountTag",
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style scoped>
.discount-tag {
  background-color: #e0e7ff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.8rem;
  font-weight: bold;
  width: fit-content;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 4px;
}
</style>
