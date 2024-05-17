<template>
  <input
    v-bind:value="modelValue"
    v-on:input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "InputComponent",
  // when we use v-model with custom input where
  // modelValue is automatic pass the modelValue props.
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
input {
  padding: 8px;
}
</style>
