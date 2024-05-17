<template>
  <div>
    <h2>This is the popup</h2>
    <input type="text" v-model="name" />
    <button v-on:click="$emit('close', name)">Close Popup</button>
  </div>
</template>

<script>
export default {
  name: "Popup",
  // emits: ["close"],
  emits: {
    close: (name) => {
      if (!name) {
        return false;
      }
      return true;
    },
  },
  data() {
    return {
      name: "",
    };
  },
};
</script>

<style scoped></style>
