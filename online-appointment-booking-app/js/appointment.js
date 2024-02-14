const LOCALSTORAGE_USERS = "users";
const LOCALSTORAGE_DOCTOR_DETAIL = "doctor_detail";
const LOCALSTORAGE_AVAILABILITY = "doctor_availability";
const LOCALSTORAGE_APPOINTMENT = "appointment";
const LOCALSTORAGE_LOGIN_ID = "login_id";

function getLocalStorageValue(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

const fetchAppointment = getLocalStorageValue(LOCALSTORAGE_APPOINTMENT);
const loginId = getLocalStorageValue(LOCALSTORAGE_LOGIN_ID);
const fetchUsers = getLocalStorageValue(LOCALSTORAGE_USERS);
const fetchDoctorDetails = getLocalStorageValue(LOCALSTORAGE_DOCTOR_DETAIL);
const fetchAvailability = getLocalStorageValue(LOCALSTORAGE_AVAILABILITY);

const findRecordById = fetchUsers.find((user) => user.id === loginId);

function loadAppointmentData() {
  const appointmentBody = document.getElementById("appointment-tbody");
  if (fetchAppointment.length === 0) {
    return;
  }

  const filterAppointment = fetchAppointment.filter((appointment) => {
    console.log(appointment, loginId);
    return appointment.patient_id === loginId;
  });

  console.log(filterAppointment);

  filterAppointment.forEach((element) => {
    const fetchUser = fetchUsers.find((user) => user.id === element.doctor_id);
    const fetchDoctorDetail = fetchDoctorDetails.find(
      (ele) => ele.doctor_id === element.doctor_id
    );

    const fetchAvailabilityDetails = fetchAvailability.find(
      (ele) => ele.id === element.slot_id
    );

    const createTr = document.createElement("tr");
    createTr.innerHTML = `
        <td>${fetchUser.name}</td>
        <td>${fetchDoctorDetail.telPhone}</td>
        <td>${fetchAvailabilityDetails.timeStart}</td>
        <td>${fetchAvailabilityDetails.endStart}</td>
        <td>${element.status}</td>
    `;

    appointmentBody.appendChild(createTr);
  });
}

document.addEventListener("DOMContentLoaded", function (e) {
  hideSectionByUserType();
  loadAppointmentData();
});

function hideSectionByUserType() {
  const appointment = fetchElementValue("appointment");
  const profile = fetchElementValue("profile");
  const availability = fetchElementValue("availbility");

  if (findRecordById.type === "doctor") {
    appointment.style.display = "none";
  } else if (findRecordById.type === "patient") {
    profile.style.display = "none";
    availability.style.display = "none";
  }
}
function fetchElementValue(key) {
  return document.getElementById(key);
}

function handleLogout() {
  localStorage.removeItem(LOCALSTORAGE_LOGIN_ID);
  window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", handleLogout);
