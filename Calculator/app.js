const screen = document.querySelector(".screen");
const buttonResult = document.querySelector(".result");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".addnumer");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", addNumber);
});

let firstValue = "";
let waitingForNumber = false;
let lastValue = "";
let operator = "";

function addNumber(event) {
  if (screen.value === "Error") removeErrorMessage();

  if (waitingForNumber) {
    // screen.value = "";
    lastValue += event.target.textContent;
    screen.value = lastValue;

    console.log("Lastvalue" + lastValue);
  } else {
    screen.value += event.target.textContent;
    waitingForNumber = false;
    console.log(waitingForNumber);
  }

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
    if (lastValue !== "") return changeOperatorFocus(clickedButton);

    firstValue = screen.value;
    console.log("firstvalue" + firstValue);
    operator = op;

    waitingForNumber = true;
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
  if (firstValue !== "" && lastValue !== "") {
    console.log(firstValue + " " + operator + " " + lastValue);
    firstValue = Number(firstValue);
    lastValue = Number(lastValue);

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
    }

    cleanOperatorUI();
    firstValue = screen.value !== "Error" ? screen.value : "";
    console.log("first value at the end of the operation: " + firstValue);
    lastValue = "";
  } else
    throw new Error(
      "You should enter numbers and operator before getting a result.",
    );
}

function resetValues() {
  cleanOperatorUI();
  screen.value = "";
  operator = "";
  firstValue = "";
  lastValue = "";
  waitingForNumber = false;
}

function cleanOperatorUI() {
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
}
