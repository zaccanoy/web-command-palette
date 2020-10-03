import { NativeShortcut } from "./shortcut";

type CPEvent = {}; // TODO:
type Feedback = {}; // TODO:

interface CommandFunction {
  (cpEvent: CPEvent): Feedback;
}

export interface CommandOptions {
  shortcut: string;
  chord?: string;
  run: CommandFunction;
}

export interface Command {
  id: string;
  run?: CommandFunction;
  startsChord?: boolean;
  isAfter?: NativeShortcut;
}
