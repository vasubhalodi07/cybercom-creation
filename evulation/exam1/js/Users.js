$(document).ready(function () {
  $("#userForm").validate({
    rules: {
      txtName: { required: true },
      email: { required: true },
      password: { required: true },
      datetime: { required: true },
    },
    messages: {
      txtName: { required: "name is required" },
      email: { required: "email is required" },
      password: { required: "password is required" },
      datetime: { required: "birthdate is requied" },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      registerNormalUser(formData);
    },
  });

  const registerNormalUser = (formData) => {
    const fetchUsers = JSON.parse(localStorage.getItem("users")) || [];
    const users = {
      id: new Date(),
      name: formData.find((field) => field.name === "txtName").value,
      email: formData.find((field) => field.name === "email").value,
      password: formData.find((field) => field.name === "password").value,
      datetime: formData.find((field) => field.name === "datetime").value,
      is_admin: false,
    };

    const addNormalUser = [...fetchUsers, users];
    localStorage.setItem("users", JSON.stringify(addNormalUser));
    loadNormalUserList();
  };

  loadNormalUserList();

  function loadNormalUserList() {
    const fetchNormalUsers = JSON.parse(localStorage.getItem("users"));
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    let count = 0;
    fetchNormalUsers.map((element) => {
      if (!element.is_admin) {
        count += 1;
      }
    });

    if (!count) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan='6'>no record found!</td>
      `;
      userTableBody.appendChild(row);
    }

    fetchNormalUsers.map((element) => {
      if (!element.is_admin) {
        var userDate = new Date(element.datetime);
        let month_diff = Date.now() - userDate.getTime();
        let age_diff = new Date(month_diff);
        let year = age_diff.getUTCFullYear();
        let age = Math.abs(year - 1970);

        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${element.name}</td>
              <td>${element.email}</td>
              <td>${element.password}</td>
              <td>${element.datetime}</td>
              <td>${age}</td>
              <td>
                  <button>Edit</button>
                  <button id="user-delete" data-id='${element.id}'>Delete</button>
              </td>
            `;
        userTableBody.appendChild(row);
      }
    });
  }

  const productDelete = document.querySelectorAll("#user-delete");
  productDelete.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const fetchUser = JSON.parse(localStorage.getItem("users"));
      const filterRecord = fetchUser.filter((record) => {
        return record.id !== id;
      });
      localStorage.setItem("users", JSON.stringify(filterRecord));
      loadNormalUserList();
    });
  });
});
