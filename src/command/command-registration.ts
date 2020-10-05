import { CommandFunction, ContextFunction } from "./command";

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
  const commandOptions: CommandOptions = commandFunctionOrOptions as CommandOptions;

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
