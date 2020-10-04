/**
 * Tests if an element exists.
 * @remark This is just a helper function to keep `if` statements from being too
 * verbose.
 * @param el The element to test for existance.
 * @returns A boolean representing if the element exists.
 * @internal
 */
export function exists(el: unknown): boolean {
  return el !== undefined && el !== null;
}
