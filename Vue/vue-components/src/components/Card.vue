<template>
  <div class="card">
    <slot>Default Card Content</slot>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
};
</script>

<style scoped>
.card {
  padding: 10px;
  border: 1px solid black;
}
</style>
