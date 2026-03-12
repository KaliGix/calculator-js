const screen = document.querySelector(".screen");
const buttonResult = document.querySelector("#result");
const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".addnumer");

buttonResult.classList.add("result");
buttonResult.addEventListener("click", changeResultFocus);


numberButtons.forEach((btn) => {
  btn.addEventListener("click", addOperand);
});

let firstValue = "";
let waitingForNumber = false;
let lastValue = "";
let operator = "";

function addOperand(event) {
  if (screen.value === "Error") removeErrorMessage();

  if (waitingForNumber) {
    lastValue += event.target.textContent;
    screen.value = lastValue;
  } else {
    screen.value += event.target.textContent;
  }

 changeOperandFocus(event);
}

//UI Opernad Focus
function changeOperandFocus(event){
   operatorButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  buttonResult.classList.remove("resultActive");

  numberButtons.forEach((btn)=> {
    btn.classList.remove("operandActive");
  });
  
  event.target.classList.add("operandActive")
}

//UI Error message
function removeErrorMessage() {
  screen.value = "";
  screen.classList.remove("errorMessage");
}

function addOperator(op, clickedButton) {
  if (screen.value !== "" && screen.value !== "Error") {
    if (lastValue !== "") return changeOperatorFocus(clickedButton);

    firstValue = screen.value;
    operator = op;
    waitingForNumber = true;
  }
  changeOperatorFocus(clickedButton);
}

function changeOperatorFocus(clickedButton) {

   numberButtons.forEach((btn)=> {
    btn.classList.remove("operandActive")
  });

  buttonResult.classList.remove("resultActive");

  operatorButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  clickedButton.classList.add("active");
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
          waitingForNumber = false;
        }
        break;
    }

    cleanOperatorUI();
    firstValue = screen.value !== "Error" ? screen.value : "";
    lastValue = "";
  } else
    throw new Error(
      "You should enter numbers and operator before getting a result.",
    );
}

//UI Result Focus
function changeResultFocus() {
  operatorButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  numberButtons.forEach((btn)=> {
    btn.classList.remove("operandActive");
  });

  buttonResult.classList.add("resultActive");
}

function resetValues() {
  resetButtonFocus();
  screen.value = "";
  operator = "";
  firstValue = "";
  lastValue = "";
  waitingForNumber = false;
  console.clear();
}

function resetButtonFocus() {
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
  numberButtons.forEach((btn)=>{btn.classList.remove("operandActive")});
  buttonResult.classList.remove("resultActive");
}

function cleanOperatorUI(){
  operatorButtons.forEach((btn) => btn.classList.remove("active"));
}
