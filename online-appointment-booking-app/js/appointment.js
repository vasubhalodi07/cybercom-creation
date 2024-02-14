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
  appointmentBody.innerHTML = "";

  if (fetchAppointment.length === 0) {
    console.log("no appointments there");
    return;
  }

  const confirmAppointments = fetchAppointment.filter(
    (appointment) =>
      appointment.status === "confirmed" && appointment.patient_id === loginId
  );
  const pendingAppointments = fetchAppointment.filter(
    (appointment) =>
      appointment.status === "pending" && appointment.patient_id === loginId
  );
  const canceledAppointments = fetchAppointment.filter(
    (appointment) =>
      appointment.status === "canceled" && appointment.patient_id === loginId
  );

  const addRowsForStatus = (appointments, backgroundColor) => {
    appointments.forEach((element) => {
      const fetchUser = fetchUsers.find(
        (user) => user.id === element.doctor_id
      );
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
        <td style="background-color: ${backgroundColor};">${element.status}</td>
      `;
      appointmentBody.appendChild(createTr);
    });
  };

  addRowsForStatus(confirmAppointments, "lightgreen");
  addRowsForStatus(pendingAppointments, "lightyellow");
  addRowsForStatus(canceledAppointments, "lightcoral");
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
