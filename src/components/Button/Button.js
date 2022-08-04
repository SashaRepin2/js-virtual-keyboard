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
    type,
    callback,
    className = "",
    isShiftOrCaps = false
  ) {
    this.parentNode = parentNode;
    this.defaultValue = defaultValue;
    this.shiftValue = shiftValue;
    this.type = type;
    this.buttonClassName = className;

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

    this.buttonNode.classList.add("pressed");

    this.onKeyClickCallback(btnValues);

    setTimeout(() => {
      this.buttonNode.classList.remove("pressed");
    }, 200);
  }

  getCurrentButtonValue(isShiftOrCaps) {
    return isShiftOrCaps ? this.shiftValue : this.defaultValue;
  }

  rerender(isShiftOrCaps = false) {
    // how to understand what state keyboard is now?
    // change buttonNode. Can dont delete DOM EL, just change textContent
    //

    if (this.buttonNode && this.shiftValue) {
      this.buttonNode.textContent = this.getCurrentButtonValue(isShiftOrCaps);
    }

    // const inactiveValueEl =
    //   this.buttonNode.getElementsByClassName("button__inactive")[0];
    // if (inactiveValueEl) {
    //   inactiveValueEl.textContent = isShifted
    //     ? this.defaultValue
    //     : this.shiftValue;
    // }
  }

  render() {
    // Create button
    const buttonEl = document.createElement("button");
    buttonEl.classList.add("btn");

    // For custom styles
    // if (this.buttonClassName) {
    //   buttonEl.classList.add(this.buttonClassName);
    // }

    // Аctive value is a value that depends on the current state of the keyboard
    const activeValue = this.getCurrentButtonValue(this.isShiftOrCaps);

    // if (this.shiftValue) {
    // Create inactive button value (shift value, when state is none shifted, default value when state is shifted)
    // const buttonInactiveValue = document.createElement("div");
    // buttonInactiveValue.classList.add("button__inactive");
    // buttonInactiveValue.textContent = this.shiftValue;
    // buttonEl.appendChild(buttonInactiveValue);
    // // }

    // Create active button value
    // const buttonActiveValue = document.createElement("div");
    // buttonActiveValue.classList.add("button__active");
    // buttonActiveValue.textContent = this.defaultValue;
    // buttonEl.appendChild(buttonActiveValue);

    buttonEl.textContent = activeValue;
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
