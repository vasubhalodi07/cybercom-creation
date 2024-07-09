<template>
  <div class="text">
    <div>{{ dynamicAttribute.count }} {{ dynamicAttribute.label }}</div>
  </div>
</template>

<script>
export default {
  name: "LAYOUT_TEXT",
  props: {
    dynamicAttribute: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.text {
  padding: 10px 0px;
}
</style>
