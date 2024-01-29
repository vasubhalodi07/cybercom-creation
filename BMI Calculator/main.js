document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("bmiForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const numHeight = document.getElementById("numHeight");
    const numWeight = document.getElementById("numWeight");
    const resultDisplay = document.getElementById("result");

    if (validateForm(numHeight, numWeight)) {
      let height = parseFloat(numHeight.value);
      let weight = parseFloat(numWeight.value);

      let bmiFormula = weight / (height * height);

      let result = "";
      if (bmiFormula <= 18.4) {
        result = "Underweight";
      } else if (bmiFormula >= 18.5 && bmiFormula <= 24.9) {
        result = "Normal Weight";
      } else if (bmiFormula >= 25 && bmiFormula <= 39.9) {
        result = "Overweight";
      } else {
        result = "Obese";
      }
      resultDisplay.textContent = `BMI: ${bmiFormula.toFixed(2)} - ${result}`;
    }
  });

  function validateForm(numHeight, numWeight) {
    const messageHeight = document.getElementById("messageHeight");
    const messageWeight = document.getElementById("messageWeight");

    messageHeight.textContent = "";
    messageWeight.textContent = "";

    let flag = true;

    const numRegex = /^[0-9]*\.?[0-9]*$/;
    if (!numHeight.value) {
      messageHeight.textContent = "Please enter a height";
      flag = false;
    } else if (!numRegex.test(numHeight.value)) {
      messageHeight.textContent = "Please enter a valid height (numbers only)";
      flag = false;
    } else if (numHeight.value <= 0) {
      messageHeight.textContent = "Height must be greater than zero";
      flag = false;
    }

    if (!numWeight.value) {
      messageWeight.textContent = "Please enter a weight";
      flag = false;
    } else if (!numRegex.test(numWeight.value)) {
      messageWeight.textContent = "Please enter a valid weight (numbers only)";
      flag = false;
    } else if (numWeight.value <= 0) {
      messageWeight.textContent = "Weight must be greater than zero";
      flag = false;
    }

    return flag;
  }
});
