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

    // Get currnet cursor pos
    const { start, end } = this.getCaretPosition(focusedEl);
    this.startCaretPos = start;
    this.endCaretPos = end;

    this.input = focusedEl;

    if (this.debug) {
      console.warn("Input has been changed: ", this.input);
    }
  }

  getCaretPosition(ctrl) {
    if (document.selection) {
      ctrl.focus();
      var range = document.selection.createRange();
      var rangelen = range.text.length;
      range.moveStart("character", -ctrl.value.length);
      var start = range.text.length - rangelen;
      return {
        start: start,
        end: start + rangelen,
      };
    } else if (ctrl.selectionStart || ctrl.selectionStart == "0") {
      return {
        start: ctrl.selectionStart,
        end: ctrl.selectionEnd,
      };
    } else {
      return {
        start: 0,
        end: 0,
      };
    }
  }

  setCaretPosition(input, start, end) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd("character", end);
      range.moveStart("character", start);
      range.select();
    }
  }

  // Need optimization
  updateValue(value) {
    if (!this.input || !value) return;

    const { start, end } = this.getCaretPosition(this.input);

    // Create new value (for example, added value = N, input value before "ab|c", after "abNc")
    const newValue =
      this.input.value.slice(0, start) + value + this.input.value.slice(end);

    // Need if value has more then 1 character
    this.startCaretPos = start + value.length;
    this.endCaretPos = end + value.length;

    // Get length of value for start and end caret positions
    this.input.value = newValue;
    this.setCaretPosition(this.input, this.startCaretPos, this.endCaretPos);
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
