const screen = document.querySelector(".screen");
const buttonResult = document.querySelector(".result");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".addnumer");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", addNumber);
});

let firstValue = null;
let waitingForNumber = false;
var lastValue = null;
let operator = "";

function addNumber(event) {
  if (screen.value === "Error") removeErrorMessage();

  if (waitingForNumber) {
    screen.value = event.target.textContent;
    lastValue += Number(screen.value);
    waitingForNumber = false;
  } else screen.value += event.target.textContent;

  operatorButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function removeErrorMessage() {
  screen.value = "";
  screen.classList.remove("errorMessage");
}

function doMath(op, clickedButton) {
  if (screen.value !== "") {
    firstValue = lastValue != null ? lastValue : Number(screen.value);
    operator = op;
    waitingForNumber = true;
    console.log("Enter the matrix");
  }
  changeOperatorFocus(clickedButton);
}

function changeOperatorFocus(clickedButton) {
  operatorButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  clickedButton.classList.add("active");
}

function calculateResult() {
  if (firstValue !== null && lastValue !== null) {
    console.log("calculateResult()");

    switch (operator) {
      case "X":
        screen.value = firstValue * lastValue;
        break;

      case "+":
        screen.value = firstValue + lastValue;
        break;

      case "-":
        screen.value = firstValue - lastValue;
        break;

      case "%":
        if (lastValue !== 0) screen.value = firstValue / lastValue;
        else {
          screen.classList.add("errorMessage");
          screen.value = "Error";
        }
        break;

      default:
        screen.value = "Bug";
    }

    cleanOperatorUI();
    firstValue = null;
  } else
    throw new Error(
      "You should enter numbers and operator before getting a result.",
    );
}

function resetValues() {
  screen.value = "";
  cleanOperatorUI();
  operator = "";
  firstValue = null;
}

function cleanOperatorUI() {
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
}
