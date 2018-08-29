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

Lexical scope rules say that the code in a scope can access variables in the same scope **or any other outer scope**. Variables from inner scopes however, can not be accessed. For example:

```javascript

function outer() {
  var a = 1;

  function inner() {
    var b = 2;
    console.log(a + b);  // inner() has access to both 'a' and 'b'
  }

  console.log(a);  // outer() only has direct access to 'a'
  inner();
}

outer();  // 1, 3
```


## Properties

Since functions are a subtype of the object type, you can assign new properties to a function, however, I'm not quite sure how this can be practically used yet.

```javascript
function foo() {
  return 43;
}

foo.a = 'hello';
foo.b = true

console.log(foo.a);  // hello
console.log(foo.b);  // true

```
