/**
 * The keyboard panel class
 */
class Panel {
  parentNode;
  panelNode;
  closeBtnEl;
  hideBtnEl;

  isCanHide;
  isCanClose;
  debug;

  deleteCallBack;

  constructor(
    parentNode,
    isCanClose = true,
    isCanHide = true,
    deleteCallBack,
    debug = true
  ) {
    this.parentNode = parentNode;
    this.panelNode = null;
    this.closeBtnEl = null;
    this.hideBtnEl = null;

    this.debug = debug;
    this.isCanClose = isCanClose;
    this.isCanHide = isCanHide;

    // binds
    this.hideWindow = this.hideWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);

    this.deleteCallBack = deleteCallBack;

    if (this.parentNode) {
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
    this.parentNode.classList.toggle("hidden");

    if (this.debug) {
      console.warn("KeyboardPanel: hidden state of keyboard has been change");
    }
  }

  rerender() {}

  render() {
    // Create keyboard panel
    const keyboardPanelEl = document.createElement("div");
    keyboardPanelEl.classList.add("keyboard-panel");

    if (this.isCanHide) {
      // Create hide button
      const hidePanelBtnEl = document.createElement("button");
      hidePanelBtnEl.textContent = "Hide";
      hidePanelBtnEl.classList.add(
        "keyboard-panel--hide",
        "keyboard-panel--btn"
      );
      hidePanelBtnEl.onclick = this.hideWindow;

      this.hideBtnEl = hidePanelBtnEl;
      keyboardPanelEl.appendChild(hidePanelBtnEl);
    }

    if (this.isCanClose) {
      // Create close button
      const closePanelBtnEl = document.createElement("button");
      closePanelBtnEl.textContent = "Close";
      closePanelBtnEl.classList.add(
        "keyboard-panel--close",
        "keyboard-panel--btn"
      );
      closePanelBtnEl.onclick = this.closeWindow;

      this.closeBtnEl = closePanelBtnEl;
      keyboardPanelEl.appendChild(closePanelBtnEl);
    }

    this.panelNode = keyboardPanelEl;
    this.parentNode.appendChild(keyboardPanelEl);
  }

  destroy() {
    this.parentNode = null;
    this.isCanClose = null;
    this.isCanHide = null;

    this.closeBtnEl.onclick = null;
    this.closeBtnEl = null;

    this.hideBtnEl.onclick = null;
    this.hideBtnEl = null;

    this.panelButtons = null;
    this.panelNode.remove();

    if (this.debug) {
      console.warn("Keyboard panel was destroyed!");
    }
  }
}

export default Panel;
