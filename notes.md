# Misc JavaScript Notes


This document contains small bits of information that don't really fit anywhere else, or aren't big enough (yet) for their own file.

## Table of Contents

<!-- toc -->

- [About the Language](#about-the-language)
- [On Style](#on-style)
- [Comments](#comments)
- [Semicolons](#semicolons)
- [Spaces after function names](#spaces-after-function-names)
- [Escape Characters](#escape-characters)
- [Output](#output)
- [Input](#input)
- [Strict mode](#strict-mode)
- [Spread Syntax `...`](#spread-syntax-)
- [JSHint](#jshint)
- [Glossary](#glossary)

<!-- tocstop -->

## About the Language

[Ecma International](https://www.ecma-international.org/), is the organization responsible for standardizing JavaScript. It stands for European Computer Manufacturers Association. It released a new version of JavaScript in 2015, called ECMAScript2015, commonly referred to as ES6. Note, the 6 refers to the version of JavaScript and is not related to the year it was released (the previous version was ES5 released in 2009).

Web browsers are not the only platforms on which JavaScript is used. Some databases, such as MongoDB and CouchDB, use JavaScript as their scripting and query language. Several platforms for desktop and server programming, most notably the Node.js project, provide an environment for programming JavaScript outside of the browser.

## On Style

Good programs have a structure that anticipates—but is not overly burdened by—the possible modifications that will be required in the future. Good programs also have a clear presentation. The long-term value of software to an organization is in direct proportion to the quality and readability of the codebase. If a program is able to clearly communicate its structure and characteristics, it's less likely to break when modified.


## Comments
Code comments can be done in two ways:
```javascript
// Single line comment
a = 5;  // inline comment

/* multi-line
comment block */
```

A variation of the comment block, often used for more formal documentation and may include details about the file, including the script's name, version, and author.

```javascript
/**
 * Summary
 *
 * Description
 */
```

Note that this pair `*/` can occur in regular expressions and so are not safe for commenting out blocks of code. In these cases it's best to stick with `//` and avoid `/* */`.

Comments in your code should explain *why*, not *what*. They can also explain *how* if the code is particularly confusing.


## Semicolons

When to use semicolons in JavaScript? In general, you don't need semicolons after a block `{...}` *unless* that block is part of an assignment as with object assignments and function expressions.

**YES semicolons after:**
```javascript
// variable declarations
let x;

// value assignments
x = '';

// variable declaration & assignment
const tax = 12;

// variable assignment of objects
let obj = {name: 'Morty'};

// function expressions
let foo = function () {...};

// immediately invoked function expressions
let foo = function () {...}();

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
function identifier(arg) {...}
```


## Spaces after function names

There is no fixed rule here, just a style preference. That being said, a common pattern is for named functions, DO NOT insert space between the function name and parentheses:

```javascript
function doStuff() {
  // code
}
```

For anonymous functions, DO insert space between function keyword and parentheses:

```javascript
function () {
  // code
}
```


## Escape Characters

The backslash `\` can be used in strings to escape characters or insert control characters, such as:

```javascript
const doublequote = "\"";
const singlequote = '\'';
const backslash = '\\';
const backspace = '\b';
const formfeed = '\f';
const newline = '\n';
const hardreturn = '\r';
const tab = '\t';
const unicode = '\u25b6';
```


## Output

These methods are used to print text to the developer console. In this case, `console` is the object and `.log()` is the function call.

```javascript
console.info('info');
console.error('error');
console.warn('warn');
console.log('log');
```

Most browsers also support the `.table()` method which outputs objects or arrays as a nicely formatted table. This can be particularly helpful when working with third party data.

```javascript
var users = [
    {
        name: 'jessica',
        color: 'green',
        date: '08-29-2019'
    },
    {
        name: 'scott',
        color: 'orange',
        date: '08-27-2019'
    },
    {
        name: 'pingpong',
        color: 'pink',
        date: '08-20-2019'
    }
];

console.table(users);
```

You can conditionally log to the console using the `.assert()` method:

```javascript
var test = {
    name: 'jessica'
};

console.assert(Array.isArray(test), 'not an array');
// Assertion failed: not an array
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


## Spread Syntax `...`

*Spread syntax* allows an iterable such as an array or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object to be expanded in places where zero or more key-value pairs (for object literals) are expected.

For example:

```javascript
const numbers = [1, 2, 3];

const new_numbers = [...numbers, 4, 5];

console.log(new_numbers);
// [ 1, 2, 3, 4, 5 ]
```

Unpacking elements to pass to a function:

```javascript
let dateFields = [1970, 0, 1];

let d = new Date(...dateFields);

console.log(d.toDateString());
// Thu Jan 01 1970
```

As *rest parameters* function arguments:

```javascript
function sum(...args) {
  return args.reduce((accumulator, current) => {
    return accumulator + current;
  });
}

console.log(sum(1, 2, 3, 4));
// 10

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// 6
```

Key value pairs can be pulled out of object to create a new object:

```javascript
let todos = [
  {id: 1, task: 'water plants', completed: false},
  {id: 2, task: 'laundry', completed: false},
  {id: 3, task: 'groceries', completed: false},
];

let test1 = {...todos[0], add: 'another'}
console.log(test1);
// { id: 1, task: "water plants", completed: false, add: "another" }
```

If you pass a key that already exists in the object, the new value will be used:

```javascript
let todos = [
  {id: 1, task: 'water plants', completed: false},
  {id: 2, task: 'laundry', completed: false},
  {id: 3, task: 'groceries', completed: false},
];

let test2 = {...todos[2], completed: true}
console.log(test2);
// { id: 3, task: "groceries", completed: true }
```


## JSHint

When using a linter like JSHint, you can avoid ES6 syntax errors by creating a `.jshintrc` file and placing it in the root directory of your project. In this file type the following:

```json
{
  "esversion": 6
}
```


## Glossary

- an *expression* evaluates to a single value and relies on operators to calculate a value.
- a *statement* is a line of code (instructions) composed of values, operators, keywords, etc., and ends with a semicolon `;`.
- a *code block* is one or more statements contained within curly braces `{}`.
