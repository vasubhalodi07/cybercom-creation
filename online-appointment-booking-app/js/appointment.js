var selectedTimeSlotId = null;

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

const fetchAppointment = fetchLocalStorage(APPOINTMENT);
const loginId = fetchSessionStorage(LOGIN_ID);
const fetchUsers = fetchLocalStorage(USERS);
const fetchDoctorDetails = fetchLocalStorage(DOCTOR_DETAIL);
const fetchAvailability = fetchLocalStorage(AVAILABILITY);

const findRecordById = fetchUsers.find((user) => user.id === loginId);

function loadAppointmentData() {
  const appointmentBody = document.getElementById("appointment-tbody");
  appointmentBody.innerHTML = "";

  const message = document.getElementById("no-record-found-message");
  if (fetchAppointment.length === 0) {
    const table = document.getElementById("message-table");
    table.style.display = "none";
    message.style.display = "block";
    return;
  } else {
    message.style.display = "none";
  }

  const addRowsForStatus = (appointments, backgroundColor) => {
    appointments.forEach((appointment) => {
      const fetchUser = fetchUsers.find(
        (user) => user.id === appointment.patient_id
      );

      const fetchDoctorDetail = fetchDoctorDetails.find(
        (detail) => detail.doctor_id === appointment.doctor_id
      );

      const fetchAvailabilityDetails = fetchAvailability.find(
        (available) => available.id === appointment.availablity_id
      );

      let phoneContent =
        fetchDoctorDetail && fetchDoctorDetail.telPhone
          ? fetchDoctorDetail.telPhone
          : "not available";

      const createTr = document.createElement("tr");
      createTr.setAttribute("data-appointment-id", appointment.appointment_id);
      createTr.innerHTML = `
        <td>${fetchUser.name}</td>
        <td>${phoneContent}</td>
        <td>${appointment.date}</td>
        <td>${fetchAvailabilityDetails.day}</td>
        <td>${appointment.slot_id}</td>
        <td style="background-color: ${backgroundColor};">${
        appointment.status
      }</td>
        <td>
          ${
            appointment.status === "reschedulable"
              ? `<button onclick="editAppointment('${appointment.appointment_id}')">Edit</button>
                 <button onclick="deleteAppointment('${appointment.appointment_id}')">Delete</button>`
              : ""
          }
        </td>
      `;
      appointmentBody.appendChild(createTr);
    });
  };

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
  const reschedulableAppointments = fetchAppointment.filter(
    (appointment) =>
      appointment.status === "reschedulable" &&
      appointment.patient_id === loginId
  );

  addRowsForStatus(reschedulableAppointments, "lightblue");
  addRowsForStatus(confirmAppointments, "lightgreen");
  addRowsForStatus(pendingAppointments, "lightyellow");
  addRowsForStatus(canceledAppointments, "lightcoral");
}

function editAppointment(appointmentId) {
  const appointmentRow = document.getElementById("form-appointment");
  const editForm = document.createElement("form");
  editForm.innerHTML = `
    <td colspan="8">
      <label for="edit-date">Select Date:</label>
      <input type="date" id="edit-date" name="edit-date" required>
      <div id="available-time-slots"></div>
      <button type="button" onclick="saveRescheduledAppointment('${appointmentId}')">Save</button>
    </td>
  `;
  appointmentRow.innerHTML = "";
  appointmentRow.appendChild(editForm);

  const editDateInput = editForm.querySelector("#edit-date");
  editDateInput.addEventListener("change", () => {
    const selectedDate = editDateInput.value;
    if (isPastDate(selectedDate)) {
      showToast("Please select a future date", "error");
      editDateInput.value = "";
    } else {
      populateTimeSlots(selectedDate, appointmentId);
    }
  });
}

function isPastDate(dateString) {
  const selectedDate = new Date(dateString);
  const currentDate = new Date();
  return selectedDate < currentDate;
}

