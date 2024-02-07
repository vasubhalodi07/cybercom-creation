const LOCALSTORAGE_TODOS = "todos";
const SESSIONSTORAGE_ID = "id";

function fetchLocalStorageTodos() {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_TODOS)) || [];
}
function saveLocalStorageTodos(todo) {
  localStorage.setItem(LOCALSTORAGE_TODOS, JSON.stringify(todo));
}

function fetchSessionStorageId() {
  return JSON.parse(sessionStorage.getItem(SESSIONSTORAGE_ID)) || [];
}
function saveSessionStorageId(id) {
  sessionStorage.setItem(SESSIONSTORAGE_ID, JSON.stringify(id));
}

var isUpdateMode = false;
var selectFilter = null;

const title = document.getElementById("title");
const dueDate = document.getElementById("date");
const priority = document.getElementById("priority");
const createBtn = document.getElementById("create-btn");

const todoList = document.getElementById("todoList");
const filterTodo = document.getElementById("filterTodo");

// Add and Update
createBtn.addEventListener("click", () => {
  if (!title.value || !dueDate.value) {
    showToast("please fill all fields", "error");
    return;
  }

  if (!isUpdateMode) {
    AddTodo();
    showToast("new task created!", "success");
  } else {
    UpdateTodo();
    showToast("task has been updated!", "success");
  }
  clearFields();
  filterTodoList(selectFilter);
});

function AddTodo() {
  const fetchTodo = fetchLocalStorageTodos();
  const newTodo = {
    id: new Date().getTime(),
    title: title.value,
    dueDate: dueDate.value,
    priority: priority.checked,
    complete: false,
  };
  const mergeTodo = [...fetchTodo, newTodo];
  saveLocalStorageTodos(mergeTodo);
  return true;
}

function UpdateTodo() {
  const fetchTodo = fetchLocalStorageTodos();
  const fetchId = fetchSessionStorageId();
  const fetchIndex = fetchTodo.findIndex((item) => item.id === fetchId);

  fetchTodo[fetchIndex].title = title.value;
  fetchTodo[fetchIndex].dueDate = dueDate.value;
  fetchTodo[fetchIndex].priority = priority.checked;

  saveLocalStorageTodos(fetchTodo);
  return true;
}

function clearFields() {
  title.value = "";
  dueDate.value = "";
  priority.checked = false;
  modal.style.display = "none";
  document.getElementById("modal-title").innerHTML = "Create Todo";
  document.getElementById("create-btn").innerHTML = "Create";
}

// Load Todo List
filterTodo.addEventListener("change", (e) => {
  filterTodoList(e.target.value);
});

filterTodoList(null);
function filterTodoList(value) {
  todoList.innerHTML = "";
  selectFilter = value;
  const fetchTodos = fetchLocalStorageTodos();

  if (!fetchTodos.length) {
    showToast("no record available in storage", "warning");
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
        <div class='center'>no record available in storage!</div>
    `;
    todoList.appendChild(createDiv);
    return;
  }

  let filterRecord = {};

  switch (value) {
    case "Pending":
      filterRecord = fetchTodos.filter((todo) => !todo.complete);
      break;
    case "Completed":
      filterRecord = fetchTodos.filter((todo) => todo.complete);
      break;
    case "Past Task":
      const currentDate = new Date();
      filterRecord = fetchTodos.filter((todo) => {
        const dueDate = new Date(todo.dueDate);
        return currentDate > dueDate;
      });
      break;
    case "Priority":
      filterRecord = fetchTodos.filter((todo) => todo.priority);
      break;
    default:
      filterRecord = fetchTodos;
  }

  const sortTodoCompleted = sortTodoList(filterRecord);

  if (!sortTodoCompleted.length) {
    showToast("record not found", "warning");
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
        <div class='center'>todo not found!</div>
    `;
    todoList.appendChild(createDiv);
    return;
  }

  sortTodoCompleted.forEach((todo) => {
    const todoItem = createTodoListElement(todo);
    todoList.appendChild(todoItem);
  });
}

function sortTodoList(todo) {
  return todo.sort((a, b) => {
    return a.complete - b.complete;
  });
}

function createTodoListElement(todo) {
  const createDiv = document.createElement("div");
  createDiv.className = `task ${todo.complete ? "complete-color" : ""}`;
  createDiv.innerHTML += `
      <div class="task-details">
          <div class="task-title">${todo.title}</div>
          <div class="due-date">${todo.dueDate}</div>
      </div>
      <div class="task-actions">
          <button class="complete-btn" onclick='completeTodo(${todo.id})'> ${
    todo.complete
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="far fa-check-circle"></i>'
  } </button>
          <button class="delete-btn" onclick='deleteTodo(${
            todo.id
          })'><i class="fas fa-trash"></i></button>
          <button class="edit-btn" onclick='openUpdateModal(${
            todo.id
          })'><i class="fas fa-edit"></i></button>
      </div>
    `;
  return createDiv;
}

// Complete Todo
function completeTodo(id) {
  const fetchTodos = fetchLocalStorageTodos();
  const todoIndex = fetchTodos.findIndex((todo) => todo.id === id);

  if (todoIndex !== -1) {
    fetchTodos[todoIndex].complete = !fetchTodos[todoIndex].complete;
    saveLocalStorageTodos(fetchTodos);
  }
  filterTodoList(selectFilter);

  if (fetchTodos[todoIndex].complete) {
    showToast("mark as completed!", "success");
  } else {
    showToast("mark as pending task!", "info");
  }
}

// Delete Todo
function deleteTodo(id) {
  const response = confirm("Are you sure you want to delete?");
  if (response) {
    const fetchTodos = fetchLocalStorageTodos();
    if (!fetchTodos.length) return;

    const filterRecord = fetchTodos.filter((record) => {
      return record.id !== id;
    });
    saveLocalStorageTodos(filterRecord);
    filterTodoList(selectFilter);
    showToast("task removed successfully!", "success");
  }
}

// Open Update Modal
function openUpdateModal(id) {
  const fetchTodos = fetchLocalStorageTodos();
  const findTodo = fetchTodos.find((item) => item.id === id);
  modal.style.display = "block";

  isUpdateMode = true;
  title.value = findTodo.title;
  dueDate.value = findTodo.dueDate;
  priority.checked = findTodo.priority;
  document.getElementById("modal-title").innerHTML = "Update Todo";
  document.getElementById("create-btn").innerHTML = "Update";
  saveSessionStorageId(findTodo.id);
}

// Handle Modal Event
var modal = document.getElementById("myModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
openModal.onclick = function () {
  modal.style.display = "block";
};
closeModal.onclick = function () {
  clearFields();
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// toast modal
function showToast(message, type) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.innerHTML = `
    <div class='toast-content'>
      <div class="icon">${getIcon(type)}</div>
      <div>${message}</div>
    </div>  
    <div class="close-btn"><i class="fas fa-times"></i></div>
  `;
  toastContainer.appendChild(toast);

  const closeBtn = toast.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });

  setTimeout(() => {
    toast.remove();
  }, 1500);
}

function getIcon(type) {
  switch (type) {
    case "error":
      return '<i class="fas fa-times-circle"></i>';
    case "warning":
      return '<i class="fas fa-exclamation-triangle"></i>';
    case "success":
      return '<i class="fas fa-check-circle"></i>';
    case "info":
      return '<i class="fas fa-info-circle"></i>';
    default:
      return "";
  }
}
