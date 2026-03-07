// Input element that displays the current value and results
const screen = document.querySelector(".screen");

// Button used to calculate the result (=)
const buttonResult = document.querySelector(".result");

// All operator buttons (+, -, X, %)
const operatorButtons = document.querySelectorAll(".operator");

// Stores the first operand entered before selecting an operator
let firstValue;
let secondValue;

// Stores the currently selected operator
// Empty string means no operator has been selected yet
let operator = "";

// Initial UI state setup
changeBtnState();
// changeBtnOpState();


/**
 * Toggles the enabled/disabled state of the result button.
 * Used to control when the user is allowed to calculate.
 */
function changeBtnState(){
    buttonResult.disabled = !buttonResult.disabled;
}


/**
 * Appends a numeric value to the screen.
 * Called every time a number button is pressed.
 */
function addNumber(value){
    screen.value += value;  
}


/**
 * Handles operator selection.
 * - Saves the current screen value as the first operand
 * - Stores the selected operator
 * - Updates the UI to reflect the active operator
 */
function addOperator(op, clickedButton){

    if(screen.value !== ""){
         firstValue = parseInt(screen.value);   
         erasePreviusNumber();  
    }

    operator = op;
    // Remove active state from all operators
    operatorButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    // Highlight the selected operator
    clickedButton.classList.add("active");

    console.log(op);
}

function erasePreviusNumber(){
    screen.value = "";
    changeBtnState();
}

/**
 * Executes the calculation based on the selected operator.
 * Uses the stored firstValue and the current screen value.
 */
function calculateResult(){
  
    if(screen.value !== ""){
        switch(operator){

            case "X":
                screen.value = firstValue * screen.value;
                break;

            case "+":
                screen.value = firstValue + parseInt(screen.value);
                break;

            case "-":
                screen.value = firstValue - parseInt(screen.value);
                break;

            case "%":
                screen.value = firstValue / parseInt(screen.value);
                break;
        }

        // Reset operator UI after calculation
        cleanOperatorUI();
        changeBtnState();
    }
}

/**
 * Resets the calculator UI without clearing stored logic.
 * Used when starting a new operation.
 */
function resetComponetsUI(){
    screen.value = "";
    changeBtnState();
    cleanOperatorUI();
    operator = "";
}

/**
 * Removes the active state from all operator buttons.
 * Keeps UI and internal state in sync.
 */
function cleanOperatorUI(){
    operatorButtons.forEach(btn => btn.classList.remove("active"));
}




