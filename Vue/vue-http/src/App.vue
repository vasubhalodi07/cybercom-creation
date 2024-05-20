<template>
  <div>
    <AddPost />
    <FetchPost />
    <TemplateRef />
  </div>
</template>

<script>
import FetchPost from "./components/FetchPost.vue";
import AddPost from "./components/AddPost.vue";
import TemplateRef from "./components/TemplateRef.vue";

export default {
  name: "App",
  components: {
    FetchPost,
    AddPost,
    TemplateRef,
  },
};
</script>

<style></style>
