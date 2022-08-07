import BUTTON_TYPES from "../utils/buttonTypes";
import Button from "./Button/Button";
import { Input } from "./Input/Input";
import "./Keyboard.scss";
import Panel from "./Panel/Panel";

const defaultOptions = {
  panel: { isCanHide: true, isCanClose: true },
  keyboard: { isShifted: false, isCapsed: false },
  input: { initInput: null, isFixedInput: false },
  debug: true,
};

// TODO: Keyboard: caps and shift keyboard state // X/V
// TODO: Input: when 2 or more keyboards - event is called several times // X/V
// TODO: Input: need fix when typing and input get focus in start position // X
// TODO: Keyboard: hold key // X
// TODO add type btn class in styles // V
// TODO: Keyboard: add support copy selection text in buffer
// TODO: Keyboard: add support page up/down btn

/**
 * The keybaord class (root class)
 * Contains info about:
 *  - current buttons, panel, current input
 *  - keyboard node, parent node
 *  -
 */
export class Keyboard {
  keyboardParentNode;
  keyboardRootNode;
  keyboardConfig;
  keyboardPanel;
  options;

  // Keyobard states
  isShifted;
  isCapsed;

  // Сhecks for changes to the input field
  inputObserver;

  // Current buttons of keyboard layout
  buttons;

  constructor(
    keyboardParentNode,
    keyboardKeysConfig,
    options = defaultOptions
  ) {
    if (typeof window === "undefined") return;

    // Additional options
    this.options = options;

    // Keyboard states
    this.isShifted = false;
    this.isCapsed = false;

    // Current buttons of keyboard
    this.buttons = [];

    this.keyboardParentNode = keyboardParentNode;
    this.keyboardConfig = keyboardKeysConfig;

    // Binds func
    this.onKeyDownHanlder = this.onKeyDownHanlder.bind(this);
    this.render = this.render.bind(this);

    if (this.keyboardParentNode) {
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
      case BUTTON_TYPES.DELETE:
        this.inputObserver.removeValue(false);
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
      default:
        if (this.options.debug) {
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

  onPageKeyPress(isUp = false) {
    const scrollValue = isUp ? -100 : 100;

    window.scrollBy({
      top: scrollValue,
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
    this.inputObserver = new Input(
      this.options.input.initInput,
      this.options.input.isFixedInput
    );

    // Create keyboard panel
    this.keyboardPanel = new Panel(
      keyboardRootEl,
      this.options.panel.isCanClose,
      this.options.panel.isCanHide,
      this.destroy.bind(this)
    );

    // Create board layout
    const keyboardLayoutEl = document.createElement("div");
    keyboardLayoutEl.classList.add("keyboard-layout");

    // Create lines & columns
    if (this.keyboardConfig.hasOwnProperty("lines")) {
      this.renderLine(this.keyboardConfig["lines"], keyboardLayoutEl);
    } else {
      this.renderColumn(this.keyboardConfig["columns"], keyboardLayoutEl);
    }

    keyboardRootEl.appendChild(keyboardLayoutEl);

    this.keyboardRootNode = keyboardRootEl;
    this.keyboardParentNode.appendChild(this.keyboardRootNode);

    if (this.options.debug) {
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

    this.keyboardRootNode.remove();
  }
}
