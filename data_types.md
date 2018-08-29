# Data Types

JavaScript uses four *primitive data types*:

Strings — Any grouping of characters surrounded by single or double quotes.  
Numbers — Any number, including numbers with decimals.  
Booleans — Either true or false, with no quotations.  
Null — Can only be null. It represents the absence of value.  

```javascript
console.log('Hello world');  // string
console.log(40.7);  // number
console.log(true);  // boolean
console.log(null);  // null
```
Note that values that are included directly in the code are called *literals*. For example:

```javascript
console.log('Hello');  // 'Hello' is a string literal
console.log(40.7);     // 40.7 is a number literal
```

## Converting between data types (coercion)

If you have a number and need to print it to the screen, you'll need to convert it to a string. Similarly, if you're working with numbers entered into a form on screen, they'll be strings by default and will need to be converted to numbers if we want to calculate something. In Javascript this conversion of one data type to another is called coercion.

```javascript
var a = "42";
var b = Number(a);

console.log(a);  // "42" (text is black in firefox console)
console.log(b);  // 42 (numbers are green in firefox console)
```

Using the `Number()` function like this is considered *explicit* coercion. But, there is also something called *implicit* coercion. Implicit coercion happens when you do loose comparisons. For example if I make the comparison `"100" == 100`, JavaScript will first convert the left side to it's number equivalent and then do the comparison (keep this in mind: there is strict comparison `===` for a reason). Similarly, if you print or log a number, JavaScript is actually *implicitly coercing* that number to a string in order to print it out.

You can *explicitly coerce* to a string with `String()`:

```javascript
var amount = 9.99;
var quantity = 3;
var total = "$" + String(amount * quantity);

console.log(total);  //$29.97
```
