# Functions


Functions are the fundamental modular modular unit of JavaScript. They are used for code reuse, information hiding, and composition. Functions are used to specify the behaviour of objects. They're also good for simply organizing related bits of code into named groups (even if you plan to only call it once). In JavaScript, Functions are objects that are linked to `Function.prototype` which is in turn linked to `Object.prototype`.

## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Hoisting](#hoisting)
- [Return](#return)
- [...Rest Parameters](#rest-parameters)
- [Scope (*lexical scope*)](#scope-lexical-scope)
- [Let in Functions](#let-in-functions)
- [Scope Pollution](#scope-pollution)
- [Hiding with Scope](#hiding-with-scope)
- [Collision Avoidance](#collision-avoidance)
- [Closure](#closure)
- [Properties and Methods](#properties-and-methods)
- [Arguments](#arguments)
- [Function Expressions *(functions as values)*](#function-expressions-functions-as-values)
- [Immediately Invoked Function Expressions *(IIFE)*](#immediately-invoked-function-expressions-iife)
- [Helper Functions](#helper-functions)
- [Abstractions](#abstractions)
- [Pure Functions](#pure-functions)
- [Higher-order Functions](#higher-order-functions)
- [Callback Functions](#callback-functions)
- [Factory Functions](#factory-functions)
- [Destructuring](#destructuring)
  * [simulating named parameters](#simulating-named-parameters)
- [Module Pattern](#module-pattern)
- [Memoization](#memoization)
- [Arrow Function Syntax](#arrow-function-syntax)

<!-- tocstop -->

## Syntax

In JavaScript, there are many ways to create a function. One way to create a function is by using a *function declaration* (another way is via a *function expression*, described below). A *function declaration* is a function that is bound to an identifier, or name.

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
logAmount(5);          // 5.00
```

Functions are often declared in an assignment to a variable. When assigning to a variable, the function can be named or anonymous. The main difference with these approaches is related to *hoisting*, described in more detail below. Basically, function declarations get defined at parse-time but variables get defined at run-time. As a result, you can call a function before it's declaration, but not if it's assigned to a variable. In terms of anonymous vs named functions, this is just a preference thing. Named functions were traditionally considered more helpful for debugging, but I believe most tools have sorted this out. Here's a comparison:

```javascript
// Function declaration:
function one() {
  console.log(one.name);
}

// Anonymous function assigned to a variable:
var two = function () {
  console.log(two.name);
};

// Named function assigned to a variable:
var three = function three() {
  console.log(three.name);
};

// Anonymous function assigned to a variable (ES6 arrow functon syntax):

var four = () => {
  console.log(four.name);
};

one();    // one
two();    // two
three();  // three
four();   // four
```


## Hoisting

As noted above, any **function declarations** in a given scope will get *hoisted* to the top of the scope which means you can start calling it before it's declaration. For example:

```javascript
foo();

function foo() {
  console.log('Foo');
}
// Foo
```

This kind of hoisting only works for named function declarations, not function expressions assigned to a variable:

```javascript
foo(); // TypeError: foo is not a function

var foo = function () {
  console.log('Foo');
};

bar(); // TypeError: bar is not a function

var bar = function bar () {
  console.log('Bar');
};
```

*Hoisting* works a bit differently for variables. Only the *declaration* (not the assignment) is hoisted... and this only happens with the `var` keyword; `let` and `const` declarations don't get hoisted. In the example below, the first `console.log(a);` returns `undefined` because the value isn't *assigned* until the next line. That being said it **doesn't** throw a `ReferenceError` which you might think would be the case since it isn't declared until the next line. The `console.log(a);` in the `inner` function returns `1` because `inner` isn't called until after the `a` declaration/assignment:

```javascript
function outer() {

  function inner() {
    console.log(a);
  }

  console.log(a);  // undefined
  var a = 1;
  inner();  // 1
}
```

One last thing to note about hoisting is that function declarations always get hoisted **before** variable declarations for example:

```javascript
var foo;

foo();

foo = function () {
    console.log('foo the variable');
};

function foo() {
    console.log('foo the function declaration');
}
// foo the function declaration
```


## Return

When a function is invoked it begins executing the first statement after `{` and ends when it hits the `}` that closes the function body. This causes the function to return control to the part of the program that invoked the function. The `return` statement can be used to cause a function to return early. Any statements following `return` inside the function body will not be executed.

A function always returns a value. If a value is not specified, the default value is `undefined`. If the function is called with the `new` prefix and the `return` value is not an object, then `this` is returned instead. **More investigation required on this**.

```javascript
function formatAmount(amt) {
  return '$' + amt.toFixed(2);
}

let amount = 9.9888;

console.log(formatAmount(amount * 2));  // $19.98
```

If you want to return more than one value from a function, you can return an array:

```javascript
function areaVolume(width, height, depth) {
    let area = width * height;
    let volume = width * height * depth;
    let sizes = [area, volume];
    return sizes;
}

const test = areaVolume(5, 5, 12);
const testArea = areaVolume(5, 5, 12)[0];

console.log(test[0]);   // 25
console.log(testArea);  // 25
```

One of the many weird things about JavaScript is that it is very forgiving. If, for example, you pass too many arguments to a function, it will accept the first and ignore the rest. If you don't pass enough, the value of the missing arg will be `undefined` but the function will still run.

```javascript
function square(num) {
  return num * num;
}

console.log(square(4, 'squirrel', 100));
// 16
console.log(square());
// NaN
```


## ...Rest Parameters

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

```javascript
function formatList(title, ...items) {
  console.log(title.toUpperCase());
  for (let item of items) {
    console.log(item.padStart(20, '_'));
  }
}

formatList('contents', 'introduction', 'data', 'objects', 'functions', 'classes');
// CONTENTS
// ________introduction
// ________________data
// _____________objects
// ___________functions
// _____________classes
```

You can also use rest `...` notation to pass an array of arguments when calling a function.

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


## Scope (*lexical scope*)

Scope exists as a way to control the visibility and lifetime of variables and parameters. This is important in programming as it reduces naming collisions and provides automatic memory management.

Each function has its own scope. Only code inside the function can access the function's *scoped variables* (variables declared within the function). Variable names must be unique within the same scope, but *can* be the same in different scopes. For example:

```javascript
function one() {
  var a = 1;  // this 'a' only belongs to function one
  return a;
}

function two() {
  var a = 2;  // this 'a' only belongs to function two
  return a;
}

console.log(one());  // 1
console.log(two());  // 2
```

First we should note that there are two types of scope, *dynamic scope* and *lexical scope*. Most languages like JavaScript and Python use *lexical scope*, but there are some that use dynamic. Consider:

```javascript
function foo() {
    console.log(a);
}

function bar() {
    var a = 1;
    foo();
}

var a = 2;
bar(); // 2
```

Lexical scope rules say that the reference to `a` inside `foo()` will will be resolved to the global variable `a`. If, theoretically speaking, JavaScript were a dynamically scoped language, the above call to `bar()` would output `1`. This is because dynamic scope doesn't care how and where functions and scopes are declared, but rather where they are called from. To be clear, JavaScript does not have dynamic scope but it's `this` mechanism works in a similar way.

Another key contrast: lexical scope is write-time, whereas dynamic scope (and `this`) are runtime. Lexical scope cares where a function was declared, dynamic scope cares where a function was called. (`this` also cares where a function was called).

Ok, back to lexical scope...

Lexical scope rules say that the code in a scope can access variables in the same scope **or any other outer scope**. Variables from inner scopes however, can not be accessed. Note that if you try to access a variables value in a scope where it's not available you'll get a `ReferenceError`. For example:

```javascript

function outer() {
  var a = 1;

  function inner() {
    var b = 2;
    console.log(a + b);  // inner() has access to both 'a' and 'b'
  }

  console.log(a);  // outer() has direct access to 'a'
  console.log(b);  // ReferenceError: b is not defined
  inner();
}

outer();  // 1, 3
```

Function scope encourages the idea that all variables belong to the function and can be used and reused throughout the entirety of the function (and accessible even to nested scopes). On the other hand, if you don't take careful precautions, variables existing across the entirety of a scope can lead to some unexpected pitfalls.

Note that *scope-related assignments* can occur in two ways: by using the `=` operator or by passing arguments to (assign to) function parameters. When referencing a variable the current scope is checked, then the one above and so on until the global scope is reached. The same *identifier* name can be used at multiple layers of nested scope, which is called *shadowing*. Scope look-up stops once it finds the first match. For example:

```javascript
function outer(a) {
  var b = a * 2;  // assignment of 'b'
  var c = 100;    // assignment of 'c', but this value is NOT used

  function inner(c) {
    console.log(a, b, c);  // 2 4 8
  }
  inner(b * 2);   // assignment of 'c', this value is passed to the inner scope
}
outer(2);         // assignment of 'a' happens here
```

Note that the lexical scope look-up process only applies to *first-class identifiers* such as `a`, `b`, and `c` above. If you were referencing something through dot notation like `foo.bar.x`, lexical scope look-up would only apply for finding `foo`, but beyond that, *object property-access rules* take over to resolve `bar` and `x`.


## Let in Functions

In addition to declaring variables at the function level, ES6 lets you declare variables that belong to a specific block `{...}` with the `let` keyword. In this example, by using `let` instead of `var`, `c` will belong only to the `if` statement and not to the whole `foo()` scope:

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

You can use this type of *block-scoping* to make it clear when I variable is only used/needed in a certain section of your code. This of course can help avoid issues where you're using the same variable names like `i` or `n` for short calculations. Block scoping is also useful for *garbage collection*. If you happen to have a large chunk of data, you can reclaim the memory by declaring it in a block.

```javascript
function process(data) {
  // some processing happens
  console.log(data);
}

{
  // here's my block level scope
  let reallyBigData = {data: 'big'};
  process(reallyBigData);  // { data: 'big' }
}

process(reallyBigData); // ReferenceError: reallyBigData is not defined
```


## Scope Pollution

When working with global variables, it's really easy to accidentally overwrite a value from a local scope into the global one. For example:

```javascript
let num = 50;

const logNum = () => {  // arrow syntax (described below)
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

As a result, the general advice is it's best to **not** define variables in the global scope (or if you do, use `const`). It's also important to note that by limiting your variables to the local scopes in which they're used, it will save memory because the variable will cease to exist after the block finishes running.


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
```

versus more private:

```javascript
function myTotal(a) {

  function mySubtotal(a) {
    return a + 1;
  }

  let b = mySubtotal(a * 2);
  console.log(a, b);
}

myTotal(5);
```

That example isn't great, but going back to the first comment about wrapping your code in a function declaration to keep things private: Consider that though this is a decent solution, you're still polluting your code with a new function identifier and a function call. Note that you could remove both of those by using a *IIFE function expression* described below.


## Collision Avoidance

A benefit of hiding variables is *collision avoidance*. Collision happens when you have two different identifiers with the same name. Collision often results in unexpected overwriting of values. Multiple libraries loaded into your program can easily collide with each other if they don't properly hide their internal/private functions and variables. Such libraries will often create a single variable declaration in the global scope (often an object) with a unique name. This object is used as the *namespace* for the library... all specific *exposures of functionality* are made as properties of that object rather than as top-level lexically scoped identifiers. For example:

```javascript
const MyAwesomeLibrary = {
  awesome: 'sauce',
  doSomething: function() {
    return 'something';
  },
  doOtherthing: function() {
    return 'other thing';
  }
};

console.log(MyAwesomeLibrary.awesome);
//sauce

console.log(MyAwesomeLibrary.doSomething());
// something
```


## Closure

*Closure* is the concept that inner functions will remember the variables that were passed to them, even when the function has long finished running. Or you could say: Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope. Variables that you might think are garbage collected by the engine once a function is no longer in use, are remembered by inner functions. For example:

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

console.log(x10(5));   // 50
console.log(x100(5));  // 500
```

Another convoluted example:

```javascript
var func;

function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }
  func = bar;
}

function baz() {
  func();
}

foo();
baz(); // 2
```

Whatever method we use to transport an inner function outside of its lexical scope, it will maintain a scope reference to where it was originally declared, and wherever we execute it, that closure will be exercised. Note however, without the execution of the outer function `foo`, the creation of the inner scope and the closures would not occur.

> :warning: Since Python was the first language I learned, this makes perfect sense to me but if you're coming from another language like *C*, apparently this is a bit of a head f*. Whatever.

For more closure see [closure.md](closure.md)


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


## Arguments

A bonus property/parameter that is available to all functions when they are invoked is the `arguments` array (not actually an array but an array-like object). This gives the function access to all of the arguments that were passed in, whether they're used in the function or not.

```javascript
var test = function () {
  console.log('Number of arguments: ' + arguments.length);

  for (let i = 0; i < arguments.length; i++) {
    console.log('Argument ' + i + ': ' + arguments[i]);
  }
};

test('a', 'b', 'c', 'd');
// Number of arguments: 4
// Argument 0: a
// Argument 1: b
// Argument 2: c
// Argument 3: d
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
  // note: semicolon is required after the assignment
};

const x = function foo() {
  // called a named function declaration/expression.
  // It's equivalent to first declaring the function foo,
  // then assigning it to the variable x.
  // note: semicolon is required after the assignment
};

const x = () => {
  // an anonymous function expression using ES6 arrow function syntax
  // (described later in this doc)
};
```

Since the release of ES6, it is common practice to use `const` as the keyword to declare the variable containing a function expression.

The main difference between function declarations and expressions is [hoisting](#hoisting). For this reason, it might seem that function declarations are more useful, however, function expressions are useful when you want to *avoid polluting the global scope*. It's helpful to think about when and where the function is needed.

- Function declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function expressions are created when the execution flow reaches them.
- Use function declarations when you want to create a function on the global scope and make it available throughout your code. Use function expressions to limit where the function is available, keeping your global scope light.


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
// hello
```

If I wasn't using an IIFE, I would have to call `x`:

```javascript
let x = function foo() {
  return 'hello';
};

console.log(x());
// hello
```


## Helper Functions

Writing helper functions can help take large, difficult tasks and break them into smaller, more manageable tasks. Since each function is carrying out a specific task, it makes our code easier to read and debug.


## Abstractions

When we communicate, our language includes vocabulary that allows us to convey more complicated tasks in a few words. For example, to say *bake* a cake we understand the concept without having to list all the details. In programming, we can accomplish *abstraction* by writing functions. In addition to allowing us to reuse our code, functions help to make clear, readable programs.


## Pure Functions

A *pure function* is a specific kind of value-producing function (it returns something) that not only has no side effects but also doesn’t rely on side effects from other code—for example, it doesn’t read global variables whose value might change. A pure function, when called with the same arguments, always produces the same value (and doesn’t do anything else). A call to such a function can be substituted by its return value without changing the meaning of the code. When you're not sure that a pure function is working correctly, you can test it by simply calling it and know that if it works in that context, it will work in any context. Non-pure functions tend to require more scaffolding to test.


## Higher-order Functions

*Higher-order functions* are functions that accept other functions as arguments and/or return functions as output. This enables us to build abstractions on other abstractions. Using more abstraction in our code allows us to write more modular code which is easier to read and debug.


## Callback Functions

Functions that get passed in as parameters and invoked are called *callback functions* because they get called during the execution of the higher-order function. When we pass a function in as an argument to another function, we don't invoke it. Invoking the function would evaluate to the return value of that function call. With callbacks, we pass in the function itself by typing the function name without the parentheses.

Functions can create new functions:

```javascript
// function greaterThan(n) {
//   return function(m) {
//     return m > n;
//   };
// }

function greaterThan(n) {
  return m => m > n;  // arrow syntax (described below)
}

let gt10 = greaterThan(10);

console.log(gt10(11));
// true
```

Functions can add to other functions:

```javascript
function logFunction(func) {
  return (...args) => {
    console.log('calling with: ', args);
    let result = func(...args);
    console.log('returned: ', result);
    return result;
  };
}

logFunction(Math.min)(7, 13, 5);
// calling with:  [ 7, 13, 5 ]
// returned:  5
```

For me personally, its this syntax that's actually the interesting part:

```javascript
myFunction(callback)(...args);
```

When you see a double parentheses call like this `()()`, it means that the first function (myFunction) returns another function and then that returned function is called immediately.

So a barebones example would look like:

```javascript
function myFunction(array) {
  return array;
}

function documentFunction(func) {
  return func;
}

let test = documentFunction(myFunction)([5, 100, 'foo', 'bar', true]);

console.log(test);
// [ 5, 100, 'foo', 'bar', true ]
```

The previous example returned an additional function so that it could log the args and result. Here I've expanded that out a bit more:

```javascript
function documentFunction(func) {
  return function (...args) {
    let result = func(...args);
    console.log(`Function name: ${func.name}`);
    console.log(`Arguments: ${args.length}`);
    for (let i = 0; i < args.length; i++) {
      console.log(`  arg${i + 1}: ${args[i]} <${typeof args[i]}>`);
    }
    console.log(`Returned: ${result} <${typeof result}> \n`);
    return result;
  };
}

function randomSelect(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

documentFunction(randomSelect)([5, 100, 'foo', 'bar', true]);
// Function name: randomSelect
// Arguments: 1
//   arg1: 5,100,foo,bar,true <object>
// Returned: 100 <number>

documentFunction(Math.min)(5, 100, 12, 2000, 35);
// Function name: min
// Arguments: 5
//   arg1: 5 <number>
//   arg2: 100 <number>
//   arg3: 12 <number>
//   arg4: 2000 <number>
//   arg5: 35 <number>
// Returned: 5 <number>
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

Another useful destructuring technique allows you to create variable names for the array items that you intend to pass to a function. This example is similar to the one for 'Rest Parameters':

```javascript
function introduction1([name, occupation, city]) {
  console.log(`My name is ${name}, I'm a ${occupation} from ${city}.`);
}

introduction1(['jessica', 'developer', 'vancouver']);
// My name is jessica, I'm a developer from vancouver.
```

### simulating named parameters

An aspect of the new destructuring feature allows you to (sort of) use named parameters.

```javascript
function introduction2({name, occupation, city}) {
  console.log(`My name is ${name}, I'm a ${occupation} from ${city}.`);
}

introduction2({name: 'rick', occupation: 'scientist', city: 'earth'});
introduction2({city: 'vancouver', name: 'jessica', occupation: 'developer'});
console.log(`My name is ${name}, I'm a ${occupation} from ${city}.`);
}

introduction2({city: 'vancouver', name: 'jessica', occupation: 'developer'});
// My name is jessica, I'm a developer from vancouver.
```


## Module Pattern

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

The *module pattern* leverages the power of closure even though it doesn't appear to be all about callbacks:

```javascript
function myModule() {
  let something = 'hello';
  let another = [1, 2, 3];

  function doSomething() {
    console.log(something);
  }

  function doAnother() {
    console.log(another.join('-'));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

let foo = myModule();

foo.doSomething();
foo.doAnother();
// hello
// 1-2-3
```

Note that `myModule`, which is just a function, has to be invoked for there to be a module instance created. Without the execution of the outer function, the creation of the inner scope and the closures would not occur.

Keep in mind we return an object that has references to our inner functions but not to our inner data variables. It's appropriate to think of this returned object as a public API for our module. `doSomething` and `doAnother` have closure over the inner scope of the module instance.

Here's another example:

```javascript
var serial_generator = function () {

  // An object that produces a unique serial number (string)
  // A unique string is made up of two parts: a prefix and
  // a sequence number. The object comes with methods for setting
  // the prefix and sequence as well as the method that produces
  // the final unique string.

  var prefix = '';
  var sequence = 0;

  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_sequence: function (s) {
      sequence = s;
    },
    generate_serial: function () {
      var result = prefix + sequence;
      sequence += 1;
      return result;
    }
  };
};

var test = serial_generator();
test.set_prefix('J');
test.set_sequence(10000);

var unique1 = test.generate_serial();
var unique2 = test.generate_serial();
var unique3 = test.generate_serial();

console.log(unique1);
console.log(unique2);
console.log(unique3);
// J10000
// J10001
// J10002
```


## Memoization

Functions can use objects or arrays to store the results of previous operations. This allows those results to be reused without having to recalculate the value. This optimization is called memoization. This is particularly useful in recursive functions. For example:

```javascript
var fibonacci = function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (let i = 0; i <= 10; i += 1) {
  console.log(fibonacci(i));
}
// 0
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
// 55
```

This works but it's doing a lot of unnecessary work. The fibonacci function ends up being called 453 times. If we memoize the function, we can significantly reduce its workload.

```javascript
var fibonacci_memoize = (function () {
  var memoize = [0, 1];
  var fibonacci = function (n) {
    var result = memoize[n];
    if (typeof result !== 'number') {
      result = fibonacci(n - 1) + fibonacci(n - 2);
      memoize[n] = result;
    }
    return result;
  };
  return fibonacci;
})();


for (let i = 0; i <= 10; i += 1) {
  console.log(fibonacci_memoize(i));
}
// 0
// 1
// 1
// 2
// 3
// 5;
// 8
// 13
// 21
// 34
// 55
```

I'm still wrapping my head around how the IIFE works here for the fibonacci variable. If I wanted to write it without the IFEE I'd have to do this:

```javascript
var fibonacci_memoize = function () {
  var memoize = [0,1];
  var fibonacci = function (n) {
    var result = memoize[n];
    if (typeof result !== 'number') {
      result = fibonacci(n - 1) + fibonacci(n - 2);
      memoize[n] = result;
    }
    return result;
  };
  return fibonacci;
};


for (let i = 0; i <= 10; i += 1) {
  console.log(fibonacci_memoize()(i));
  // since fibonacci_memoize() returns fibonacci
  // fibonacci_memoize()(i) translates to fibonacci(i)
}
```


## Arrow Function Syntax

ES6 introduced [arrow function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), a shorter way to write functions by using this special notation `() => {}`.

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
const timeFuncRuntime = func => {
   let t1 = Date.now();
   func();
   let t2 = Date.now();
   console.log(`${t2 - t1} milliseconds`);
   return t2 - t1;
};

timeFuncRuntime(() => {
  // anonymous function passed to timeFuncRuntime();
  for (let i = 10; i > 0; i--){
    console.log(i);
  }
});
```

Here's an example of condensing a lengthy function:

```javascript
// long version
const plantNeedsWater = function (day) {
  if (day === 'Wednesday') {
    return true;
  }
  else {
    return false;
  }
};

// condensed using the conditional/ternary operator
const plantNeedsWater = function (day) {
  return day === 'Wednesday' ? true : false;
};

// condensed even more using ES6 arrow function syntax
const plantNeedsWater = day => day === 'Wednesday' ? true : false;
```

Use caution when trading-off readability for condensed code.

There’s no deep reason to have both arrow functions and function expressions in the language. Arrow functions were added mainly to make it possible to write small function expressions in a less verbose way.
