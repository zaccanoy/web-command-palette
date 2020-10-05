import { NativeShortcut } from "./native-shortcut";
import { getNativeShortcutFromString } from "./shortcut-converters";

test("Various strings convert to native shortcuts correctly", (): void => {
  expect(getNativeShortcutFromString("mod+opt+KeyA")).toMatchObject({
    altKey: true,
    code: "KeyA",
    ctrlKey: true,
    shiftKey: false,
  });

  expect(getNativeShortcutFromString("mod+opt+shift+Digit3")).toMatchObject({
    altKey: true,
    code: "Digit3",
    ctrlKey: true,
    shiftKey: true,
  });

  expect(getNativeShortcutFromString("KeyN")).toMatchObject({
    code: "KeyN",
  });

  expect(getNativeShortcutFromString("opt+KeyA")).toMatchObject({
    altKey: true,
    code: "KeyA",
    ctrlKey: false,
    shiftKey: false,
  });

  expect(getNativeShortcutFromString("opt+shift+KeyA")).toMatchObject({
    altKey: true,
    code: "KeyA",
    ctrlKey: false,
    shiftKey: true,
  });

  expect(getNativeShortcutFromString("mod+shift+KeyA")).toMatchObject({
    altKey: false,
    code: "KeyA",
    ctrlKey: true,
    shiftKey: true,
  });
});

test("Invalid strings cause error when trying to convert to native shortcuts", (): void => {
  expect(
    (): NativeShortcut => getNativeShortcutFromString("mod+shift"),
  ).toThrowError();
  expect(
    (): NativeShortcut => getNativeShortcutFromString("mod+opt"),
  ).toThrowError();
  expect(
    (): NativeShortcut => getNativeShortcutFromString("opt+shift"),
  ).toThrowError();
  expect((): NativeShortcut => getNativeShortcutFromString("")).toThrowError();
});

test("Various events convert to native shortcuts correctly", (): void => {
  expect({ ctrlKey: true, code: "KeyA" }).toMatchObject({
    code: "KeyA",
    ctrlKey: true,
  });
  expect({ ctrlKey: true, shiftKey: true, code: "KeyA" }).toMatchObject({
    code: "KeyA",
    ctrlKey: true,
    shiftKey: true,
  });
  expect({ code: "KeyA" }).toMatchObject({
    code: "KeyA",
  });
});
