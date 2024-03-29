const LOCALSTORAGE_KEYS = {
  USERS: "users",
  AVAILABILITY: "available",
  DOCTOR_DETAIL: "doctor_detail",
  APPOINTMENT: "appointment",
  TIMESLOT_BOOKED: "timeslot_booked",
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

const { USERS, DOCTOR_DETAIL, AVAILABILITY, APPOINTMENT, TIMESLOT_BOOKED } =
  LOCALSTORAGE_KEYS;
const { LOGIN_ID } = SESSIONSTORAGE_KEY;

const fetchAppointment = fetchLocalStorage(APPOINTMENT);
const loginId = fetchSessionStorage(LOGIN_ID);
const fetchUsers = fetchLocalStorage(USERS);
const fetchDoctorDetails = fetchLocalStorage(DOCTOR_DETAIL);
const fetchAvailability = fetchLocalStorage(AVAILABILITY);

const findRecordById = fetchUsers.find((user) => user.id === loginId);

// Patient Section
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
      <div>
        <button id="more-button" class='more-button' onclick="handleMoreInfo('${doctor.id}')">more</button>
      </div>
    `;
    doctorListContainer.appendChild(doctorCard);
  });
}

function handleMoreInfo(id) {
  const findUsers = fetchUsers.find((user) => user.id === id);
  const findDetails = fetchDoctorDetails.find(
    (details) => details.doctor_id === id
  );

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
    <div>
      <label for="appointment-date">Date:</label>
      <input type="date" id="appointment-date" name="appointment-date" required>
    </div>
    <div class='time-container' id="time-container"></div>
    <button id="appointment-send-btn">Appointment Apply</button>
  `;

  const appointmentDateInput = document.getElementById("appointment-date");
  appointmentDateInput.addEventListener("change", () => {
    const selectedDate = new Date(appointmentDateInput.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      appointmentDateInput.value = currentDate.toISOString().split("T")[0];
      showToast("Please select a future or current date", "error");
    } else {
      loadAvailabilityList(id);
    }
  });

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
      const selectedDate = document.getElementById("appointment-date").value;

      const fetchAppointment = fetchLocalStorage(APPOINTMENT);

      if (!selectedDate) {
        showToast("Please select a date", "error");
        return;
      }

      if (selectedTimeSlot && selectedDate) {
        const selectedTimeSlotId = selectedTimeSlot.dataset.timeId;
        const selectedAvailableId = selectedTimeSlot.dataset.availableId;

        const fetchTimeslotBooked = fetchLocalStorage("timeslot_booked");
        const isTimeSlotBooked = fetchTimeslotBooked.some((bookedSlot) => {
          return (
            bookedSlot.availability_id === selectedAvailableId &&
            bookedSlot.timeslot_id === selectedTimeSlotId &&
            bookedSlot.date === selectedDate
          );
        });

        if (isTimeSlotBooked) {
          showToast("The selected time slot is already booked", "error");
          return;
        }

        const newAppointment = {
          appointment_id: new Date().toISOString(),
          doctor_id: id,
          patient_id: loginId,
          availablity_id: selectedAvailableId,
          timeslot_id: selectedTimeSlotId,
          date: selectedDate,
          status: "pending",
        };

        const mergeRecord = [...fetchAppointment, newAppointment];

        console.log(mergeRecord);

        localStorage.setItem(APPOINTMENT, JSON.stringify(mergeRecord));
        showToast("appointment send successfully", "success");
      } else {
        showToast("Please select a date and time slot", "error");
      }
    });
}

