<template>
  <div>Hello {{ text }}</div>
</template>

<script>
export default {
  name: "GreetComponent",
  props: {
    text: String,
  },
  // props: ["text"],
};
</script>

<style></style>
