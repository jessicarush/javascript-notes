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
console.dir(document);
console.dir(document.URL);
console.count('something');
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

You can measure how long a script takes to run with `.time()` and `.timeEnd()`:

```javascript
console.time('Time test')
  console.log('Running some code...');
console.timeEnd('Time test')
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

Note that when logging a variable, you can wrap the name in curly braces to log the variable name along with the value. For example:

```javascript
let x, y = 2;

console.log({x}, {y});
// { x: undefined } { y: 2 }
```

Note that you would likely never use these in production code.


## Input

While you would generally create an HTML form to receive user input, a cheap and easy way for learning and demonstration purposes is to use the `prompt()` function:

```javascript
x = prompt('Enter a number:');
console.log(x);
```


## Strict mode

ES5 added a *strict mode*, which tightens the rules for certain behaviors. This is generally recommended as these restrictions help keep code safer, more optimizable and more closely represents the future direction of the language. You can enable *strict mode* for individual functions or entire files depending on where you place the *strict mode pragma*:

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

## Glossary

- an *expression* evaluates to a single value and relies on operators to calculate a value.
- a *statement* is a line of code (instructions) composed of values, operators, keywords, etc., and ends with a semicolon `;`.
- a *code block* is one or more statements contained within curly braces `{}`.
