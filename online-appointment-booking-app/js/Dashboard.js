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

  console.log(fetchAvailability);
  const findAvailability = fetchAvailability.filter(
    (availability) => availability.login_id === id
  );

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <div>Name: ${findUsers.name}</div>
  <div>Email: ${findUsers.email}</div>
  <div>TelPhone: ${findDetails.telPhone}</div>
  <div>Address: ${findDetails.address}</div>
  <h4>Select Time</h4>
  <div class='time-container'>
    ${
      findAvailability &&
      findAvailability
        .map(
          (item) =>
            `<div class='time'>${item.timeStart} - ${item.endStart}</div>`
        )
        .join("")
    }
  </div>
  <button id="appointment-send-btn">Appointment Apply</button>
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
