class Panel {
  parentDOM;
  rootDOM;
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
    this.rootDOM = null;
    this.closeBtnEl = null;
    this.hideBtnEl = null;

    this.debug = debug;
    this.isCanClose = isCanClose;
    this.isCanHide = isCanHide;

    // binds
    this.hideKeyboard = this.hideKeyboard.bind(this);
    this.closeKeyboard = this.closeKeyboard.bind(this);

    this.deleteCallBack = deleteCallBack;

    if (this.parentDOM) {
      this.render();
    } else {
      throw new Error("KeyboardPanel: the parent DOM element not found");
    }
  }

  closeKeyboard() {
    // how to delete all keyboard? callback???
    // this.destroy();
    if (typeof this.deleteCallBack === "function") {
      this.deleteCallBack();
    }
  }

  hideKeyboard() {
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
      hidePanelBtnEl.onclick = this.hideKeyboard;

      this.hideBtnEl = hidePanelBtnEl;
      keyboardPanelEl.appendChild(hidePanelBtnEl);
    }

    if (this.isCanClose) {
      // Create close button
      const closePanelBtnEl = document.createElement("button");
      closePanelBtnEl.textContent = "Close";
      closePanelBtnEl.classList.add("keyboard__close");
      closePanelBtnEl.onclick = this.closeKeyboard;

      this.closeBtnEl = closePanelBtnEl;
      keyboardPanelEl.appendChild(closePanelBtnEl);
    }

    this.rootDOM = keyboardPanelEl;
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
    this.rootDOM.remove();

    if (this.debug) {
      console.warn("Keyboard panel was destroyed!");
    }
  }
}

export default Panel;
