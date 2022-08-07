import BUTTON_TYPES from "../../utils/buttonTypes";

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
  parentNode;
  buttonNode;
  defaultValue;
  shiftValue;
  type;

  buttonClassName;

  // States
  isShiftOrCaps;

  // Callbacks
  onKeyClickCallback;

  constructor(
    parentNode,
    defaultValue,
    shiftValue,
    type = BUTTON_TYPES.DEFAULT,
    callback,
    isShiftOrCaps = false
  ) {
    this.parentNode = parentNode;
    this.defaultValue = defaultValue;
    this.shiftValue = shiftValue;
    this.type = type;

    this.onKeyClickCallback = callback;
    this.onKeyClick = this.onKeyClick.bind(this);

    this.isShiftOrCaps = isShiftOrCaps;

    if (this.parentNode) {
      this.render();
    } else {
      throw new Error("The parent dom element not found");
    }
  }

  onKeyClick() {
    if (typeof this.onKeyClickCallback !== "function")
      console.error("Button: The button onKeyDownCallback is not function");

    const btnValues = {
      value: this.defaultValue,
      shift: this.shiftValue,
      type: this.type,
      state: this.isShiftOrCaps,
    };

    this.onKeyClickCallback(btnValues);

    // this.buttonNode.classList.add("pressed");

    // setTimeout(() => {
    //   this.buttonNode.classList.remove("pressed");
    // }, 200);
  }

  getCurrentButtonValue(isShiftOrCaps) {
    return isShiftOrCaps ? this.shiftValue : this.defaultValue;
  }

  getCategoriaButton(type) {
    return BUTTON_TYPES.DEFAULT === type ? "func" : "standart";
  }

  rerender(isShiftOrCaps = false) {
    if (this.buttonNode && this.shiftValue) {
      this.buttonNode.textContent = this.getCurrentButtonValue(isShiftOrCaps);
    }
  }

  render() {
    // Create button
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("keyboard-btn");
    buttonEl.classList.add(`keyboard-${this.type.toLowerCase()}`);

    const spanEl = document.createElement("span");

    // Аctive value is a value that depends on the current state of the keyboard
    const activeValue = this.getCurrentButtonValue(this.isShiftOrCaps);

    spanEl.textContent = activeValue;
    buttonEl.appendChild(spanEl);
    buttonEl.addEventListener("click", this.onKeyClick);

    this.buttonNode = buttonEl;
    this.parentNode.appendChild(this.buttonNode);
  }

  destroy() {
    this.buttonNode.removeEventListener("click", this.onKeyClick);
    this.buttonNode.remove();
    this.buttonNode = null;

    this.parentNode = null;

    this.defaultValue = null;
    this.shiftValue = null;
  }
}

export default Button;
