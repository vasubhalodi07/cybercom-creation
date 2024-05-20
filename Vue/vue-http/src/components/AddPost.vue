<template>
  <div>
    <form @submit.prevent="addPost()">
      <input type="text" v-model="formData.title" />
      <input type="text" v-model="formData.body" />
      <input type="submit" value="Add Post" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddPost",
  data() {
    return {
      formData: {
        title: "",
        body: "",
        userId: 1,
      },
    };
  },
  methods: {
    addPost() {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", this.formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
