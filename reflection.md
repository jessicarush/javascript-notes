# Reflection

## Table of Contents

<!-- toc -->

- [typeof operator](#typeof-operator)
- [Object methods, instanceof operator](#object-methods-instanceof-operator)
- [Number methods](#number-methods)

<!-- tocstop -->

## typeof operator

```javascript
console.log(typeof 'hello');         // string
console.log(typeof 43);              // number
console.log(typeof true);            // boolean
console.log(typeof null);            // object (quirk from early JavaScript)
console.log(typeof undefined);       // undefined
console.log(typeof (5 / 'string'));  // number (NaN)
console.log(typeof Symbol());        // symbol
console.log(typeof {'a': 'b'});      // object
console.log(typeof ['a', 'b']);      // object
console.log(typeof function () {});  // function
```

## Object methods, instanceof operator

```javascript
let a = 2 / 'string';
let b = -3 * 0;
let c = 0.2 + 0.1;

console.log(Object.is(a, NaN));  // true
console.log(Object.is(b, -0));   // true
console.log(Object.is(b, 0));    // false
console.log(Object.is(c, 0.3));  // false

let obj1 = {};
let obj2 = Object.create(obj1);

console.log(obj1.isPrototypeOf(obj2));  // true

let obj3 = function () {};
let obj4 = new obj3();

console.log(obj4 instanceof obj3);  // true
```

## Number methods

```javascript
let a = 2 / 'string';
let b = -3 * 0;
let c = 0.2 + 0.1;

console.log(Number.isNaN(a));          // true
console.log(Number.isInteger(b));      // true
console.log(Number.isFinite(b));       // true
console.log(Number.isSafeInteger(c));  // false
```
