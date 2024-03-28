# scripts - Dynamic script loader for DOM

Load scripts dynamically and execute a callback when the script is loaded. If the script is already loaded, the callback is executed immediately.

[![npm](https://img.shields.io/npm/v/@radulucut/scripts)](https://www.npmjs.com/package/@radulucut/scripts)
[![npm](https://img.shields.io/npm/dt/@radulucut/scripts)](https://www.npmjs.com/package/@radulucut/scripts)
[![GitHub](https://img.shields.io/github/license/radulucut/scripts)](https://github.com/radulucut/scripts/blob/master/LICENSE)

## Install

```
$ npm install @radulucut/scripts
```

## Usage

```javascript
import Scripts from "@radulucut/scripts";

const scripts = Scripts();

scripts.Load(
  "./script.js",
  () => {
    console.log("script loaded");
  },
  (error) => {
    console.error("Failed to load script", error);
  }
);

scripts.Load(
  "https://code.jquery.com/jquery-3.5.1.min.js",
  () => {
    console.log("jQuery loaded");
  },
  (error) => {
    console.error("Failed to load jQuery", error);
  }
);

const isLoaded = scripts.IsLoaded("./script2.js"); // false
```
