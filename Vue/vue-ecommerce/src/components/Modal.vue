<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <div>{{ title }}</div>
        <button class="close-button" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button v-if="showConfirmButton" @click="confirm" :disabled="loading">
          {{ loading ? "Loading..." : "Confirm" }}
        </button>
        <button v-else @click="confirm" :disabled="loading">
          {{ loading ? "Loading..." : "Update" }}
        </button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.modal-header div {
  margin: 0;
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
