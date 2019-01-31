# Data Types


JavaScript uses six *primitive data types*, along with one complex type:

**Strings** — Any grouping of characters surrounded by single or double quotes.  
**Numbers** — Any number, including numbers with decimals. Internally, they're represented as 64-bit floating point.  
**Booleans** — Either true or false, with no quotations.  
**Null** — Can only be null. It represents the absence of value.  
**Undefined** — Automatically assigned to variables that have just been declared or to formal arguments for which there are no actual arguments.  
**Symbols** — (new to ES6) Used as the key for an object property when the property is intended to be private, for the internal use of a class or an object.  
**Objects** — Refers to a compound value where you can set properties that each hold their own values of any type. Functions and arrays are considered subtypes of the object type. In fact, functions are simply considered *callable objects*.


## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Determine a value's type with `typeof`](#determine-a-values-type-with-typeof)
- [Converting between data types (coercion)](#converting-between-data-types-coercion)
- [Properties](#properties)
- [Escape Character](#escape-character)

<!-- tocstop -->

## Syntax

```javascript
console.log('Hello');    // string
console.log(40.7);       // number
console.log(true);       // boolean
console.log(null);       // null
console.log(undefined);  // undefined
console.log(Symbol());   // symbol
console.log({a: 'b'});   // object
```

Exponential numbers van be written like `1e10`, for example:
```javascript
let num_exponent = 3e6;
console.log(num_exponent);  // 3000000
```

Hex, octal, and binary numbers can be written using `0x...`, `0o...`, `0b...`:
```javascript
let num_hex = 0x1c6;
let num_octal = 0o706;
let num_binary = 0b111000110;

console.log(num_hex === 454);     // true
console.log(num_octal === 454);   // true
console.log(num_binary === 454);  // true
```

Note that `null` and `undefined` are equal in value but different in type:

```javascript
console.log(null == undefined);   // true
console.log(null === undefined);  // false
```

Note that values that are included directly in the code are called *literals*. For example:

```javascript
console.log('Hello');  // 'Hello' is a string literal
console.log(40.7);     // 40.7 is a number literal
```


## Determine a value's type with `typeof`

`typeof` is an operator that can be used to return a value's *type* as a string. For example:

```javascript
let a = 'hello';
console.log(typeof a);  // string

a = 43;
console.log(typeof a);  // number

a = true;
console.log(typeof a);  // boolean

a = null;
console.log(typeof a);  // object (quirk from early JavaScript)

a = undefined;
console.log(typeof a);  // undefined

a = Symbol();
console.log(typeof a);  // symbol

a = {b: 'c'};
console.log(typeof a);  // object

a = ['one', 'two', 'three'];
console.log(typeof a);  // object

a = function () {};
console.log(typeof a);  // function
```

Notice that `typeof` is not asking for the *type of 'a'* but rather for the *type of the value currently in 'a'*. Only values have types in JavaScript, variables are just containers.


## Converting between data types (coercion)

If you have a number and need to print it to the screen, you'll need to convert it to a string. Similarly, if you're working with numbers entered into a form on screen, they'll be strings by default and will need to be converted to numbers if we want to calculate something. In Javascript this conversion of one data type to another is called coercion.

```javascript
let a = '42';
let b = Number(a);

console.log(a);  // "42" (text is black in firefox console)
console.log(b);  // 42 (numbers are green in firefox console)
```

Using the `Number()` function like this is considered *explicit* coercion. But, there is also something called *implicit* coercion. Implicit coercion happens when you do loose comparisons. For example, if I make the comparison: `"100" == 100`, JavaScript will first convert the left side to its number equivalent and then do the comparison. Keep this in mind. There is strict comparison `===` for a reason. Similarly, if you print or log a number, JavaScript is actually *implicitly coercing* that number to a string in order to print it out.

You can *explicitly coerce* to a string with `String()`:

```javascript
let amount = 9.99;
let quantity = 3;
const total = '$' + String(amount * quantity);

console.log(total);  // $29.97
```

When it comes to *implicit* coercion, JavaScript doesn't always do what you expect, for example:

```javascript
console.log(5 * null);  // 0
console.log(5 - '1');   // 4
console.log(5 + '1');   // 51
```


## Properties

JavaScript associates certain properties with different data types. In fact, almost all JavaScript values have properties. The exceptions are null and undefined.

When you introduce a new piece of data into a JavaScript program, the browser saves it as an instance (object) of the data type. Instances automatically have additional information (properties) attached to them. For example, every string instance has a property called length that stores the number of characters (the length of a string is calculated when the instance is created). You can retrieve property information by using dot notation on the instance:

```javascript
console.log('Hello'.length);  // 5
```

As it turns out, arrays and functions have a length property as well. When applied to arrays, it returns the number of items, when applied to functions, it returns the number of formal parameters it's declared with:

```javascript
let arr = ['a', 'b', 'c'];

let func = function(a, b) {
  return a + b;
};

console.log(arr.length);   // 3
console.log(func.length);  // 2
```


## Escape Character

The backslash `\` can be used in strings to escape characters or insert control characters, such as:

```javascript
const doublequote = "\"";
const singlequote = '\'';
const backslash = '\\';
const backspace = '\b';
const formfeed = '\f';
const newline = '\n';
const hardreturn = '\r';
const tab = '\t';
const unicode = '\u25b6';
```
