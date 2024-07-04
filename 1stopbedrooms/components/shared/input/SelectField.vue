<template>
  <div class="select-field">
    <label :for="fieldId" class="select-label">{{ label }}</label>
    <select
      :id="fieldId"
      v-model="selectedValue"
      @change="emitChange"
      class="styled-select"
    >
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
  margin-bottom: 20px;
}

.select-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.styled-select {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
}

.styled-select:focus {
  border-color: #0f249a;
}

.styled-select option {
  font-size: 16px;
}
</style>
