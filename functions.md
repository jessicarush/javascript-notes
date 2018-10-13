# Functions

Functions are often used for code that you plan to call repeatedly, but they're also good for simply organizing related bits of code into named groups (even if you plan to only call it once). In JavaScript, there are many ways to create a function. One way to create a function is by using a *function declaration* (another way is via a *function expression*, described below). A *function declaration* is a function that is bound to an identifier, or name.

A barebones example of a **function declaration** and **function call**:

```javascript
function logAmount() {
  console.log(amount.toFixed(2));
}

let amount = 9.9888;

logAmount();  // 9.99
```

Functions can optionally include **parameters** (called **arguments** in the function call):

```javascript
function logAmount(amt) {
  console.log(amt.toFixed(2));
}

let amount = 9.9888;

logAmount(amount * 2);  // 19.98
```

As of ES6, you can define **default parameters**:

```javascript
function logAmount(amt, quantity=1) {
  console.log((amt * quantity).toFixed(2));
}

logAmount(9.9888, 2);  // 19.98
```

Functions can **return values**:

```javascript
function formatAmount(amt) {
  return '$' + amt.toFixed(2);
}

let amount = 9.9888;

console.log(formatAmount(amount * 2));  // $19.98
```

Note that the default returned value of any function is `undefined`.

One of the many weird things about JavaScript is that it is very forgiving. If, for example, you pass too many arguments to a function, it will accept the first and ignore the rest. If you don't pass enough, the value of the missing arg will be `undefined` but the function will still run.

```javascript
function square(num) {
  return num * num;
}

console.log(square(4, 'fart', 100));
// 16
console.log(square());
// NaN
```


## Rest Parameters

It can be useful for a function to accept any number of arguments. For example, `Math.max()` computes the maximum of all the arguments it is given. To write such a function, you put three dots `...` before the function’s last parameter, for example:

```javascript
function formatList(...items) {
  for (let item of items) {
    console.log(item.padStart(20, '_'));
  }
}

formatList('introduction', 'data', 'objects', 'functions', 'classes');
// ________introduction
// ________________data
// _____________objects
// ___________functions
// _____________classes
```

When such a function is called, the rest parameter is bound to an array containing all further arguments. If there are other parameters before it, their values aren’t part of that array.

You can also use this `...` notation to pass an array of arguments when calling a function.

```javascript
function introduction(name, occupation, city) {
  console.log(`My name is ${name}, I'm a ${occupation} from ${city}.`);
}

let a = ['rick', 'scientist', 'earth'];
let b = ['jessica', 'developer', 'vancouver'];

introduction(...a);
introduction(...b);
// My name is rick, I'm a scientist from earth.
// My name is jessica, I'm a developer from vancouver.
```


## Hoisting

Note that in JavaScript, any function declarations in a given scope will get *"hoisted"* to the top of the scope which means you can start calling it before it's declaration. For example:

```javascript
console.log('Start');

foo();

console.log('End');

function foo() {
  console.log('Foo');
}
// Start
// Foo
// End
```

*Hoisting* works a bit differently for variables. In short, only the *declaration* (not the assignment) is hoisted. In the example below, the first `console.log(a);` returns `undefined` because the value isn't assigned until the next line. That being said it doesn't throw a `ReferenceError` which you might think would be the case since it isn't declared until the next line either. The `console.log(a);` in the `inner` function returns `1` because `inner` isn't called until after the `a` declaration/assignment:


```javascript
function outer() {

  function inner() {
    console.log(a);  // 1
  }

  console.log(a);  // undefined
  var a = 1;
  inner();
}
outer();
```


## Let

In addition to declaring variables at the function level, ES6 lets you declare variables that belong to a specific block `{...}` by using the `let` keyword. By using `let` instead of `var`, `c` will belong only to the `if` statement and not to the whole `foo()` scope:

```javascript
function foo() {
  var a = 1;                 // accessible to the whole foo() scope
  if (a >= 1) {
    var b = 2;               // accessible to the whole foo() scope
    let c = 3;               // only accessible inside the if {...} block
    console.log(a + b + c);  // 6
  }
  console.log(a);            // 1
  console.log(b);            // 2
  // console.log(c);         // ReferenceError
}

foo();
```


## Scope (*lexical scope*)

Each function has its own scope. Only code inside the function can access the function's *scoped variables* (variables declared within the function). Variable names must be unique within the same scope, but *can* be the same in different scopes. For example:

```javascript
function one() {
  let a = 1;  // this 'a' only belongs to function one()
  return a;
}

function two() {
  let a = 2;  // this 'a' only belongs to function two()
  return a;
}

