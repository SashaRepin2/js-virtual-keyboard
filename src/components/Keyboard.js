import KeyboardButton from "./Button/KeyboardButton";
import { Input, InputCaret } from "./Input/Input";
import "./Keyboard.scss";

const defaultOptions = {
  isCanHide: true,
  isCanClose: true,
  isShifted: false,
  isCapsed: false,
  debug: true,
};

export class Keyboard {
  keyboardParentDOM;
  keyboardRootDOM;
  keyboardConfig;
  activeInput;
  isShifted;
  isCapsed;

  keyboardPanel;
  options;

  constructor(keyboardParentDOM, keyboardKeysConfig, options = defaultOptions) {
    if (typeof window === "undefined") return;

    this.options = options;

    this.isShifted = this.options.isShifted;
    this.isCapsed = this.options.isCapsed;

    this.keyboardParentDOM = keyboardParentDOM;
    this.keyboardConfig = keyboardKeysConfig;

    if (this.keyboardParentDOM) {
      this.initRender();
    } else {
      throw new Error("Keyboard: the parent DOM element not found");
    }
  }

  keyDown(button) {
    if (!button) return;

    switch (button.type) {
      case "SHIFT":
        this.isShifted = !this.isShifted;
        console.log(this.isShifted);
        break;
      case "DEFAULT":
        const value = this.isShifted ? button.shift : button.value;
        this.activeInput.changeValue(value);
      default:
        break;
    }
  }

  initRender() {
    // Create root container
    const keyboardRootEl = document.createElement("div");
    keyboardRootEl.classList.add("keyboard");

    // Create active input
    this.activiInput = new Input();

    // Create keyboard panel
    this.keyboardPanel = new KeyboardPanel(
      keyboardRootEl,
      this.options.isCanClose,
      this.options.isCanHide
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

    console.log("Keyborad has been render");
  }

  // ?? optimization
  renderLine(lines, parentEl) {
    for (const line of lines) {
      const lineEl = document.createElement("div");
      lineEl.classList.add("line");

      if (line.hasOwnProperty("buttons")) {
        this.renderButtons(line.buttons, lineEl);
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
        this.renderButtons(column.buttons, columnEl);
      } else {
        this.renderLine(column.lines, columnEl);
      }

      parentEl.appendChild(columnEl);
    }
  }

  //
  renderButtons(buttons, parentDOM) {
    for (const button of buttons) {
      const buttonEl = document.createElement("button");
      buttonEl.textContent = button.value;
      buttonEl.onclick = (e) => {
        this.keyDown(button);
      };
      parentDOM.appendChild(buttonEl);
    }
  }

  parseOptions() {}

  destroy() {
    this.isShifted = null;
    this.isCapsed = null;

    this.activeInput.destroy();
    this.activeInput = null;

    this.keyboardRootDOM.remove();
  }
}

class KeyboardPanel {
  parentDOM;
  rootDOM;
  isCanHide;
  isCanClose;

  constructor(parentDOM, isCanClose = true, isCanHide = true) {
    this.isCanClose = isCanClose;
    this.isCanHide = isCanHide;
    this.parentDOM = parentDOM;

    if (this.parentDOM) {
      this.render();
    } else {
      throw new Error("KeyboardPanel: the parent DOM element not found");
    }
  }

  closeKeyboard() {}

  hideKeyboard() {
    this.parentDOM.classList.toggle("hidden");
  }

  render() {
    // Create keyboard panel
    const keyboardPanelEl = document.createElement("div");
    keyboardPanelEl.classList.add("keyboard__panel");

    if (this.isCanHide) {
      // Create hide button
      const hidePanelBtnEl = document.createElement("button");
      hidePanelBtnEl.textContent = "Hide";
      hidePanelBtnEl.classList.add("keyboard__hide");
      hidePanelBtnEl.onclick = () => {
        this.hideKeyboard();
      };

      keyboardPanelEl.appendChild(hidePanelBtnEl);
    }

    if (this.isCanClose) {
      // Create close button
      const closePanelBtnEl = document.createElement("button");
      closePanelBtnEl.textContent = "Close";
      closePanelBtnEl.classList.add("keyboard__close");
      closePanelBtnEl.onclick = () => {
        this.destroy();
      };

      keyboardPanelEl.appendChild(closePanelBtnEl);
    }

    this.parentDOM.appendChild(keyboardPanelEl);
  }

  destroy() {}
}
