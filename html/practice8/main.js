$(document).ready(function () {
  function loadCountries() {
    var countries = ["India", "Australia", "New Zealand"];
    var selectCountry = document.getElementById("selectCountry");
    selectCountry.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Country";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectCountry.appendChild(defaultOption);

    for (var i = 0; i < countries.length; i++) {
      var option = document.createElement("option");
      option.value = countries[i];
      option.text = countries[i];
      selectCountry.appendChild(option);
    }
  }

  loadCountries();

  $("#reservationForm").validate({
    rules: {
      txtFirstName: {
        required: true,
        minlength: 2,
      },
      txtLastName: {
        required: true,
        minlength: 2,
      },
      dateDOB: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      telPhone: {
        required: true,
      },
      txtAddress: {
        required: true,
      },
      txtPostal: {
        required: true,
      },
      selectCountry: {
        required: true,
      },
      txtCity: {
        required: true,
      },
      txtRegion: {
        required: true,
      },
      dateDeparture: {
        required: true,
      },
      timeDeparture: {
        required: true,
      },
      dateReturn: {
        required: true,
      },
      timeReturn: {
        required: true,
      },
      txtDepartingFrom: {
        required: true,
      },
      txtDestination: {
        required: true,
      },
      selectAirLine: {
        required: true,
      },
      selectFare: {
        required: true,
      },
    },

    messages: {
      txtFirstName: {
        required: "Please enter your firstname",
        minlength: "Firstname must be at least 2 characters",
      },
      txtLastName: {
        required: "Please enter your lastname",
        minlength: "Lastname must be at least 2 characters",
      },
      dateDOB: {
        required: "Please enter your date of birth",
      },
      email: {
        required: "Please enter a valid email address",
        email: "Please enter a valid email address",
      },
      telPhone: {
        required: "Please enter your phone number",
      },
      txtAddress: {
        required: "Please enter your address",
      },
      txtPostal: {
        required: "Please enter your postal/zip code",
      },
      selectCountry: {
        required: "Please select your country",
      },
      txtCity: {
        required: "Please enter your city",
      },
      txtRegion: {
        required: "Please enter your region",
      },
      dateDeparture: {
        required: "Please enter your departure date",
      },
      timeDeparture: {
        required: "Please enter your departure time",
      },
      dateReturn: {
        required: "Please enter your return date",
      },
      timeReturn: {
        required: "Please enter your return time",
      },
      txtDestination: {
        required: "Please enter your destination",
      },
      selectAirLine: {
        required: "Please select your airline",
      },
      selectFare: {
        required: "Please select your fare type",
      },
    },

    errorClass: "custom-error-message",

    submitHandler: function (form) {
      let formDataWithEncodedURL = $(form).serialize();
      console.log("Form data:", formDataWithEncodedURL);

      //   var formDataJSONFormat = {};
      //   $(form)
      //     .serializeArray()
      //     .forEach(function (field) {
      //       formData[field.name] = field.value;
      //     });
      //   console.log(
      //     "Form data in JSON format:",
      //     JSON.stringify(formDataJSONFormat)
      //   );
    },
  });
});
