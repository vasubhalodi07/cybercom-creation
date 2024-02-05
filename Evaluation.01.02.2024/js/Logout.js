document.getElementById("logout").addEventListener("click", function (e) {
  const fetchUsers = JSON.parse(localStorage.getItem("users"));
  const id = localStorage.getItem("id");

  const fetchRecord = fetchUsers.find((user) => user.id === id);
  if (!fetchRecord.is_admin) {
    const session = JSON.parse(localStorage.getItem("session"));
    const findRecordIndex = session.findIndex((item) => item.id === id);
    if (findRecordIndex !== -1) {
      session[findRecordIndex].logoutDateTime = new Date();
      localStorage.setItem("session", JSON.stringify(session));
    }
  }

  localStorage.removeItem("admin");
  localStorage.removeItem("id");
  window.location.href = "./Login.html";
});

const adminName = document.getElementById("admin-name");
const fetchUsers = JSON.parse(localStorage.getItem("users"));
const id = localStorage.getItem("id");

fetchUsers.forEach((element) => {
  if (element.id == id) {
    adminName.innerHTML = `Hello, ${element.name}`;
    return;
  }
});
