<template>
  <div>
    <div>Component F</div>
    <div>Passing data from App to ComponentF: {{ username }}</div>
  </div>
</template>

<script>
export default {
  name: "Component",
  inject: ["username"],
};
</script>

<style scoped></style>
