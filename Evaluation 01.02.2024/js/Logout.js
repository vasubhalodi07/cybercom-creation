document.getElementById("logout").addEventListener("click", function (e) {
  const session = JSON.parse(localStorage.getItem("session"));
  const id = localStorage.getItem("id");

  const findRecordIndex = session.findIndex((item) => item.id === id);
  if (findRecordIndex !== -1) {
    session[findRecordIndex].logoutDateTime = new Date();
    localStorage.setItem("session", JSON.stringify(session));
  }

  localStorage.removeItem("admin");
  localStorage.removeItem("id");
  window.location.href = "./Login.html";
});

const adminName = document.getElementById("admin-name");
const fetchUsers = JSON.parse(localStorage.getItem("users"));
const fetchId = localStorage.getItem("id");

fetchUsers.forEach((element) => {
  if (element.id == fetchId) {
    adminName.innerHTML = `Hello, ${element.name}`;
    return;
  }
});
