export class Input {
  input;
  startCaretPos;
  endCaretPos;
  debug;

  constructor(input, debug = true) {
    this.startCaretPos = 0;
    this.endCaretPos = 0;
    this.input = input;
    this.debug = debug;

    // binds
    this.onFocusHandler = this.onFocusHandler.bind(this);

    this.render();
  }

  // Warn: when 2 or more keyboards - the event is called several times // Need to fix. One handler for all keyboards??? static and dynamic input
  onFocusHandler(event) {
    const focusedEl = event.target;

    if (!["INPUT", "TEXTAREA"].includes(focusedEl.nodeName)) return;

    this.input = focusedEl;

    // Set current caret position
    // const { start, end } = this.getCaretPosition();
    // this.startCaretPos = start;
    // this.endCaretPos = end;

    if (this.debug) {
      console.warn("Input has been changed: ", this.input);
    }
  }

  getCaretPosition() {
    if (!this.input) return;

    if (document.selection) {
      this.input.focus();
      const range = document.selection.createRange();
      const rangelen = range.text.length;
      range.moveStart("character", -this.input.value.length);
      const start = range.text.length - rangelen;
      return {
        start: start,
        end: start + rangelen,
      };
    } else if (this.input.selectionStart || this.input.selectionStart == "0") {
      return {
        start: this.input.selectionStart,
        end: this.input.selectionEnd,
      };
    } else {
      return {
        start: 0,
        end: 0,
      };
    }
  }

  setCaretPosition(start = 0, end = 0) {
    if (!this.input) return;

    if (this.input.setSelectionRange) {
      this.input.focus();
      this.input.setSelectionRange(start, end);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd("character", end);
      range.moveStart("character", start);
      range.select();
    }

    this.startCaretPos = start;
    this.endCaretPos = end;
  }

  deleteValue(isBackspaceDelete = true) {
    if (!this.input || !this.input.value) return;

    const newValueArr = this.input.value.split("");
    let { start, end } = this.getCaretPosition();

    // If more than 1 character
    if (end - start > 0) {
      newValueArr.splice(start, end - start);
      end = start;
    } else {
      if (isBackspaceDelete) {
        newValueArr.splice(start - 1, 1);
        start = end -= 1;
      } else {
        newValueArr.splice(start, 1);
      }
    }

    this.input.value = newValueArr.join("");

    // Update curr caret position
    this.setCaretPosition(start, end);

    if (this.debug) {
      console.warn("Input value has been updated:", this.input.value);
    }
  }

  updateValue(value) {
    if (!this.input || !value) return;

    const { start, end } = this.getCaretPosition();

    // Create new value (for example, added value = N, | - caret position, input value before "ab|c", after "abNc", )
    this.input.value =
      this.input.value.slice(0, start) + value + this.input.value.slice(end);

    // Update curr caret position
    this.setCaretPosition(start + value.length, end + value.length);

    if (this.debug) {
      console.warn("Input value has been updated:", this.input.value);
    }
  }

  render() {
    document.addEventListener("click", this.onFocusHandler, true);
  }

  destroy() {
    this.input = null;
    this.caret = null;
    this.startCaretPos = null;
    this.endCaretPos = null;
    document.removeEventListener("click", this.onFocusHandler, true);
  }
}
