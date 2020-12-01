# script-store
[![npm](https://img.shields.io/npm/v/green-to-red)](https://www.npmjs.com/package/green-to-red)
[![npm](https://img.shields.io/npm/dt/green-to-red)](https://www.npmjs.com/package/green-to-red)
[![GitHub](https://img.shields.io/github/license/radulucut/green-to-red)](https://github.com/radulucut/green-to-red/blob/master/LICENSE)

### Dynamic script loader


## Install
```
$ npm install script-store
```

## Usage
```javascript
const scriptStore = require('script-store');

const store = new scriptStore();

store.load('script.js').then(() => {
  // script loaded
});

// OR

await store.load('script.js');
```
```
