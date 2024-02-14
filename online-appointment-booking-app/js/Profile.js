const LOCALSTORAGE_LOGIN_ID = "login_id";
const LOCALSTORAGE_USERS = "users";
const LOCALSTORAGE_AVAILABILITY = "doctor_availability";
const LOCALSTORAGE_DOCTOR_DETAIL = "doctor_detail";

const fetchUsers = JSON.parse(localStorage.getItem(LOCALSTORAGE_USERS)) || [];
const fetchProfileDetails =
  JSON.parse(localStorage.getItem(LOCALSTORAGE_DOCTOR_DETAIL)) || [];

const fetchLoginId =
  JSON.parse(localStorage.getItem(LOCALSTORAGE_LOGIN_ID)) || [];

const findRecordById = fetchUsers.find((user) => user.id === fetchLoginId);
const findRecordByProfileId = fetchProfileDetails.find(
  (profile) => profile.doctor_id === fetchLoginId
);

function initializeProfileData() {
  if (findRecordById.length !== 0) {
    document.getElementById("textName").value = findRecordById.name;
    document.getElementById("email").value = findRecordById.email;
  }

  if (findRecordByProfileId && findRecordByProfileId.length !== 0) {
    document.getElementById("telPhone").value = findRecordByProfileId.telPhone;
    document.getElementById("address").value = findRecordByProfileId.address;
    document.getElementById("specialization").value =
      findRecordByProfileId.specialization;
  }
}

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

$(document).ready(function () {
  hideSectionByUserType();
  initializeProfileData();

  $("#profile").validate({
    rules: {
      textName: { required: true },
      email: { required: true },
      telPhone: { required: true },
      address: { required: true },
      specialization: { required: true },
    },
    message: {
      textName: { required: "requied field" },
      email: { required: "requied field" },
      telPhone: { required: "requied field" },
      address: { required: "requied field" },
      specialization: { required: "requied field" },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      Profile(formData);
    },
  });

  function Profile(data) {
    const telPhone = data.find((field) => field.name === "telPhone").value;
    const address = data.find((field) => field.name === "address").value;
    const specialization = data.find(
      (field) => field.name === "specialization"
    ).value;

    if (findRecordByProfileId) {
      findRecordByProfileId.telPhone = telPhone;
      findRecordByProfileId.address = address;
      findRecordByProfileId.specialization = specialization;
    } else {
      const newProfile = {
        id: new Date(),
        doctor_id: fetchLoginId,
        telPhone: telPhone,
        address: address,
        specialization: specialization,
      };

      fetchProfileDetails.push(newProfile);
    }
    localStorage.setItem(
      LOCALSTORAGE_DOCTOR_DETAIL,
      JSON.stringify(fetchProfileDetails)
    );

    window.location.href = "./dashboard.html";
  }
});
