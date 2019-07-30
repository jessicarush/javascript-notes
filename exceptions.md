# Exceptions

Otherwise known as error handling, problems (unexpected or expected) will happen in the running of our code. Exceptions provides us a way of gracefully handling those errors.

## Table of Contents

<!-- toc -->

- [try, throw, catch](#try-throw-catch)
- [finally](#finally)
- [Error()](#error)

<!-- tocstop -->

## try, throw, catch

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


## finally

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


## Error()

`Error()` is a built-in object that you can use. The error object provides two useful properties: `name` and `message`. You can also create your own error object  using this pattern.

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
