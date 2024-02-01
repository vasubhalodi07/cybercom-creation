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

  const adminUser = {
    adminId: 1,
    email: "admin@gmail.com",
    password: "admin1234",
    is_admin: true,
  };

  const Login = (formData) => {
    const fetchUsers = JSON.parse(localStorage.getItem("users"));
    const email = formData.find((field) => field.name === "email").value;
    const password = formData.find((field) => field.name === "password").value;

    if (
      email === adminUser.email &&
      password === adminUser.password &&
      adminUser.is_admin
    ) {
      console.log("admin login");
      localStorage.setItem("admin", true);
      localStorage.setItem("id", adminUser.adminId);
      window.location.href = "./Dashboard.html";
    } else {
      fetchUsers.map((item, index) => {
        if (
          item.email === email &&
          item.password === password &&
          !item.is_admin
        ) {
          console.log("user login");
          localStorage.setItem("admin", false);
          localStorage.setItem("id", item.id);
          window.location.href = "./Dashboard.html";
        }
      });
    }
  };
});
