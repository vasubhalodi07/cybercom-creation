const LOCALSTORAGE = {
  todos: "todos",
};
const SESSIONSTORAGE = {
  id: "id",
};
var isUpdateMode = false;

// Add and Update
const title = document.getElementById("title");
const dueDate = document.getElementById("date");
const priority = document.getElementById("priority");
const createBtn = document.getElementById("create-btn");
createBtn.addEventListener("click", () => {
  if (!isUpdateMode) {
    const status = AddTodo();
    if (status) {
      console.log("todo created!");
    } else {
      console.log("something went wrong!");
      return;
    }
  } else {
    const status = UpdateTodo();
    if (status) {
      console.log("todo updated!");
      isUpdateMode = false;
    } else {
      console.log("something went wrong!");
      return;
    }
  }

  clearFields();
  loadTodo();
});

function AddTodo() {
  const fetchTodo = JSON.parse(localStorage.getItem(LOCALSTORAGE.todos)) || [];
  const newTodo = {
    id: new Date().getTime(),
    title: title.value,
    dueDate: dueDate.value,
    priority: priority.checked,
  };
  const mergeTodo = [...fetchTodo, newTodo];
  localStorage.setItem(LOCALSTORAGE.todos, JSON.stringify(mergeTodo));
  return true;
}

function UpdateTodo() {
  const fetchTodo = JSON.parse(localStorage.getItem(LOCALSTORAGE.todos)) || [];
  const fetchId = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE.id));
  const fetchIndex = fetchTodo.findIndex((item) => item.id === fetchId);

  fetchTodo[fetchIndex].title = title.value;
  fetchTodo[fetchIndex].dueDate = dueDate.value;
  fetchTodo[fetchIndex].priority = priority.checked;

  localStorage.setItem(LOCALSTORAGE.todos, JSON.stringify(fetchTodo));
  return true;
}

function clearFields() {
  title.value = "";
  dueDate.value = "";
  priority.checked = false;
  modal.style.display = "none";
}

// Load Todo List
const todoList = document.getElementById("todoList");
loadTodo();
function loadTodo() {
  todoList.innerHTML = "";
  const fetchTodos = JSON.parse(localStorage.getItem(LOCALSTORAGE.todos)) || [];
  if (!fetchTodos.length) {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
        <div class='center'>todo not found!</div>
    `;
    todoList.appendChild(createDiv);
    return;
  }

  fetchTodos.forEach((element) => {
    const createDiv = document.createElement("div");
    createDiv.className = "task";
    createDiv.innerHTML = `
        <input type="checkbox" id="complete-task" />
        <div class="task-details">
            <div class="task-title">${element.title}</div>
            <div class="due-date">${element.dueDate}</div>
        </div>
        <div class="task-actions">
            <button class="delete-btn" onclick='deleteTodo(${element.id})'><i class="fas fa-trash"></i></button>
            <button class="edit-btn" onclick='openUpdateModal(${element.id})'><i class="fas fa-edit"></i></button>
        </div>
    `;

    todoList.appendChild(createDiv);
  });
}

// Delete Todo
function deleteTodo(id) {
  const fetchTodos = JSON.parse(localStorage.getItem(LOCALSTORAGE.todos)) || [];
  if (!fetchTodos.length) {
    console.log("todos not found!");
    return;
  }
  const filterRecord = fetchTodos.filter((record) => {
    return record.id !== id;
  });
  localStorage.setItem(LOCALSTORAGE.todos, JSON.stringify(filterRecord));
  loadTodo();
}

// Open Update Modal
function openUpdateModal(id) {
  const fetchTodos = JSON.parse(localStorage.getItem(LOCALSTORAGE.todos)) || [];
  const findTodo = fetchTodos.find((item) => item.id === id);
  modal.style.display = "block";

  isUpdateMode = true;
  title.value = findTodo.title;
  dueDate.value = findTodo.dueDate;
  priority.checked = findTodo.priority;
  document.getElementById("modal-title").innerHTML = "Update Todo";
  document.getElementById("create-btn").innerHTML = "Update";
  sessionStorage.setItem(SESSIONSTORAGE.id, JSON.stringify(findTodo.id));
}

// Handle Modal Event
var modal = document.getElementById("myModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
openModal.onclick = function () {
  modal.style.display = "block";
};
closeModal.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
