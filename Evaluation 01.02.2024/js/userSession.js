var LOCALSTORAGE = {
  session: "session",
  users: "users",
};

function loadUsers() {
  const session = JSON.parse(localStorage.getItem(LOCALSTORAGE.session));
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let count = 0;
  session.map((element) => {
    if (!element.is_admin) count += 1;
  });

  if (!count) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan='3'>no record found!</td>`;
    tableBody.appendChild(row);
  }

  session.map((element) => {
    if (!element.is_admin) {
      const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE.users));
      const findRecord = fetchUsers.find((user) => user.id === element.id);

      let splitDateTime = element.loginDatetTime.split("T");
      let splitTime = splitDateTime[1].split(".");
      const mergeDateTime = splitDateTime[0] + " " + splitTime[0];

      let splitLogoutDateTime = element.logoutDateTime.split("T");
      let splitLogoutTime = splitLogoutDateTime[1].split(".");
      const mergeLogout = splitDateTime[0] + " " + splitLogoutTime[0];

      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${findRecord.name}</td>
              <td class='session-date'>${mergeDateTime}</td>
              <td class='session-date'>${mergeLogout}</td>
            `;
      tableBody.appendChild(row);
    }
  });
}

loadUsers();
