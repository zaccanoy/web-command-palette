import { isAppleShortcut, isDefaultShortcut } from "./native-shortcut";

test("Various valid default shortcuts are recognized as default shortcuts", () => {
  expect(
    isDefaultShortcut({
      code: "KeyA",
    }),
  ).toBe(true);

  expect(
    isDefaultShortcut({
      altKey: true,
      code: "Escape",
    }),
  ).toBe(true);

  expect(
    isDefaultShortcut({
      code: "Digit1",
      ctrlKey: true,
    }),
  ).toBe(true);

  expect(
    isDefaultShortcut({
      code: "KeyE",
      shiftKey: true,
    }),
  ).toBe(true);

  expect(
    isDefaultShortcut({
      altKey: true,
      code: "Digit8",
      ctrlKey: true,
      shiftKey: true,
    }),
  ).toBe(true);
});

test("Invalid default shortcuts are not recognized as default shortcuts", () => {
  expect(
    isDefaultShortcut({
      code: "Digit3",
      metaKey: true,
    }),
  ).toBe(false);
});

test("Various valid Apple shortcuts are recognized as Apple shortcuts", () => {
  expect(
    isAppleShortcut({
      code: "KeyA",
    }),
  ).toBe(true);

  expect(
    isAppleShortcut({
      altKey: true,
      code: "Escape",
    }),
  ).toBe(true);

  expect(
    isAppleShortcut({
      code: "Digit1",
      metaKey: true,
    }),
  ).toBe(true);

  expect(
    isAppleShortcut({
      code: "KeyE",
      shiftKey: true,
    }),
  ).toBe(true);

  expect(
    isAppleShortcut({
      altKey: true,
      code: "Digit8",
      metaKey: true,
      shiftKey: true,
    }),
  ).toBe(true);
});

test("Invalid default shortcuts are not recognized as default shortcuts", () => {
  expect(
    isAppleShortcut({
      code: "Digit3",
      ctrlKey: true,
    }),
  ).toBe(false);
});
