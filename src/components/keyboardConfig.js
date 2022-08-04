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
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "ё",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "1",
                  shift: "!",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "2",
                  type: BUTTON_TYPES.DEFAULT,
                },
                {
                  value: "3",
                  type: BUTTON_TYPES.DEFAULT,
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
              ],
            },
            {
              buttons: [
                {
                  value: "CAPS LOCK",
                  type: BUTTON_TYPES.CAPSLOCK,
                },
                {
                  value: "a",
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
                  type: BUTTON_TYPES.DEFAULT,
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
                },
                {
                  value: "PgUp",
                },
              ],
            },
            {
              buttons: [
                {
                  value: "End",
                },
                {
                  value: "PgDn",
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
