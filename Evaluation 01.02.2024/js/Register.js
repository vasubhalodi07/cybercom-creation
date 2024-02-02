$(document).ready(function () {
  $("#registerForm").validate({
    rules: {
      txtName: { required: true },
      txtEmail: { required: true },
      password: { required: true },
      confirmPassword: { required: true },
      selectCity: { required: true },
      selectState: { required: true },
      checkboxTerm: { required: true },
    },
    messages: {
      txtName: { required: "name is required" },
      txtEmail: { required: "email is required" },
      password: { required: "password is required" },
      confirmPassword: { required: "confirm password must not be empty" },
      selectCity: { required: "city is required" },
      selectState: { required: "state is required" },
      checkboxTerm: { required: "please allow a terms of condition" },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      addRegisterRecord(formData);
    },
  });

  const addRegisterRecord = (formData) => {
    const fetchUsers = JSON.parse(localStorage.getItem("users")) || [];
    const users = {
      id: new Date(),
      name: formData.find((field) => field.name === "txtName").value,
      email: formData.find((field) => field.name === "txtEmail").value,
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
