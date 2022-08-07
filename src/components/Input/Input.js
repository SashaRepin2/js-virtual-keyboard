export class Input {
  input;
  isFixedInput;
  startCaretPos;
  endCaretPos;
  debug;

  constructor(input = null, isFixedInput = false, debug = true) {
    this.startCaretPos = 0;
    this.endCaretPos = 0;
    this.input = input;
    this.isFixedInput = isFixedInput;
    this.debug = debug;

    // binds (need create func that will bind)
    this.onClickHandler = this.onClickHandler.bind(this);
    this.getCaretPosition = this.getCaretPosition.bind(this);
    this.setCaretPosition = this.setCaretPosition.bind(this);

    this.render();
  }

  // Warn: when 2 or more keyboards - the event is called several times // Need to resolve. One handler for all keyboards???
  onClickHandler(event) {
    const focusedEl = event.target;

    if (
      !["INPUT", "TEXTAREA"].includes(focusedEl.nodeName) ||
      (this.isFixedInput && focusedEl !== this.input)
    )
      return;

    this.input = focusedEl;

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

  // Supported emoji delete
  removeValue(isBackspaceDelete = true) {
    if (!this.input || !this.input.value) return;

    // Get caret position and selection lenght
    let { start, end } = this.getCaretPosition();

    const oldInputValue = this.input.value;
    const emojiMatchedReg = /\p{Extended_Pictographic}/gu;

    // more than 1 character
    if (end - start > 0) {
      this.input.value =
        oldInputValue.substr(0, start) + oldInputValue.substr(end);
      this.setCaretPosition(start, start);
    } else {
      const checkEmojiStr = oldInputValue.slice(start - 2, start);
      const emojiMatched = emojiMatchedReg.test(checkEmojiStr);

      if (emojiMatched) {
        this.input.value =
          oldInputValue.substr(0, start - 2) + oldInputValue.substr(end);
        this.setCaretPosition(start - 1, start - 1);
      } else {
        this.input.value =
          oldInputValue.substr(0, start - 1) + oldInputValue.substr(end);
        this.setCaretPosition(start - 1, start - 1);
      }
    }

    if (this.debug) {
      console.warn("Input value has been updated:", this.input.value);
    }
  }

  addValue(value) {
    if (!this.input || !value) return;

    const { start, end } = this.getCaretPosition();

    // Create new value (for example, added value = N, | - caret position, input value before "ab|c", after "abNc", )
    this.input.value =
      this.input.value.substr(0, start) + value + this.input.value.substr(end);

    // Update curr caret position
    this.setCaretPosition(start + value.length, end + value.length);

    if (this.debug) {
      console.warn("Input value has been updated:", this.input.value);
    }
  }

  render() {
    document.addEventListener("click", this.onClickHandler, true);
  }

  destroy() {
    this.input = null;
    this.caret = null;
    this.startCaretPos = null;
    this.endCaretPos = null;
    this.isFixedInput = null;

    document.removeEventListener("click", this.onClickHandler, true);
  }
}
