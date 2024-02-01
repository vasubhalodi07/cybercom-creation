document.addEventListener("DOMContentLoaded", function () {
  const fetchUser = JSON.parse(localStorage.getItem("users"));
  const container = {
    under18: 0,
    limit18_50: 0,
    more50: 0,
  };

  const birthdateList = [];
  fetchUser.forEach((element) => {
    if (!element.is_admin) {
      var userDate = new Date(element.datetime);
      let month_diff = Date.now() - userDate.getTime();
      let age_diff = new Date(month_diff);
      let year = age_diff.getUTCFullYear();
      let age = Math.abs(year - 1970);

      if (age < 18) {
        container.under18 += 1;
      } else if (age > 18 && age < 50) {
        container.limit18_50 += 1;
      } else if (age > 50) {
        container.more50 += 1;
      }

      const currentDate = new Date();
      const userdate = new Date(element.datetime);
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const usermonth = userdate.getMonth() + 1;
      const userday = userdate.getDate();
      if (month === usermonth && day === userday) {
        birthdateList.push(element.name);
      }
    }
  });

  for (let i = 0; i < birthdateList.length; i++) {
    const adminBirthdate = document.getElementById("admin-birthday");
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `Today is '${birthdateList[i]}' Birthday`;
    adminBirthdate.appendChild(createDiv);
  }

  const under18 = document.getElementById("under18");
  const limit18_50 = document.getElementById("limit18-50");
  const more50 = document.getElementById("more50");
  under18.innerHTML = container.under18;
  limit18_50.innerHTML = container.limit18_50;
  more50.innerHTML = container.more50;

  const adminDashboard = document.getElementById("adminDashboard");
  const userDashboard = document.getElementById("userDashboard");
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (admin) {
    adminDashboard.style.display = "block";
  }
  if (!admin) {
    const route = document.getElementsByClassName("admin-route");
    for (let i = 0; i < route.length; i++) {
      route[i].style.display = "none";
    }
    userDashboard.style.display = "block";
  }
});
