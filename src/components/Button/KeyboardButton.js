class KeyboardButton {
  buttonDom;
  defaultValue;
  shiftValue;
  type;

  constructor(defaultValue, shiftValue) {
    this.defaultValue = defaultValue;
  }

  render() {}
  destroy() {
    this.buttonDom = null;
    this.defaultValue = null;
    this.shiftValue = null;
  }
}

export default KeyboardButton;
