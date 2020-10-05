import { getPlatform, Platform } from "./platform";

test("Default platform is recognized", (): void => {
  expect(getPlatform()).toBe(Platform.Default);
});
