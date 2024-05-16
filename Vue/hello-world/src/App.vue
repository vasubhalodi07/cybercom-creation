<template>
  <!-- <PracticeComponent></PracticeComponent> -->
  <!-- <formComponent></formComponent> -->
  <ComputedComponent></ComputedComponent>
</template>

<script>
import formComponent from "./components/Form.vue";
import PracticeComponent from "./components/Practice1.vue";
import ComputedComponent from "./components/Computed.vue";

export default {
  components: { ComputedComponent },
  name: "app",
};
</script>

<style></style>
