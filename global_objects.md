# Global Objects


These are built-in objects, with collections of methods that can be called without an instance.

## Math object

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


## Number object

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

## Date object

By default when you create a Date object, it will hold today's date and time. If you want to store another date, you must explicitly state it.
