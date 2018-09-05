# Functions

Functions are often used for code that you plan to call repeatedly, but they're also good for simply organizing related bits of code into named groups (even if you plan to only call it once).

A barebones example of a function and function call:

```javascript
function logAmount() {
  console.log(amount.toFixed(2));
}

var amount = 9.9888;

logAmount();  // 9.99
```
Functions can optionally take arguments (also called parameters):

```javascript
function logAmount(amt) {
  console.log(amt.toFixed(2));
}

var amount = 9.9888;

logAmount(amount * 2);  // 19.98
```

Functions can return values:

```javascript
function formatAmount(amt) {
  return '$' + amt.toFixed(2);
}

var amount = 9.9888;

console.log(formatAmount(amount * 2));  // $19.98
```

## Scope (*lexical scope*)

Each function has its own scope. Only code inside the function can access the function's *scoped variables* (variables declared within the function). Variable names must be unique within the same scope, but *can* be the same in different scopes. For example:

```javascript

function one() {
  var a = 1;  // this 'a' only belongs to function one()
  return a;
}

function two() {
  var a = 2;  // this 'a' only belongs to function two()
  return a;
}

console.log(one());  // 1
console.log(two());  // 2
```

Lexical scope rules say that the code in a scope can access variables in the same scope **or any other outer scope**. Variables from inner scopes however, can not be accessed. Note that if you try to access a variables value in a scope where it's not available you'll get a `ReferenceError`. For example:

```javascript

function outer() {
  var a = 1;

  function inner() {
    var b = 2;
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

## Hiding with scope

If you take a section of code and wrap a function declaration around it, what you're essentially doing is creating a new scope bubble around the code which means that any declarations (variable or function) will now be tied to that scope. In other words, you can *hide* variables and functions by enclosing them in the scope of a function.

There is a software design principle called the *Principle of Least Privilege* (also called *Least Authority* or *Least Exposure*) which basically states that in terms of designing the API for a module or object, you should only expose what is necessary and hide everything else.

For example, when writing code, consider whether its necessary for the surrounding/enclosing scope to have access to certain variables and functions or whether they could be made *private*.

```javascript
var b

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

  var b = mySubtotal(a * 2);
  console.log(a, b);
}

myTotal(5);
```

That example isn't great, but going back to the first comment about wrapping your code in a function declaration to keep things private. Consider that though this is a decent solution, you're still polluting your code with a new function identifier and a function call. You could remove both of those by using a *[IIFE function expression](Immediately-invoked function-expressions-(IIFE))* described below

## Collision Avoidance

A benefit of hiding variables is *collision avoidance* which happens when you have two different identifiers with the same name. Collision often results in unexpected overwriting of values. Multiple libraries loaded into your program can easily collide with each other if they don't properly hide their internal/private functions and variables. Such libraries will often create a single variable declaration in the global scope (often an object) with a unique name. This object is used as the *namespace* for the library... all specific *exposures of functionality* are made as properties of that object rather than as top-level lexically scoped identifiers. For example:

```javascript
var MyAwesomeLibrary = {
  awesome: 'sauce',
  doSomething: function() {
    // ...
  },
  doOtherthing: function() {
    // ...
  }
};
```

## Let

In addition to declaring variables at the function level, ES6 lets you declare variables that belong to a specific block `{...}` by using the `let` keyword. By using `let` instead of 'var', `c` will belong only to the `if` statement and not to the whole `foo()` scope:

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

## Properties

Since functions are a subtype of the object type, you can assign new properties to a function.

```javascript
function foo() {
  return 43;
}

foo.a = 'hello';
foo.b = true

console.log(foo.a);  // hello
console.log(foo.b);  // true

```


## Functions as values

Note that in the example above, `foo` is basically just a variable that's given a reference to the function being declared. That is, the function itself is a value. Just like in Python, functions can be passed to, or returned from other functions. This is the weird part:

```javascript
function foo() {
  // typical function declaration syntax
}

var x = function() {
  // called an anonymous function declaration (similar to lambda in Python)
}

var x = function foo() {
  // this is called a named function expression.
  // It's equivalent to first declaring the function foo,
  // then assigning it to the variable x.
}
```


## Immediately invoked function expressions (IIFE)

This is a method to declaring and calling a function at the same time:

```javascript
(function foo() {
  console.log('hello');
})();
```

Basically this is a normal function declaration except we are wrapping the whole thing with outer `()` braces which prevents JavaScript from treating it as a normal declaration, then we add another set of `();` braces and a semicolon at the end which act as the function call. In truth, the name of the function serves no purpose here, you might as well skip it:

```javascript
(function () {
  console.log('hello');
})();
```

The function could return a value and the whole thing could be assigned to a variable:

```javascript
var x = (function () {
  return 'hello';
})();

console.log(x);
```


## Closure

Like in Python, closures mean that inner functions will remember the variables that were passed to them, even when the function has finished running, For example:

```javascript
function multiplier(x) {
  // the inner function uses x, so it has "closure" over it
  function multiply(y) {
    return x * y;
  };
  return multiply;
}

var x10 = multiplier(10);
var x100 = multiplier(100);

console.log( x10(5) );
console.log( x100(5) );
```

Since Python was the first language I learned, this makes perfect sense to me but if you're coming from another language like `C`, apparently this is a bit of a head f*. Whatever.


## Modules


The most common usage of closure in JavaScript is in the *module pattern*. This pattern lets you define private variables and functions that are hidden from the outside, as well as a public API this is accessible from the outside. For example:

```javascript
function user() {
  var username, password;  // declared but not assigned yet

  function doLogin(u, p) {
    username = u;
    password = p;
    // do the rest of the login work here
  }

  var publicAPI = {
    login: doLogin,  // an object containing one property
  };

  return publicAPI;
}

var rick = user();

rick.login('rick', 'password');
```

Executing `user()` creates an instance of the `user` module. A whole new scope is created. The inner `doLogin()` function has closure over username and password, meaning it will retain access to them even after the `user()` function finishes running.
