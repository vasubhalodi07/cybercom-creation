const LOCALSTORAGE_LOGIN_ID = "login_id";
const LOCALSTORAGE_USERS = "users";
const LOCALSTORAGE_AVAILABILITY = "doctor_availability";
const LOCALSTORAGE_DOCTOR_DETAIL = "doctor_detail";

const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE_USERS)) || [];
const fetchLoginId =
  JSON.parse(localStorage.getItem(LOCALSTORAGE_LOGIN_ID)) || [];

const findRecordById = fetchUsers.find((user) => user.id === fetchLoginId);

function handleLogout() {
  localStorage.removeItem(LOCALSTORAGE_LOGIN_ID);
  window.location.href = "index.html";
}

function hideSectionByUserType() {
  const patientView = document.getElementById("patient-section");
  const doctorView = document.getElementById("doctor-section");

  if (findRecordById.type === "doctor") {
    patientView.style.display = "none";
  } else if (findRecordById.type === "patient") {
    doctorView.style.display = "none";
    showDoctorList();
  }
}

function showDoctorList() {
  const filterUsers = fetchUsers.filter((user) => user.type === "doctor");
  const doctorListContainer = document.getElementById("doctor-list");
  doctorListContainer.innerHTML = "";

  filterUsers.forEach((doctor) => {
    const doctorCard = document.createElement("div");
    doctorCard.classList.add("doctor-card");
    doctorCard.innerHTML = `
      <h3>${doctor.name}</h3>
      <p>${doctor.email}</p>
      <button id="more-button" onclick="handleMoreInfo('${doctor.id}')">more...</button>
    `;
    doctorListContainer.appendChild(doctorCard);
  });
}

function handleMoreInfo(id) {
  const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE_USERS)) || [];
  const fetchDetails =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_DOCTOR_DETAIL)) || [];
  const fetchAvailability =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];

  const findUsers = fetchUsers.find((user) => user.id === id);
  const findDetails = fetchDetails.find((details) => details.doctor_id === id);
  const findAvailability = fetchAvailability.find(
    (availability) => availability.id === id
  );

  console.log(findUsers);
  console.log(findDetails);
  console.log(findAvailability);

  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
  <div>${findUsers.name}</div>
  <div>${findUsers.email}</div>
  <div>${findDetails.telPhone}</div>
  <div>${findDetails.address}</div>
  <div>
    ${
      findAvailability
        ? findAvailability.availability
            .map((item) => `<div>${item.key}: ${item.value}</div>`)
            .join("")
        : ""
    }
  </div>
`;

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

document.getElementById("logout").addEventListener("click", handleLogout);

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  const closeModal = document.getElementById("closeModal");
  closeModal.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  hideSectionByUserType();
});

$(document).ready(function () {
  loadAvailabilityList();
  $("#availbility-form").validate({
    rules: {
      day: { required: true },
      timeStart: { required: true },
      endStart: { required: true },
    },
    message: {
      day: { required: "requied field" },
      timeStart: { required: "requied field" },
      endStart: { required: "requied field" },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      AvailabilityForm(formData);
    },
  });

  function AvailabilityForm(data) {
    const fetchAvailability =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];
    const day = data.find((field) => field.name === "day").value;
    const timeStart = data.find((field) => field.name === "timeStart").value;
    const endStart = data.find((field) => field.name === "endStart").value;

    const newAvailablity = {
      id: new Date(),
      login_id: fetchLoginId,
      day: day,
      timeStart: timeStart,
      endStart: endStart,
    };

    const mergeRecord = [...fetchAvailability, newAvailablity];
    localStorage.setItem(
      LOCALSTORAGE_AVAILABILITY,
      JSON.stringify(mergeRecord)
    );

    loadAvailabilityList();
  }

  function loadAvailabilityList() {
    const fetchAvailability =
      JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];
    console.log(fetchAvailability);

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    if (fetchAvailability.length === 0) {
      console.log("no availability available");
      return;
    }

    fetchAvailability.forEach((ele) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${ele.day}</td>
        <td>${ele.endStart}</td>
        <td>${ele.timeStart}</td>
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>
      `;

      tbody.appendChild(tr);
    });
  }
});
