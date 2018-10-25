# Built-in Methods


JavaScript has built-in methods for different data types.

Like properties, built-in methods are called by appending an instance with a period, the name of the method followed by parentheses`()`. While properties are calculated when an instance is created, built-in methods perform actions that generate output when they are called on an instance.

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

See all the [built-in methods for numbers here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).