function loadAvailabilityList(id) {
  const selectedDate = document.getElementById("appointment-date").value;
  const selectedDay = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fetchAvailability = fetchLocalStorage(AVAILABILITY);
  const fetchTimeslotBooked = fetchLocalStorage("timeslot_booked");

  const availabilityRecord = fetchAvailability.find(
    (record) => record.userId === id && record.day === selectedDay
  );

  const timeContainer = document.getElementById("time-container");
  timeContainer.innerHTML = "";

  if (!availabilityRecord) {
    timeContainer.innerHTML = "<div>No available time slots.</div>";
    const appointmentButton = document.getElementById("appointment-send-btn");
    appointmentButton.disabled = true;
    return;
  }

  const dayAvailability = availabilityRecord.timeSlots.map((slot) => {
    const timeslotBooked = fetchTimeslotBooked.find((bookedSlot) => {
      return (
        bookedSlot.availability_id === availabilityRecord.id &&
        bookedSlot.timeslot_id == slot.timslot_id &&
        bookedSlot.date === selectedDate
      );
    });

    return `
      <div class="time" data-time-id="${slot.timslot_id}" data-available-id="${
      availabilityRecord.id
    }">
        ${slot.time} - ${timeslotBooked ? "(Booked)" : "(Available)"}
      </div>
    `;
  });

  const dayContent = `
    <div class="availability-day">
      <h4 class="day">${selectedDay}</h4>
      <div class="availability-grid">${dayAvailability.join("")}</div>
    </div>
  `;

  timeContainer.insertAdjacentHTML("beforeend", dayContent);

  document.querySelectorAll(".time").forEach((timeSlot) => {
    timeSlot.addEventListener("click", () => {
      document
        .querySelectorAll(".time")
        .forEach((slot) => slot.classList.remove("active"));
      timeSlot.classList.add("active");
    });
  });
}

// Doctor Appointment Section
function showAppointments() {
  const listAppointments = document.getElementById("list-appointment");
  const appointmentBody = document.getElementById("appointment-tbody");
  appointmentBody.innerHTML = "";

  const confirmedAppointments = fetchAppointment.filter(
    (record) => record.status === "confirmed" && record.doctor_id === loginId
  );
  const pendingAppointments = fetchAppointment.filter(
    (record) => record.status === "pending" && record.doctor_id === loginId
  );
  const canceledAppointments = fetchAppointment.filter(
    (record) => record.status === "canceled" && record.doctor_id === loginId
  );
  const reschedulableAppointments = fetchAppointment.filter(
    (record) =>
      record.status === "reschedulable" && record.doctor_id === loginId
  );

  pendingAppointments.forEach((appointment) => {
    displayAppointmentWithActions(appointment, appointmentBody, "pending");
  });

  confirmedAppointments.forEach((appointment) => {
    displayAppointment(appointment, appointmentBody, "confirmed");
  });

  reschedulableAppointments.forEach((appointment) => {
    displayAppointment(appointment, appointmentBody, "reschedulable");
  });

  canceledAppointments.forEach((appointment) => {
    displayAppointment(appointment, appointmentBody, "canceled");
  });

  if (
    fetchAppointment.length === 0 ||
    (confirmedAppointments.length === 0 &&
      pendingAppointments.length === 0 &&
      canceledAppointments.length === 0)
  ) {
    listAppointments.style.display = "none";
    const appointmentMess = document.getElementById("appointment-list-message");
    appointmentMess.style.display = "block";
  } else {
    listAppointments.style.display = "block";
    const appointmentMess = document.getElementById("appointment-list-message");
    appointmentMess.style.display = "none";
  }
}

function displayAppointment(appointment, appointmentBody, status) {
  const fetchUser = fetchUsers.find(
    (user) => user.id === appointment.patient_id
  );

  const fetchAvailabilityDetails = fetchAvailability.find(
    (available) => available.id === appointment.slot_id
  );

  if (fetchAvailabilityDetails === undefined) {
    console.log("No availability details");
    return;
  }

  const createTr = document.createElement("tr");
  createTr.innerHTML = `
    <td>${fetchUser.name}</td>
    <td>${appointment.date}</td>
    <td>${fetchAvailabilityDetails.day}</td>
    <td>${fetchAvailabilityDetails.timeStart}</td>
    <td>${fetchAvailabilityDetails.endStart}</td>
    <td>${status}</td>
  `;
  appointmentBody.appendChild(createTr);
}

