/**
 * The shape of a shortcut native to Apple devices.
 */
interface AppleShortcut {
  /**
   * `true` if the secondary modifier key for Apple devices, or the Option key,
   * is pressed or needed; `false` otherwise.
   * @remark Note that though this key is the Option key on a physical
   * keyboard, the browser reads it as the Alt key.
   */
  altKey?: boolean;
  /**
   * The code of the non-modifier key being pressed or needed. The code is
   * equivalent to what's returned from `KeyboardEvent.code` for that keypress.
   */
  code: string;
  /**
   * `true` if he primary modifier key for Apple devices, or the Command key,
   * is pressed or needed; `false` otherwise.
   * @remark Note that through this key is the Command key on a physical
   * keyboard, the browser reads it as the Meta key.
   */
  metaKey?: boolean;
  /**
   * `true` if the shift key is pressed or needed; `false` otherwise.
   */
  shiftKey?: boolean;
}

/**
 * The shape of a native shortcut on non-Apple devices.
 */
interface DefaultShortcut {
  /**
   * `true` if the secondary modifier key for non-Apple devices, or the Alt key,
   * is pressed or needed; `false` otherwise.
   */
  altKey?: boolean;
  /**
   * The code of the non-modifier key being pressed or needed. The code is
   * equivalent to what's returned from `KeyboardEvent.code` for that keypress.
   */
  code: string;
  /**
   * `true` if the primary modifier key for non-Apple devices, or the Control
   * key, is pressed or needed; `false` otherwise.
   */
  ctrlKey?: boolean;
  /**
   * `true` if the shift key is pressed or needed; `false` otherwise.
   */
  shiftKey?: boolean;
}

/**
 * A native shortcut can either be an Apple-native shortcut or a PC-native
 * shortcut.
 */
export type NativeShortcut = AppleShortcut | DefaultShortcut;

/**
 * Tests a NativeShortcut to see if it is a valid AppleShortcut.
 * @param nativeShortcut The subject to be tested as an AppleShortcut.
 */
export function isAppleShortcut(
  nativeShortcut: NativeShortcut,
): nativeShortcut is AppleShortcut {
  return !(nativeShortcut as DefaultShortcut).ctrlKey;
}

/**
 * Tests a NativeShortcut to see if it is a valid DefaultShortcut.
 * @param nativeShortcut The subject to be tested as a DefaultShortcut.
 */
export function isDefaultShortcut(
  nativeShortcut: NativeShortcut,
): nativeShortcut is DefaultShortcut {
  return !(nativeShortcut as AppleShortcut).metaKey;
}
