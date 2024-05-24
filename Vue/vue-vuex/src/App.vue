<template>
  <div>
    <TodoVue />
  </div>
</template>

<script>
import TodoVue from "./pages/Todo.vue";

export default {
  name: "App",
  components: {
    TodoVue,
  },
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: sans-serif;
}
</style>
