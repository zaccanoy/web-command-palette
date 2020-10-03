# Web Command Palette

**Before**
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

**After**

```javascript
registerCommands({
  "mod+opt+KeyG": alert("Go!"),
  "mod+opt+shift+KeyG": alert("Stop!"),
});
```
