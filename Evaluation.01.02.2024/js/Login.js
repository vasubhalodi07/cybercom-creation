$(document).ready(function () {
  const LOCALSTORAGE = {
    users: "users",
  };

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

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      Login(formData);
    },
  });

  const Login = (formData) => {
    const fetchUsers = localStorage.getItem(LOCALSTORAGE.users)
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE.users))
      : [];

    const email = formData.find((field) => field.name === "email").value;
    const password = formData.find((field) => field.name === "password").value;

    let isAuthenticated = false;
    if (fetchUsers) {
      fetchUsers.forEach((element) => {
        if (element.email === email && element.password === password) {
          isAuthenticated = true;
          localStorage.setItem("id", element.id);
          localStorage.setItem("admin", element.is_admin);

          if (!element.is_admin) {
            const session = localStorage.getItem("session")
              ? JSON.parse(localStorage.getItem("session"))
              : [];

            const findRecordIndex = session.findIndex(
              (record) => record.id === element.id
            );

            if (findRecordIndex !== -1) {
              session[findRecordIndex].loginDatetTime = new Date();
              localStorage.setItem("session", JSON.stringify(session));
            } else {
              const userSession = {
                id: element.id,
                loginDatetTime: new Date(),
                logoutDateTime: null,
              };
              session.push(userSession);
              localStorage.setItem("session", JSON.stringify(session));
            }
          }
          window.location.href = "./Dashboard.html";
        }
      });

      if (!isAuthenticated) {
        alert("Authentication failed. please check your email and password");
      }
    } else {
      alert("no user found. please register user first");
    }
  };
});
