const listHaveYouEverHad = [
  "Anemia",
  "Asthma",
  "Arthritis",
  "Cancer",
  "Gout",
  "Diabetes",
  "Emotional Disorder",
  "Epilepsy Seizures",
  "Fainting Spells",
  "Gallstones",
  "Heart Disease",
  "Heart Attack",
  "Rheumatic Fever",
  "High Blood Pressure",
  "Digestive Problems",
  "Ulcerative Colitis",
  "Ulcer Disease",
  "Hepatitis",
  "Kidney Disease",
  "Liver Disease",
  "Sleep Apnea",
  "Use a C-PAP machine",
  "Thyroid Problems",
  "Tuberculosis",
  "Venereal Disease",
  "Neurological Disorders",
  "Bleeding Disorders",
  "Lung Disease",
  "Emphysema",
];

const exerciseList = ["Never", "1-2 days", "3-4 days", "5+ days"];
const eatingDietList = [
  "I have a loose diet",
  "I have a strict diet",
  "I don't have a diet plan",
];
const alcoholConsumptionList = [
  "I don't drink",
  "1-2 glasses/day",
  "3-4 glasses/day",
  "5+ galsses/day",
];
const caffeineConsumptionList = [
  "I don't use caffeine",
  "1-2 cups/day",
  "3-4 cups/day",
  "5+ cups/day",
];
const smokeList = ["No", "0-1 packs/day", "1-2 packs/day", "2+ packs/day"];

const checkboxHaveYouEverHad = document.getElementById(
  "checkboxHaveYouEverHad"
);
listHaveYouEverHad.forEach((item) => {
  var div = document.createElement("div");
  var label = document.createElement("label");
  label.textContent = item;
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "haveYouEverHad";
  checkbox.value = item;

  div.appendChild(checkbox);
  div.appendChild(label);

  checkboxHaveYouEverHad.appendChild(div);
});

const rdExercise = document.getElementById("rdExercise");
exerciseList.forEach((item) => {
  var div = document.createElement("div");
  var label = document.createElement("label");
  label.textContent = item;
  var checkbox = document.createElement("input");
  checkbox.type = "radio";
  checkbox.name = "RdExerice";
  checkbox.value = item;

  div.appendChild(checkbox);
  div.appendChild(label);

  rdExercise.appendChild(div);
});

const rdEatingDiet = document.getElementById("rdEatingDiet");
eatingDietList.forEach((item) => {
  var div = document.createElement("div");
  var label = document.createElement("label");
  label.textContent = item;
  var checkbox = document.createElement("input");
  checkbox.type = "radio";
  checkbox.name = "rdEatingDiet";
  checkbox.value = item;

  div.appendChild(checkbox);
  div.appendChild(label);

  rdEatingDiet.appendChild(div);
});

const rdAlcoholConsumptions = document.getElementById("rdAlcoholConsumptions");
alcoholConsumptionList.forEach((item) => {
  var div = document.createElement("div");
  var label = document.createElement("label");
  label.textContent = item;
  var checkbox = document.createElement("input");
  checkbox.type = "radio";
  checkbox.name = "rdAlcoholConsumptions";
  checkbox.value = item;

  div.appendChild(checkbox);
  div.appendChild(label);

  rdAlcoholConsumptions.appendChild(div);
});

const rdCaffeineConsumption = document.getElementById("rdCaffeineConsumption");
caffeineConsumptionList.forEach((item) => {
  var div = document.createElement("div");
  var label = document.createElement("label");
  label.textContent = item;
  var checkbox = document.createElement("input");
  checkbox.type = "radio";
  checkbox.name = "rdCaffeineConsumption";
  checkbox.value = item;

  div.appendChild(checkbox);
  div.appendChild(label);

  rdCaffeineConsumption.appendChild(div);
});

const rdSmoke = document.getElementById("rdSmoke");
smokeList.forEach((item) => {
  var div = document.createElement("div");
  var label = document.createElement("label");
  label.textContent = item;
  var checkbox = document.createElement("input");
  checkbox.type = "radio";
  checkbox.name = "rdSmoke";
  checkbox.value = item;

  div.appendChild(checkbox);
  div.appendChild(label);

  rdSmoke.appendChild(div);
});

// validation
$(document).ready(function () {
  $("#patientInformationForm").validate({
    rules: {
      selectPatientGender: {
        required: true,
      },
      txtFirstName: {
        required: true,
        minlength: 2,
      },
      txtLastName: {
        required: true,
        minlength: 2,
      },
      patientBirthDateMonth: {
        required: true,
      },
      patientBirthDateDay: {
        required: true,
      },
      patientBirthDateYear: {
        required: true,
      },
      numPatientHeight: {
        required: true,
      },
      numPatientWidth: {
        required: true,
      },
      emailPatientEmail: {
        required: true,
        email: true,
      },
      txtReasonForSeeingTheDoctor: {
        required: true,
      },
    },
    messages: {
      selectPatientGender: {
        required: "Please select the patient's gender",
      },
      txtFirstName: {
        required: "Please enter the first name",
        minLength: "firstname must be at least 2 characters",
      },
      txtLastName: {
        required: "Please enter the last name",
        minLength: "lastname must be at least 2 characters",
      },
      patientBirthDateMonth: {
        required: "Please select the month",
      },
      patientBirthDateDay: {
        required: "Please select the day",
      },
      patientBirthDateYear: {
        required: "Please select the year",
      },
      numPatientHeight: {
        required: "Please enter the patient's height",
      },
      numPatientWidth: {
        required: "Please enter the patient's weight",
      },
      emailPatientEmail: {
        required: "Please enter the patient's email",
        email: "Please enter a valid email address",
      },
      txtReasonForSeeingTheDoctor: {
        required: "Please provide the reason for seeing the doctor",
      },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    highlight: function (element, errorClass, validClass) {
      $(element).css({ border: "1px solid red" });
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).css({ border: "1px solid black" });
    },

    invalidHandler: function (event, validator) {
      var errors = validator.errorList;
      if (errors.length) {
        var errorsCount = validator.numberOfInvalids();
        var errorMessage = "";
        for (var i = 0; i < errors.length; i++) {
          errorMessage += "- " + errors[i].message + "\n";
        }
        alert(
          `You missed ${errorsCount} field. It has been highlighted` +
            "\n" +
            errorMessage
        );
      }
    },

    submitHandler: function (form) {
      alert("Your details have been added successfully");
      const formDataArray = $(form).serializeArray();
      console.log(formDataArray);
    },
  });
});
