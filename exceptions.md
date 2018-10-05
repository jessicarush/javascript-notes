# Exceptions

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

`Error()` is a built-in object that you can use. The error object provides two useful properties: `name` and `message`.
You can also create your own error object  using this pattern.

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
