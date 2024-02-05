var formState = false;
const LOCALSTORAGE = {
  users: "users",
};

function loadUsers() {
  const fetchNormalUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE.users));
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let count = 0;
  fetchNormalUsers.map((element) => {
    if (!element.is_admin) count += 1;
  });

  if (!count) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan='6'>no record found!</td>`;
    tableBody.appendChild(row);
  }

  fetchNormalUsers.map((element) => {
    if (!element.is_admin) {
      var userDate = new Date(element.date);
      let month_diff = Date.now() - userDate.getTime();
      let age_diff = new Date(month_diff);
      let year = age_diff.getUTCFullYear();
      let age = Math.abs(year - 1970);

      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${element.name}</td>
              <td>${element.email}</td>
              <td>${element.password}</td>
              <td>${element.date}</td>
              <td>${age}</td>
              <td>
                <button onclick=loadRecordToField('${element.id}')>Edit</button>
                <button onclick=deleteRecord('${element.id}')>Delete</button>              
              </td>
            `;
      tableBody.appendChild(row);
    }
  });
}

loadUsers();

const userForm = document.getElementById("userForm");
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const status = addUpdateRecord();
  if (status) {
    userForm.reset();
  }
});

const addUpdateRecord = () => {
  const name = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;
  const date = document.querySelector("input[type='date']").value;

  if (!name || !email || !password || !date) {
    alert("All fields are required!");
    return false;
  }

  if (formState) {
    const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE.users));
    const updateId = JSON.parse(sessionStorage.getItem("id"));
    const findUser = fetchUsers.findIndex((user) => user.id === updateId);

    if (findUser) {
      fetchUsers[findUser] = {
        ...fetchUsers[findUser],
        name: name,
        email: email,
        password: password,
        date: date,
      };
      localStorage.setItem(LOCALSTORAGE.users, JSON.stringify(fetchUsers));
      sessionStorage.removeItem("id");
    }
    formState = false;
  } else {
    const newUser = {
      id: new Date(),
      name: name,
      email: email,
      password: password,
      date: date,
      is_admin: false,
    };
    const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE.users));
    const addRecord = [...fetchUsers, newUser];
    localStorage.setItem(LOCALSTORAGE.users, JSON.stringify(addRecord));
  }

  loadUsers();
  return true;
};

const deleteRecord = (id) => {
  let fetchUsers = localStorage.getItem(LOCALSTORAGE.users)
    ? JSON.parse(localStorage.getItem(LOCALSTORAGE.users))
    : [];

  if (fetchUsers) {
    const indexOfUser = fetchUsers.findIndex((user) => user.id === id);
    if (indexOfUser >= 0) {
      fetchUsers.splice(indexOfUser, 1);
      localStorage.setItem(LOCALSTORAGE.users, JSON.stringify(fetchUsers));
    }
  }
  loadUsers();
};

function loadRecordToField(id) {
  const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE.users));
  const findRecord = fetchUsers.find((user) => user.id === id);

  document.querySelector("input[type='text']").value = findRecord.name;
  document.querySelector("input[type='email']").value = findRecord.email;
  document.querySelector("input[type='password']").value = findRecord.password;
  document.querySelector("input[type='date']").value = findRecord.date;

  document.getElementById("form-title").innerHTML = "Update User";
  document.getElementById("form-button").value = "Update User";

  sessionStorage.setItem("id", JSON.stringify(id));
  formState = true;
}
