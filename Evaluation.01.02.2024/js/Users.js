var formState = false;
function loadUsers() {
  const fetchNormalUsers = JSON.parse(localStorage.getItem("users"));
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let count = 0;
  fetchNormalUsers.map((element) => {
    if (!element.is_admin) count += 1;
  });

  if (!count) {
    const row = document.createElement("tr");
    row.innerHTML = `<td class='message' colspan='6'>no record found!</td>`;
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

  const fetchUsers = JSON.parse(localStorage.getItem("users"));
  if (formState) {
    const updateId = JSON.parse(sessionStorage.getItem("id"));
    const findUser = fetchUsers.findIndex((user) => user.id === updateId);

    const existEmail = fetchUsers.find(
      (user) => user.email === email && user.id !== updateId
    );
    if (existEmail) {
      alert("email already exists");
      return;
    }

    if (findUser) {
      fetchUsers[findUser] = {
        ...fetchUsers[findUser],
        name: name,
        email: email,
        password: password,
        date: date,
      };
      localStorage.setItem("users", JSON.stringify(fetchUsers));
      sessionStorage.removeItem("id");
    }

    document.getElementById("form-title").innerHTML = "Add User";
    document.getElementById("form-button").value = "Add User";
    formState = false;
  } else {
    const existEmail = fetchUsers.find((user) => user.email === email);
    if (existEmail) {
      alert("email already exists");
      return;
    }

    const newUser = {
      id: new Date(),
      name: name,
      email: email,
      password: password,
      date: date,
      is_admin: false,
    };
    const addRecord = [...fetchUsers, newUser];
    localStorage.setItem("users", JSON.stringify(addRecord));
  }

  loadUsers();
  return true;
};

const deleteRecord = (id) => {
  let fetchUsers = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  let fetchSessions = JSON.parse(localStorage.getItem("session"));

  if (fetchUsers) {
    const indexOfUser = fetchUsers.findIndex((user) => user.id === id);
    if (indexOfUser >= 0) {
      fetchUsers.splice(indexOfUser, 1);
      localStorage.setItem("users", JSON.stringify(fetchUsers));
    }
    const indexOfSession = fetchSessions.findIndex(
      (element) => element.id === id
    );
    if (indexOfSession >= 0) {
      fetchSessions.splice(indexOfSession, 1);
      localStorage.setItem("session", JSON.stringify(fetchSessions));
    }
  }
  loadUsers();
};

function loadRecordToField(id) {
  const fetchUsers = JSON.parse(localStorage.getItem("users"));
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