function displayAppointmentWithActions(appointment, appointmentBody, status) {
  const fetchUser = fetchUsers.find(
    (user) => user.id === appointment.patient_id
  );
  const fetchAvailabilityDetails = fetchAvailability.find(
    (availability) => availability.userId === appointment.doctor_id
  );

  console.log(fetchAvailabilityDetails.timeSlots);
  console.log(appointment);
  const fetchTime = fetchAvailabilityDetails.timeSlots.find((item) => {
    return item.timslot_id == appointment.timeslot_id;
  });

  console.log(fetchTime.time);

  const createTr = document.createElement("tr");
  createTr.innerHTML = `
    <td>${fetchUser.name}</td>
    <td>${appointment.date}</td>
    <td>${fetchAvailabilityDetails.day}</td>
    <td>${fetchTime.time}</td>
    <td>${status}</td>
    ${
      status === "pending"
        ? `
          <td>
            <button onclick="confirmAppointment('${appointment.appointment_id}')">Confirm</button>
            <button onclick="cancelAppointment('${appointment.appointment_id}')">Decline</button>
            <button onclick="rescheduleAppointment('${appointment.appointment_id}')">Reschedule</button>
          </td>`
        : ""
    }
  `;
  appointmentBody.appendChild(createTr);
}

function confirmAppointment(appointmentId) {
  const appointmentIndex = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );

  if (appointmentIndex !== -1) {
    const appointment = fetchAppointment[appointmentIndex];
    const availabilityId = appointment.availablity_id;
    const date = appointment.date;
    const timeslotId = appointment.timeslot_id;

    const timeslotBookedData = {
      id: new Date(),
      availability_id: availabilityId,
      date: date,
      timeslot_id: timeslotId,
      isBooked: true,
    };

    let timeslotBookedList =
      JSON.parse(localStorage.getItem(TIMESLOT_BOOKED)) || [];
    timeslotBookedList.push(timeslotBookedData);
    localStorage.setItem(TIMESLOT_BOOKED, JSON.stringify(timeslotBookedList));

    fetchAppointment[appointmentIndex].status = "confirmed";
    localStorage.setItem(APPOINTMENT, JSON.stringify(fetchAppointment));

    showToast("Appointment confirmed successfully", "success");
    displayAppointment();
    displayAppointmentWithActions();
  } else {
    showToast("Appointment not confirmed", "error");
  }
}

function cancelAppointment(appointmentId) {
  const appointmentIndex = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );
  if (appointmentIndex !== -1) {
    fetchAppointment[appointmentIndex].status = "canceled";
    localStorage.setItem(APPOINTMENT, JSON.stringify(fetchAppointment));
    showToast("appointment cancelled", "info");
    showAppointments();
  }
}

function rescheduleAppointment(appointmentId) {
  const appointmentIndex = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );
  if (appointmentIndex !== -1) {
    fetchAppointment[appointmentIndex].status = "reschedulable";
    localStorage.setItem(APPOINTMENT, JSON.stringify(fetchAppointment));
    showToast("Appointment is reschedulable", "info");
    showAppointments();
  }
}

// Confirm Appointments
function showConfirmAppointments() {
  const appointmentBody = document.getElementById("appointment-confirm-tbody");
  appointmentBody.innerHTML = "";

  const confirmedAppointments = fetchAppointment.filter(
    (record) => record.status === "confirmed" && record.doctor_id === loginId
  );

  confirmedAppointments.forEach((appointment) => {
    displayAppointmentWithActions(appointment, appointmentBody, "confirmed");
  });
}
showConfirmAppointments();

// Modal
function handleModalContent() {
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
}

// Logout
document.getElementById("logout").addEventListener("click", handleLogout);
function handleLogout() {
  sessionStorage.removeItem(LOGIN_ID);
  window.location.href = "index.html";
}

function hideSectionByUserType() {
  const patientView = document.getElementById("patient-section");
  const doctorView = document.getElementById("doctor-section");

  const appointment = fetchElementValue("appointment");
  const availability = fetchElementValue("availbility");

  if (findRecordById.type === "doctor") {
    patientView.style.display = "none";
    appointment.style.display = "none";
    showAppointments();
  } else if (findRecordById.type === "patient") {
    doctorView.style.display = "none";
    availability.style.display = "none";
    showDoctorList();
  }
}
function fetchElementValue(key) {
  return document.getElementById(key);
}

// DOM Event Listerner
document.addEventListener("DOMContentLoaded", function () {
  handleModalContent();
  hideSectionByUserType();
});
