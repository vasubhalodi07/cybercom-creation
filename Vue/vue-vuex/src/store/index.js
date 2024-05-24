import { createStore } from "vuex";

const store = createStore({
  state: {
    todos: [
      {
        id: 1,
        title: "Learn Vuex",
        completed: false,
      },
      {
        id: 2,
        title: "Build something awesome",
        completed: true,
      },
    ],
  },
  mutations: {
    addTodo(state, data) {
      state.todos.push({
        id: state.todos.length + 1,
        title: data.title,
        completed: data.completed,
      });
    },
    deleteTodo(state, index) {
      state.todos.splice(index, 1);
    },
    updateTodo(state, { index, data }) {
      state.todos[index] = {
        ...state.todos[index],
        ...data,
      };
    },
  },
  actions: {},
  modules: {},
  getters: {},
});

export default store;
