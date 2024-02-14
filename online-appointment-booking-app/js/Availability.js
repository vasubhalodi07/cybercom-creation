const LOCALSTORAGE_USERS = "users";
const LOCALSTORAGE_DOCTOR_DETAIL = "doctor_detail";
const LOCALSTORAGE_AVAILABILITY = "doctor_availability";
const LOCALSTORAGE_APPOINTMENT = "appointment";
const LOCALSTORAGE_LOGIN_ID = "login_id";
const MODAL_STATE = {
  ADD: "add",
  UPDATE: "update",
};

let modalState = MODAL_STATE.ADD;

function getLocalStorageValue(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

const fetchAppointment = getLocalStorageValue(LOCALSTORAGE_APPOINTMENT);
const loginId = getLocalStorageValue(LOCALSTORAGE_LOGIN_ID);
const fetchUsers = getLocalStorageValue(LOCALSTORAGE_USERS);
const fetchDoctorDetails = getLocalStorageValue(LOCALSTORAGE_DOCTOR_DETAIL);
const fetchAvailability = getLocalStorageValue(LOCALSTORAGE_AVAILABILITY);

const findRecordById = fetchUsers.find((user) => user.id === loginId);

function loadAvailabilityList() {
  const availabilityData =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];

  const filterdAvailability = availabilityData.filter((record) => {
    return record.login_id === loginId;
  });

  const availabilitySection = document.getElementById("availability-section");
  availabilitySection.innerHTML = "";

  const availabilityByDay = {};
  filterdAvailability.forEach((availability) => {
    if (!availabilityByDay[availability.day]) {
      availabilityByDay[availability.day] = [];
    }
    availabilityByDay[availability.day].push(availability);
  });

  const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  dayOrder.forEach((day) => {
    if (availabilityByDay[day]) {
      const dayAvailability = availabilityByDay[day]
        .map(
          (record) => `
        <div class="availability-record">
          <p>Time: ${record.timeStart} - ${record.endStart}</p>
          <div>
            <button onclick="deleteAvailabilityRecord('${record.id}')">Delete</button>
            <button onclick="updateAvailabilityRecord('${record.id}')">Update</button>
          </div>
        </div>
      `
        )
        .join("");

      const dayContent = `
        <div class="availability-day">
          <h4>${day}</h4>
          <div class="availability-grid">${dayAvailability}</div>
        </div>
      `;
      availabilitySection.insertAdjacentHTML("beforeend", dayContent);
    }
  });
}

function deleteAvailabilityRecord(recordId) {
  let availabilityData =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];
  availabilityData = availabilityData.filter(
    (record) => record.id !== recordId
  );
  localStorage.setItem(
    LOCALSTORAGE_AVAILABILITY,
    JSON.stringify(availabilityData)
  );
  loadAvailabilityList();
}

function updateAvailabilityRecord(recordId) {
  console.log(recordId);
}

function openModalForAdd() {
  modalState = MODAL_STATE.ADD;
  document.getElementById("modal-title").textContent = "Add Availability";
  document.getElementById("availability-form").reset();
  document.getElementById("myModal").style.display = "block";
}

function openModalForUpdate(recordId) {
  modalState = MODAL_STATE.UPDATE;
  document.getElementById("modal-title").textContent = "Update Availability";
  const record = getAvailabilityRecordById(recordId);
  if (record) {
    document.getElementById("availability-id").value = record.id;
    document.getElementById("day").value = record.day;
    document.getElementById("timeStart").value = record.timeStart;
    document.getElementById("endStart").value = record.endStart;
    document.getElementById("myModal").style.display = "block";
  }
}

function getAvailabilityRecordById(recordId) {
  const availabilityData =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];
  return availabilityData.find((record) => record.id === recordId);
}

function handleAddOrUpdateAvailability(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const availabilityId = formData.get("availabilityId");
  const availabilityData = {
    id: availabilityId || new Date().toISOString(),
    login_id: JSON.parse(localStorage.getItem("login_id")),
    day: formData.get("day"),
    timeStart: formData.get("timeStart"),
    endStart: formData.get("endStart"),
  };

  let availabilityList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE_AVAILABILITY)) || [];

  if (modalState === MODAL_STATE.UPDATE) {
    availabilityList = availabilityList.map((record) =>
      record.id === availabilityId ? availabilityData : record
    );
  } else {
    availabilityList.push(availabilityData);
  }

  localStorage.setItem(
    LOCALSTORAGE_AVAILABILITY,
    JSON.stringify(availabilityList)
  );

  loadAvailabilityList();
  closeModal();
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  hideSectionByUserType();
  loadAvailabilityList();
  document
    .getElementById("add-availbility")
    .addEventListener("click", openModalForAdd);
  document
    .getElementById("availability-form")
    .addEventListener("submit", handleAddOrUpdateAvailability);
  document.getElementById("closeModal").addEventListener("click", closeModal);
});

function handleLogout() {
  localStorage.removeItem(LOCALSTORAGE_LOGIN_ID);
  window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", handleLogout);

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