function populateTimeSlots(selectedDate, appointmentId) {
  const availableTimeSlotsContainer = document.getElementById(
    "available-time-slots"
  );
  availableTimeSlotsContainer.innerHTML = "";
  const selectedDay = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const doctorId = fetchAppointment.find(
    (appointment) => appointment.appointment_id === appointmentId
  ).doctor_id;

  const fetchRecord = fetchAvailability.filter(
    (record) => record.userId === doctorId && record.day === selectedDay
  );

  if (fetchRecord.length === 0) {
    availableTimeSlotsContainer.innerHTML =
      "<div>No available time slots.</div>";
    const appointmentButton = document.getElementById("appointment-send-btn");
    appointmentButton.disabled = true;
    return;
  }

  if (fetchRecord.length > 0) {
    const dayAvailability = fetchRecord[0].timeSlots
      .map(
        (slot) => `
            <div class="time" data-time-id="${slot.time}" data-available-id="${
          fetchRecord[0].id
        }">
              ${slot.time} - ${slot.isBooked ? "(Booked)" : "(Available)"}
            </div>
          `
      )
      .join("");

    const dayContent = `
      <div class="availability-day">
        <h4 class='day'>${selectedDay}</h4>
        <div class="availability-grid">${dayAvailability}</div>
      </div>
    `;
    availableTimeSlotsContainer.insertAdjacentHTML("beforeend", dayContent);

    document.querySelectorAll(".time").forEach((timeSlot) => {
      timeSlot.addEventListener("click", () => {
        console.log("Time slot clicked");
        document
          .querySelectorAll(".time")
          .forEach((slot) => slot.classList.remove("active"));
        timeSlot.classList.add("active");

        selectedTimeSlotId = timeSlot.dataset.timeId;
        console.log(timeSlot.dataset.timeId);
      });
    });
  } else {
    availableTimeSlotsContainer.innerHTML =
      "<div>No available time slots for selected date.</div>";
    const appointmentButton = document.getElementById("appointment-send-btn");
    appointmentButton.disabled = true;
  }
}

function saveRescheduledAppointment(appointmentId) {
  const appointmentRow = document.getElementById("form-appointment");
  const selectedDate = document.getElementById("edit-date").value;

  if (!selectedDate || !selectedTimeSlotId) {
    showToast("Please select a date and time slot", "error");
    return;
  }

  const appointmentIndex = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );

  if (appointmentIndex !== -1) {
    fetchAppointment[appointmentIndex].date = selectedDate;
    fetchAppointment[appointmentIndex].slot_id = selectedTimeSlotId;
    fetchAppointment[appointmentIndex].status = "pending";

    localStorage.setItem(
      LOCALSTORAGE_KEYS.APPOINTMENT,
      JSON.stringify(fetchAppointment)
    );

    showToast("Appointment rescheduled successfully", "success");
    loadAppointmentData();
    appointmentRow.innerHTML = "";
  } else {
    showToast("Appointment not found", "error");
  }
}

function deleteAppointment(appointmentId) {
  const index = fetchAppointment.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );

  if (index !== -1) {
    fetchAppointment.splice(index, 1);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.APPOINTMENT,
      JSON.stringify(fetchAppointment)
    );
    showToast("Appointment deleted successfully", "success");
    loadAppointmentData();
  } else {
    showToast("Appointment not found", "error");
  }
}

function hideSectionByUserType() {
  const appointment = document.getElementById("appointment");
  const availability = document.getElementById("availbility");

  if (findRecordById.type === "doctor") {
    appointment.style.display = "none";
  } else if (findRecordById.type === "patient") {
    availability.style.display = "none";
  }
}

function fetchElementValue(key) {
  return document.getElementById(key);
}

function handleLogout() {
  localStorage.removeItem(LOCALSTORAGE_KEYS.LOGIN_ID);
  window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", handleLogout);

document.addEventListener("DOMContentLoaded", function (e) {
  hideSectionByUserType();
  loadAppointmentData();
});
