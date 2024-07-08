<template>
  <div class="navbar">
    <NuxtLink to="/">
      <div>
        <img src="../../static/logo-white.svg" alt="1stopbadroom" />
      </div>
    </NuxtLink>
    <NuxtLink to="/">Departments</NuxtLink>
  </div>
</template>

<script>
export default {
  name: "Topbar",
};
</script>

<style scoped>
.navbar {
  height: 8vh;
  padding: 0 20px;
  background-color: #0e259a;
  display: flex;
  align-items: center;
}
.navbar a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin: 0px 20px;
}
</style>
