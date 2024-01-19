var yearSelect = document.getElementById("year");
var currentYear = new Date().getFullYear();
for (var i = currentYear; i >= 1900; i--) {
  var option = document.createElement("option");
  option.value = "" + i;
  option.text = i;
  yearSelect.add(option);
}

var daySelect = document.getElementById("day");
for (var i = 1; i <= 31; i++) {
  var dayOption = document.createElement("option");
  dayOption.value = "" + i;
  dayOption.text = i;
  daySelect.add(dayOption);
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    form.submit();
  }
});

function validateForm() {
  var inputs = document.querySelectorAll("input[required], select[required]");
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      alert("Please fill in all required fields.");
      return false;
    }
  }

  if (!passwordValidate()) {
    alert("Password validation failed");
    return false;
  }

  if (!passwordVerification()) {
    alert("Password verification failed");
    return false;
  }

  return true;
}

function passwordValidate() {
  var password = document.getElementById("pwd").value;
  var passwordMessage = document.getElementById("pass-message");
  if (
    password.length < 8 ||
    !/\d/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password)
  ) {
    passwordMessage.innerHTML = "(Min 8 characters, 1 number, case-sensitive)";
    passwordMessage.style.color = "red";
    return false;
  } else {
    passwordMessage.innerHTML = "(Password strength is good)";
    passwordMessage.style.color = "green";
    return true;
  }
}

function passwordVerification() {
  var password = document.getElementById("pwd").value;
  var rePassword = document.getElementById("re-pass").value;
  var rePasswordMessage = document.getElementById("recheck");
  if (password !== rePassword) {
    rePasswordMessage.innerHTML = "(Passwords do not match)";
    rePasswordMessage.style.color = "red";
    return false;
  } else {
    rePasswordMessage.innerHTML = "(Passwords matched)";
    rePasswordMessage.style.color = "green";
    return true;
  }
}

document.getElementById("pwd").onchange = function () {
  passwordValidate();
};
document.getElementById("re-pass").onchange = function () {
  passwordVerification();
};

form.addEventListener("reset", function (event) {
  event.preventDefault();
  var inputs = document.querySelectorAll("input[required], select[required]");
  inputs.forEach(function (input) {
    input.value = "";
  });
  document.getElementById("recheck").innerHTML = "";
});
