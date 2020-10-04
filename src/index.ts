import {
  Command,
  CommandFunction,
  CommandOptions,
  CommandRegistrations,
  isCommand,
  isCommandFunction,
  isCommandOptions,
  isShortcutMap,
} from "./command";
import { NativeShortcut } from "./shortcut/native-shortcut";
import { Shortcut } from "./shortcut/shortcut";
import {
  getNativeShortcutFromEvent,
  getNativeShortcutFromString,
} from "./shortcut/shortcut-converters";
import { exists } from "./util/exists";

/**
 * Represents a command or a map from a native shortcut to a command.
 * @remark A map from a native shortcut to a command is a chord initializer.
 */
type CommandOrMap = Command | Map<NativeShortcut, Command>;

/**
 * Sets the given shortcut on the map.
 * @param map The map to set the command on. This could be the main map, or a
 * map from a chord initializer.
 * @param shortcut The shortcut to add to the map.
 * @param commandOptions The command options that define the command to add to
 * the map.
 */
function addShortcutToMap(
  map: Map<NativeShortcut, CommandOrMap>,
  shortcut: string | NativeShortcut,
  commandOptions: CommandOptions | CommandFunction,
): void {
  // Get the native shortcut if needed.
  const nativeShortcut: NativeShortcut =
    typeof shortcut === "string"
      ? getNativeShortcutFromString(shortcut)
      : shortcut;

  if (exists(map.get(nativeShortcut))) {
    throw Error(
      "You cannot register a command with a keyset that has previously been registered. Either deregister the existing command or choose a different keyset.",
    );
  }

  let command: Command;

  // Convert command function to object if needed.
  if (isCommandFunction(commandOptions)) {
    command = { run: commandOptions };
  } else if (isCommandOptions(commandOptions)) {
    command = commandOptions;
  } else {
    throw Error(
      "Command options must either be a function or be an object containing the properties `run` and `when`.",
    );
  }

  map.set(nativeShortcut, command);
}

/**
 * A class that contains logic and functionality for the Web Command
 * Palette.
 * @singleton
 */
class CommandPalette {
  /**
   * Returns a singleton instance of CommandPalette.
   * @returns A singleton instance of CommandPalette.
   * @internal
   */
  public static getInstance(): CommandPalette {
    return CommandPalette.instance;
  }

  /** The singleton instance of CommandPalette. */
  private static readonly instance: CommandPalette = new CommandPalette();

  /** The currently active chord. */
  private activeChord: Map<NativeShortcut, Command> = undefined;
  /** A map of keyboard shortcuts to commands. */
  private readonly commands: Map<NativeShortcut, CommandOrMap>;

  /**
   * Constructs a new CommandPalette and attaches an event listener for
   * handling potential shortcuts.
   */
  private constructor() {
    window.addEventListener("keydown", (event: KeyboardEvent): void =>
      this.handleKeyDown(event),
    );
  }

  /**
   * Registers commands within the given options.
   * @param options The commands' options.
   */
  public registerCommands(options: CommandRegistrations): void {
    // Loop through each shortcut key.
    Object.keys(options).forEach((optKey: string): void => {
      let map: Map<NativeShortcut, CommandOrMap> = this.commands;

      // If we're dealing with a chord, we set `map` to the chord initializer.
      if (optKey.search(" ") > -1) {
        // Break the chord into its individual native shortcuts.
        const chordInitializer: NativeShortcut = getNativeShortcutFromString(
          optKey.split(" ")[0],
        );

        // Get the existing map or create a new one if needed.
        let shortcutMap: CommandOrMap = this.commands.get(chordInitializer);
        if (!exists(shortcutMap)) {
          shortcutMap = new Map<Shortcut, Command>();
          this.commands.set(chordInitializer, shortcutMap);
        } else if (isCommand(shortcutMap)) {
          throw Error(
            "You cannot register a chord that starts with a keyset previously used for a command. Either deregister the existing command or choose a different keyset.",
          );
        }

        map = shortcutMap;
      }

      addShortcutToMap(this.commands, optKey, options[optKey]);
    });
  }

  /**
   * Handles a KeyboardEvent and runs any invoked commands.
   * @param event The KeyboardEvent to handle.
   */
  private handleKeyDown(event: KeyboardEvent): void {
    const shortcut: NativeShortcut = getNativeShortcutFromEvent(event);
    if (exists(this.activeChord)) {
      const command: Command = this.activeChord.get(shortcut);
      if (exists(command) && (command.when === undefined || command.when())) {
        command.run(event);
      } else {
        this.activeChord = undefined;
      }
    } else {
      const command: CommandOrMap = this.commands.get(shortcut);
      if (exists(command)) {
        /* We only prevent default behavior when the keypress matches a registered command. */
        event.preventDefault();
        if (
          isCommand(command) &&
          (command.when === undefined || command.when())
        ) {
          command.run(event);
        } else if (isShortcutMap(command)) {
          this.activeChord = command;
        }
      }
    }
  }
}

/**
 * Registers commands within the given options.
 * @param options The commands' options.
 */
export function registerCommands(options: CommandRegistrations): void {
  CommandPalette.getInstance().registerCommands(options);
}
