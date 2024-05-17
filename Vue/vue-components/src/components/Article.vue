<template>
  <div>
    <div>Article</div>
    <div v-bind="$attrs">{{ title }}</div>
    <div>{{ numOfLikes }}</div>
    <div>{{ isPublished ? "Yes" : "No" }}</div>
  </div>
</template>

<script>
export default {
  name: "ArticleComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    numOfLikes: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },

  // avoid the non-prop attribute
  inheritAttrs: false,
};
</script>

<style scoped></style>
