# Errors, Exceptions & Debugging


## Table of Contents

<!-- toc -->

- [Exceptions](#exceptions)
  * [try, throw, catch](#try-throw-catch)
  * [finally](#finally)
- [Error objects](#error-objects)
- [Debugging](#debugging)
  * [Where is the problem?](#where-is-the-problem)
  * [What exactly is the problem?](#what-exactly-is-the-problem)
  * [Breakpoints](#breakpoints)
  * [Tips](#tips)

<!-- tocstop -->

## Exceptions

...otherwise known as error handing. Problems (unexpected or expected) will happen in the running of our code. Exceptions provide us a way of gracefully handling those errors. This is particularly important when an error may occur in the script for reasons beyond out control, for example, while requesting data from a third party server. If the server doesn't respond for some reason, we should handle the error.

### try, throw, catch

The `throw` statement raises a user-defined exception. Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack. If no catch block exists among caller functions, the program will terminate. In other words, if the `throw` statement is in a `try` block, then control goes to the `catch` clause.

The expression can just be a string, but it's usually an object literal containing a name property and a message property.

```javascript
const throwTest = (arg) => {
  try {
    if (typeof arg !== 'number') {
      // throw `${arg} is not a number.`;
      throw new Error(arg + ' is not a number!');
    }
    else {
      console.log(arg + ' is a number');
    }
  }
  catch(error) {
    console.log('HEY! ' + error);
  }
};

throwTest(13);
throwTest('13');
throwTest('thirteen');
// 13 is a number
// HEY! Error: 13 is not a number!
// HEY! Error: thirteen is not a number!
```


### finally

The `finally` clause can be added to any try block to run code no matter what happens.

```javascript
const throwTest = (arg) => {
  try {
    if (typeof arg !== 'number') {
      // throw `${arg} is not a number.`;
      throw new Error(arg + ' is not a number!');
    }
    else {
      console.log(arg + ' is a number');
    }
  }
  catch(error) {
    console.log('HEY! ' + error);
  }
  finally {
    console.log('This happens no matter what.');
  }
};

throwTest(13);
throwTest('thirteen');
// 13 is a number
// This happens no matter what.
// HEY! Error: thirteen is not a number!
// This happens no matter what.
```

You can use it alone with `try`:

```javascript
const finallyTest = (arg) => {
  try {
    return arg * 2;
  }
  finally {
    console.log('Done.');
  }
};

console.log(finallyTest(13));
// Done.
// 26
```


## Error objects

`Error()` is a built-in object that you can use. The error object provides two useful properties: `name` and `message`. You can also create your own error object using this pattern. For example:

```javascript
function numberError(message) {
   this.message = message;
   this.name = 'Number Error';
}

const throwTest = (arg) => {
  try {
    if (typeof arg !== 'number') {
      throw new numberError(arg + ' is not a number!');
    }
    else {
      console.log(arg + ' is a number');
    }
  }
  catch(error) {
    console.log(`${error.name}: ${error.message}`);
  }
};

throwTest(13);
throwTest('13');
throwTest('thirteen');
// 13 is a number
// Number Error: 13 is not a number!
// Number Error: thirteen is not a number!
```

There are seven types of error objects built in to JavaScript, plus one, `InternalError`, that hasn't been standardized yet:

Error object   | Description
:-----------   | :----------
Error          | a generic error, the other errors are based off this one
EvalError      | reports errors that occur in the global function eval()
InternalError  | an error that occurs when an internal error in the JavaScript engine is thrown, e.g. "too much recursion"
RangeError     | an error that occurs when a numeric variable or parameter is outside of its valid range
ReferenceError | an error that occurs when trying to reference a variable that is not declared/within a scope
SyntaxError    | a syntax error that occurs while parsing code
TypeError      | an error that occurs when a variable or parameter is not of a valid type (and cannot be coerced). Is often caused by trying to use an object or method that does not exist.
URIError       | an error that occurs when encodeURI() or decodeURI() are passed invalid parameters


## Debugging

If a problem is hard to find, it can be easy to loose track of what you have and have not tested. When you start debugging, consider keeping notes of what you've tested and what the result was.

### Where is the problem?

Try to narrow down the area where the problem seems to be:

1. Look at the error message in the console. It will tell you the relevant script that caused the problem, the line number where it became a problem for the interpreter and the type of error (keep in mind that the underlying cause of the error may be different).

2. Check how far the script is running. Write messages to the console to determine how far your script has executed. Remember you have several different console methods to choose from:
```javascript
console.info('info');
console.error('error');
console.warn('warn');
console.log('log');
console.table(objectOrArray);
console.assert(Array.isArray(objectOrArray), 'not an array')
```

3. Use breakpoints where things are going wrong. This lets you pause execution and inspect the values in stored variables.

### What exactly is the problem?

Once you know the approximate area, try to locate the exact line that is causing the error.

1. With breakpoints in place, check to see if the values of variables are what you expect them to be. If not, look earlier in the script.

2. Breakdown or breakout parts of the code to test smaller pieces of the functionality. For example:
    - write values of variables to the console
    - call functions from the console to check that they are returning what you expect
    - check if objects exist and have the methods/properties that you think they do

3. Check the number of parameters in functions and item in arrays are what you expect

### Breakpoints

In the console's debugger or sources tab you can:
1. select the script
2. click on the line number to insert a breakpoint
3. when you run/refresh the script, it will pause at this point. You can hover over the variables to see their current value.
4. if you have multiple breakpoints (or a breakpoint in a loop) you can step into, over and out using the buttons

You can also hard-code breakpoints into your script by typing the keyword `debugger`:

```javascript
function doSomething() {
    debugger;  // a breakpoint is set if developer tools are open
}
```

You can also add conditional breakpoints by right-clicking on a line number or existing breakpoint. When you run the script the execution will pause on the breakpoint only if the condition is true.

### Tips

- Try another browser: some problems are browser specific, run the code in other browsers
- Add numbers: writing numbers to the console can help identify how far the code runs
- Add tabs: if using recursion, logging with a tab to start can help visually identify the level of recursion.
- Strip it back: comment out parts of the code to help test individual parts
- Explain it: sometimes a solution is found by simply explaining the problem out loud to someone else
- Validation tools: always use a linter (jslint, jshint, jsonlint)
- Search: stack overflow for similar issues
- If you get to a point where you need to post your problem in a forum, consider setting it up in a code playground tool like: JSFiddle, Dabblet or CodePen
- Try `console.log(JSON.parse(JSON.stringify(obj)))` to log objects, avoiding a [lazy evaluating issue in Chrome](https://stackoverflow.com/questions/4057440/is-chrome-s-javascript-console-lazy-about-evaluating-objects).
