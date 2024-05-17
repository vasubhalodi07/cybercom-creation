<template>
  <div>
    <!-- <GreetComponent text="Coders!" />
    <GreetComponent text="Vue JS!" />
    <div>Dynamic Props</div>
    <GreetComponent v-bind:text="name" />

    <br />
    <ArticleComponent
      id="my-article"
      class="my-article"
      title="First Article"
      :numOfLikes="10"
      :isPublished="true"
    /> -->

    <!-- <h4>App Component Username: {{ username }}</h4>
    <ComponentC /> -->

    <!-- Popup: Child to parent communication with component events -->
    <button v-on:click="showPopup = true">Show Popup</button>
    <Popup v-show="showPopup" v-on:close="showPopup = false" />
  </div>
</template>

<script>
// import GreetComponent from "./components/Greet.vue";
// import ArticleComponent from "./components/Article.vue";
// import ComponentC from "./components/ComponentC.vue";
import Popup from "./components/Popup.vue";

export default {
  name: "App",
  data() {
    return {
      name: "Vasu Bhalodi",
      username: "Vasu",
      showPopup: false,
    };
  },

  //if the properties provide as object if data is to be
  // used in same component then specify provide as function
  // then return the objects
  provide() {
    return {
      username: this.username,
    };
  },
  components: {
    // ComponentC,
    // GreetComponent,
    // ArticleComponent,
    Popup,
  },
};
</script>
