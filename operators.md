# Operators


Operators that use two values are called *binary operators*, while those that take one are called *unary operators*. There in also a *ternary operator* `?:` that takes three.

## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Examples](#examples)
- [Comparing Objects](#comparing-objects)
- [Conditional operator](#conditional-operator)
- [False and Falsy](#false-and-falsy)
- [Shorthand using Operators](#shorthand-using-operators)
- [Keyword operators](#keyword-operators)

<!-- tocstop -->

## Syntax

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
Conditional (ternary) operator: `?`  

There are other, more complex ones (ie Bitwise operators). See: [MDN Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators).

## Examples

Basic operators:

```javascript
console.log(3 + 4);   // 7
console.log(5 - 1);   // 4
console.log(4 * 2);   // 8
console.log(5 / 2);   // 2.5
console.log(12 % 5);  // 2

let a = 5;

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

For strict equality/non-equality the data type must be the same. Another way to put it is in the case of loose comparisons, JavaScript is allowed to perform *[type coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)* on the values before the comparison takes place whereas it does no coercing in a strict comparison.

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

Note the `< <= > >=` comparison operators are not strict. If you try to compare two strings, the comparison is made alphabetically. If one of the values is a number, then both values are coerced to numbers and a typical numeric comparison occurs. If one of the values cannot be made into a valid number it becomes `NaN` and all comparisons will fail because `NaN` is neither greater than or less than any other value.

```javascript
let a = 10;
let b = '15';
let c = 'apple';
let b = 'apples';

console.log(a < b);  // true
console.log(a < c);  // false
console.log(c < d);  // true
```

Some general advice for working with strict `=== !==` vs loose `== !=`:

- If either value in a comparison could be a true or false, avoid `==` and use `===`.
- If either value in a comparison could be a `0`, '""', or `[]`(empty array), avoid `==` and use `===`.
- In all other cases, it's safe to use `==`.


## Comparing Objects

Note that when comparing two objects (arrays, functions), the comparison is checking to see if they are the same object... not that their contents are the same. However, if you compare an array object to a string, the array gets coerced to a comma separated string and therefor the comparison could potentially evaluate true, For example:

```javascript
let a = [1, 2, 3];
let b = [1, 2, 3];
let c = a;
let d = '1,2,3';
let e = '1, 2, 3';

console.log(a == b);  // false (because they are different objects)
console.log(a == c);  // true (because they are the same object)
console.log(a == d);  // true (because the array gets coerced to a string)
console.log(a == e);  // false (because the coerced array has no spaces)

```

## Conditional operator

The conditional (ternary) operator `?` is the only one that takes 3 operands. It says; if a condition is true, the operator is assigned the first value, otherwise the second value. For example:

```javascript
// condition ? value1 : value2

let status = (age >= 18) ? 'adult' : 'minor';
```


## False and Falsy

Note that the following values will evaluate to false when checked as a condition:

- **0** (zero)
- **Empty strings** like `""` or `''`
- **null** which represent when there is no value at all
- **undefined** which represent when a declared variable lacks a value
- **NaN** short for *Not a Number*, it is the result of an operation that cannot produce normal result. `Nan` is nit equal to any other value, including itself.


## Shorthand using Operators

The nature of Booleans and operators allow us to write some shorter code. For example:

```javascript
let nom;
if (username) {
  nom = username;
}
else {
  nom = 'Stranger';
}

// could be shortened to:
let nom = username || 'Stranger';
```

This concept is also referred to as short-circuit evaluation. Remember that logical operators are processed from left to right and processing will stop as soon as there is a result. Since we know that with the `||` operator, if the first condition is `true` then it doesn't need to check the rest, programmers will often put the code *most likely to return true first*. Similarly with the `&&` operator, to place anything likely to be `false` first.

## Keyword operators

There are a number of keyword operators in javascript which test/do various things for example:

`new` - The new operator turns a function call into a constructor call and creates an instance of the constructor.  
`instanceof` -  The instanceof operator determines whether an object is an instance of another function. It tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.  
`typeof` - The typeof operator determines the type of a given object. FYI there is a good example of the usefulness of this operator in the *undeclared vs undefined* section of [variables.md](variables.md#undeclared-vs-undefined).  
`delete` - The delete operator deletes a property from an object.  
`in` - The in operator determines whether an object has a given property.  
`void` - The void operator discards an expression's return value.
