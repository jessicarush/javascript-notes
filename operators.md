# Operators

JavaScript supports the following operators:

Add: `+`  
Subtract: `-`  
Multiply: `*`  
Divide: `/`  
Remainder: `%`  
Assignment: `=`  
Compound assignment: `+=` `-=` `*=` `/=` `%=`  
Increment: `++`  
Decrement: `--`  
Equality (loose): `==`  
Equality (strict): `===`  
Not Equal (loose): `!=`  
Not Equal (strict): `!==`  
Comparison: `<` `>` `<=` `>=`  
Logical and: `&&`  
Logical or: `||`  
Logical not: `!`  
Conditional operator: `?`  

There are other, more complex ones (ie Bitwise operators). See: [MDN Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators).


```javascript
console.log(3 + 4);   // 7
console.log(5 - 1);   // 4
console.log(4 * 2);   // 8
console.log(5 / 2);   // 2.5
console.log(12 % 5);  // 2

var a = 5;

console.log(a += 1);  // 6
console.log(a -= 1);  // 5
console.log(a *= 5);  // 25
console.log(a /= 2);  // 12.5
console.log(a %= 5);  // 2.5
```

Increments and decrements can be used in two ways. If x is 3, then ++x sets x to 4 and returns 4, whereas x++ returns 3 and, only then, sets x to 4.

```javascript
console.log(++a);  // 3.5
console.log(a++);  // 3.5
console.log(a);    // 4.5
```

For strict equality/non-equality the data type must be the same. Note the comparison operators are not strict.

```javascript
console.log(a == '4.5');     // true
console.log(a === '4.5');    // false
console.log(a === 4.5);      // true
console.log(a != '4.5');     // false
console.log(a !== '4.5');    // true
console.log(a > 4.4);        // true
console.log(a < '4.6');      // true
console.log(a >= '4.5');     // true
console.log(a <= 4.5);       // true
console.log(1 && true);      // true
console.log(1 && false);     // false
console.log(true || 0);      // true
console.log(false || 0);     // 0
console.log(true || false);  // true
console.log(!true);          // false
```

The conditional operator `?` is the only one that takes 3 operands. It says if a condition is true, the operator is assigned the first value, otherwise it's assigned the second value. For example:

```javascript
// condition ? value1 : value2

var status = (age >= 18) ? 'adult' : 'minor';
```
