![Web Command Palette Hero](https://repository-images.githubusercontent.com/299695693/89b2f580-0696-11eb-9351-5a4b832d73a0)

# Installation

Using npm:

```shell
$ npm i @web-command-palette/web-command-palette
```

# Quick Start

Web Command Palette abstracts away platform differences by introducing a new notation for modifier keys.

- `mod`: same as the Command key on Apple devices and the Control key most elsewhere.
- `opt`: same as the Option key on Apple devices and the Alt key most elsewhere.
- `shift`: same across all platforms.

```javascript
import { registerCommands } from "web-command-palette";

registerCommands({
  // 1
  "mod+opt+KeyP": (cpEvent) => console.log(cpEvent),

  // 2
  KeyP: (cpEvent) => alert("You pressed P!"),

  // 3
  "mod+KeyS": (cpEvent) => {
    externalObj.save();
    return {
      type: "success",
      message: "Saved successfully",
    };
  },

  // 4
  "mod+shift+KeyS": (cpEvent) => {
    cpEvent.initialFeedback({
      type: "info",
      message: "Saving to server...",
    });
    apiService.obsSave().subscribe(
      (successResp) =>
        cpEvent.feedback({
          type: "success",
          message: "Saved to server successfully",
        }),
      (errorResp) =>
        cpEvent.feedback({
          type: "danger",
          message: "Error while saving to server",
        }),
    );
  },

  // 5
  KeyV: {
    when: () => externalObj.isReady(),
    run: (cpEvent) => alert("Validated"),
  },

  // 6
  "mod+shift+KeyP KeyV": (cpEvent) => alert("Super validated!"),
});
```

The above examples highlight the core functionality:

1. Web Command Palette supplies an event object that gives you useful context for how to execute your functionality.
2. An example where a single key is pressed; modifier keys are not required.
3. You can respond with a feedback object that will give the WCP-UI plugin feedback to show the user.
4. You can use the CommandPaletteEvent object passed to your callback to provide feedback to the user in an asynchronous or observer context.
5. An example of the object syntax, using "when" to see if the command can be ran given your application's state.
6. An example of the chord syntax for keyboard shortcuts. A chord is a shortcut that requires two sets of keypresses in succession. In WCP, you seperate these sets with a space.
