$(document).ready(function () {
  const LOCALSTORAGE_USERS = "users";

  $("#register").validate({
    rules: {
      textName: { required: true },
      email: { required: true },
      password: { required: true, minlength: 6 },
      selectType: { required: true },
    },
    message: {
      textName: { required: "name is requied" },
      email: { required: "email is required" },
      password: {
        required: "password is required",
        minlength: "password must be at least 6 characters",
      },
      selectType: { required: "type is requied" },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form)
        .serializeArray()
        .map((field) => ({ ...field, value: field.value.trim() }));
      console.log(formData);
      Register(formData);
    },
  });

  function Register(data) {
    const fetchUsers =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_USERS)) || [];

    const name = data.find((field) => field.name === "textName").value;
    const email = data.find((field) => field.name === "email").value;
    const existEmail = fetchUsers.find((user) => user.email === email);
    if (existEmail) {
      showToast("email already exists!", "error");
      return;
    }

    const password = data.find((field) => field.name === "password").value;
    const type = data.find((field) => field.name === "selectType").value;

    const users = {
      id: new Date(),
      name: name,
      email: email,
      password: password,
      type: type,
    };

    const mergeUsers = [...fetchUsers, users];
    localStorage.setItem(LOCALSTORAGE_USERS, JSON.stringify(mergeUsers));
    showToast("register successfully!", "success");
  }
});
