import { NativeShortcut } from "./shortcut/native-shortcut";

/**
 * A feedback object that allows the Web Command Palette UI to give the user
 * feedback on their command invocation. If the Web Command Palette UI plugin or
 * an alternative is not installed, this does nothing.
 */
type Feedback = {
  type: "success" | "danger" | "info" | "warning" | "loading";
  message: string;
};

/**
 * A function that can be supplied to Web Command Palette.
 */
export interface CommandFunction {
  (cpEvent: KeyboardEvent): Feedback | void;
}

/**
 * A function that tells Web Command Palette when to run the command.
 */
interface ContextFunction {
  (): boolean;
}

/**
 * The options for registering a command.
 * @remark The `when` property isn't optional because the user can just supply
 * a function otherwise.
 */
export interface CommandRegistrations {
  [key: string]: CommandFunction | CommandOptions;
}

/**
 * Tests if the given element is a CommandOptions object.
 * @param commandFunctionOrOptions The element to test as a CommandOptions
 * object.
 * @returns A boolean representing if the element is a CommandOptions object.
 */
export function isCommandOptions(
  commandFunctionOrOptions: CommandFunction | CommandOptions,
): commandFunctionOrOptions is CommandOptions {
  const commandOptions = commandFunctionOrOptions as CommandOptions;
  return commandOptions.run !== undefined && commandOptions.when !== undefined;
}

/**
 * Tests if the given element is a CommandFunction.
 * @remark This only tests if the element is a function, so this should only be
 * used when differentiating between a CommandOptions object and a function.
 * @param commandFunctionOrOptions The element to test as a CommandFunction.
 * @returns A boolean representing if the element is a CommandFunction.
 */
export function isCommandFunction(
  commandFunctionOrOptions: CommandFunction | CommandOptions,
): commandFunctionOrOptions is CommandFunction {
  return typeof commandFunctionOrOptions === "function";
}

/**
 * The options for a command shortcut.
 */
export interface CommandOptions {
  /**
   * The command function to run when the user presses the corresponding
   * shortcut.
   */
  run: CommandFunction;
  /**
   * The context function to run when the user presses the corresponding
   * shortcut to see if the command can be run.
   */
  when: ContextFunction;
}

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
