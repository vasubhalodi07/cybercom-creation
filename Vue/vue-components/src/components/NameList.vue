<template>
  <div>
    <div v-for="name in names" v-bind:key="name.firstName">
      <slot
        v-bind:firstName="name.firstName"
        v-bind:lastName="name.lastName"
      ></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NameListComponent",
  data() {
    return {
      names: [
        {
          firstName: "Bruce",
          lastName: "Wayne",
        },
        {
          firstName: "Clark",
          lastName: "Kent",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
