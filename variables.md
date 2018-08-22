# Variables

In JavaScript you need to *declare* your variables by name before you use them. This is done with the `var` keyword. You only need to declare your variables once for each *scope*.

```javascript
var a = 5;

a = a + 1;
a = a * 2;
console.log(a);  // 12
```

Some programming languages use *Static typing* or *type enforcement* which means you declare what type of data a variable will be. This method benefits program correctness by preventing unintended value conversions.

Other languages (including JavaScript) use *weak typing* or *dynamic typing* which allows a variable to hold any type of value at any given time. The benefit of this is program flexibility.

Variables that are considered *constants*, should be written in uppercase with underscores and defined at the top of the program. For example:

```javascript
var TAX_RATE = 0.12;  // 12% sales tax
var ADMIN_FEE = 5;    // $5 flat admin fee
```
The newest version of JavaScript (ES6) includes a new way to declare constants with the `const` keyword. For example:

```javascript
const TAX_RATE = 0.12;  // 12% sales tax
const ADMIN_FEE = 5;    // $5 flat admin fee
```
