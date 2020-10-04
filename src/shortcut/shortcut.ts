/**
 * A high-level shortcut that uses `mod` and `opt` as primary and secondary
 * modifier keys, respectively.
 */
export interface Shortcut {
  /**
   * The code of the non-modifier key being pressed or needed. The code is
   * equivalent to what's returned from `KeyboardEvent.code` for that keypress.
   */
  code: string;
  /**
   * `true` if the primary modifier key is pressed or needed; `false` otherwise.
   */
  modKey?: boolean;
  /**
   * `true` if the secondary modifier key, or option key, is pressed or needed;
   * `false` otherwise.
   */
  optKey?: boolean;
  /**
   * `true` if the shift key is pressed or needed; `false` otherwise.
   */
  shiftKey?: boolean;
}
