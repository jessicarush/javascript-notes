# Built-in Methods


JavaScript has built-in methods for different data types. Like properties, built-in methods are called by appending an instance with a period, the name of the method followed by parentheses`()`. While properties are calculated when an instance is created, built-in methods perform actions that generate output when they are called on an instance.

## Table of Contents

<!-- toc -->

- [String methods](#string-methods)
- [Number methods](#number-methods)

<!-- tocstop -->

## String methods

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
console.log('The weather is nice.'.replace('nice', 'gross'));
// The weather is gross.
```

Not that JavaScript doesn't have a capitalize method for strings. Instead, you have to monkey one together like so:

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

let s = 'the great escape';

console.log(capitalFirstLetter(s));
// The great escape
console.log(capitalize(s));
// The Great Escape
```

See all the [built-in methods for strings here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).


## Number methods

An example of a built-in method for numbers is `toFixed()`:

```javascript
const tax_rate = 0.12;
let amount = 9.99;
let total = amount + (amount * tax_rate);

console.log(total);
// 11.1888

console.log(total.toFixed(2));
// 11.19

// You could call call it like this
total = (amount + (amount * tax_rate)).toFixed(2);
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

Another method is `toString()`. The interesting thing about this method is that you can use the optional base parameter to convert the number to binary(2), octal(8) or hex(16). This parameter must be an integer between 2 and 36.

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



See all the [built-in methods for numbers here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
