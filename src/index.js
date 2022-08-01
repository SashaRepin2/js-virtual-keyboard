import { Keyboard } from "./components/Keyboard";
import keyboardConfig from "./components/keyboardConfig";
import "./styles/index.scss";

const root = document.getElementById("root");

// Create inputs
const inputEl = document.createElement("input");
inputEl.id = "testInput";
root.appendChild(inputEl);

const inputEl1 = document.createElement("input");
inputEl1.id = "testInput1";
root.appendChild(inputEl1);

// Create keyboard
const start = performance.now();
const keyboard = new Keyboard(root, keyboardConfig);
const end = performance.now();
console.log("Time (milliseconds:microseconds):", end - start);
