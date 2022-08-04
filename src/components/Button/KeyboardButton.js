class KeyboardButton {
  parentDOM;
  buttonDOM;
  defaultValue;
  shiftValue;
  type;

  //
  onKeyClickCallback;

  constructor(parentDOM, defaultValue, shiftValue, type, callback) {
    this.parentDOM = parentDOM;
    this.defaultValue = defaultValue;
    this.shiftValue = shiftValue;
    this.type = type;

    this.onKeyClickCallback = callback;

    if (this.parentDOM) {
      this.render();
    } else {
      throw new Error("The parent dom element not found");
    }
  }

  getCurrentButtonValue() {}

  rerender(isShiftOrCaps = false) {
    // how to understand what state keyboard is now?
    // change buttonDOM. Can dont delete DOM EL, just change textContent
    //

    if (this.buttonDOM && this.shiftValue) {
      this.buttonDOM.textContent = isShiftOrCaps
        ? this.shiftValue
        : this.defaultValue;
    }

    // const inactiveValueEl =
    //   this.buttonDOM.getElementsByClassName("button__inactive")[0];
    // if (inactiveValueEl) {
    //   inactiveValueEl.textContent = isShifted
    //     ? this.defaultValue
    //     : this.shiftValue;
    // }
  }

  render() {
    // Create button
    const buttonEl = document.createElement("button");

    // Аctive value is a value that depends on the current state of the keyboard
    const activeValue = this.getCurrentButtonValue();

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

    // buttonEl.classList.add("button__active");
    buttonEl.textContent = this.defaultValue;

    buttonEl.onclick = () => {
      this.onKeyClickCallback({
        value: this.defaultValue,
        shift: this.shiftValue,
        type: this.type,
      });
    };

    this.buttonDOM = buttonEl;
    this.parentDOM.appendChild(this.buttonDOM);
  }

  destroy() {
    this.buttonDOM.remove();
    this.buttonDOM = null;
    this.defaultValue = null;
    this.shiftValue = null;
    this.parentDOM = null;
  }
}

export default KeyboardButton;
