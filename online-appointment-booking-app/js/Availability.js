const MODAL_STATE = {
  ADD: "add",
  UPDATE: "update",
};
let modalState = MODAL_STATE.ADD;

const LOCALSTORAGE_KEYS = {
  USERS: "users",
  DOCTOR_DETAIL: "doctor_detail",
  AVAILABILITY: "available",
  APPOINTMENT: "appointment",
};

const SESSIONSTORAGE_KEY = {
  LOGIN_ID: "id",
};

function fetchLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function fetchSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key)) || [];
}

const { USERS, DOCTOR_DETAIL, AVAILABILITY, APPOINTMENT } = LOCALSTORAGE_KEYS;
const { LOGIN_ID } = SESSIONSTORAGE_KEY;

const loginId = fetchSessionStorage(LOGIN_ID);
const fetchUsers = fetchLocalStorage(USERS);
const fetchAvailability = fetchLocalStorage(AVAILABILITY);

const findRecordById = fetchUsers.find((user) => user.id === loginId);

function loadAvailabilityList() {
  const fetchAvailability = fetchLocalStorage(AVAILABILITY);
  const availabilitySection = document.getElementById("availability-section");
  availabilitySection.innerHTML = "";

  const filteredAvailability = fetchAvailability.filter((record) => {
    return record.userId === loginId;
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
    const availabilityForDay = filteredAvailability.find(
      (record) => record.day === day
    );
    if (availabilityForDay) {
      const dayAvailability = availabilityForDay.timeSlots
        .map(
          (slot) => `
          <div class="availability-record">
            <p>Time: ${slot.time} ${
            slot.isBooked ? "(Booked)" : "(Available)"
          }</p>
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

function openModalForAdd() {
  modalState = MODAL_STATE.ADD;
  document.getElementById("modal-title").textContent = "Add Availability";
  document.getElementById("availability-form").reset();
  document.getElementById("myModal").style.display = "block";
}

function getAvailabilityRecordById(recordId) {
  return fetchAvailability.find((record) => record.id === recordId);
}

function handleAddOrUpdateAvailability(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const availabilityId = formData.get("availabilityId");
  const day = formData.get("day");
  const startTime = formData.get("timeStart");
  const endTime = formData.get("endStart");
  const appointmentId = generateUniqueId();

  const timeSlots = createTimeSlots(startTime, endTime);

  const availabilityData = {
    id: availabilityId || new Date().toISOString(),
    userId: loginId,
    day: day,
    timeSlots: timeSlots,
  };

  let availabilityList = JSON.parse(localStorage.getItem(AVAILABILITY)) || [];
  if (modalState === MODAL_STATE.UPDATE) {
    availabilityList = availabilityList.map((record) =>
      record.id === availabilityId ? availabilityData : record
    );
  } else {
    availabilityList.push(availabilityData);
  }
  localStorage.setItem(AVAILABILITY, JSON.stringify(availabilityList));

  loadAvailabilityList();
  closeModal();

  const selectedTimeSlot = timeSlots.find((slot) => slot.time === startTime);
  if (selectedTimeSlot) {
    selectedTimeSlot.isBooked = true;
    selectedTimeSlot.appointmentId = appointmentId;
  }
}

function generateUniqueId() {
  return new Date().getTime().toString();
}

function createTimeSlots(startTime, endTime) {
  const timeSlots = [];
  let currentTime = startTime;
  while (currentTime < endTime) {
    timeSlots.push({ time: currentTime, isBooked: false });
    const [hour, minute] = currentTime.split(":").map(Number);
    const nextMinute = minute + 30;
    const nextHour = nextMinute >= 60 ? (hour === 23 ? 0 : hour + 1) : hour;
    const adjustedMinute = nextMinute >= 60 ? nextMinute - 60 : nextMinute;
    currentTime = `${nextHour.toString().padStart(2, "0")}:${adjustedMinute
      .toString()
      .padStart(2, "0")}`;
  }
  return timeSlots;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

document.getElementById("logout").addEventListener("click", handleLogout);
function handleLogout() {
  sessionStorage.removeItem(LOGIN_ID);
  window.location.href = "index.html";
}

function hideSectionByUserType() {
  const appointment = fetchElementValue("appointment");
  const availability = fetchElementValue("availbility");

  if (findRecordById.type === "doctor") {
    appointment.style.display = "none";
  } else if (findRecordById.type === "patient") {
    availability.style.display = "none";
  }
}
function fetchElementValue(key) {
  return document.getElementById(key);
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
