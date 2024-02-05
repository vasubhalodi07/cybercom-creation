function loadUsers() {
  const session = localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session"))
    : null;
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  if (!session.length) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan='3'>no record found!</td>`;
    tableBody.appendChild(row);
    return;
  }

  session.map((element) => {
    const fetchUsers = JSON.parse(localStorage.getItem("users"));
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
  });
}

loadUsers();
