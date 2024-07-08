<template>
  <div class="select-field">
    <div class="select-wrapper">
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

.select-wrapper {
  position: relative;
  display: inline-block;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
}

.select-label {
  position: absolute;
  top: 5px;
  left: 10px;
  background: #fff;
  font-size: 12px;
  color: #888;
}

.styled-select {
  width: 100%;
  font-size: 16px;
  padding-top: 12px;
  border: none;
  background-color: transparent;
  color: #333;
  outline: none;
  appearance: none;
}

.styled-select:focus {
  border-color: #0f249a;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 10px;
  pointer-events: none;
  transform: translateY(-50%);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #000;
}
</style>
