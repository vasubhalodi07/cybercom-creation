<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/product">Product</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
// eslint-disable-next-line vue/multi-word-component-names

export default {
  name: "App",
};
</script>

<style>
nav {
  display: flex;
  gap: 20px;
}
</style>
