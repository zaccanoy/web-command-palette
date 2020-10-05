import { registerCommands } from ".";

test("A valid command is registered successfully", () => {
  registerCommands({
    "mod+KeyA": (): void => {
      // tslint:disable-next-line: no-console
      console.log("All things selected.");
    },
  });
});