console.log(one());  // 1
console.log(two());  // 2
```

Lexical scope rules say that the code in a scope can access variables in the same scope **or any other outer scope**. Variables from inner scopes however, can not be accessed. Note that if you try to access a variables value in a scope where it's not available you'll get a `ReferenceError`. For example:

```javascript

function outer() {
  let a = 1;

  function inner() {
    let b = 2;
    console.log(a + b);  // inner() has access to both 'a' and 'b'
  }

  console.log(a);  // outer() only has direct access to 'a'
  console.log(b);  // ReferenceError: b is not defined
  inner();
}

outer();  // 1, 3
```

Function scope encourages the idea that all variables belong to the function and can be used and reused throughout the entirety of the function (and accessible even to nested scopes). On the other hand, if you don't take careful precautions, variables existing across the entirety of a scope can lead to some unexpected pitfalls.

Note that *scope-related assignments* can occur in two ways: by using the `=` operator or by passing arguments to (assign to) function parameters. When referencing a variable the current scope is checked, then the one above and so on until the global scope is reached. The same *identifier* name can be used at multiple layers of nested scope, which is called *shadowing*. Scope look-up stops once it finds the first match. For example:

```javascript
function outer(a) {
  let b = a * 2;  // assignment of 'b'
  let c = 100;    // assignment of 'c', but this value is NOT used

  function inner(c) {
    console.log(a, b, c);  // 2 4 8
  }
  inner(b * 2);   // assignment of 'c', this value is passed to the inner scope
}
outer(2);         // assignment of 'a' happens here
```
Note that the lexical scope look-up process only applies to *first-class identifiers* such as `a`, `b`, and `c` above. If you were referencing something through dot notation like `foo.bar.x`, lexical scope look-up would only apply for finding `foo`, but beyond that, *object property-access rules* take over to resolve `bar` and `x`.


## Scope Pollution

When working with global variables, it's really easy to accidentally overwrite a value from a local scope into the global one. For example:

```javascript
let num = 50;

const logNum = () => {
  num = 100;
  console.log(num);
};

logNum(); // 100
console.log(num); // 100
```

 Versus:
```javascript
let num = 50;

const logNum = () => {
  let num = 100;
  console.log(num);
};

logNum(); // 100
console.log(num); // 50
```

As a result, the general advice is it's best to **not** define variables in the global scope. It's also important to not that by limiting your variables to the local scopes in which they're used, it will save memory because the variable will cease to exist after the block finishes running.


## Hiding with Scope

If you take a section of code and wrap a function declaration around it, what you're essentially doing is creating a new scope bubble around the code which means that any declarations (variable or function) will now be tied to that scope. In other words, you can *hide* variables and functions by enclosing them in the scope of a function.

There is a software design principle called the *Principle of Least Privilege* (also called *Least Authority* or *Least Exposure*) which basically states that in terms of designing the API for a module or object, you should only expose what is necessary and hide everything else.

For example, when writing code, consider whether its necessary for the surrounding/enclosing scope to have access to certain variables and functions or whether they could be made *private*.

```javascript
let b;

function mySubtotal(a) {
  return a + 1;
}

function myTotal(a) {
  b = mySubtotal(a * 2);
  console.log(a, b);
}

myTotal(5);

// versus more private:

function myTotal(a) {

  function mySubtotal(a) {
    return a + 1;
  }

  let b = mySubtotal(a * 2);
  console.log(a, b);
}

myTotal(5);
```

That example isn't great, but going back to the first comment about wrapping your code in a function declaration to keep things private. Consider that though this is a decent solution, you're still polluting your code with a new function identifier and a function call. You could remove both of those by using a *IIFE function expression* described below.


## Collision Avoidance

A benefit of hiding variables is *collision avoidance* which happens when you have two different identifiers with the same name. Collision often results in unexpected overwriting of values. Multiple libraries loaded into your program can easily collide with each other if they don't properly hide their internal/private functions and variables. Such libraries will often create a single variable declaration in the global scope (often an object) with a unique name. This object is used as the *namespace* for the library... all specific *exposures of functionality* are made as properties of that object rather than as top-level lexically scoped identifiers. For example:

```javascript
const MyAwesomeLibrary = {
  awesome: 'sauce',
  doSomething: function() {
    // ...
  },
  doOtherthing: function() {
    // ...
  }
};
```


## Closure

Like in Python, closures mean that inner functions will remember the variables that were passed to them, even when the function has finished running, For example:

```javascript
function multiplier(x) {
  // the inner function uses x, so it has "closure" over it
  function multiply(y) {
    return x * y;
  }
  return multiply;
}

let x10 = multiplier(10);
let x100 = multiplier(100);

