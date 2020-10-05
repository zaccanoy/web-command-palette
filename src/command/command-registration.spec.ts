import { Feedback } from "./command";
import { isCommandFunction, isCommandOptions } from "./command-registration";

test("Command functions are recognized correctly", (): void => {
  expect(
    isCommandFunction(
      (event: KeyboardEvent): Feedback => ({
        message: "Done!",
        type: "success",
      }),
    ),
  ).toBe(true);
});

test("Command options objects are not recognized as command functions", (): void => {
  expect(
    isCommandFunction({
      // tslint:disable-next-line: no-empty
      run: (): void => {},
      // tslint:disable-next-line: no-empty
      when: (): boolean => false,
    }),
  ).toBe(false);
});

test("Command options objects are recognized correctly", (): void => {
  expect(
    isCommandOptions({
      // tslint:disable-next-line: no-empty
      run: (): void => {},
      // tslint:disable-next-line: no-empty
      when: (): boolean => false,
    }),
  ).toBe(true);
});

test("Command functions are not recognized as command options objects", (): void => {
  expect(
    isCommandOptions(
      (event: KeyboardEvent): Feedback => ({
        message: "Done!",
        type: "success",
      }),
    ),
  ).toBe(false);
});
