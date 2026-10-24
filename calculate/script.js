/* Theme Toggle */

const toggleElement = document.querySelector(".themes__toggle");

function darkTheme() {
  toggleElement.classList.toggle("themes__toggle--isActive");
}

function darkWithEnter(event) {
  if (event.key === "Enter") {
    darkTheme();
  }
}

toggleElement.addEventListener("click", darkTheme);
toggleElement.addEventListener("keydown", darkWithEnter);

/* Sound Effect */

const buttonSound = new Audio("./button-click.mp3");

function playButtonSound() {
  buttonSound.currentTime = 0;
  buttonSound.play();
}

/* Logic */

let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const recetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateScreen(currentNumber);
};

const excuteOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;

      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;

      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;

      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }

    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) return;

  if (!storedNumber && currentNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) excuteOperation();
  }
};

const keyElementsHandler = (element) => () => {
  playButtonSound();

  const type = element.dataset.type;

  if (type === "number") {
    numberButtonHandler(element.dataset.value);
  } else if (type === "operation") {
    switch (element.dataset.value) {
      case "c":
        recetButtonHandler();
        break;

      case "Backspace":
        deleteButtonHandler();
        break;

      case "Enter":
        excuteOperation();
        break;

      default:
        operationButtonHandler(element.dataset.value);
    }
  }
};

keyElements.forEach((element) => {
  element.addEventListener("click", keyElementsHandler(element));
});

/* Keyboard */

const avilableNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const avilableOperations = ["+", "-", "*", "/"];

window.addEventListener("keydown", (event) => {
  const key = event.key;

  if (
    avilableNumbers.includes(key) ||
    avilableOperations.includes(key) ||
    ["Backspace", "Enter", "c"].includes(key)
  ) {
    playButtonSound();
  }

  if (avilableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (avilableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    excuteOperation();
  } else if (key === "c") {
    recetButtonHandler();
  }
});
window.addEventListener("keydown", (event) => {
  const key = event.key;

  const button = document.querySelector(`.calc__key[data-value="${key}"]`);

  if (button) {
    button.classList.add("hover");
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key;

  const button = document.querySelector(`.calc__key[data-value="${key}"]`);

  if (button) {
    button.classList.remove("hover");
  }
});
