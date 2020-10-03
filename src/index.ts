import { v4 as generateUUID } from "uuid";
import { Command, CommandOptions } from "./command";
import Shortcut, {
  getNativeShortcutFromEvent,
  getNativeShortcutFromString,
  NativeShortcut,
} from "./shortcut";

/**
 * A singleton class containing the state and functionality of the Command
 * Palette.
 */
class CommandPalette {
  private static instance = new CommandPalette();

  // A map of keyboard shortcuts to commands.
  private commands: Map<Shortcut, Command>;
  // The currently active chord.
  private activeChord: NativeShortcut;

  /**
   * Constructs a new CommandPalette and attaches an event listener for
   * handling potential shortcuts.
   */
  private constructor() {
    window.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }

  private handleKeyDown(event) {
    const shortcut = getNativeShortcutFromEvent(event);
    const command = this.commands.get(shortcut);
    if (command) {
      // We only prevent default behavior when the keypress matches a
      // registered command.
      event.preventDefault();
      // We either begin the chord or run the command.
      if (command.startsChord) {
        this.activeChord = shortcut;
      } else if (!command.isAfter || command.isAfter === this.activeChord) {
        command.run(event);
      }
    }
  }

  public static getInstance() {
    return this.instance;
  }

  /**
   * Registers a command with the given options.
   * @param options The command's options.
   */
  public registerCommand(options: CommandOptions): string {
    const id = generateUUID();
    this.commands.set(getNativeShortcutFromString(options.shortcut), {
      id,
      run: options.run,
    });
    if (options.chord) {
      const chordID = generateUUID();
      this.commands.set(getNativeShortcutFromString(options.chord), {
        id: chordID,
        startsChord: true,
      });
    }
    return id;
  }
}

export const registerCommand = (options: CommandOptions): string => {
  return CommandPalette.getInstance().registerCommand(options);
};
