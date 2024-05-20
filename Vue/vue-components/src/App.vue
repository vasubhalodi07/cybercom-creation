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
    <!-- <button v-on:click="showPopup = true">Show Popup</button> -->
    <!-- <Popup v-show="showPopup" v-on:close="showPopup = false" /> -->
    <!-- <Popup v-show="showPopup" v-on:close="closePopup" /> -->
    <!-- <CardComponent></CardComponent>
    <CardComponent>
      <h5>Card Title</h5>
      <p>Card Body</p>
    </CardComponent>
    <CardComponent>
      <img
        src="https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg"
        alt=""
      />
    </CardComponent> -->

    <!-- Slot with names -->
    <!-- <CardComponent>
      <template v-slot:header>
        <h3>Header</h3>
      </template>
      <template v-slot:default>
        <div>Default</div>
        <div>V Slot</div>
      </template>
      <template v-slot:footer>
        <button>Show More...</button>
      </template>
    </CardComponent> -->

    <!-- Slot with props -->
    <!-- <NameListComponent>
      <template v-slot:default="slotProps">
        {{ slotProps.firstName }} {{ slotProps.lastName }}
      </template>
    </NameListComponent>

    <NameListComponent>
      <template v-slot:default="slotProps">
        {{ slotProps.lastName }}
      </template>
    </NameListComponent> -->

    <!-- Component Global and Scope Styling -->
    <!-- <h4>App Component Style</h4>
    <ChildStyleComponent /> -->

    <!-- Tabwise Showing Dynamic Component -->
    <button v-on:click="activeTab = 'TabA'">TabA</button>
    <button v-on:click="activeTab = 'TabB'">TabB</button>
    <button v-on:click="activeTab = 'TabC'">TabC</button>

    <keep-alive>
      <component :is="activeTab" />
    </keep-alive>

    <!-- <TabAComponent v-if="activeTab == 'TabA'" />
    <TabBComponent v-if="activeTab == 'TabB'" />
    <TabCComponent v-if="activeTab == 'TabC'" /> -->
  </div>
</template>

<script>
// import GreetComponent from "./components/Greet.vue";
// import ArticleComponent from "./components/Article.vue";
// import ComponentC from "./components/ComponentC.vue";
// import Popup from "./components/Popup.vue";
// import CardComponent from "./components/Card.vue";
// import NameListComponent from "./components/NameList.vue";
// import ChildStyleComponent from "./components/ChildStyle.vue";
import TabA from "./components/TabA.vue";
import TabB from "./components/TabB.vue";
import TabC from "./components/TabC.vue";

export default {
  name: "App",
  data() {
    return {
      name: "Vasu Bhalodi",
      username: "Vasu",
      showPopup: false,

      activeTab: "TabA",
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
    // Popup,
    // CardComponent,
    // NameListComponent,
    // ChildStyleComponent,
    TabA,
    TabB,
    TabC,
  },
  // methods: {
  //   closePopup(name) {
  //     this.showPopup = false;
  //     console.log(name);
  //   },
  // },
};
</script>

<style>
h4 {
  color: blue;
}
</style>
