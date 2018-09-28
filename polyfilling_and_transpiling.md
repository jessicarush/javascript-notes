# Polyfilling

In working with a language that has many new features but having to also consider outdated browsers, there are a couple of options for addressing the gap between new JavaScript syntax and the JavaScript syntax that a given web browser recognizes: *polyfilling* and *transpiling*.

*Polyfilling* means to produce a piece of code that's equivalent in behavior to the new feature, but will run in older JavaScript environments. Here's an example of polyfilling... ES6 defines a utility called `Number.isNaN()` to check for `NaN` values. This replaces the deprecated `isNaN()` utility:

```javascript
var a = 10;
var b = NaN;

console.log(Number.isNaN(a));  // false
console.log(Number.isNaN(b));  // true

if (!Number.isNaN) {
  Number.isNaN = function isNaN(x) {
    return x !== x;  
  };
}
```
In JavaScript, `NaN` is the only value in the language that is not equal to itself, therefor our polyfill code will only return true if `x` is `NaN`. Not all new features are *polyfillable* and it can be very difficult to properly implement one yourself. A vetted set of trusted polyfills can be found at [ES5-Shim](https://github.com/es-shims/es5-shim) and [ES6-Shim](https://github.com/es-shims/es6-shim).


# Transpiling

There is no way to polyfill new syntax. New syntax will just throw an invalid/unrecognized error in older JS engines. The only option is to use a tool that converts newer code into older code equivalents. This process is called transpiling for transforming and compiling. To do this, you would typically insert a transpiler into your build process, similar to a code linter or minifier.

An example would be, ES6 added the ability to define default parameter values:

```javascript
function foo(a=5) {
  console.log(a);
}
foo(10);  // 10
foo();    // 5
```

A transpilier would take that code and turn it into something like this:

```javascript
function foo() {
  var a = arguments[0] !== (void 0) ? arguments[0] : 5;
  console.log(a);
}
foo(10);  // 10
foo();    // 5
```

The `var a` statement uses the conditional operator. Provided the first argument isn't undefined `(void 0)`, use it, otherwise use 5.

Since JS will continue to evolve, transpilers should be thought of as part of the standard JS development process. Here are some good ones:

[Babel](https://babeljs.io/) transpiles ES6 to ES5.  
[Traceur](https://github.com/google/traceur-compiler) transpiles ES6, ES7 and beyond to ES5.

Also, a [good article here about transpilers](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them).

Finally, [caniuse.com](https://caniuse.com/) is a website that provides data on web browser compatibility for HTML, CSS, and JavaScript features.

### Babel

We pass JavaScript ES6 to Babel, which will transpile it to ES5 and write it to a file in the lib directory. The [Babel installation page](https://babeljs.io/setup#installation) says:

> While you can install Babel CLI globally on your machine, it's much better to install it locally project by project. There are two primary reasons for this.
> 1. Different projects on the same machine can depend on different versions of Babel allowing you to update one at a time.
> 2. It means you do not have an implicit dependency on the environment you are working in. Making your project far more portable and easier to setup.


#### Step 1: create a *src* directory

The first step is to place your ES6 JavaScript file(s) in a directory called `src`. From your root directory, the path to an ES6 file is `./src/main.js`


#### Step 2. create a package.json

Before installing Babel with `npm`, we should have a `package.json`. This file holds information about the current JavaScript project. This includes *Metadata* (project title, description, authors, license information), *Dependencies* (a list of node packages required for the project), key-value pairs for command line scripts and more.

To create a package file, use the `npm init` command from the root folder of your project.


#### Step 3. Install Babel CLI package

Once you've created the `package.json` file in your project root folder with `npm init`, You can install the Babel CLI. The install command creates a folder called `node_modules` and copies the package files to it.

```sh
npm install babel-cli -D
```

Note the `-D` or `--save-dev` flag tells npm that this package is for development only. It gets recorded in your `package.json` under `devDependencies`.


#### Step 4. Install the Babel ES6+ to ES5 preset

This package contains all the ES6+ to ES5 syntax mapping information.

```sh
npm install babel-preset-env -D
```

#### Step 5. babelrc

Next, we need to create a `.babelrc` config file in the project root folder. This is where we tell Babel the version of the source JavaScript code (called a *preset*).

To specify that we are transpiling code from an ES6+ source, we have to add the following into `.babelrc`:

```json
{
  "presets": ["env"]
}
```


#### Step 6. Babel scripts

Instead of running Babel directly from the command line we're going to put our commands in npm scripts which will use our local version. Simply add to "scripts" in to your `package.json` and put the babel command inside there as build.

```json
...
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "babel src -d lib"
}
```

A breakdown:   
`babel` – the command call responsible for transpiling code.  
`src` – instructs Babel to transpile all JavaScript code inside the src directory.  
`-d` – Instructs Babel to write the transpiled code to a directory.
`lib` – Babel writes the transpiled code to a directory called lib.

#### Step 7. Run the script

```sh
npm run build
```

The npm run build command will transpile all JavaScript files inside of the `src` folder. The output will be put into the `lib` directory.
