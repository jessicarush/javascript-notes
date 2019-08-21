# Reflection

## Table of Contents

<!-- toc -->

- [typeof operator](#typeof-operator)
- [Object.is() method](#objectis-method)
- [.isPrototypeOf() method & instanceof operator](#isprototypeof-method--instanceof-operator)
- [Number methods](#number-methods)
- [Array methods](#array-methods)

<!-- tocstop -->

## typeof operator

```javascript
console.log(typeof 'hello');         // string
console.log(typeof 43);              // number
console.log(typeof true);            // boolean
console.log(typeof null);            // object (quirk from early JavaScript)
console.log(typeof undefined);       // undefined
console.log(typeof NaN);             // number
console.log(typeof Symbol());        // symbol
console.log(typeof {'a': 'b'});      // object
console.log(typeof ['a', 'b']);      // object
console.log(typeof function () {});  // function
```

Since null is reported as an object with typeof, a better way to test if something is an object is to test if it's true as well as its typeof:

```javascript
let a = null;
let b = { name: 'my object' };

function is_object(x) {
  let result = false;
  if (x && typeof x === 'object' ) {
    result = true;
  }
  return result;
}

console.log(is_object(a));  // false
console.log(is_object(b));  // true
```

Similarly, if we needed to check if something is a number, we need to remember that `NaN` is considered a number with `typeof`:

```javascript
let a = NaN;
let b = 5;

function is_number(x) {
  let result = false;
  if (x && typeof x === 'number' ) {
    result = true;
  }
  return result;
}

console.log(is_number(a));  // false
console.log(is_number(b));  // true
```

Though a simpler way would be to use one of the built-in Number object's static methods:

```javascript
let a = NaN;
let b = 5;

console.log(Number.isFinite(a));  // false
console.log(Number.isFinite(b));  // true
```

If we wanted to check if something is an array, there's a number of options. An older method uses `toString`:

```javascript
let a = {};
let b = [];

function is_array(x) {
  let result = false;
  if (Object.prototype.toString.call(x) === '[object Array]') {
    result = true;
  }
  return result;
}

console.log(is_array(a));  // false
console.log(is_array(b));  // true
```

But a newer method uses the built-in Array object method:

```javascript
let a = {};
let b = [];

console.log(Array.isArray(a));  // false
console.log(Array.isArray(b));  // true
```


## Object.is() method

```javascript
let a = 2 / 'string';  // NaN
let b = -3 * 0;        // -0
let c = 0.2 + 0.1;     // 0.30000000000000004

console.log(Object.is(a, NaN));  // true
console.log(Object.is(b, -0));   // true
console.log(Object.is(b, 0));    // false
console.log(Object.is(c, 0.3));  // false
```


## .isPrototypeOf() method & instanceof operator

```javascript
let obj1 = {};
let obj2 = Object.create(obj1);

console.log(obj1.isPrototypeOf(obj2));  // true

let obj3 = function () {};
let obj4 = new obj3();

console.log(obj4 instanceof obj3);  // true
```


## Number methods

```javascript
let a = 2 / 'string';  // NaN
let b = -3 * 0;        // -0
let c = 0.2 + 0.1;     // 0.30000000000000004

console.log(Number.isNaN(a));          // true
console.log(Number.isInteger(a));      // false
console.log(Number.isFinite(a));       // false
console.log(Number.isSafeInteger(a));  // false

console.log(Number.isNaN(b));          // false
console.log(Number.isInteger(b));      // true
console.log(Number.isFinite(b));       // true
console.log(Number.isSafeInteger(b));  // true

console.log(Number.isNaN(c));          // false
console.log(Number.isInteger(c));      // false
console.log(Number.isFinite(c));       // true
console.log(Number.isSafeInteger(c));  // false
```

## Array methods

```javascript
let a = {};
let b = [];

console.log(Array.isArray(a));  // false
console.log(Array.isArray(b));  // true
```
