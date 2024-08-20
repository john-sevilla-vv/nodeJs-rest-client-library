To use "Layer" function in helpers.js, add the following statements to your `TestWebSvc.js` file

```js
const logger = require('../log');
const { Layer } = require('./../utils/helpers'); // FOR LAYER: Remove before publishing

// ...

module.exports.main = async function (ffCollection, vvClient, response) {
  Layer(vvClient); // FOR LAYER: Remove before publishing

  // ...
};
```