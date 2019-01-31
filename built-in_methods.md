# Built-in Methods


JavaScript has built-in methods for different data types. Like properties, built-in methods are called by appending an instance with a period, the name of the method followed by parentheses`()`. While properties are calculated when an instance is created, built-in methods perform actions that generate output when they are called on an instance.

## Table of Contents

<!-- toc -->

- [Instance Methods & Object methods](#instance-methods--object-methods)
- [String instance methods](#string-instance-methods)
- [Number instance methods](#number-instance-methods)

<!-- tocstop -->

## Instance Methods & Object methods

All built-in methods belong to built-in objects. Some methods are meant to be applied to an instance (or primitive data-type) while others are applied to the built-in object itself. For example, if you take a look at the built-in object [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), you'll see that some of its methods are listed like: `Number.methodName` while others are listed as 'Number.prototype.methodName'. This first group of methods are applied directly to the number object, for example:

```javascript
Number.isInteger(5);        // true
```

For more on these types of methods see [built-in_objects.md](built-in_objects.md).

The second group of methods include the `prototype` property. This indicates that the method is available (via the prototype link) to all the instances of that type and can be applied directly to an instance. For example:

```javascript
let num = 5;
let num_str = num.toString();
```

Here we're focusing on these instance methods.

## String instance methods

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

let s = 'the great escape';

console.log(capitalFirstLetter(s));
// The great escape
console.log(capitalize(s));
// The Great Escape
```

You can reverse a string by chaining methods together. Note, this will not work for strings with complex (unicode) characters.

```javascript
let string = 'hello';

let reversed = string.split('').reverse().join('');

console.log(reversed);  // olleh
```

See all the [built-in methods for strings here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).


## Number instance methods

Examples of a built-in methods for numbers are `toFixed()`, `toPrecision()` and `toExponential()`:

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