console.log( x10(5) );
console.log( x100(5) );
```

Since Python was the first language I learned, this makes perfect sense to me but if you're coming from another language like `C`, apparently this is a bit of a head f*. Whatever.


## Properties and Methods

In JavaScript, functions are *first class objects*, this means that like other objects they can have properties and methods.

Since functions are a subtype of object, they have properties such as `.length` and `.name` and methods such as `.toString()`. You can see more about the [methods and properties of functions here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).

Here we're using a built-in property `name` as well as assigning new properties to a function:

```javascript
function veryLongFunctionName() {
  return 43;
}

const foo = veryLongFunctionName;

foo.a = 'hello';
foo.b = true;

console.log(foo.a);  // hello
console.log(foo.b);  // true
console.log(foo.name);  // veryLongFunctionName
```


## Function Expressions *(functions as values)*

Note that in the example above, `foo` is basically just a variable that's given a reference to the function being declared. That is, the function itself is a value. Just like in Python, functions can be passed to, or returned from other functions.

```javascript
function foo() {
  // typical function declaration
  // note: no semicolon required after the declaration
}

const x = function () {
  // called an anonymous function expression (similar to lambda in Python)
  // semicolon is required after the assignment
};

const x = function foo() {
  // called a named function declaration/expression.
  // It's equivalent to first declaring the function foo,
  // then assigning it to the variable x.
  // semicolon is required after the assignment
};
```
Since the release of ES6, it is common practice to use `const` as the keyword to declare the variable containing a function expression.


## Immediately Invoked Function Expressions *(IIFE)*

This is a method to declaring and calling a function at the same time:

```javascript
(function foo() {
  console.log('hello');
})();
```

Basically this is a normal function declaration except we are wrapping the whole thing with outer `()` braces which prevents JavaScript from treating it as a normal declaration, then we add another set of `();` braces and a semicolon at the end which act as the function call.

In truth, you don't need to name the function here. If you skip it, you now have an *anonymous function expression*:

```javascript
(function () {
  console.log('hello');
})();
```

*Anonymous function expressions* are often used as callback parameters:

```javascript
setTimeout(function () {
  console.log('Waited 5 seconds.');
}, 5000);
```

There are some downsides to anonymous expressions though... without a name, debugging stack traces can be more difficult. The name can also be helpful in terms of creating self-documented, readable code. It also doesn't work well with more complex functions that use recursion. For these reasons, best practice is to just use names no matter what.

```javascript
setTimeout(function timeoutHandler() {
  console.log('Waited 5 seconds.');
}, 5000);
```

The function could return a value and the whole thing could be assigned to a variable:

```javascript
let x = (function foo() {
  return 'hello';
})();

console.log(x);
```


## Helper Functions

Writing helper functions can help take large, difficult tasks and break them into smaller, more manageable tasks. Since each function is carrying out a specific task, it makes our code easier to read and debug.


## Abstractions

When we communicate, our language includes vocabulary that allows us to convey more complicated tasks in a few words. For example, to say *bake* a cake we understand the concept without having to list all the details. In programming, we can accomplish *abstraction* by writing functions. In addition to allowing us to reuse our code, functions help to make clear, readable programs.


## Pure Functions

A pure function is a specific kind of value-producing function (it returns something) that not only has no side effects but also doesn’t rely on side effects from other code—for example, it doesn’t read global variables whose value might change. A pure function, when called with the same arguments, always produces the same value (and doesn’t do anything else). A call to such a function can be substituted by its return value without changing the meaning of the code. When you're not sure that a pure function is working correctly, you can test it by simply calling it and know that if it works in that context, it will work in any context. Non-pure functions tend to require more scaffolding to test.


## Higher-order Functions

*Higher-order functions* are functions that accept other functions as arguments and/or return functions as output. This enables us to build abstractions on other abstractions. Using more abstraction in our code allows us to write more modular code which is easier to read and debug.


## Callback Functions

Functions that get passed in as parameters and invoked are called *callback functions* because they get called during the execution of the higher-order function. When we pass a function in as an argument to another function, we don't invoke it. Invoking the function would evaluate to the return value of that function call. With callbacks, we pass in the function itself by typing the function name without the parentheses.

```javascript
// Functions can create new functions:

// function greaterThan(n) {
//   return function(m) {
//     return m > n;
//   };
// }

function greaterThan(n) {
  return m => m > n;
}

let gt10 = greaterThan(10);

console.log(gt10(11));
//true
```

```javascript
// Functions can add to other functions:

function logFunction(func) {
  return (...args) => {
    console.log('calling with: ', args);
    let result = func(...args);
    console.log('returned: ', result);
    return result;
  };
}

