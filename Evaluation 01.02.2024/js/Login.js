$(document).ready(function () {
  $("#register-nav").click(function () {
    window.location.href = "./Registration.html";
  });

  $("#loginForm").validate({
    rules: {
      email: { required: true },
      password: { required: true },
    },
    messages: {
      email: { required: "email is required" },
      password: { required: "password is required" },
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      Login(formData);
    },
  });

  const Login = (formData) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const email = formData.find((field) => field.name === "email").value;
    const password = formData.find((field) => field.name === "password").value;

    if (users) {
      users.map((item) => {
        if (
          item.email === email &&
          item.password === password &&
          item.is_admin
        ) {
          localStorage.setItem("admin", true);
          localStorage.setItem("id", item.id);
          window.location.href = "./Dashboard.html";
        } else if (item.email === email && item.password && !item.is_admin) {
          localStorage.setItem("admin", false);
          localStorage.setItem("id", item.id);
          window.location.href = "./Dashboard.html";
        } else {
          console.log("please check your email and password");
        }
      });
    }
  };
});
