document.getElementById("logout").addEventListener("click", function (e) {
  localStorage.removeItem("admin");
  localStorage.removeItem("id");
  window.location.href = "./Login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const adminName = document.getElementById("admin-name");
  const fetchUsers = JSON.parse(localStorage.getItem("users"));
  const fetchId = localStorage.getItem("id");

  fetchUsers.map((element) => {
    console.log(element.id);
    console.log(fetchId);

    if (element.id == fetchId) {
      adminName.innerHTML = `Hello, ${element.name}`;
    } else {
      adminName.innerHTML = `Hello, Admin`;
    }
  });
});
