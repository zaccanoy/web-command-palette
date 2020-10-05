import { getPlatform, Platform } from "../util/platform";

import { NativeShortcut } from "./native-shortcut";

/**
 * Gets a native shortcut from a string.
 * @param str The string to get the native shortcut from.
 */
export function getNativeShortcutFromString(str: string): NativeShortcut {
  if (str === "") {
    throw new Error("Shortcut string cannot be empty.");
  }
  const splitStr: string[] = str.split("+");

  const code: string | undefined = splitStr.find(
    (s: string): boolean => s !== "mod" && s !== "opt" && s !== "shift",
  );

  if (code === undefined || code === null) {
    throw new Error(
      "Your shortcut must include a key code corresponding to a valid 'KeyboardEvent.code' value.",
    );
  }

  if (getPlatform() === Platform.Apple) {
    return {
      altKey: splitStr.some((s: string): boolean => s === "opt"),
      code,
      metaKey: splitStr.some((s: string): boolean => s === "mod"),
      shiftKey: splitStr.some((s: string): boolean => s === "shift"),
    };
  }

  return {
    altKey: splitStr.some((s: string): boolean => s === "opt"),
    code,
    ctrlKey: splitStr.some((s: string): boolean => s === "mod"),
    shiftKey: splitStr.some((s: string): boolean => s === "shift"),
  };
}

/**
 * Converts a KeyboardEvent to a NativeShortcut for the user's platfrorm.
 * @param event The KeyboardEvent to get the NativeShortcut from.
 */
export function getNativeShortcutFromEvent(
  event: KeyboardEvent,
): NativeShortcut {
  if (getPlatform() === Platform.Apple) {
    return {
      altKey: event.altKey,
      code: event.code,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
    };
  }

  return {
    altKey: event.altKey,
    code: event.code,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
  };
}
