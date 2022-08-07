import BUTTON_TYPES from "../utils/buttonTypes";

const keyboardConfig = {
  lines: [
    {
      columns: [
        {
          lines: [
            {
              buttons: [
                {
                  value: "Esc",
                  type: BUTTON_TYPES.ESC,
                },
                {
                  value: "ё",
                  shift: "Ё",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "1",
                  shift: "!",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "2",
                  shift: "@",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "3",
                  shift: "#",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "4",
                  shift: "$",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "5",
                  shift: "%",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "6",
                  shift: "^",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "7",
                  shift: "&",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "8",
                  shift: "*",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "9",
                  shift: "(",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "0",
                  shift: ")",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "-",
                  shift: "_",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "=",
                  shift: "+",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "Backspace",
                  type: BUTTON_TYPES.BACKSPACE,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "Tab",
                  type: BUTTON_TYPES.TAB,
                },
                {
                  value: "й",
                  shift: "Й",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ц",
                  shift: "Ц",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "у",
                  shift: "У",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "к",
                  shift: "К",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "е",
                  shift: "Е",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "н",
                  shift: "Н",
                  type: BUTTON_TYPES.DEFAULT,
                },

                {
                  value: "г",
                  shift: "Г",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ш",
                  shift: "Ш",
                  type: BUTTON_TYPES.DEFAULT,
                },

                {
                  value: "щ",
                  shift: "Щ",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "з",
                  shift: "З",
                  type: BUTTON_TYPES.DEFAULT,
                },

                {
                  value: "х",
                  shift: "Х",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ъ",
                  shift: "Ъ",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "\\",
                  shift: "/",
                  type: BUTTON_TYPES.DEFAULT,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "Caps Lock",
                  type: BUTTON_TYPES.CAPSLOCK,
                },
                {
                  value: "ф",
                  shift: "Ф",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ы",
                  shift: "Ы",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "в",
                  shift: "В",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "а",
                  shift: "А",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "п",
                  shift: "П",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "р",
                  shift: "Р",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "о",
                  shift: "О",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "л",
                  shift: "Л",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "д",
                  shift: "Д",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ж",
                  shift: "Ж",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "э",
                  shift: "Э",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: ";",
                  shift: ":",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ENTER",
                  type: BUTTON_TYPES.ENTER,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "SHIFT",
                  type: BUTTON_TYPES.SHIFT,
                },
                {
                  value: "я",
                  shift: "Я",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ч",
                  shift: "Ч",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "с",
                  shift: "С",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "м",
                  shift: "М",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "и",
                  shift: "И",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "т",
                  shift: "Т",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ь",
                  shift: "Ь",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "б",
                  shift: "Б",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ю",
                  shift: "Ю",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: ".",
                  shift: ",",
                  type: BUTTON_TYPES.DEFAULT,
                },
                // Examples custom key btn
                {
                  value: "@gmail",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: ".com",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "😀",
                  type: BUTTON_TYPES.DEFAULT,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "FN",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "CTRL",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "Space",
                  type: BUTTON_TYPES.SPACE,
                },
              ],
            },
          ],
        },
        {
          lines: [
            {
              buttons: [
                {
                  value: "Home",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "PgUp",
                  type: BUTTON_TYPES.DEFAULT,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "End",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "PgDn",
                  type: BUTTON_TYPES.DEFAULT,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "End",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "PgDn",
                  type: BUTTON_TYPES.DEFAULT,
                },
              ],
            },
            {
              buttons: [
                {
                  value: "Insert",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "Pause",
                  type: BUTTON_TYPES.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default keyboardConfig;
