/**
 * The keyboard panel
 */
class Panel {
  parentDOM;
  panelDOM;
  closeBtnEl;
  hideBtnEl;

  isCanHide;
  isCanClose;
  debug;

  deleteCallBack;

  constructor(
    parentDOM,
    isCanClose = true,
    isCanHide = true,
    debug = true,
    deleteCallBack
  ) {
    this.parentDOM = parentDOM;
    this.panelDOM = null;
    this.closeBtnEl = null;
    this.hideBtnEl = null;

    this.debug = debug;
    this.isCanClose = isCanClose;
    this.isCanHide = isCanHide;

    // binds
    this.hideWindow = this.hideWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);

    this.deleteCallBack = deleteCallBack;

    if (this.parentDOM) {
      this.render();
    } else {
      throw new Error("KeyboardPanel: the parent DOM element not found");
    }
  }

  closeWindow() {
    if (typeof this.deleteCallBack === "function") {
      this.deleteCallBack();
    }
  }

  hideWindow() {
    this.parentDOM.classList.toggle("hidden");

    if (this.debug) {
      console.warn("KeyboardPanel: hidden state of keyboard has been change");
    }
  }

  rerender() {}

  render() {
    // Create keyboard panel
    const keyboardPanelEl = document.createElement("div");
    keyboardPanelEl.classList.add("keyboard__panel");

    if (this.isCanHide) {
      // Create hide button
      const hidePanelBtnEl = document.createElement("button");
      hidePanelBtnEl.textContent = "Hide";
      hidePanelBtnEl.classList.add("keyboard__hide");
      hidePanelBtnEl.onclick = this.hideWindow;

      this.hideBtnEl = hidePanelBtnEl;
      keyboardPanelEl.appendChild(hidePanelBtnEl);
    }

    if (this.isCanClose) {
      // Create close button
      const closePanelBtnEl = document.createElement("button");
      closePanelBtnEl.textContent = "Close";
      closePanelBtnEl.classList.add("keyboard__close");
      closePanelBtnEl.onclick = this.closeWindow;

      this.closeBtnEl = closePanelBtnEl;
      keyboardPanelEl.appendChild(closePanelBtnEl);
    }

    this.panelDOM = keyboardPanelEl;
    this.parentDOM.appendChild(keyboardPanelEl);
  }

  destroy() {
    this.parentDOM = null;
    this.isCanClose = null;
    this.isCanHide = null;

    this.closeBtnEl.onclick = null;
    this.closeBtnEl = null;

    this.hideBtnEl.onclick = null;
    this.hideBtnEl = null;

    this.panelButtons = null;
    this.panelDOM.remove();

    if (this.debug) {
      console.warn("Keyboard panel was destroyed!");
    }
  }
}

export default Panel;
