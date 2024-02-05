$(document).ready(function () {
  const LOCALSTORAGE = {
    users: "users",
  };

  $("#registerForm").validate({
    rules: {
      txtName: { required: true },
      email: { required: true },
      password: { required: true },
      confirmPassword: { required: true, equalTo: "#password" },
      selectCity: { required: true },
      selectState: { required: true },
      checkboxTerm: { required: true },
    },
    messages: {
      txtName: { required: "name is required" },
      email: { required: "email is required" },
      password: { required: "password is required" },
      confirmPassword: {
        required: "Confirm password must not be empty",
        equalTo: "Passwords do not match",
      },
      selectCity: { required: "city is required" },
      selectState: { required: "state is required" },
      checkboxTerm: { required: "please allow a terms of condition" },
    },

    errorPlacement: function (error, element) {
      if (element.attr("name") === "checkboxTerm") {
        error.css({ color: "red", fontSize: "12px" });
        error.insertAfter(element.closest("div"));
      } else {
        error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
        error.insertAfter(element);
      }
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      addRegisterRecord(formData);
    },
  });

  const addRegisterRecord = (formData) => {
    const fetchUsers = JSON.parse(localStorage.getItem("users")) || [];

    const email = formData.find((field) => field.name === "email").value;
    const existEmail = fetchUsers.find((user) => user.email === email);
    if (existEmail) {
      alert("email already exists");
      return;
    }

    const users = {
      id: new Date(),
      name: formData.find((field) => field.name === "txtName").value,
      email: formData.find((field) => field.name === "email").value,
      password: formData.find((field) => field.name === "password").value,
      city: formData.find((field) => field.name === "selectCity").value,
      state: formData.find((field) => field.name === "selectState").value,
      term: formData.find((field) => field.name === "checkboxTerm").value,
      is_admin: true,
    };

    const addUser = [...fetchUsers, users];
    localStorage.setItem("users", JSON.stringify(addUser));
    window.location.href = "./Login.html";
  };
});
