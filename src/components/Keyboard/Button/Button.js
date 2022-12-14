import BUTTON_TYPES from "../../../consts/buttonTypes";
import { defaultButtonOptions } from "../../../consts/defaultOptions";

/**
 * The keyboard button class.
 * Contain info about:
 * - btn (default value, shift value and type)
 * - parent, button nodes
 * - state (shift or caps)
 * - callback
 * Also contain render, rerendred and destroy functions
 */
class Button {
  parentDOM;
  buttonDOM;
  defaultValue;
  shiftValue;
  type;

  buttonClassName;

  // States
  isShiftOrCaps;

  // Callbacks
  onKeyClickCallback;

  constructor({
    parentDOM = null,
    defaultValue = "",
    shiftValue = "",
    type = BUTTON_TYPES.DEFAULT,
    callback = null,
    isShiftOrCaps = false,
  } = defaultButtonOptions) {
    this.parentDOM = parentDOM;
    this.defaultValue = defaultValue;
    this.shiftValue = shiftValue;
    this.type = type;

    this.onKeyClickCallback = callback;
    this.onKeyClick = this.onKeyClick.bind(this);

    this.isShiftOrCaps = isShiftOrCaps;

    if (this.parentDOM) {
      this.render();
    } else {
      throw new Error("The parent dom element not found");
    }
  }

  onKeyClick() {
    if (typeof this.onKeyClickCallback !== "function")
      console.error("Button: The button onKeyDownCallback is not function");

    const btn = {
      buttonDOM: this.buttonDOM,
      value: this.defaultValue,
      shift: this.shiftValue,
      type: this.type,
      state: this.isShiftOrCaps,
    };

    this.onKeyClickCallback(btn);
  }

  getCurrentButtonValue(isShiftOrCaps) {
    return isShiftOrCaps ? this.shiftValue : this.defaultValue;
  }

  getCategoriaButton(type) {
    return BUTTON_TYPES.DEFAULT === type ? "func" : "standart";
  }

  rerender(isShiftOrCaps = false) {
    if (this.buttonDOM && this.shiftValue) {
      this.buttonDOM.textContent = this.getCurrentButtonValue(isShiftOrCaps);
    }
  }

  render() {
    // Create button
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("keyboard-btn");
    buttonEl.classList.add(`keyboard-${this.type.toLowerCase()}`);
    // buttonEl.setAttribute("id", this.id);

    // ??ctive value is a value that depends on the current state of the keyboard
    const activeValue = this.getCurrentButtonValue(this.isShiftOrCaps);
    // const spanEl = document.createElement("span");
    buttonEl.textContent = activeValue;

    // buttonEl.appendChild(spanEl);
    buttonEl.addEventListener("click", this.onKeyClick);

    this.buttonDOM = buttonEl;
    this.parentDOM.appendChild(this.buttonDOM);
  }

  destroy() {
    this.buttonDOM.removeEventListener("click", this.onKeyClick);
    this.buttonDOM.remove();
    this.buttonDOM = null;

    this.parentDOM = null;

    this.defaultValue = null;
    this.shiftValue = null;
  }
}

export default Button;
