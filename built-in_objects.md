# Built-in (Global) Objects

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

**Note:** This is just for demonstration purposes. You should never actually use String as a constructor. The point here is that primitive data types are not objects. They are primitive, literal, immutable values. When we call a property or method on a primitive (e.g. `strPrimitve.length` or `strPrimitve.charAt(3)`), JavaScript automatically coerces the primitive into an object.


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

## Error
