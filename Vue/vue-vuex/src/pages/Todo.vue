<template>
  <div class="todo-app">
    <div class="header">Todo App with VueX</div>

    <div class="actions">
      <button @click="openAddModal">Add</button>
    </div>

    <table class="todo-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in $store.state.todos" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.completed ? "Completed" : "Pending" }}</td>
          <td class="table-button">
            <button @click="deleteTodo(index)">Delete</button>
            <button @click="openUpdateModal(index)">Update</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ModalVue 
      :status="isModal" 
      :title="currentTitle" 
      :completed="currentCompleted" 
      :isUpdate="isUpdate" 
      @close="closeModal" 
      @add="addTodo" 
      @update="updateTodo" 
    />
  </div>
</template>

<script>
import ModalVue from "@/components/Modal.vue";

export default {
  name: "TodoVue",
  components: {
    ModalVue,
  },
  data() {
    return {
      isModal: false,
      isUpdate: false,
      currentIndex: null,
      currentTitle: "",
      currentCompleted: false,
    };
  },
  methods: {
    openAddModal() {
      this.isUpdate = false;
      this.currentTitle = "";
      this.currentCompleted = false;
      this.isModal = true;
    },
    openUpdateModal(index) {
      this.isUpdate = true;
      this.currentIndex = index;
      const todo = this.$store.state.todos[index];
      this.currentTitle = todo.title;
      this.currentCompleted = todo.completed;
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
    },
    addTodo(data) {
      this.$store.commit("addTodo", data);
    },
    updateTodo(data) {
      this.$store.commit("updateTodo", { index: this.currentIndex, data });
    },
    deleteTodo(index) {
      let response = confirm("Are you sure you want to delete?");
      if (response) {
        this.$store.commit("deleteTodo", index);
      }
    },
  },
};
</script>

<style scoped>
.todo-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.actions {
  text-align: right;
  margin-bottom: 10px;
}

.actions button {
  background-color: #4685c9;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.actions button:hover {
  background-color: #0056b3;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
}

.todo-table th,
.todo-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.todo-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.todo-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.todo-table tr:hover {
  background-color: #f1f1f1;
}

.todo-table button {
  background-color: #4685c9;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.todo-table button:hover {
  background-color: #0056b3;
}

.todo-table button:nth-child(2) {
  background-color: #218e96;
}

.todo-table button:todo1nth-child(2):hover {
  background-color: #1e7b7b;
}

.table-button {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
