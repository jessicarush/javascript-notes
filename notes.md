# Misc JavaScript Notes

This document contains small bits of information that don't really fit anywhere else, or aren't big enough (yet) for their own file.

## Table of Contents

<!-- toc -->

- [About the Language](#about-the-language)
- [Comments](#comments)
- [Semicolons](#semicolons)
- [Output](#output)
- [Input](#input)
- [Strict mode](#strict-mode)
- [JSHint](#jshint)
- [JSON](#json)
- [Glossary](#glossary)

<!-- tocstop -->

## About the Language

[Ecma International](https://www.ecma-international.org/), is the organization responsible for standardizing JavaScript. It stands for European Computer Manufacturers Association. It released a new version of JavaScript in 2015, called ECMAScript2015, commonly referred to as ES6. Note, the 6 refers to the version of JavaScript and is not related to the year it was released (the previous version was ES5 released in 2009).

Web browsers are not the only platforms on which JavaScript is used. Some databases, such as MongoDB and CouchDB, use JavaScript as their scripting and query language. Several platforms for desktop and server programming, most notably the Node.js project, provide an environment for programming JavaScript outside of the browser.


## Comments
Code comments can be done in two ways:
```javascript
a = 5;  // single line comment

/*
Multi-line
comment
*/
```

That being said, this pair `*/` can occur in regular expressions and so are not safe for commenting out blocks of code. It's best to stick with `//` and avoid `/* */` altogether.

Comments in your code should explain *why*, not *what*. They can also explain *how* if the code is particularly confusing.


## Semicolons

When to use semicolons in JavaScript? In general, you don't need semicolons after a block `{...}` *unless* that block is part of an assignment as with object assignments and function expressions.

**YES semicolons after:**
```javascript
// variable declarations
let x;

// value assignments
let x = '';

// variable declaration & assignment
const tax = 12;

// variable assignment of objects
let obj = {name: 'Morty'};

// function expressions
let foo = function() {...};

// immediately invoked function expressions
let foo = function() {...}();

// function calls
alert('Hi');

// do while loops
do {...} while (...);
```

**NO semicolons after:**
```javascript
// conditional (control flow) statements
if  (...) {...}
else if (...) {...}
else {...}

// for loops
for (...) {...}

// while loops
while (...) {...}

// function declarations
function identifier (arg) {...}
```


## Output

This function is used to print (or log), text to the developer console. In this case, `console` is the object and `.log()` is the function call.

```javascript
console.info('info');
console.error('error');
console.warn('warn');
console.log('log');
```

This function will print to the HTML page:

```javascript
document.writeln('Hello?');
```

This function will write to an alert pop-up:
```javascript
alert('Hello.');
```

Note that you would likely never use these in production code.


## Input

While you would generally create an HTML form to receive user input, a cheap and easy way for learning and demonstration purposes is to use the `prompt()` function:

```javascript
x = prompt('Enter a number:');
console.log(x);
```


## Strict mode

SE5 added a *strict mode*, which tightens the rules for certain behaviors. This is generally recommended as these restrictions help keep code safer, more optimizable and more closely represents the future direction of the language. You can enable *strict mode* for individual functions or entire files depending on where you place the *strict mode pragma*:

```javascript
function foo() {
  'use strict';
  // this functions code is strict mode
}
```
versus:

```javascript
'use strict';
// the whole document is strict mode...
// though this would seem much simpler than placing in each function,
// the linters appear to get all pissy about about it.

function foo() {
}
```


## JSHint

When using a linter like JSHint, you can avoid ES6 syntax errors by creating a `.jshintrc` file and placing it in the root directory of your project. In this file type the following:

```json
{
  "esversion": 6
}
```


## JSON

If you want to save data in a file for later or send it to another computer over a network, you have to *serialize* the data. That means it is converted into a flat description. A popular serialization format is JSON (JavaScript Object Notation). It is widely used as a data storage and communication format on the Web, even in languages other than JavaScript.

JSON looks similar to JavaScript’s way of writing arrays and objects, with a few restrictions. All property names have to be surrounded by double quotes, and only simple data expressions are allowed—no function calls, bindings, or anything that involves actual computation. Comments are not allowed in JSON.

JavaScript gives us the functions `JSON.stringify` and `JSON.parse` to convert data to and from this format. The first takes a JavaScript value and returns a JSON-encoded string. The second takes such a string and converts it to the value it encodes.

```javascript
let obj = { name: 'jessica', age: 43, codeword: 'pingpong' };

let str = JSON.stringify(obj);

console.log(typeof str, str);
// string {"name":"jessica","age":43,"codeword":"pingpong"}

let name = JSON.parse(str).name;

console.log(name);
// jessica
```

Any *JSON-safe* value can be stringified. Some examples of values that cannot be stringified are: `undefined`, `functions`, `symbols`, and objects with circular references. With the exception of circular references, the `JSON.stringify()` utility will automatically omit these when it comes across them. If such a value is found in an array, it will be replaced with `null`.

If an object has a `toJSON()` method, this method will be called first to get a value for serialization. In other words, if you intend to stringify an object that may contain illegal JSON values, you should define a `toJSON()` method that returns a *JSON-safe* version of the object. For example:

```javascript
let one = {};

let two = {
  a: 42,
  b: one,
  c: function() {}
};

// create a circular reference inside one:
one.d = two;

// JSON.stringify(two);
// TypeError: Converting circular structure to JSON


// define a custom JSON serialization helper:
two.toJSON = function() {
  return {a: this.a};
};

let test = JSON.stringify(two);

console.log(test);
// {"a":42}
```

`JSON.stringify()` takes an optional 2nd argument called the *replacer*. This can be an array or a function that provides a filtering mechanism for which properties should be included in the serialization.

If the *replacer* is an array, then it should be an array of strings where each string specifies a property name that is included in the serialization. If the property exists and isn't in the list, it will be skipped.

If the *replacer* is a function it will be called once for the object itself, and once for each property in the object. The function is passed two arguments: *key* and *value*. To skip a key in the serialization, return `undefined` otherwise return the value provided.

```javascript
let one = {};

let two = {
  a: 42,
  b: one,
  c: function() {}
};

// create a circular reference inside one:
one.d = two;

let test1 = JSON.stringify(two, ['a']);

console.log(test1);
// {"a":42}

let test2 = JSON.stringify(two, function(k, v) {
  if (k != 'b') return v;
});

console.log(test2);
// {"a":42}
```

`JSON.stringify()` also takes an optional 3rd argument called the *space*. If passed it it indicates hoe many spaces should be used at each indentation level.

```javascript
let obj = {
  a: 'hello',
  b: [2, 23, 45],
  c: '100'
}

let test = JSON.stringify(obj, null, 2);

console.log(test);
// {
//   "a": "hello",
//   "b": [
//     2,
//     23,
//     45
//   ],
//   "c": "100"
// }
```

## Glossary

- an *expression* evaluates to a single value and relies operators to calculate a value.
- a *statement* is a line of code (instructions) composed of values, operators, keywords, etc., and ends with a semicolon `;`.
- a *code block* is one or more statements contained within curly braces `{}`.
