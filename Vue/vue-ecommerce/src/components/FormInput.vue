<template>
  <div class="form-input">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
}

.form-input label {
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 1em;
  color: #555;
}

.form-input input {
  padding: 12px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}
</style>
