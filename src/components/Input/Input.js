export class Input {
  input;
  caret;

  constructor(initinput = null) {
    this.input = initinput;
    this.render();
  }

  onFocusHandler(event) {
    const focusedEl = event.target;
    if (!["INPUT", "TEXTAREA"].includes(focusedEl.nodeName)) return;

    this.input = focusedEl;

    console.log("Input has been changed: ", this);
  }

  changeValue(value) {
    if (this.input) this.input.value += value;
  }

  initInutHanlders() {
    this.test = this.onFocusHandler.bind(this);
    document.addEventListener("focus", this.test, true);
  }

  render() {
    console.log("Init input handlers");
    this.initInutHanlders();
  }

  destroy() {
    this.input = null;
    this.caret = null;
    document.removeEventListener("focus", this.test, true);
  }
}

export class InputCaret {
  startCaretPosition;
  endCaretPosition;

  constructor(startPos, endPos) {
    this.startCaretPosition = startPos ? startPos : 0;
    this.endCaretPosition = endPos ? endPos : 0;

    console.log("Input caret is created", this);
  }

  setCaretPostion(value) {}

  getCaretPosition(value) {}
}
