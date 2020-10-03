import { getPlatform, Platform } from "./util/platform";

export default interface Shortcut {
  modKey?: boolean;
  optKey?: boolean;
  shiftKey?: boolean;
  code: string;
}

interface AppleShortcut {
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  code: string;
}

interface DefaultShortcut {
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  code: string;
}

export type NativeShortcut = AppleShortcut | DefaultShortcut;

export function getNativeShortcutFromString(str: string): NativeShortcut {
  const splitStr = str.split("+");

  const code = splitStr.find(
    (s) => s !== "mod" && s !== "opt" && s !== "shift"
  );

  if (!code)
    throw new Error(
      "Your shortcut must include a key code corresponding to a valid 'KeyboardEvent.code' value."
    );

  if (getPlatform() === Platform.Apple) {
    return {
      metaKey: splitStr.some((s) => s === "mod"),
      altKey: splitStr.some((s) => s === "opt"),
      shiftKey: splitStr.some((s) => s === "shift"),
      code,
    };
  } else {
    return {
      ctrlKey: splitStr.some((s) => s === "mod"),
      altKey: splitStr.some((s) => s === "opt"),
      shiftKey: splitStr.some((s) => s === "shift"),
      code,
    };
  }
}

export function getNativeShortcutFromEvent(event: KeyboardEvent) {
  if (getPlatform() === Platform.Apple) {
    return {
      metaKey: event.metaKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      code: event.code,
    };
  } else {
    return {
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      shiftKey: event.shiftKey,
      code: event.code,
    };
  }
}
