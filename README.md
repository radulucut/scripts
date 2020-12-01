# script-store
[![npm](https://img.shields.io/npm/v/script-store)](https://www.npmjs.com/package/script-store)
[![npm](https://img.shields.io/npm/dt/script-store)](https://www.npmjs.com/package/script-store)
[![GitHub](https://img.shields.io/github/license/radulucut/script-store)](https://github.com/radulucut/script-store/blob/master/LICENSE)

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
