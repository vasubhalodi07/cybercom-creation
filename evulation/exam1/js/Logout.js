document.getElementById("logout").addEventListener("click", function (e) {
  localStorage.removeItem("admin");
  localStorage.removeItem("id");
  window.location.href = "./Login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const adminName = document.getElementById("admin-name");
  const fetchUsers = JSON.parse(localStorage.getItem("users"));
  const fetchId = localStorage.getItem("id");

  fetchUsers.forEach((element) => {
    if (element.id == fetchId) {
      adminName.innerHTML = `Hello, ${element.name}`;
      return;
    }
  });
});
