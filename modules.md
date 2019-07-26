# Modules

In the past we've had *the module pattern* which is based on an outer function containing inner functions and variables and that returns a *public API*. See [functions.md](functions.md#module-pattern).

JavaScript modules are reusable pieces of code that can be exported from one program and imported into another program. Modules are particularly useful for separating code with similar logic into files. The files themselves are called modules. The idea is that we can:

- find and debug code more easily
- reuse logic in different parts of our application
- keep information private and protected from other modules
- prevent pollution of the global namespace and potential naming collisions, by cautiously selecting the variables and behavior we load into a program

## Table of Contents

<!-- toc -->

- [ES6 Export syntax](#es6-export-syntax)
  * [default export](#default-export)
  * [named export](#named-export)
  * [summary](#summary)
- [ES6 Import Syntax](#es6-import-syntax)
- [ES6 link your script as a module with type="module"](#es6-link-your-script-as-a-module-with-typemodule)
- [Exporting Modules with module.exports - node only](#exporting-modules-with-moduleexports---node-only)
- [Importing Modules with require() - node only](#importing-modules-with-require---node-only)

<!-- tocstop -->

## ES6 Export syntax

ES6 implemented a more readable, flexible syntax for exporting modules. These are usually broken down into one of two techniques, default export and named exports. The default export syntax works similarly to the module.exports syntax, allowing us to export one module per file.


### default export

```javascript
let Menu = {};

Menu.specialty = 'Roasted Beet Burger';

export default Menu;
```

`export default` uses the JavaScript export statement to export objects, functions, and primitive data types. `Menu` refers to the name of the `Menu` object, which is the object that we are setting the properties on within our module.

When using ES6 syntax, use `export default` in place of `module.exports`


### named export

With the other export technique called named exports, we are not setting the properties on an object. Each export is stored in its own variable.

```javascript
let specialty = 'Roasted Beet Burger';

function isVegetarian() {
  console.log('Vegetarian');
}

export { specialty, isVegetarian };
```

Named exports are special in that they can be exported as soon as they are declared, by placing the keyword `export` in front of variable declarations.

```javascript
export let specialty = 'Roasted Beet Burger';

export function isVegetarian() {
  console.log('Vegetarian');
}
```

Named exports also allow us to change the name (create an alias) of the variables when we export or import them using the `as` keyword. Note that this can also be done in the import statement.

```javascript
let specialty = 'Roasted Beet Burger';

function isVegetarian() {
  console.log('Vegetarian');
}

export { specialty as special, isVegetarian as veg };
```


### summary

Use `export default` to export JavaScript objects, functions, and primitive data types.
Use named exports to `export` data in variables.


## ES6 Import Syntax

ES6 also introduced a new syntax for imports:

```javascript
import Menu from './menu';
```

The `import` keyword begins the statement. `Menu` specifies the name of the variable to store the default export in. `from` specifies where to load the module from. When dealing with local files, it refers to the name of the file without the extension.

When using named exports you would import like:

```javascript
import { specialty, isVegetarian } from './menu';
```

Optionally create an alias:

```javascript
import { specialty as special, isVegetarian as veg} from './menu';
```

Another way of using aliases is to import the entire module as an alias:

```javascript
import * as Whatever from './menu';

Whatever.specialty;
Whatever.isVegetarian();
```

Note that `import` doesn't work in Node yet.

## ES6 link your script as a module with type="module"

At some point, we'll want to include our main script in our HTML file. In order to have modules work properly in the browser we need to add the type attribute to the `<script>`, for example:

```
<script src="main.js" type="module" defer></script>
```


## Exporting Modules with module.exports - node only

The pattern we use to export modules is this:

1. Define an object to represent the module.
2. Add data or behavior to the module.
3. Export the module.

For example:

```javascript
let Menu = {};

Menu.specialty = 'Roasted Beet Burger';

module.exports = Menu;
```

`module.exports = Menu;` exports the `Menu` object as a module. `module` is a variable that represents the module, and `exports` exposes the module as an object. Note that an array is also an object so we could export a `Menu = []` in the same way.

An alternate way would be:

```javascript
module.exports = {
  specialty: 'Roasted Beet Burger',
  getSpecialty: function () {
    return this.specialty;
  }
};
```

The idea here with module.exports is that you are exporting one module per file.


## Importing Modules with require() - node only

A common way to import a module is with the require() function. This function does not work in client-side (browser) javascript though. Provided the code above was saved in a file called `menu.js`, in another file we could do the following:

```javascript
const Menu = require('./menu.js');

console.log(Menu.getSpecialty());  // Roasted Beet Burger

function placeOrder() {
  console.log('My order is: ' + Menu.specialty);
}

placeOrder();  // My order is: Roasted Beet Burger
```
