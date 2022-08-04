import BUTTON_TYPES from "../utils/buttonTypes";
import KeyboardButton from "./Button/KeyboardButton";
import { Input } from "./Input/Input";
import "./Keyboard.scss";
import Panel from "./Panel/Panel";

const defaultOptions = {
  isCanHide: true,
  isCanClose: true,
  isShifted: false,
  isCapsed: false,
  debug: true,
};

// TODO: Keyboard: caps and shift keyboard state X
// TODO: Input: when 2 or more keyboards - the event is called several times // Neend fix

export class Keyboard {
  keyboardParentDOM;
  keyboardRootDOM;
  keyboardConfig;
  isShifted;
  isCapsed;

  inputObserver;
  keyboardPanel;
  options;

  // Current buttons of keyboard layout
  buttons;

  constructor(keyboardParentDOM, keyboardKeysConfig, options = defaultOptions) {
    if (typeof window === "undefined") return;

    // additional options
    this.options = options;

    // keyboard states
    this.isShifted = this.options.isShifted;
    this.isCapsed = this.options.isCapsed;

    // current buttons of keyboard
    this.buttons = [];

    this.keyboardParentDOM = keyboardParentDOM;
    this.keyboardConfig = keyboardKeysConfig;

    // binds
    this.onKeyDownHanlder = this.onKeyDownHanlder.bind(this);
    this.render = this.render.bind(this);

    if (this.keyboardParentDOM) {
      this.render();
    } else {
      throw new Error("Keyboard: the parent DOM element not found");
    }
  }

  onKeyDownHanlder(button) {
    if (!button) return;

    switch (button.type) {
      case BUTTON_TYPES.SHIFT:
        this.isShifted = !this.isShifted;
        break;
      case BUTTON_TYPES.CAPSLOCK:
        this.isCapsed = !this.isCapsed;
        break;
      case BUTTON_TYPES.DEFAULT:
        this.onDefaultKeyPress(button);
        break;
      case BUTTON_TYPES.ENTER:
        this.inputObserver.updateValue("\n");
        break;
      case BUTTON_TYPES.TAB:
        this.inputObserver.updateValue("\t");
        break;
      default:
        if (this.options.debug) {
          console.warn(`Unexpected button type ${button.type}`);
        }
        break;
    }

    this.rerender();
  }

  onEnterPress() {}

  onDefaultKeyPress(button) {
    // Btn states: btn has shift (shift=caps) value (btn has two value), btn has not shift value (btn has one value)
    // Get button value
    const value =
      (this.isShifted || this.isCapsed) && button.shift
        ? button.shift
        : button.value;

    // Update input value
    this.inputObserver.updateValue(value);

    // Change keyboard state
    this.isShifted = false;
    this.rerender();
  }

  rerender() {
    // Rerender buttons
    this.buttons.forEach((btn) =>
      btn.rerender(this.isShifted || this.isCapsed)
    );
  }

  render() {
    // Create root container
    const keyboardRootEl = document.createElement("div");
    keyboardRootEl.classList.add("keyboard");

    // Create input observer
    this.inputObserver = new Input();

    // Create keyboard panel
    this.keyboardPanel = new Panel(
      keyboardRootEl,
      this.options.isCanClose,
      this.options.isCanHide,
      null,
      this.destroy.bind(this)
    );

    // Create board layout
    const keyboardLayoutEl = document.createElement("div");
    keyboardLayoutEl.classList.add("keyboard__layout");

    // Create lines & columns
    if (this.keyboardConfig.hasOwnProperty("lines")) {
      this.renderLine(this.keyboardConfig["lines"], keyboardLayoutEl);
    } else {
      this.renderColumn(this.keyboardConfig["columns"], keyboardLayoutEl);
    }

    keyboardRootEl.appendChild(keyboardLayoutEl);

    this.keyboardRootDOM = keyboardRootEl;
    this.keyboardParentDOM.appendChild(this.keyboardRootDOM);

    if (this.options.debug) {
      console.log("Keyborad has been render");
    }
  }

  // ?? optimization - code renderColumn = renderLine
  renderLine(lines, parentEl) {
    for (const line of lines) {
      const lineEl = document.createElement("div");
      lineEl.classList.add("line");

      if (line.hasOwnProperty("buttons")) {
        this.createButtons(line.buttons, lineEl);
      } else {
        this.renderColumn(line.columns, lineEl);
      }

      parentEl.appendChild(lineEl);
    }
  }

  // ?? optimization
  renderColumn(columns, parentEl) {
    for (const column of columns) {
      const columnEl = document.createElement("div");
      columnEl.classList.add("column");

      if (column.hasOwnProperty("buttons")) {
        this.createButtons(column.buttons, columnEl);
      } else {
        this.renderLine(column.lines, columnEl);
      }

      parentEl.appendChild(columnEl);
    }
  }

  //
  createButtons(buttons, parentDOM) {
    for (const button of buttons) {
      const btn = new KeyboardButton(
        parentDOM,
        button.value,
        button.shift,
        button.type,
        this.onKeyDownHanlder
      );
      this.buttons.push(btn);
    }
  }

  parseOptions() {}

  destroy() {
    this.isShifted = null;
    this.isCapsed = null;

    this.keyboardPanel.destroy();
    this.keyboardPanel = null;

    this.inputObserver.destroy();
    this.inputObserver = null;

    this.keyboardRootDOM.remove();
  }
}
