export const defaultKeyboardOptions = {
  keyboardParentDOM: document.body,
  panelOptions: { isCanHide: true, isCanClose: true },
  inputOptions: { input: null, isFixedInput: false },
  debug: true,
};

export const defaultButtonOptions = {
  parentDOM: null,
  defaultValue: "",
  shiftValue: "",
  type: BUTTON_TYPES.DEFAULT,
  callback: null,
  isShiftOrCaps: false,
};

export const defaultPanelOptions = {
  parentNode: null,
  isCanClose: true,
  isCanHide: true,
  closeCallback: null,
  debug: true,
};
