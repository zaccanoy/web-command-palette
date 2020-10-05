import { NativeShortcut } from "../shortcut/native-shortcut";

/**
 * A feedback object that allows the Web Command Palette UI to give the user
 * feedback on their command invocation. If the Web Command Palette UI plugin or
 * an alternative is not installed, this does nothing.
 */
export interface Feedback {
  /** The message to show the user in WCP UI. */
  message: string;
  /** The type of feedback for WCP UI. */
  type: "success" | "danger" | "info" | "warning" | "loading";
}

/**
 * A function that can be supplied to Web Command Palette.
 */
export type CommandFunction = (cpEvent: KeyboardEvent) => Feedback | void;

/**
 * A function that tells Web Command Palette when to run the command.
 */
export type ContextFunction = () => boolean;

/**
 * Represents a command that can be ran by Web Command Palette.
 */
export interface Command {
  /**
   * The command function to run when the user presses the corresponding
   * shortcut.
   */
  run: CommandFunction;
  /**
   * The context function to run when the user presses the corresponding
   * shortcut to see if the command can be run.
   */
  when?: ContextFunction;
}

/**
 * Tests if the given element is a Command.
 * @param commandOrMap The element to test as a Command.
 * @returns a boolean representing if the element is a Command.
 */
export function isCommand(
  commandOrMap: Command | Map<NativeShortcut, Command>,
): commandOrMap is Command {
  return (commandOrMap as Command).run !== undefined;
}

/**
 * Tests if the given element is a shortcut map.
 * @param commandOrMap The element to test as a shortcut map.
 * @returns A boolean representing if the element is a shortcut map.
 */
export function isShortcutMap(
  commandOrMap: Command | Map<NativeShortcut, Command>,
): commandOrMap is Map<NativeShortcut, Command> {
  return (commandOrMap as Map<NativeShortcut, Command>).get !== undefined;
}
