// Input element that displays the current value and results
const screen = document.querySelector(".screen");

// Button used to calculate the result (=)
const buttonResult = document.querySelector(".result");

// All operator buttons (+, -, X, %)
const operatorButtons = document.querySelectorAll(".operator");


const numberButtons = document.querySelectorAll(".addnumer");

//When we use queryselectorAll we must iterate all the elment and add the event to each one
//otherwise will be an error. QuerySelectorAll return a NodeList
numberButtons.forEach(btn => {
    btn.addEventListener("click",addNumber);
});


let firstValue = null;
let getPreviusValue = "";
let waitingForNumber = false;
let operator = "";


function addNumber(event){
      
    if(waitingForNumber){
        screen.value = event.target.textContent;
        waitingForNumber = false;
    }
    else
        screen.value += event.target.textContent;
        
}

function doMath(op, clickedButton){

    if(screen.value !== ""){
         firstValue = parseInt(screen.value);   
         operator = op;
         waitingForNumber = true;
    }

    operatorButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    clickedButton.classList.add("active");
}


function calculateResult(){
    
    if(firstValue!== null && !waitingForNumber){
           
        var lastValue = Number(screen.value);
        switch(operator){

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
                if(lastValue !==0)
                    screen.value = firstValue / lastValue;
                else
                    screen.value = "Error";
                break;
        }
       
        cleanOperatorUI();
        firstValue = null;
    }
    else
        throw new Error("You should enter numbers and operator before getting a result.");
}

function resetValues(){
    screen.value = "";
    cleanOperatorUI();
    operator = "";
    firstValue = null; 
}

function cleanOperatorUI(){
    operatorButtons.forEach(btn => btn.classList.remove("active"));
}




