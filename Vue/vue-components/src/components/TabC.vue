<template>
  <div>
    <div>Tab C Component</div>
    <input type="text" v-model="name" />
  </div>
</template>

<script>
export default {
  name: "TabC",
  data() {
    return {
      name: "",
    };
  },
};
</script>

<style scoped></style>
