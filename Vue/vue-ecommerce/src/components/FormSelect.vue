<template>
  <div>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">{{ defaultValue }}</option>
      <option v-if="categoriesLoading" value="" disabled>Loading...</option>
      <option
        v-else
        v-for="(category, index) in categories"
        v-bind:key="index"
        v-bind:value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    defaultValue: {
      type: String,
      default: "All",
    },
    categoriesLoading: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #333;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  outline: none;
}

select.loading {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

option {
  color: #333;
}

option:disabled {
  color: #999;
}
</style>
