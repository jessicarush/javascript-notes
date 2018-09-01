# Polyfilling

In working with a language that has many new features but having to also consider outdated browsers, there are a couple of options for using new features: *polyfilling* and *transpiling*.

*Polyfilling* means to produce a piece of code that's equivalent in behavior to the new feature, but will run in older JavaScript environments. Here's an example of polyfilling. ES6 defines a utility called `Number.isNaN()` to check for `NaN` values. This replaces the deprecated `isNaN()` utility:

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
function foo(a = 5) {
  console.log(a);
}
foo(10);  // 10
foo();    // 5
```

A transpilier would take that code a turn it into something like this:

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

[Babel](https://babeljs.io/) transpiles ES6 to ES5
[Traceur](https://github.com/google/traceur-compiler) transpiles ES6, ES7 and beyond to ES5.

Also, a [good article here about transpilers](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them).
