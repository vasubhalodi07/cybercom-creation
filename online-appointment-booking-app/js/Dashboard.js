const LOCALSTORAGE_LOGIN_ID = "login_id";
const LOCALSTORAGE_USERS = "users";
const LOCALSTORAGE_AVAILABILITY = "doctor_availability";
const LOCALSTORAGE_DOCTOR_DETAIL = "doctor_detail";
const LOCALSTORAGE_APPOINTMENT = "appointment";

function getLocalStorageData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

const fetchAppointment = getLocalStorageData(LOCALSTORAGE_APPOINTMENT);
const loginId = getLocalStorageData(LOCALSTORAGE_LOGIN_ID);
const fetchUsers = getLocalStorageData(LOCALSTORAGE_USERS);
const fetchDoctorDetails = getLocalStorageData(LOCALSTORAGE_DOCTOR_DETAIL);
const fetchAvailability = getLocalStorageData(LOCALSTORAGE_AVAILABILITY);

const findRecordById = fetchUsers.find((user) => user.id === loginId);

function hideSectionByUserType() {
  const patientView = document.getElementById("patient-section");
  const doctorView = document.getElementById("doctor-section");

  const appointment = fetchElementValue("appointment");
  const profile = fetchElementValue("profile");
  const availability = fetchElementValue("availbility");

  if (findRecordById.type === "doctor") {
    patientView.style.display = "none";
    appointment.style.display = "none";
    showAppointments();
  } else if (findRecordById.type === "patient") {
    doctorView.style.display = "none";
    profile.style.display = "none";
    availability.style.display = "none";
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
  const fetchDetails = getLocalStorageData(LOCALSTORAGE_DOCTOR_DETAIL);

  const findUsers = fetchUsers.find((user) => user.id === id);
  const findDetails = fetchDetails.find((details) => details.doctor_id === id);

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <div>Doctor Name: ${findUsers.name}</div>
  <div>Email: ${findUsers.email}</div>
  ${
    findDetails
      ? `
      <div>
        <div>TelPhone: ${findDetails.telPhone}</div>
        <div>Address: ${findDetails.address}</div>
      </div>
    `
      : ""
  }
  <h4>Select Time</h4>
  <div class='time-container' id="time-container"></div>
  <button id="appointment-send-btn">Appointment Apply</button>
`;

  loadAvailabilityList(id);

  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  document.querySelectorAll(".time").forEach((timeSlot) => {
    timeSlot.addEventListener("click", () => {
      document
        .querySelectorAll(".time")
        .forEach((slot) => slot.classList.remove("active"));
      timeSlot.classList.add("active");
    });
  });

  document
    .getElementById("appointment-send-btn")
    .addEventListener("click", () => {
      const selectedTimeSlot = document.querySelector(".time.active");
      if (selectedTimeSlot) {
        const fetchAppointment =
          JSON.parse(localStorage.getItem("appointment")) || [];

        const selectedTimeSlotId = selectedTimeSlot.dataset.timeId;
        const newAppointment = {
          appointment_id: new Date(),
          doctor_id: id,
          patient_id: loginId,
          slot_id: selectedTimeSlotId,
          status: "pending",
        };

        const mergeRecord = [...fetchAppointment, newAppointment];
        localStorage.setItem("appointment", JSON.stringify(mergeRecord));
        showToast("appointment send successfully", "success");
      } else {
        showToast("no time slot selected", "error");
      }
    });
}

function loadAvailabilityList(id) {
  const fetchRecord = fetchAvailability.filter(
    (record) => record.login_id === id
  );

  const timeContainer = document.getElementById("time-container");
  timeContainer.innerHTML = "";

  if (fetchRecord.length === 0) {
    timeContainer.innerHTML = "<div>No available time slots.</div>";
    const appointmentButton = document.getElementById("appointment-send-btn");
    appointmentButton.disabled = true;
    return;
  }

  const availabilityByDay = {};
  fetchRecord.forEach((availability) => {
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
              <div class="time" data-time-id="${record.id}">
                ${record.timeStart} - ${record.endStart}
              </div>
            `
        )
        .join("");

      const dayContent = `
        <div class="availability-day">
          <h4 class='day'>${day}</h4>
          <div class="availability-grid">${dayAvailability}</div>
        </div>
    `;
      timeContainer.insertAdjacentHTML("beforeend", dayContent);
    }
  });
}

function showAppointments() {
  const listAppointments = document.getElementById("list-appointment");
  const appointmentBody = document.getElementById("appointment-tbody");
  appointmentBody.innerHTML = "";
  if (fetchAppointment.length === 0) {
    console.log("No Appointments!");
    return;
  }

  const filterRecord = fetchAppointment.filter(
    (record) => record.status === "pending" && record.doctor_id === loginId
  );

  if (filterRecord.length === 0) {
    listAppointments.style.display = "none";
    console.log("no record found!");
    return;
  }

  filterRecord &&
    filterRecord.forEach((appointment) => {
      const fetchUser = fetchUsers.find(
        (user) => user.id === appointment.patient_id
      );
      const fetchAvailabilityDetails = fetchAvailability.find(
        (ele) => ele.id === appointment.slot_id
      );

      console.log(fetchAvailability);
      console.log(fetchAvailabilityDetails);

      const createTr = document.createElement("tr");
      createTr.innerHTML = `
        <td>${fetchUser.name}</td>
        <td>${fetchUser.email}</td>
        <td>${fetchAvailabilityDetails.timeStart}</td>
        <td>${fetchAvailabilityDetails.endStart}</td>
        <td>
          <button onclick="confirmAppointment('${appointment.appointment_id}')">Confirm</button>
          <button onclick="cancelAppointment('${appointment.appointment_id}')">Decline</button>
          <button>Reschedule</button>
        </td>
    `;
      appointmentBody.appendChild(createTr);
    });
}

function confirmAppointment(appointmentId) {
  const appointmentIndex = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );
  if (appointmentIndex !== -1) {
    fetchAppointment[appointmentIndex].status = "confirmed";
    localStorage.setItem(
      LOCALSTORAGE_APPOINTMENT,
      JSON.stringify(fetchAppointment)
    );
    showToast("appointment confirm", "info");
    showAppointments();
  }
}

function cancelAppointment(appointmentId) {
  const appointmentIndex = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );
  if (appointmentIndex !== -1) {
    fetchAppointment[appointmentIndex].status = "canceled";
    localStorage.setItem(
      LOCALSTORAGE_APPOINTMENT,
      JSON.stringify(fetchAppointment)
    );
    showToast("appointment cancelled", "info");
    showAppointments();
  }
}

function handleLogout() {
  localStorage.removeItem(LOCALSTORAGE_LOGIN_ID);
  window.location.href = "index.html";
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

function fetchElementValue(key) {
  return document.getElementById(key);
}
