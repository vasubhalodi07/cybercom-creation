<template>
  <div>
    <div>Component E</div>
    <ComponentF />
  </div>
</template>

<script>
import ComponentF from "./ComponentF.vue";

export default {
  name: "ComponentE",
  components: {
    ComponentF,
  },
};
</script>

<style scoped></style>
