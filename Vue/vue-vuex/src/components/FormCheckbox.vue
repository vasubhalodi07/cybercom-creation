<template>
  <div>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "FormCheckboxVue",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
input {
  margin-right: 10px;
  vertical-align: middle;
  cursor: pointer;
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:checked {
  border: 1px solid #42b983;
  background-color: #42b983;
}

label {
  display: inline-block;
  vertical-align: middle;
}
</style>
