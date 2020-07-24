# Modules

## Table of Contents

<!-- toc -->

- [Introduction](#introduction)
- [ES6: Export](#es6-export)
  * [default export](#default-export)
  * [named export](#named-export)
  * [summary](#summary)
- [ES6: Import](#es6-import)
- [ES6: indicate the script contains a module in your HTML](#es6-indicate-the-script-contains-a-module-in-your-html)
- [CommonJS: module.exports](#commonjs-moduleexports)
- [CommonJS: require()](#commonjs-require)
- [Importing npm packages](#importing-npm-packages)
- [Summary](#summary)

<!-- tocstop -->

## Introduction

In the past we've had *the module pattern* which is based on an outer function containing inner functions and variables and that returns a *public API*. See [functions.md](functions.md#module-pattern).

JavaScript modules are reusable pieces of code that can be exported from one program and imported into another program. Modules are particularly useful for separating code with similar logic into files. The files themselves are called modules. The idea is that we can:

- find and debug code more easily
- reuse logic in different parts of our application
- keep information private and protected from other modules
- prevent pollution of the global namespace and potential naming collisions, by cautiously selecting the variables and behavior we load into a program

There are two main methods of importing and exporting modules. How you implement these methods will depend on whether you are running on the client-side (in the browser) or the server-side (in node.js). At the end of this doc, there is a table that summarizes the different use-cases. For now, know this:

CommonJS | ES6
-------- | ---
`require()` and `module.exports` | `import` and `export`

**CommonJS** is a specification and standard used in` Node.js` for working with modules. Though it is a server-side specification, it can also be used client-side with the help of additional tools (a bundler).

**ES6** added it's own built-in support for modules in JavaScript using `import` and `export` and can be used both client-side and server-side.

Some differences between the two:

- With ES6 `import`, you can selectively load only the pieces you need. This can save memory. You can't selectively load only the pieces you need with `require()`.

- Loading is synchronous for `require()`, whereas `import` can be asynchronous (not waiting for previous import) so it can perform a little better than `require()`.

- `require()` will automatically scan `node_modules` to find modules, but `import` won't (without the use of additional tools).

Note that since ES6 is still relatively new, many people use `babel` to transpile `import` and `export`, which makes `import` act the same as `require()`.

## ES6: Export

ES6 implemented a more readable, flexible syntax for exporting modules. These are usually broken down into one of two techniques, default export and named exports. The default export syntax works similarly to the module.exports syntax, allowing us to export one module per file.


### default export

```javascript
let Menu = {};

Menu.specialty = 'Roasted Beet Burger';

export default Menu;
```

`export default` uses the JavaScript export statement to export objects, functions, and primitive data types. `Menu` refers to the name of the `Menu` object, which is the object that we are setting the properties on within our module.

When using ES6 syntax, use `export default` in place of CommonJS `module.exports`


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

Note that you can do both default and named exports:

```javascript
let specialty = 'Roasted Beet Burger';
let seasonal = 'Pickled fiddleheads';

function isVegetarian() {
  console.log('Vegetarian');
}

export default isVegetarian;
export { specialty, seasonal };
```

### summary

Use `export default` to export JavaScript objects, functions, and primitive data types.
Use named exports to `export` data in variables.


## ES6: Import

ES6 also introduced a new syntax for imports:

```javascript
import Menu from './menu.js';
```

The `import` keyword begins the statement. `Menu` specifies the name of the variable to store the default export in. `from` specifies where to load the module from. When dealing with local files, it refers to the name of the file without the extension. Note that in order for this to work properly, **the from filename string must be prefixed with (./, /, ../ or https://)**.

When using named exports you would import like:

```javascript
import { specialty, isVegetarian } from './menu.js';
```

Optionally create an alias:

```javascript
import { specialty as special, isVegetarian as veg } from './menu.js';
```

Another way of using aliases is to import the entire module as an alias:

```javascript
import * as Whatever from './menu.js';

Whatever.specialty;
Whatever.isVegetarian();
```

To import both default and names exports:

```javascript
import isVegetarian, { special, seasonal } from './menu.js';
```

Note that `import` doesn't work in Node yet.


## ES6: indicate the script contains a module in your HTML

At some point, we'll want to include our main script in our HTML file. In order to have modules work properly in the browser we need to add the type attribute to the `<script>`, for example:

```html
<script src="main.js" type="module" defer></script>
```

Note: if you are running your script in Node, to load an ES6 module, you will have to identify the type as module by adding `"type": "module"` in the `package.json`.

Note: if you are writing a React app, your type will already be set as `type=text/jsx`, so changing it to `module` is not an option. In this case we would need to use another tool like [webpack](https://webpack.js.org/), [parcel](https://parceljs.org/), or [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).


## CommonJS: module.exports

This method of exporting modules on its own is intended for the sever-side (Node). If you want to use this on the client side, you'll need an additional tool like [browserify](http://browserify.org/). See [node_package_manager.md](node_package_manager.md) for more information.

The pattern we use to export modules is this:

1. Define an object to represent the module.
2. Add data or behaviour to the module.
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


## CommonJS: require()

A common way to import a module is with the require() function. To reiterate, this function does not work in standalone client-side (browser) javascript though. As mentioned above, you would been to include something like [browserify](http://browserify.org/) for that.

Provided the code above was saved in a file called `menu.js`, in another file we could do the following:

```javascript
const Menu = require('./menu.js');

console.log(Menu.getSpecialty());  // Roasted Beet Burger

function placeOrder() {
  console.log('My order is: ' + Menu.specialty);
}

placeOrder();  // My order is: Roasted Beet Burger
```

## Importing npm packages

Note that in addition to importing your own modules, you can also use `import` (or `require()`) to bring in npm packages. There are a couple ways to do this. The easiest is to use [jspm](https://jspm.org).

> jspm provides a *module CDN* allowing any package from npm to be directly loaded in the browser and other JS environments as a fully optimized native JavaScript module.

Importing a jspm package is easy. First, we need to make sure we have the main script's attribute set to module. (Reminder: only modern browsers support loading ECMAScript Modules.)

```html
<script src="js/main.js" type="module" defer></script>
```

Then in your javascript, import the package using the jspm.dev URL. All packages from npm are precomputed and served through jspm.dev and are available at their corresponding URLs.

```javascript
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
```

Another way of including packages is to use `npm init` and `npm intsall`. These will create a `package.json` and a `node_modules` directory. However, in order to use npm_modules via the syntax `import thing from "something";` for browsers, you'll need to set up a module bundler and ES6 compiler, such as [webpack](https://webpack.js.org/) and [babel](https://babeljs.io/) or [browserify](http://browserify.org/), [watchify](https://github.com/browserify/watchify) and [babelify](https://www.npmjs.com/package/babelify). See [node_package_manager.md](node_package_manager.md) for more information.

## Summary


What are you loading? | Where? | Solution(s)
--------------------- | ------ | -----------
Your own modules | client-side (index.html) | - use ES6 `import` and `export` syntax <br> - set `type=module` on the main `<script>` <br> *or* <br> - use `require()` and `module.exports` syntax <br> - use browserify, watchify and babelify to create a bundle.js <br>
Your own modules | server-side (index.js) | - use ES6 `import` and `export` syntax <br> - set `"type": "module"` in your `package.json` <br> *or* <br> - use `require()` and `module.exports` syntax
CDN packages  | client-side (index.html) | - use ES6 `import` synatx to import a jspm.dev URL <br> - set `type=module` on the main `<script>`
CDN packages  | server-side (index.js) | - Nope. Only `file:` and `data:` URLs are supported. A specifier like `'https://example.com/app.js'` may be supported by browsers but it's not supported in Node.js.
npm packages (node_modules) | client-side (index.html) | - use ES6 `import` and `export` syntax <br> - use browserify, watchify and babelify to create a bundle.js <br> - set `"type": "module"` in your `package.json` <br> *or* <br> - use `require()` and `module.exports` syntax <br> - use browserify, watchify and babelify to create a bundle.js
npm packages (node_modules) | server-side (index.js) | -  use ES6 `import` and `export` syntax <br> - set `"type": "module"` in your `package.json` <br> *or* <br> - use `require()` and `module.exports` syntax
