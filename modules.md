# Modules

JavaScript modules are reusable pieces of code that can be exported from one program and imported into another program.

Modules are particularly useful for separating code with similar logic into files. The files themselves are called modules. The idea is that we can:

- find and debug code more easily
- reuse logic in different parts of our application
- keep information private and protected from other modules
- prevent pollution of the global namespace and potential naming collisions, by cautiously selecting the variables and behavior we load into a program


## Defining & Exporting Modules

The pattern we use to export modules is this:

1. Define an object to represent the module.
2. Add data or behavior to the module.
3. Export the module.

For example:

```javascript
let Menu = {};
Menu.specialty = "Roasted Beet Burger";

module.exports = Menu;
```

`module.exports = Menu;` exports the `Menu` object as a module. `module` is a variable that represents the module, and `exports` exposes the module as an object.


## Import with require()

A common way to import a module is with the require() function. Provided the code above was saved in a file called `menu.js`, in another file we could do the following:

```javascript
const Menu = require('./menu.js');

function placeOrder() {
  console.log('My order is: ' + Menu.specialty);
}

placeOrder();
```
