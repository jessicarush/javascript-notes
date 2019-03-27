# Built-in (Global) Objects/Functions

Javascript has many built-in objects. Some of their names imply they're directly related to their primitive counterparts (see [data_types.md](data_types.md)) but, the relationship is slightly more complicated. These are built-in objects (functions actually), with collections of static methods that can be called **without an instance**. Some of these built-in objects also contain methods that can be applied to instances or primitive data types (e.g. `String.prototype.toLowerCase`). See [MDN for a complete list of built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).

## Table of Contents

<!-- toc -->

- [instanceof](#instanceof)
- [Math](#math)
- [Number](#number)
- [Date](#date)
- [String](#string)
- [Boolean](#boolean)
- [Object](#object)
- [Function](#function)
- [Array](#array)
- [RegExp](#regexp)
- [Error](#error)
- [Symbol](#symbol)

<!-- tocstop -->

## instanceof

Before going further, it might be helpful to review this operator to clarify the relationship between primitive types and built-in types:

```javascript
let strPrimitve = 'lalala';
let strString = new String('lalalaaa');

console.log(strPrimitve instanceof String);  // false
console.log(strPrimitve instanceof Object);  // false

console.log(strString instanceof String);  // true
console.log(strString instanceof Object);  // true

console.log(typeof strPrimitve); // string
console.log(typeof strString);  // object
```

**Note:** This is just for demonstration purposes. You would never actually use String as a constructor. In fact, `String()`, `Number()`, `Boolean()`, `Array()`, `Object()` and `Function()` aren't generally used as constrictors but written as literals. `RegExp()` used as a constructor can be useful sometimes. `Date()`, `Error()` and `Symbol()` are used as constructors because there is no literal method of writing them.

The point here is that primitive data types are not objects. They are primitive, literal, immutable values. When we call a property or method on a primitive (e.g. `strPrimitve.length` or `strPrimitve.charAt(3)`), JavaScript automatically coerces the primitive into an object.

## Math

The [Math Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) contains mathematical methods. For example, the `.random()` method generates a random decimal number between 0 and 1.

```javascript
console.log(Math.random());  // 0.6897758230441343
```

To generate a random number between 0 and 10, we could multiply the result by 10:

```javascript
Math.random() * 10;  // 3.069255352584533
```

To round it to an integer

```javascript
console.log(Math.floor(Math.random() * 10)); // 9
```

Other Math methods include:

`Math.floor()` - rounds down to the nearest integer.  
`Math.round()` - returns the nearest integer.  
`Math.ceil()` - rounds up to the nearest integer.    
`Math.abs()` - returns the absolute value of a number.  
`Math.min()` - returns the smallest value of a group.  
`Math.max()` - returns the largest value of a group.  
`Math.sqrt()` - returns the square root of a number.  
`Math.cos()` - calculates cosine.  
`Math.sin()` - calculates sine.  
`Math.tan()` - calculates tangent.  

```javascript
Math.floor(Math.random() * 10);  // 6
Math.floor(4.5);  // 4
Math.floor(4.9);  // 4
Math.round(4.4);  // 4
Math.round(4.5);  // 5
Math.round(4.9);  // 5
Math.ceil(4.5);   // 5
Math.ceil(4.9);   // 5
Math.ceil(-4.9);  // -4
Math.abs(-4.9);  // 4.9
```

The number π (pi), or at least the closest approximation that fits in a JavaScript number, is available as a *property* of the Math object `Math.PI`:

```javascript
console.log(Math.PI);
// 3.141592653589793
```


## Number

The [Number object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) has methods that check if an instance in an integer or a finite number, or parses a string into a float:

```javascript
Number.parseFloat('5.20');  // 5.2
Number.isInteger(5);        // true
Number.isFinite(5.2345);    // true

let a = 5;
let b = 'string';
let c = a * b;

Number.isNaN(c);  // true
```

`Number()` itself is a built-in function. Using it alone will convert a string to a number. If you try to convert a string that doesn't translate to a number you'll get `NaN`:

```javascript
let a = '42';
let b = Number(a);
```

As of ES6, you can also use `Number` to access *machine epsilon* which is the commonly accepted tolerance value for comparing numbers where their binary floating point representations aren't exact in [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754). For example:

```javascript
console.log(0.1 + 0.2 === 0.3);  // false
console.log(Number.EPSILON);     // 2.220446049250313e-16

function closeEnough(n1, n2) {
  return (n1 - n2) < Number.EPSILON;
}

console.log(closeEnough((0.1 + 0.2), 0.3));  // true
```

Some other `Number` constants:

```javascript
console.log(Number.MAX_VALUE);
// 1.7976931348623157e+308

console.log(Number.MIN_VALUE);
// 5e-324

console.log(Number.MAX_SAFE_INTEGER);
// 9007199254740991

console.log(Number.MIN_SAFE_INTEGER);
// -9007199254740991
```

The most common scenario in which JavaScript programs are dealing with such large number, is when working with 64-bit IDs from databases. These numbers cannot be represented accurately with the number type so the must be stored as a string.

## Date

The Date object has a few static methods but mainly contains instance methods to be applied to objects constructed with `new Date()`.

By default when you construct a Date object, it will hold today's date and time. If you want to store another date, you must explicitly state it with the format `YYYY, MM, DD, HH, MM, SS` or `MMM DD, YYYY HH:MM:SS`. Note that the current date/time is determined by the computers clock.


```javascript
let today = new Date();
let newyears = new Date(1974, 11, 31, 15, 45, 55);
let halloween = new Date(2018, 9, 31);

console.log(today);
// 2018-10-25T01:45:35.905Z

console.log(newyears);
// 1974-12-31T23:45:55.000Z

console.log(halloween);
// 2018-10-31T07:00:00.000Z
```

Once you've created a Date object, the following methods (these are just a few) can be used to get and set the time and date it represents:

`getDate()`, `setDate()` - returns/sets day of the month (0-31)  
`getDay()` - returns day of the week (0-6)  
`getFullYear()`, `setFullYear()` - returns/sets year (4-digits)  
`getHours()`, `setHours()` - returns/sets the hour (0-23)  
`getMilliseconds()`, `setMilliseconds()` - returns/sets milliseconds (0-999)  
`getMinutes()`, `setMinutes()` - returns/sets minutes (0-59)  
`getMonth()`, `setMonth()` - returns/sets month (0-11)  
`getSeconds()`, `setSeconds()` - returns/sets seconds (0-59)  
`getTime()`, `setTime()` - milliseconds since epoch (Jan 1, 1970) UTC  
`getTimezoneOffset()` - returns timezone offset in mins for locale  
`toDateString()` - returns human-readable date string  
`toTimeString()` - returns human-readable time string  
`toString()` - returns human-readable date + time string  

```javascript
console.log(today.getTime());  
// 1553618191631

console.log(today.toDateString());
// Wed Oct 24 2018

console.log(today.toTimeString());
// 19:03:49 GMT-0700 (Pacific Daylight Time)

console.log(today.toString());
// Wed Oct 24 2018 19:04:18 GMT-0700 (Pacific Daylight Time)
```

Instead of creating a Date object, the static methods `Date.UTC()` and `Date.now()` return a time value as a number (milliseconds since epoch 1/1/1970).

```javascript

const utc = Date.UTC(2018, 1, 7);
const now = Date.now();

console.log(utc);  // 1517961600000
console.log(now);  // 1546902662234

console.log(typeof utc);  // number
console.log(typeof now);  // number
```

## String

## Boolean  

## Object

## Function

## Array

## RegExp

`RegExp()` as a constructor has a reasonable utility in terms of dynamically defining a pattern for a regular expression.

```javascript
let word = 'ping';
let someText = 'blah blah ping blah';

// RegExp('pattern', 'flags')
let pattern = new RegExp('\\b(?:' + word + ')+\\b', 'ig' );

let matches = someText.match(pattern);
console.log(matches);  // ['ping']
```

## Error

Using an error object can make debugging much easier as the call-stack and line number will be included in the error. In the example below, a missing arg normally simply results in `undefined` but throwing an error may be more helpful:

```javascript
function foo(x) {
  console.log('x is', x);
}

function bar(x) {
  if (!x) {
    throw new Error('x argument is missing!');
  } else {
    console.log('x is', x);
  }
}

foo();
// x is undefined

bar();
// [stdin]:24
//     throw new Error('x argument is missing!');
//     ^
//
// Error: x argument is missing!
// ...
```

## Symbol

Symbols are special *unique* values that can be used as properties on objects with little fear of *collision*. Symbols can be used as property names but you can't see or access the actual value of a symbol from your program or the developer console. Their primary use case is likely for private or special properties where we traditionally name with a leading `_` underscore to signal a private/special/leave-it-alone property. Symbols are not objects, they are simple, scalar primitives.

```javascript
let secret = Symbol('custom symbol');

console.log(secret);                             // Symbol(custom symbol)
console.log(secret.toString());                  // Symbol(custom symbol)
console.log(typeof secret);                      // symbol

let obj = {};
obj[secret] = 'secret property';

console.log(Object.getOwnPropertyNames(obj));    // []
console.log(Object.getOwnPropertySymbols(obj));  // [ Symbol(custom symbol) ]
console.log(obj.secret);                         // undefined
console.log(obj['secret']);                      // undefined
console.log(obj[secret]);                        // secret property

let toStringSymbol = Symbol('toString');

obj[toStringSymbol] = function() {
  return `I am ${this.name}.`;
};

console.log(obj[toStringSymbol]());              // I am test
```
