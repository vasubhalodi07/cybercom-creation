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
    appointments.forEach((element) => {
      const fetchUser = fetchUsers.find(
        (user) => user.id === element.doctor_id
      );

      const fetchDoctorDetail = fetchDoctorDetails.find((ele) => {
        return ele.doctor_id === element.doctor_id;
      });

      const fetchAvailabilityDetails = fetchAvailability.find(
        (ele) => ele.id === element.slot_id
      );

      let phoneContent =
        fetchDoctorDetail && fetchDoctorDetail.telPhone
          ? fetchDoctorDetail.telPhone
          : "not available";

      const createTr = document.createElement("tr");
      createTr.setAttribute("data-appointment-id", element.appointment_id);
      createTr.innerHTML = `
        <td>${fetchUser.name}</td>
        <td>${phoneContent}</td>
        <td>${element.date}</td>
        <td>${fetchAvailabilityDetails.day}</td>
        <td>${fetchAvailabilityDetails.timeStart}</td>
        <td>${fetchAvailabilityDetails.endStart}</td>
        <td style="background-color: ${backgroundColor};">${element.status}</td>
        <td>
          ${
            element.status === "reschedulable"
              ? `<button onclick="editAppointment('${element.appointment_id}')">Edit</button>
                 <button onclick="deleteAppointment('${element.appointment_id}')">Delete</button>`
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

  addRowsForStatus(confirmAppointments, "lightgreen");
  addRowsForStatus(pendingAppointments, "lightyellow");
  addRowsForStatus(canceledAppointments, "lightcoral");
  addRowsForStatus(reschedulableAppointments, "lightblue");
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

let selectedTimeSlotId = null;

function populateTimeSlots(selectedDate, appointmentId) {
  const availableTimeSlotsContainer = document.getElementById(
    "available-time-slots"
  );
  availableTimeSlotsContainer.innerHTML = "";

  const doctorId = fetchAppointment.find(
    (appointment) => appointment.appointment_id === appointmentId
  ).doctor_id;

  const fetchRecord = fetchAvailability.filter(
    (record) => record.login_id === doctorId
  );

  const selectedDay = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const availabilityByDay = {};
  fetchRecord.forEach((availability) => {
    if (!availabilityByDay[availability.day]) {
      availabilityByDay[availability.day] = [];
    }
    availabilityByDay[availability.day].push(availability);
  });

  if (availabilityByDay[selectedDay]) {
    const dayAvailability = availabilityByDay[selectedDay]
      .map(
        (record) => `
            <div class="time ${
              selectedTimeSlotId === record.id ? "selected" : ""
            }" data-time-id="${record.id}">
              ${record.timeStart} - ${record.endStart}
            </div>
          `
      )
      .join("");

    availableTimeSlotsContainer.innerHTML = `
      <h4>Available Time Slots:</h4>
      <div>${dayAvailability}</div>
    `;

    document.querySelectorAll(".time").forEach((timeSlot) => {
      timeSlot.addEventListener("click", () => {
        document
          .querySelectorAll(".time")
          .forEach((slot) => slot.classList.remove("selected"));
        timeSlot.classList.add("selected");
        selectedTimeSlotId = timeSlot.dataset.timeId;
      });
    });
  } else {
    availableTimeSlotsContainer.innerHTML =
      "<div>No available time slots for selected date.</div>";
  }
}

function saveRescheduledAppointment(appointmentId) {
  const appointmentRow = document.getElementById("form-appointment");

  const selectedDate = document.getElementById("edit-date").value;
  const selectedTimeSlot = document.querySelector(".time.selected");
  const selectedTimeSlotId = selectedTimeSlot
    ? selectedTimeSlot.dataset.timeId
    : null;

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
      LOCALSTORAGE_APPOINTMENT,
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
      LOCALSTORAGE_APPOINTMENT,
      JSON.stringify(fetchAppointment)
    );
    showToast("Appointment deleted successfully", "success");
    loadAppointmentData();
  } else {
    showToast("Appointment not found", "error");
  }
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
