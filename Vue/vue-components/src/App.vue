<template>
  <div>
    <GreetComponent text="Coders!" />
    <GreetComponent text="Vue JS!" />
    <div>Dynamic Props</div>
    <GreetComponent v-bind:text="name" />

    <br />
    <ArticleComponent
      title="First Article"
      :numOfLikes="10"
      :isPublished="true"
    />
  </div>
</template>

<script>
import GreetComponent from "./components/Greet.vue";
import ArticleComponent from "./components/Article.vue";

export default {
  name: "App",
  components: {
    GreetComponent,
    ArticleComponent,
  },
  data() {
    return {
      name: "Vasu Bhalodi",
    };
  },
};
</script>
