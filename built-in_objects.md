# Standard Built-in Objects


Javascript has many built-in objects. Some of the names imply they're directly related to their primitive counterparts (see [data_types.md](data_types.md)) but, the relationship is slightly more complicated. These built-in objects have collections of static methods (that can be called **without an instance**), prototype methods (that can be called directly on an instance or primitive type) and properties. See [MDN for a complete list of built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).


## Table of Contents

<!-- toc -->

- [Methods & Properties](#methods--properties)
  * [Properties](#properties)
  * [Prototype (instance) methods](#prototype-instance-methods)
  * [Static methods](#static-methods)
- [Reflection](#reflection)
- [String](#string)
- [Number](#number)
- [Date](#date)
- [Boolean](#boolean)
- [Object](#object)
- [Function](#function)
- [Array](#array)
- [Math](#math)
- [RegExp](#regexp)
- [Error](#error)
- [Symbol](#symbol)
- [Map](#map)
- [Set](#set)
- [Promise](#promise)
- [Global Functions](#global-functions)

<!-- tocstop -->

## Methods & Properties

All built-in methods belong to built-in objects. Some methods are meant to be applied to an instance or primitive data-type, while others are applied to the built-in object itself (static methods). Some built-in properties are accessed from the object (constants) while others are available to an instance.

For example, if you take a look at the built-in object [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), you'll see that some of its methods are listed like: `Number.methodName` while others are listed as `Number.prototype.methodName`. This first group are *static* methods and are applied directly to the `Number` object. The value (if there is one) is passed to the method as an argument.

The second group of methods include the `prototype` property. This indicates that the method is available via the *prototype link* to all instances of that type and can be applied directly to an instance or primitive data type.

### Properties

The `String` object has the built-in `length` property that can be used on any instance or primitive, whereas the `Number` object mainly only has CONSTANT properties which are accessed from the object itself:

```javascript
'hello'.length;  // 5
Number.EPSILON;  // 2.220446049250313e-16
```

### Prototype (instance) methods

Like properties, prototype methods are called by appending an instance with a period, the name of the method followed by parentheses`()`. While properties are calculated when an instance is created, built-in methods perform actions that generate output when they are called on an instance.

```javascript
let num = 5.89609;
num.toPrecision(3);  // 5.90
```

### Static methods

```javascript
Number.isInteger(5);  // true
```


## Reflection

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

**Note:** This is just for demonstration purposes. You would never actually use String as a constructor. In fact, `String()`, `Number()`, `Boolean()`, `Array()`, `Object()` and `Function()` aren't generally used as constructors but written as literals. `RegExp()` used as a constructor can be useful sometimes. `Date()`, `Error()` and `Symbol()` are used as constructors always because there is no literal method of writing them.

The point here is that primitive data types are not objects. They are primitive, literal, immutable values. When we call a property or method on a primitive (e.g. `strPrimitve.length` or `strPrimitve.charAt(3)`), JavaScript automatically coerces the primitive into an object.


## String

The [String object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) mostly consists of instance methods:

```javascript
console.log('Hello'.toUpperCase());
// 'HELLO'
console.log('Hello'.toLowerCase());
// 'hello'
console.log('Hello'.startsWith('H'));
// true
console.log('Hello'.charAt(0));
// H
console.log('coconuts'.slice(4, 7));
// nut
console.log('lime in the coconut'.indexOf('the'));
// 8
console.log('coconut'.lastIndexOf('c'));
// 2
console.log(' \t  okay  \n '.trim());
// okay
console.log('Title'.padStart(10, '_'));
// _____Title
console.log('one two three'.split(' '));
// [ 'one', 'two', 'three' ]
console.log('ha'.repeat(3));
// hahaha
console.log('The weather is nice nice.'.replace('nice', 'gross'));
// The weather is gross nice.
console.log('The weather is nice nice.'.replace(/nice/, 'gross'));
// The weather is gross nice.
console.log('The weather is nice nice.'.replace(/nice/g, 'gross'));
// The weather is gross gross.
console.log('The weather is nice nice.'.replaceAll('nice', 'gross'));
// The weather is gross gross.
```

Note `replaceAll()` method was introduced in EcmaScript 2021 and is supported in most modern browsers but as of this writing is not yet in node (v14.18.1).

The `substring()` method returns the part of the string between the start and end indexes, or to the end of the string. This can be used as a clever way to pad-tab output:

```javascript
let heading = ['name', 'date', 'age'];
let data = ['Rick', '11-19-1979', '40'];
let space = ' '.repeat(8);

for (let i = 0; i < heading.length; i++) {
  console.log(heading[i] + ':' + space.substring(heading[i].length), data[i]);
}

// name:     Rick
// date:     11-19-1979
// age:      40
```

Here's a function that uses the same technique to zero pad a number:

```javascript
function zeroPadNumber(num, length=3) {
  num = String(num);
  if (num.length < length) {
    let padding = '0'.repeat(length);
    num = padding.substring(num.length) + num;
  }
  return num;
}

console.log(zeroPadNumber(7));
// 007

console.log(zeroPadNumber(7, 5));
// 00007

console.log(zeroPadNumber(7001, 3));
// 7001
```

Since we're on the topic, here's another way to pad using `slice()`:

```javascript
function zeroPadNumber(num, length=3) {
  const maxnum = Number('9'.repeat(length));
  return (num <= maxnum) ? ('0'.repeat(length) + num).slice(-length): num;
}

console.log(zeroPadNumber(7));
// 007

console.log(zeroPadNumber(7, 5));
// 00007

console.log(zeroPadNumber(7001, 3));
// 7001
```

Note that JavaScript doesn't have a capitalize method for strings. Instead, you have to monkey one together like so:

```javascript
function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalize(string) {
  let words = [];
  string.split(' ').forEach(word => {
    words.push(capitalFirstLetter(word));
  });
  return words.join(' ');
}

let title = 'the great escape';

console.log(capitalFirstLetter(title));
// The great escape
console.log(capitalize(title));
// The Great Escape
```

You can reverse a string by chaining methods together. Note, this will not work for strings with complex (unicode) characters.

```javascript
let string = 'hello';

let reversed = string.split('').reverse().join('');

console.log(reversed);  // olleh
```

`String()` itself is a built-in function. Using it alone will explicitly convert a value into a string. You can also use the `toString()` method to do the same thing:

```javascript
let num = 100;
console.log(typeof String(num));     // string
console.log(typeof num.toString());  // string
```

If I wanted to strip the units off a value string, I have a few options:

```javascript
let test = '10.0 A';

let test2 = test.slice(0, -1);
let test3 = test.replace(' A', '');
let test4 = test.substring(0, test.length - 2);

console.log(test2);  // 10.0
console.log(test3);  // 10.0
console.log(test4);  // 10.0
```

Note that `indexOf()` returns `-1` if the search string is not found. As a result, it could be used to filter a list:

```javascript
const fruit = [
  { id: 1, name: 'Apple', fresh: true },
  { id: 2, name: 'Cherries', fresh: true },
  { id: 3, name: 'Green apple', fresh: false },
  { id: 4, name: 'Pineapple', fresh: true}
];

function filterProducts(products, filterText, freshOnly) {
  const results = [];

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (freshOnly && !product.fresh) {
      return;
    }
    results.push(product.name);
  });
  return results;
}

console.log(filterProducts(fruit, 'apple', false));
// [ 'Apple', 'Green apple', 'Pineapple' ]

console.log(filterProducts(fruit, 'apple', true));
// [ 'Apple', 'Pineapple' ]
```

That example came from the latest React.dev docs. That being said, if I were doing it, I would do this instead:

```javascript
function filterProducts(products, filterText, freshOnly) {
  return products.filter(product => {
    const nameMatches = product.name.toLowerCase().includes(filterText.toLowerCase());
    return nameMatches && (!freshOnly || product.fresh);
    })
    .map(product => product.name);
}

console.log(filterProducts(fruit, 'apple', false));
// [ 'Apple', 'Green apple', 'Pineapple' ]

console.log(filterProducts(fruit, 'apple', true));
// [ 'Apple', 'Pineapple' ]
```


## Number

The [Number object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) has quite a few *static* methods and *instance* methods. Some examples of *instance* methods for numbers are `toFixed()`, `toPrecision()` and `toExponential()`:

```javascript
const tax_rate = 0.12;
let amount = 9.99;
let total = amount + (amount * tax_rate);

console.log(total);
// 11.1888

console.log(total.toFixed(2));
// 11.19

// you could also do this
total = (amount + (amount * tax_rate)).toFixed(2);

// not that these methods returns a string
console.log(typeof total);
// string

// rounds to total number of places (returns a string)
total = Number(total);
console.log(total.toPrecision(3));
// 11.2

// returns a string in exponential notation
total = Number(total);
console.log(total.toExponential());
// 1.11888e+1
```

Another *instance* method is `toString()`. The interesting thing about this method is that you can use the optional base parameter to convert the number to binary(2), octal(8) or hex(16). This parameter must be an integer between 2 and 36.

```javascript
var num = 15;

console.log(num.toString());
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString(16));
// 15
// 1111
// 17
// f
```

Here's a function that converts rgb color values into hex using `toString()`:

```javascript
function rgbToHex(rgbString) {
  const rgb = rgbString.split(',').map(Number);
  const [r, g, b] = rgb;
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

let rgb1 = '127,255,212';
let rgb2 = '104, 58, 249';

console.log(rgbToHex(rgb1));  // #7fffd4
console.log(rgbToHex(rgb2));  // #683af9
```

While we're at it, here's a function that goes the other way using the built-in function ``parseInt()``:

```javascript
function hexToRgb(hexString) {
  const hex = hexString.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

console.log(hexToRgb('#7fffd4')); // 127, 255, 212
console.log(hexToRgb('683af9'));  // 104, 58, 249
```

Note that ``parseInt()`` is a [global function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that is the same as ``Number.parseInt()`` described next.

```javascript
console.log(Number.parseInt === parseInt);  // true
```

The [Number object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) has *static* methods that check if an instance in an integer or finite number, or *parse* a string into a float or integer. The two *parsing* methods are interesting because they tolerate and drop any non-numeric characters they encounter as they parse from left to right. Note that the string must start with a numeric character for it to be parsed. As soon as it reads a non-numeric character, it simply stops parsing.

```javascript
Number.parseFloat('5.25 laps');  // 5.25
Number.parseInt('250px');        // 250
Number.isInteger(5);             // true
Number.isFinite(5.2345);         // true
Number.isSafeInteger(3.1);       // false
Number.isNaN(5 * 'string');      // true
```

The parse methods are interesting in that you can pass a second optional argument that is the base. For example:

```javascript
let x = Number.parseInt('ff', 16);  // 255
```

Though they are intended to be passed strings, parse methods will try to do type-coercion where it can to return a value. Sometimes this works well, for example:

```javascript
let obj = {
  quantity: 15,
  cost: 3.25,
  toString: function () {
    return String(this.quantity * this.cost);
  }
};

console.log(Number.parseInt(obj));    // 48
console.log(Number.parseFloat(obj));  // 48.75
```


`Number()` itself is a built-in function. Using it alone will explicitly convert a string to a number. If you try to convert a string that doesn't translate to a number you'll get `NaN`. Another widely accepted way to convert to a number is by using the *unary operator* `+`. This is common when converting dates to an epoch timestamp number. Keep in mind though, there may be times where it looks confusing and weird. In general, it's best to avoid this if it's being used next to another operator.

```javascript
let a = '42';
let b = +a;
let c = 8 + +a;
let d = new Date();

console.log(a, typeof Number(a));              // 42 number
console.log(b, typeof b);                      // 42 number
console.log(c, typeof c);                      // 50 number
console.log(d, typeof d);                      // 2019-10-04T17:25:00.455Z object
console.log(+d, typeof +d);                    // 1570209900455 number
console.log(d.getTime(), typeof d.getTime());  // 1570209900455 number
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

The most common scenario in which JavaScript programs are dealing with such large numbers, is when working with 64-bit IDs from databases. These numbers cannot be represented accurately with the number type so the must be stored as a string.

One last example, if we wanted to truncate a number to a number of decimal points *without* rounding, we would have to do it in a couple of steps:

```javascript
function truncateNum(num, decimals) {
  num = num.toString();
  num = num.slice(0, (num.indexOf(".")) + 1 + decimals);
  return Number(num);
}

console.log(truncateNum(10.3599, 2));
// 10.35
```


## Date

The [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) has a few static methods but mainly contains instance methods to be applied to objects constructed with `new Date()`.

By default when you construct a Date object, it will hold today's date and time. If you want to store another date, you must explicitly state it with the format `YYYY, MM, DD, HH, MM, SS` or `MMM DD, YYYY HH:MM:SS`. Note that the current date/time is determined by the computers clock.

**NOTE: The argument monthIndex is 0-based. This means that January=0 and December=11**

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

methods                                  | description
-------                                  | -----------
`getDate()`, `setDate()`                 | returns/sets day of the month (0-31)
`getDay()`                               | returns day of the week (0-6)
`getFullYear()`, `setFullYear()`         | returns/sets year (4-digits)
`getHours()`, `setHours()`               | returns/sets the hour (0-23)
`getMilliseconds()`, `setMilliseconds()` | returns/sets milliseconds (0-999)
`getMinutes()`, `setMinutes()`           | returns/sets minutes (0-59)
`getMonth()`, `setMonth()`               | returns/sets month (0-11)
`getSeconds()`, `setSeconds()`           | returns/sets seconds (0-59)
`getTime()`, `setTime()`                 | milliseconds from epoch (Jan 1, 1970) UTC
`getTimezoneOffset()`                    | timezone offset in mins for locale
`toDateString()`                         | returns human-readable date string
`toTimeString()`                         | returns human-readable time string
`toString()`                             | returns human-readable date + time string

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

Instead of creating a Date object, you can also use the static methods `Date.UTC()` and `Date.now()` which return a time value as a number (milliseconds since epoch 1/1/1970). This is available as of ES5.

```javascript

const utc = Date.UTC(2018, 1, 7);
const now = Date.now();

console.log(utc);  // 1517961600000
console.log(now);  // 1546902662234

console.log(typeof utc);  // number
console.log(typeof now);  // number
```

To summarize, to get the current timestamp from epoch, both of the following methods are valid:

```javascript
const timestamp2 = new Date().getTime();
const timestamp3 = Date.now();
```

Keep in mind though, many other things require the timestamp to be in seconds (Python's `datetime.timestamp()` is in seconds). If you need to convert Javascript's millisecond timestamp into seconds, be sure to use `Math.floor()`:

```javascript
const timestamp_now = Math.floor(Date.now() / 1000);
const timestamp_then = Math.floor(new Date(2019, 1, 31).getTime() / 1000);

console.log(timestamp_now);
// 1554947480

console.log(timestamp_then);
// 1551600000
```

Note that you can also convert an epoch back into a Date object:

```javascript
let myDate = new Date(2020, 9, 31);  // 2020-10-31T07:00:00.000Z

console.log(myDate.getTime());       // 1604127600000

let myDateFromEpoch = new Date(1604127600000);

console.log(myDateFromEpoch);        // 2020-10-31T07:00:00.000Z
```

You can use all the various *set* methods to increment the date by that particular unit of time. For example:

```javascript
// Today
let d = new Date();
console.log(d.toDateString()); // Wed Jan 15 2020

// 14 days from today
d.setDate(d.getDate() + 14);
console.log(d.toDateString()); // Wed Jan 29 2020

// 3 months before that
d.setMonth(d.getMonth() - 3);
console.log(d.toDateString()); // Tue Oct 29 2019

// 6 years from that
d.setFullYear(d.getFullYear() + 6);
console.log(d.toDateString()); // Wed Oct 29 2025
```


## Intl 

The [Internationalization object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#internationalization) adds language-sensitive functionalities to the ECMAScript core.

### Intl.DateTimeFormat

The [Intl.DateTimeFormat object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) enables language-sensitive date and time formatting.

```javascript
const today = new Date();

console.log(today.getDay());
// 3

console.log(new Intl.DateTimeFormat('en-US').format(today));
// "3/22/2023"

let options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

console.log(new Intl.DateTimeFormat('en-US', options).format(today));
// Wednesday, March 22, 2023

console.log(new Intl.DateTimeFormat('de-DE', options).format(today));
// Mittwoch, 22. März 2023

console.log(new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(today));
// Wednesday
```


## Boolean

The [Boolean object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

The `Boolean(...)` method can be used as an explicit way of coercing to a boolean value.

```javascript
let a = '0';
let b = {};
let c = [];
let d = '';
let e = 0;
let f = null;
let g = undefined;

console.log(Boolean(a));  // true
console.log(Boolean(b));  // true
console.log(Boolean(c));  // true
console.log(Boolean(d));  // false
console.log(Boolean(e));  // false
console.log(Boolean(f));  // false
console.log(Boolean(g));  // false
```

## Object

The base [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).
See [objects.md](objects.md).

The `Object.assign()` static method copies all enumerable own properties from one or more source objects to a target object and returns that target object. Note that duplicate keys will be assigned the last value.

```javascript
const target = {name: 'jessica', color: 'aquamarine'};
const source1 = {number: 5, flower: 'orchid'};
const source2 = {number: 7, name: 'anonymous'};

const returnedTarget = Object.assign(target, source1, source2);

console.log(returnedTarget);
// { name: 'anonymous', color: 'aquamarine', number: 7, flower: 'orchid' }
console.log(target);
// { name: 'anonymous', color: 'aquamarine', number: 7, flower: 'orchid' }
console.log(source1);
// { number: 5, flower: 'orchid' }
console.log(source2);
// { number: 7, name: 'anonymous' }
```

## Function

The [Function object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).
See [functions.md](functions.md).

## Array

The [Array object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
See [arrays.md](arrays.md).

## Math

The [Math object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) contains mathematical methods. For example, the `.random()` method generates a random decimal number between 0 and 1.

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

To drop 

```javascript
let num = 1.932;

console.log(Math.trunc(num)); // 1
```

Other Math methods include:

method         | description
------         | -----------
`Math.floor()` | rounds down to the nearest integer.
`Math.round()` | returns the nearest integer.
`Math.ceil()`  | rounds up to the nearest integer.
`Math.abs()`   | returns the absolute value of a number.
`Math.min()`   | returns the smallest value of a group.
`Math.max()`   | returns the largest value of a group.
`Math.sqrt()`  | returns the square root of a number.
`Math.cos()`   | calculates cosine.
`Math.sin()`   | calculates sine.
`Math.tan()`   | calculates tangent.
`Math.trunc()` | returns the integer part of a number by removing any fractional digits.

```javascript
Math.floor(Math.random() * 10);  // 6
Math.floor(4.5);  // 4
Math.floor(4.9);  // 4
Math.round(4.2);  // 4
Math.round(4.5);  // 5
Math.round(4.9);  // 5
Math.ceil(4.2);   // 5
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


## RegExp

See also: [regular_expressions.md](regular_expressions.md)

The [RegExp object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) as a constructor has a reasonable utility in terms of dynamically defining a pattern (string) for a regular expression.

Note that when creating a regular expression in javascript the literal notation is that `/` is used to mark the start and end of a regexp. In addition, after the closing `/`, you can add any number of *flags*. For example, in `pattern1`, `i` means ignore case, `g` means global match; find all matches rather than stopping after the first match.

```javascript
let word = 'blah';
let someText = 'blah blah what? blah';

// literal notation: /pattern/flags
let pattern1 = /\bblah\b/ig;

// constructor notation: RegExp('pattern', 'flags')
let pattern2 = new RegExp('\\b(?:' + word + ')+\\b', 'ig' );

console.log(someText.match(pattern1));  // [ 'blah', 'blah', 'blah' ]
console.log(someText.match(pattern2));  // [ 'blah', 'blah', 'blah' ]
```

Since the RegExp object creates the regex from a string, you can concatenate
variables into the pattern.

## Error

Using an [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) can make debugging much easier as the call-stack and line number will be included in the error. In the example below, a missing arg normally simply results in `undefined` but throwing an error may be more helpful:

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

[Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) are special *unique* values that can be used as properties on objects with little fear of *collision*. Symbols can be used as property names but you can't see or access the actual value of a symbol from your program or the developer console. Their primary use case is likely for private or special properties where we traditionally name with a leading `_` underscore to signal a private/special/leave-it-alone property. Symbols are not objects, they are simple, scalar primitives.

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

obj.name = 'test';

let toStringSymbol = Symbol('toString');

obj[toStringSymbol] = function () {
  return `I am ${this.name}.`;
};

console.log(obj[toStringSymbol]());              // I am test.
```


## Map

The [Map object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

## Set

The [Set object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).
See [sets.md](sets.md).

## Promise

The [Promise object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


## Global Functions

Note that some functions such as `parseFloat()` and `parseInt()` as of ES6 are available as *global functions* and can be used without a global object:

```javascript
parseFloat('5.25 laps');  // 5.25
parseInt('250px');        // 250
isNaN(5 * 'string');      // true
isFinite(5.2345);         // true

```

See [MDN - Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#Function_properties).
