# Misc JavaScript Notes

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
var x;

// value assignments
var x = '';

// variable declaration & assignment
const tax = 12;

// variable assignment of objects
var obj = {name: 'Morty'};

// function expressions
var foo = function() {...};

// immediately invoked function expressions
var foo = function() {...}();

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
console.log('Hello!');
```

This function will print to the HTML page:

```javascript
document.writeln('Hello?');
```

This function will write to an alert pop-up:
```javascript
alert('Hello.');
```


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

## About the Language

[Ecma International](https://www.ecma-international.org/), is the organization responsible for standardizing JavaScript. It stands for European Computer Manufacturers Association. It released a new version of JavaScript in 2015, called ECMAScript2015, commonly referred to as ES6. Note, the 6 refers to the version of JavaScript and is not related to the year it was released (the previous version was ES5 released in 2009).
