$(document).ready(function () {
  const LOCALSTORAGE_USERS = "users";
  const LOCALSTORAGE_LOGIN_ID = "login_id";

  $("#login").validate({
    rules: {
      email: { required: true },
      password: { required: true, minlength: 6 },
    },
    message: {
      email: { required: "email is required" },
      password: {
        required: "password is required",
        minlength: "password must be at least 6 characters",
      },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      Login(formData);
    },
  });

  function Login(data) {
    const fetchUsers =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_USERS)) || [];

    const email = data.find((field) => field.name === "email").value;
    const password = data.find((field) => field.name === "password").value;

    fetchUsers.map((user) => {
      if (user.email === email && user.password === password) {
        localStorage.setItem(LOCALSTORAGE_LOGIN_ID, JSON.stringify(user.id));
        window.location.href = "./dashboard.html";
      }
    });
  }
});
