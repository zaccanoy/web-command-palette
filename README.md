# Web Command Palette

Web Command Palette is an API, web extension, UI, and tinkering interface for keyboard shortcuts on the web.

# Use Cases

## PWA, Website, and Electron Apps

Web Command Palette is perfect for your web app.

- As more web apps use this library, users will become accustomed to the Command Palette shortcut, or <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>p</kbd> to discover new commands.
- You'll never have to worry about your keyboard shortcut conflicting with another one handled by Web Command Palette.
- In the future, you'll have an even better developer experience, as documentation and warnings regarding common OS- and app-specific keyboard shortcuts will allow for warnings when you're using a shortcut that a lot of users may need to remap.

## Web Extensions and Userscripts

Web Command Palette makes it very easy to implement functionality that will be prompted by the user. Imagine you want to make an extension that allows users to hide elements on websites they visit. You could simply supply Web Command Palette a callback that invokes your functionality at keypress.

- Allow easy user management of your extension's keyboard shortcuts.
- Provide extenstions that utilize simple keypresses to invoke their functionality.
- Write simple userscripts that others can use without worrying about if you picked the right keyboard shortcut.

# Installation

Currently, this library is still in development. Once a stable version is ready, you should be able to install it with `npm install web-command-palette` or with any other package manager for all your web development needs.

# Usage

## Userscripts

Userscripts are loaded and run on every webpage you visit, though you often don't have control of the order in which your userscripts run. For this reason, Web Command Palette provides a global variable and an event you can listen to. In your Userscript, we recommend the following pattern:

````javascript
// Create a handler that registers your command with the Web Command Palette.
function registerWithCommandPalette(commandPalette) {
  const keyCombination = {
    default: {
      metaKey: true,
      shiftKey: true,
      keyCode: 72,
    }
  };
  const options = {
    run: () => {
      alert("Ctrl+Shift+H was pressed!");
    }
  }
  commandPalette.registerCommand(default, options);
}

// Invoke your handler on the existance of the Web Command Palette library.
if (window.CommandPalette) {
  registerWithCommandPalette(window.commandPalette);
} else {
  window.addEventListener(
    "commandpaletteready",
    () => registerWithCommandPalette(e.details.commandPalette)
  );
}
````

## Web Apps

Web Command Palette may already be installed as a userscript or extension on your users' machine. WCP can have flags enabled or disabled, and by default, all versions of WCP installed as a userscript have the "userscript" tag, all versions using a package manager have the "web" tag, and all versions installed as an extension have an "extension" tag. For the best user experience, we will provide the user with the most up-to-date version of WCP between the web and extension versions. The userscript version of WCP will never be used unless a user edits their userscript to force it to load.

````javascript
import { registerCommand } from "web-command-palette";


const keyCombination = {
  default: {
    metaKey: true,
    shiftKey: true,
    keyCode: 72,
  }
};
const options = {
  run: () => {
    alert("Ctrl+Shift+H was pressed!");
  }
}
commandPalette.registerCommand(default, options);
````
