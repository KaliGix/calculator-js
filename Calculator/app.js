const screen = document.querySelector(".screen");
const buttonResult = document.querySelector(".result");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".addOperand");
const errorMessageContainer = document.querySelector(".errorMessageContainer");

buttonResult.addEventListener("click", changeResultFocus);

numberButtons.forEach((btn) => {
  btn.addEventListener("click", addOperand);
});

let firstValue = "";
let isOperandPressed = false;
let lastValue = "";
let operator = "";

/********************* Logical Functions*************** */

function addOperand(event) {
  if (screen.value === "Error") removeErrorMessage();

    
    if (isOperandPressed) {
      lastValue +=   event.target.textContent;
      screen.value = lastValue;
    } else {
      screen.value += event.target.textContent;
    }

  changeOperandFocus(event);
}

function addOperator(op, clickedButton) {
  if (screen.value !== "" && screen.value !== "Error") {
    if (lastValue !== "") return changeOperatorFocus(clickedButton);

    firstValue = screen.value;
    operator = op;
    isOperandPressed = true;
  }
  changeOperatorFocus(clickedButton);
}

function calculateResult() {
  if (firstValue !== "" && lastValue !== "") {
    firstValue = Number(firstValue);
    lastValue = Number(lastValue);

    switch (operator.trim()) {
      case "X":
        screen.value = firstValue * lastValue;
        break;

      case "+":
        screen.value = firstValue + lastValue;
        break;

      case "-":
        screen.value = firstValue - lastValue;
        break;

      case "/":
        if (lastValue !== 0) screen.value = firstValue / lastValue;
        else {
          screen.classList.add("errorMessage");
          screen.value = "Error";
          isOperandPressed = false;
        }
        break;
    }

    resetButtonFocus();
    firstValue = screen.value !== "Error" ? screen.value : "";
    lastValue = "";
  } else errorMessageDisplay("block");
}

function resetValues() {
  resetButtonFocus();
  screen.value = "";
  operator = "";
  firstValue = "";
  lastValue = "";
  isOperandPressed = false;
}

//**************** UI Functions********** */

function errorMessageDisplay(value) {
  errorMessageContainer.style.display = value;
}

//UI Operand Focus
function changeOperandFocus(event) {
  errorMessageDisplay("none");
  clearFocus();
  event.target.classList.add("operandActive");
}

//UI Error message
function removeErrorMessage() {
  screen.value = "";
  screen.classList.remove("errorMessage");
}

function changeOperatorFocus(clickedButton) {
  errorMessageDisplay("none");
  clearFocus();
  clickedButton.classList.add("active");
}

//UI Result Focus
function changeResultFocus() {
  clearFocus();
  buttonResult.classList.add("resultActive");
}

function clearFocus() {
  numberButtons.forEach((btn) => {
    btn.classList.remove("operandActive");
  });

  buttonResult.classList.remove("resultActive");

  operatorButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function resetButtonFocus() {
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
  numberButtons.forEach((btn) => {
    btn.classList.remove("operandActive");
  });
  buttonResult.classList.remove("resultActive");
}
