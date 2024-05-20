<template>
  <div>
    <AddPost />
    <FetchPost />
  </div>
</template>

<script>
import FetchPost from "./components/FetchPost.vue";
import AddPost from "./components/AddPost.vue";

export default {
  name: "App",
  components: {
    FetchPost,
    AddPost,
  },
};
</script>

<style></style>
