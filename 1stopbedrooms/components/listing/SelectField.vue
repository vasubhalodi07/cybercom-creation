<template>
    <div class="select-field">
      <label :for="fieldId" class="select-label">{{ label }}</label>
      <select :id="fieldId" v-model="selectedValue" @change="emitChange">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: "SelectField",
    props: {
      value: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        default: "",
      },
      fieldId: {
        type: String,
        default: "select-field",
      },
    },
    data() {
      return {
        selectedValue: this.value,
      };
    },
    methods: {
      emitChange() {
        this.$emit("change", this.selectedValue);
      },
    },
    watch: {
      value(newValue) {
        this.selectedValue = newValue;
      },
    },
  };
  </script>
  
  <style scoped>
  .select-field {
    display: flex;
    flex-direction: column;
  }
  
  .select-label {
    margin-bottom: 5px;
  }
  
  select {
    padding: 10px;
  }
  </style>
  