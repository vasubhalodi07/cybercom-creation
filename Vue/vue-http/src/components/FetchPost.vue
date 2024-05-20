<template>
  <div>
    <!-- <button @click="fetchPosts">Load Posts</button> -->

    <div class="load-posts" v-for="post in posts" :key="post.id">
      {{ post.id }} {{ post.title }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FetchPost",
  created() {
    this.fetchPosts();
  },
  data() {
    return {
      posts: [],
      errorMessage: "",
    };
  },
  methods: {
    fetchPosts() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          console.log(res.data);
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = "error in fetching posts";
        });
    },
  },
};
</script>

<style scoped></style>
