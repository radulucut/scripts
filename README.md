# scripts - Dynamic script loader for DOM

Load and keep track of scripts in the DOM.

![](https://github.com/radulucut/scripts/workflows/Node%20CI/badge.svg)
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

const scripts = Scripts(document);

scripts.Load(
  "./script.js",
  () => {
    console.log("script loaded");
  },
  () => {
    console.error("Failed to load script");
  }
);

scripts.Load(
  "https://code.jquery.com/jquery-3.5.1.min.js",
  () => {
    console.log("jQuery loaded");
  },
  () => {
    console.error("Failed to load jQuery");
  }
);

const isLoaded = scripts.IsLoaded("./script2.js"); // false
```
