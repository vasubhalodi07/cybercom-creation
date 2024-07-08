<template>
  <div class="container">
    <img src="@/static/july_tag_label.png" alt="july_tag_label" />
    <p>July 4th Deal</p>
  </div>
</template>

<script>
export default {
  name: "SalesTag",
};
</script>

<style scoped>
.container {
  background-color: #d21714;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: bold;
  width: fit-content;
}
p {
  padding: 0px 6px;
}
</style>
