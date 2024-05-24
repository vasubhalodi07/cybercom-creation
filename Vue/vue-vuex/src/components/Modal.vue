<template>
  <div v-if="status" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <div>{{ isUpdate ? "Update Todo" : "Add Todo" }}</div>
        <button @click="cancel" class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <FormInputVue type="text" placeholder="Title" v-model="localTitle" />
        <FormCheckboxVue
          label="Select Completed Status"
          v-model="localCompleted"
        />
      </div>
      <div class="modal-footer">
        <button @click="submit">{{ isUpdate ? "Update" : "Add" }}</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import FormCheckboxVue from "./FormCheckbox.vue";
import FormInputVue from "./FormInput.vue";

export default {
  name: "ModalVue",
  components: {
    FormInputVue,
    FormCheckboxVue,
  },
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localTitle: this.title,
      localCompleted: this.completed,
    };
  },
  watch: {
    title(newVal) {
      this.localTitle = newVal;
    },
    completed(newVal) {
      this.localCompleted = newVal;
    },
  },
  methods: {
    submit() {
      const data = {
        title: this.localTitle,
        completed: this.localCompleted,
      };
      if (this.isUpdate) {
        this.$emit("update", data);
      } else {
        this.$emit("add", data);
      }
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.modal-header div {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-button {
  border: none;
  font-size: 24px;
  cursor: pointer;
  background-color: transparent;
  color: #363434;
}

.modal-body {
  flex: 1;
  padding: 10px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.modal-footer button:nth-child(1) {
  background-color: rgb(86, 139, 207);
}

.modal-footer button:nth-child(2) {
  background-color: rgb(219, 80, 80);
}

button {
  color: white;
  padding: 8px 10px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
