import "./styles/index.scss";
import keyboardConfig from "./utils/keyboardConfig";
import Keyboard from "./components/Keyboard/Keyboard";

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

const keyboardOptions = {
  panel: { isCanHide: true, isCanClose: true },
  input: { initInput: inputEl, isFixedInput: true },
};

// Create keyboard
let start = performance.now();
const keyboard = new Keyboard(
  root,
  keyboardConfig,
  keyboardOptions.panel,
  keyboardOptions.input,
  true
);
let end = performance.now();
console.log("Time (milliseconds:microseconds):", end - start);
