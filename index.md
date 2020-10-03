# Web Command Palette

Web Command Palette gives you the power to create keyboard shortcuts that simply work cross-platform.

## Examples

In the below examples, you can see how Web Command Palette takes care of all the boilerplate for you.

### Simple Example

**Without Web Command Palette**

```javascript
window.addEventListener("keydown", (event) => {
  const modKey =
    navigator.platform.search(
      /iPhone|iPod|iPad|Macintosh|MacIntel|MacPPC|Mac68K/
    ) !== -1
      ? "metaKey"
      : "ctrlKey";
      
  if (event[modKey] && event.altKey && event.code === "KeyG") {
    event.preventDefault();
    alert("Go!");
  } else if (event[modKey] && event.shiftKey && event.code === "KeyG") {
    event.preventDefault();
    alert("Stop!");
  }
});
```

**With Web Command Palette**

```javascript
registerCommands({
  "mod+opt+KeyG": alert("Go!"),
  "mod+opt+shift+KeyG": alert("Stop!"),
});
```

These above examples show basic functionality, but what if you only want your users to use a keyboard shortcut in a certain context?

**Without Web Command Palette**

```javascript
import { modal } from "./modal";

window.addEventListener("keydown", (event) => {
  const modKey =
    navigator.platform.search(
      /iPhone|iPod|iPad|Macintosh|MacIntel|MacPPC|Mac68K/
    ) !== -1
      ? "metaKey"
      : "ctrlKey";

  if (modal.isOpen) {
    if (event.code === "Escape") {
      event.preventDefault();
      modal.close();
    } else if (event[modKey] && event.code === "KeyS) {
      event.preventDefault();
      modal.saveState();
    }
  }
});
```

**With Web Command Palette**

```javascript
import { modal } from "./modal";

registerCommands({
  "Escape": {
    run: () => modal.close(),
    when: () => modal.isOpen,
  },
  "mod+KeyS": {
    run: () => modal.saveState(),
    when: () => modal.isOpen,
  }
});
```

# Chords

Another common pattern for keyboard shortcuts is chaining them together. For example, you may want your users to press "Ctrl/Cmd G" then "C" to go to a catalog of items and "Ctrl/Cmd F" then "C" to search within that same catalogue. 

**Without Web Command Palette**

```javascript
let currentChord = null;

window.addEventListener("keydown", (event) => {
  const modKey =
    navigator.platform.search(
      /iPhone|iPod|iPad|Macintosh|MacIntel|MacPPC|Mac68K/
    ) !== -1
      ? "metaKey"
      : "ctrlKey";
  
  if (currentChord === null) {
    if (event[modKey] && event.code === "KeyG") {
      event.preventDefault();
      currentChord = "goto";
    } else if (event[modKey] && event.code === "KeyF") {
      event.preventDefault();
      currentChord = "find";
    }
  } else if (currentChord === "goto" && event.code === "KeyC") {
    event.preventDefault();
    currentChord = null;
    goToCatalog();
  } else if (currentChord === "find" && event.code === "KeyC") {
    event.preventDefault();
    currentChord = null;
    findInCatalog();
  } else if (currentChord !== null) {
    currentChord = null;
  }
});
```

**With Web Command Palette**

```javascript
registerCommands({
  "mod+KeyG KeyC": () => goToCatalog(),
  "mod+KeyF KeyC": () => findInCatalog(),
});
```
