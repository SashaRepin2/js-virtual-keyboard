import BUTTON_TYPES from "../../utils/buttonTypes";
import Button from "./Button/Button";
import Input from "./Input/Input";
import Panel from "./Panel/Panel";

import "./Keyboard.scss";

const defaultOptions = {
  panelOptions: { isCanHide: true, isCanClose: true },
  inputOptions: { initInput: null, isFixedInput: false },
  debug: true,
};

/**
 * The keybaord class (root class)
 * Contains info about:
 *  - current buttons, panel, current input
 *  - keyboard node, parent node
 *  -
 */
class Keyboard {
  keyboardParentDOM;
  keyboardRootDOM;
  keyboardKeysConfig;
  keyboardPanel;
  panelOptions;
  inputOptions;

  // Keyobard states
  isShifted;
  isCapsed;

  // Сhecks for changes to the input field
  inputObserver;

  // Current buttons of keyboard layout
  buttons;

  debug;

  constructor(
    keyboardParentDOM,
    keyboardKeysConfig,
    panelOptions = defaultOptions.panelOptions,
    inputOptions = defaultOptions.inputOptions,
    debug = defaultOptions.debug
  ) {
    if (typeof window === "undefined") return;

    // Keyboard states
    this.isShifted = false;
    this.isCapsed = false;

    // Current buttons of keyboard
    this.buttons = [];

    this.keyboardParentDOM = keyboardParentDOM;
    this.keyboardKeysConfig = keyboardKeysConfig;

    this.panelOptions = panelOptions;
    this.inputOptions = inputOptions;
    this.debug = debug;

    // Binds func
    this.onKeyDownHanlder = this.onKeyDownHanlder.bind(this);
    this.render = this.render.bind(this);
    this.destroy = this.destroy.bind(this);

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
        this.isCapsed = false;
        this.isShifted = !this.isShifted;
        break;
      case BUTTON_TYPES.CAPSLOCK:
        this.isShifted = false;
        this.isCapsed = !this.isCapsed;
        break;
      case BUTTON_TYPES.DEFAULT:
        this.onDefaultKeyPress(button);
        break;
      case BUTTON_TYPES.ENTER:
        this.inputObserver.addValue("\n");
        break;
      case BUTTON_TYPES.TAB:
        this.inputObserver.addValue("\t");
        break;
      case BUTTON_TYPES.BACKSPACE:
        this.inputObserver.removeValue();
        break;
      case BUTTON_TYPES.ESC:
        // reset input
        this.inputObserver.input = null;
        break;
      case BUTTON_TYPES.SPACE:
        this.inputObserver.addValue(" ");
        break;
      case BUTTON_TYPES.INSERT:
        this.inputObserver.insertSelected();
        break;
      case BUTTON_TYPES.COPY:
        this.inputObserver.copySelected();
        break;
      case BUTTON_TYPES.PAGEUP:
        this.onPageKeyPress(true);
        break;
      case BUTTON_TYPES.PAGEDOWN:
        this.onPageKeyPress();
        break;
      case BUTTON_TYPES.START:
        this.inputObserver.setCaretPosition();
        break;
      case BUTTON_TYPES.END:
        if (this.inputObserver.input) {
          const endPos = this.inputObserver.input.value.length;
          this.inputObserver.setCaretPosition(endPos, endPos);
        }
        break;
      default:
        if (this.debug) {
          console.warn(`Unexpected button type ${button.type}`);
        }
        break;
    }

    this.rerender();
  }

  onDefaultKeyPress(button) {
    // Get button value, if keyboard has shift or caps state, then shift value, else default
    const value =
      (this.isShifted || this.isCapsed) && button.shift
        ? button.shift
        : button.value;

    this.inputObserver.addValue(value);

    this.isShifted = false;
    this.rerender();
  }

  /**
   * Page up/down logic
   * @param {boolean} isUp - is page up btn
   * @param {number} scrollValue - scroll page value
   */
  onPageKeyPress(isUp = false, scrollValue = 100) {
    window.scrollBy({
      top: isUp ? -scrollValue : scrollValue,
      behavior: "smooth",
    });
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
    const { initInput, isFixedInput } = this.inputOptions;
    this.inputObserver = new Input(initInput, isFixedInput);

    // Create keyboard panel
    const { isCanClose, isCanHide } = this.panelOptions;
    this.keyboardPanel = new Panel(
      keyboardRootEl,
      isCanClose,
      isCanHide,
      this.destroy
    );

    // Create board layout
    const keyboardLayoutEl = document.createElement("div");
    keyboardLayoutEl.classList.add("keyboard-layout");

    // Create lines & columns
    if (this.keyboardKeysConfig.hasOwnProperty("lines")) {
      this.renderLine(this.keyboardKeysConfig["lines"], keyboardLayoutEl);
    } else {
      this.renderColumn(this.keyboardKeysConfig["columns"], keyboardLayoutEl);
    }

    keyboardRootEl.appendChild(keyboardLayoutEl);

    this.keyboardRootDOM = keyboardRootEl;
    this.keyboardParentDOM.appendChild(this.keyboardRootDOM);

    if (this.debug) {
      console.log("Keyborad has been render");
    }
  }

  // ?? optimization - code func renderColumn = renderLine
  renderLine(lines, parentEl) {
    for (const line of lines) {
      const lineEl = document.createElement("div");
      lineEl.classList.add("keyboard-layout--line");

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
      columnEl.classList.add("keyboard-layout--column");

      if (column.hasOwnProperty("buttons")) {
        this.createButtons(column.buttons, columnEl);
      } else {
        this.renderLine(column.lines, columnEl);
      }

      parentEl.appendChild(columnEl);
    }
  }

  /**
   * Render buttons
   * @param {Array} buttons
   * @param {Node} parentDOM
   */
  createButtons(buttons, parentNode) {
    for (const button of buttons) {
      const btn = new Button(
        parentNode,
        button.value,
        button.shift,
        button.type,
        this.onKeyDownHanlder
      );

      this.buttons.push(btn);
    }
  }

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

export default Keyboard;
