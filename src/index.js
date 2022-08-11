import "./styles/index.scss";
import Keyboard from "./components/Keyboard/Keyboard";
import keyboardConfig from "./consts/keyboardConfig";

const root = document.getElementById("root");
const inputContainer = document.getElementsByClassName("container")[0];
root.appendChild(inputContainer);

// Create inputs
const inputEl = document.createElement("input");
inputEl.id = "testInput";
inputContainer.appendChild(inputEl);

const inputEl1 = document.createElement("textarea");
inputEl1.id = "testInput1";
inputContainer.appendChild(inputEl1);

// Example config
const keyboardOptions = {
  keyboardKeysConfig: keyboardConfig,
  inputOptions: { input: inputEl, isFixedInput: true },
  panelOptions: { isCanHide: true, isCanClose: false },
};

// Create keyboard
let start = performance.now();

// Without any parameters
const keyboard = new Keyboard();

let end = performance.now();
console.log("Time (milliseconds:microseconds):", end - start);
