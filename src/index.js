import { Keyboard } from "./components/Keyboard";
import keyboardConfig from "./components/keyboardConfig";
import "./styles/index.scss";

const root = document.getElementById("root");

// Create inputs
const inputEl = document.createElement("input");
inputEl.id = "testInput";
root.appendChild(inputEl);

const inputEl1 = document.createElement("textarea");
inputEl1.id = "testInput1";
root.appendChild(inputEl1);

// Create keyboard
let start = performance.now();
const keyboard = new Keyboard(root, keyboardConfig);
let end = performance.now();
console.log("Time (milliseconds:microseconds):", end - start);

// // Create keyboard1
// start = performance.now();
// const keyboard1 = new Keyboard(root, keyboardConfig);
// end = performance.now();
// console.log("Time (milliseconds:microseconds):", end - start);