logFunction(Math.min)(7, 13, 5); // I have never seen this syntax before
```


## Factory Functions

A factory function is a function that returns an object and can be reused to make multiple object instances. Factory functions can also have parameters allowing us to customize the object that gets returned.

```javascript
const plantFactory = (name, age, waterFrequency, sunlight) => {
  return {
    age: age,
    name: name,
    waterFrequency: waterFrequency,
    sunlight: sunlight
  };
};

const spider = plantFactory('spider plant', 10, 7, 'full');
const coffee = plantFactory('coffee plant', 3, 5, 'partial');

console.log(spider.name);  // spider plant
console.log(coffee.name);  // coffee plant
```


## Destructuring

ES6 introduced some new shortcuts for assigning properties to variables known as **destructuring**. Specifically, a destructuring technique, called *property value shorthand* allows us to omit the `: value` if the property & value are the same, for example:

```javascript
const plantFactory = (name, age, waterFrequency, sunlight) => {
  return {
    age,
    name,
    waterFrequency,
    sunlight
  };
};

const spider = plantFactory('spider plant', 10, 7, 'full');
```

Though not specific to functions per se, there's also a destructuring technique for assigning object properties. In *destructured assignment* we can create a new variable with the name of an object's key with shorthand that wraps the key name in curly braces `{}`. For example, using the spider object created above:

```javascript
// normal assignment:
const sunlight = spider.sunlight;

// destructured assignment
const {sunlight} = spider;
```
TBH, as someone new to Javascript, this kind of shit makes me crazy. Moving on...

A more useful destructuring technique allows you to create variable names for the array items that you intend to pass to a function. This example is similar to the one for 'Rest Parameters':

```javascript
function introduction2([name, occupation, city]) {
  console.log(`My name is ${name}, I'm a ${occupation} from ${city}.`);
}

introduction2(['rick', 'scientist', 'earth']);
introduction2(['jessica', 'developer', 'vancouver']);
// My name is rick, I'm a scientist from earth.
// My name is jessica, I'm a developer from vancouver.
```


## Modules

The most common usage of closure in JavaScript is in the *module pattern*. This pattern lets you define private variables and functions that are hidden from the outside, as well as a public API this is accessible from the outside. For example:

```javascript
function user() {
  const username, password;  // declared but not assigned yet

  function doLogin(u, p) {
    username = u;
    password = p;
    // do the rest of the login work here
  }

  const publicAPI = {
    login: doLogin,  // an object containing one property
  };

  return publicAPI;
}

const rick = user();

rick.login('rick', 'password');
```

Executing `user()` creates an instance of the `user` module. A whole new scope is created. The inner `doLogin()` function has closure over username and password, meaning it will retain access to them even after the `user()` function finishes running.


## Arrow Function Syntax

ES6 introduced *arrow function syntax*, a shorter way to write function by using this special notation `() => {}`.

For example:
```javascript
const rectangleArea = (width, height) => {
  let area = width * height;
  return area;
};
```

Get this, Javascript allows the syntax to be mildly condensed by removing the brackets around the parameter if you have only one. To be clear, functions that take only a single parameter do not need that parameter to be enclosed in parentheses. However, if a function takes zero or multiple parameters, parentheses are required. What the justification is for this mixed ruleset is anybody's guess.

```javascript
// no parameters, brackets required
const functionName = () => {};

// single parameter, no brackets required
const functionName = paramOne => {};

// multiple parameters, brackets required
const functionName = (paramOne, paramTwo) => {};
```

In addition, a function body composed of a single-line block doesn't need the curly braces. In this case, whatever that line evaluates will be automatically returned. This is referred to as implicit return:

```javascript
const squareNumber = num => num * num;

console.log(squareNumber(5));  // 25
```

You can also drop the name to create an anonymous function. This can be useful when passing a function in as a parameter:

```javascript
const timeFuncRuntime = funcParameter => {
   let t1 = Date.now();
   funcParameter();
   let t2 = Date.now();
   return t2 - t1;
};

timeFuncRuntime(() => { // anonymous function passed to timeFuncRuntime();
  for (let i = 10; i>0; i--){
    console.log(i);
  }
});
```

Here's an example of condensing a lengthy function:
```javascript
// long version
const plantNeedsWater = function(day) {
  if (day === 'Wednesday') {
    return true;
  }
  else {
    return false;
  }
};

// condensed using the conditional/ternary operator
const plantNeedsWater = function(day) {
  return day === 'Wednesday' ? true : false;
};

// condensed even more using ES6 arrow function syntax
const plantNeedsWater = day => day === 'Wednesday' ? true : false;
```

Be careful when trading off readability for condensed code.

There’s no deep reason to have both arrow functions and function expressions in the language. Arrow functions were added mainly to make it possible to write small function expressions in a less verbose way.
