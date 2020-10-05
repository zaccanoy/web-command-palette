import { isCommand, isShortcutMap } from "./command";

test("Commands are recognized correctly", (): void => {
  expect(
    isCommand({
      // tslint:disable-next-line: no-empty
      run: (): void => {},
    }),
  ).toBe(true);

  expect(
    isCommand({
      // tslint:disable-next-line: no-empty
      run: (): void => {},
      // tslint:disable-next-line: no-empty
      when: (): boolean => true,
    }),
  );
});

test("Shortcut maps are not recognized as commands", (): void => {
  expect(isCommand(new Map())).toBe(false);
});

test("Shortcut maps are recognized correctly", (): void => {
  expect(isShortcutMap(new Map())).toBe(true);
});

test("Commands are not recognized as shortcut maps", (): void => {
  expect(
    isShortcutMap({
      // tslint:disable-next-line: no-empty
      run: (): void => {},
      // tslint:disable-next-line: no-empty
      when: (): boolean => true,
    }),
  ).toBe(false);
});
