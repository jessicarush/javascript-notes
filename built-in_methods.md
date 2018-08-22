# Built-in Methods

JavaScript has built-in methods for different data types.

Like properties, built-in methods are called by appending an instance with a period, the name of the method followed by parentheses`()`. While properties are calculated when an instance is created, built-in methods perform actions that generate output when they are called on an instance.

```javascript
console.log('Hello'.toUpperCase());  // 'HELLO'
console.log('Hey'.startsWith('H'));  // true
```

See all the [built-in methods for strings here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).


An example of a built-in function for numbers id `toFixed()`:

```javascript
var TAX_RATE = 0.12;  // 12% sales tax
var amount = 9.99;
var total = amount + (amount * TAX_RATE);

console.log(total)             // 11.1888
console.log(total.toFixed(2))  // 11.19

// You could call it anywhere:
var total = (amount + (amount * TAX_RATE)).toFixed(2);
total = total.toFixed(2)
```

See all the [built-in methods for numbers here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).