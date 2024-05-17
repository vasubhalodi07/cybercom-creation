<template>
  <button>{{ title }}</button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    title: String,
  },
};
</script>

<style scoped>
button {
  padding: 8px;
}
</style>
