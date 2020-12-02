# Operators


Operators that use two values are called *binary operators*, while those that take one are called *unary operators*. There is also a *ternary operator* `? :` that takes three values.

Add, concatenate, convert to number: `+`  
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


## Table of Contents

<!-- toc -->

- [Basic math](#basic-math)
- [Compound assignment](#compound-assignment)
- [Increment and decrement](#increment-and-decrement)
- [Equality and non-equality](#equality-and-non-equality)
  * [Equality with booleans](#equality-with-booleans)
  * [Equality edge cases](#equality-edge-cases)
  * [Equality with null and undefined](#equality-with-null-and-undefined)
  * [Loose/strict advice](#loosestrict-advice)
- [Comparison](#comparison)
- [Logical](#logical)
- [Conditional](#conditional)
- [Operator Precedence](#operator-precedence)
- [False and Falsy](#false-and-falsy)
- [Shorthand (short-circuiting) with logical operators](#shorthand-short-circuiting-with-logical-operators)
- [Keyword operators](#keyword-operators)

<!-- tocstop -->

## Basic math

```javascript
console.log(3 + 4);   // 7
console.log(5 - 1);   // 4
console.log(4 * 2);   // 8
console.log(5 / 2);   // 2.5
console.log(12 % 5);  // 2
```

To get the python equivalent of `divmod()`, you'd have to do two separate assignments:

```javascript
const quotient = Math.floor(y / x);
const remainder = y % x;
```


## Compound assignment

```javascript
let a = 5;

console.log(a += 1);  // 6
console.log(a -= 1);  // 5
console.log(a *= 5);  // 25
console.log(a /= 2);  // 12.5
console.log(a %= 5);  // 2.5
```


## Increment and decrement

Increments and decrements can be used in two ways. If x is 3, then `++x` sets x to 4 and returns 4, whereas `x++` returns 3 and, only then, sets x to 4.

```javascript
let a = 2.5;

console.log(++a);  // 3.5
console.log(a++);  // 3.5
console.log(a);    // 4.5
```

In other words, consider the `++` or `--` as an operation. When you see `a++` it's saying *"give me the value of a, then add one to a"* whereas `++a` says *"add one to a, then give the the value"*. For example:

```javascript
let a = 10;
let b = a++;  // a is assigned to b, then one is added to a

console.log(a, b);  // 11 10
```
versus:

```javascript
let a = 10;
let b = ++a; // one is added to a, then a is assigned to b

console.log(a, b);  // 11 11
```


## Equality and non-equality

For strict equality/non-equality the data types must be the same. Another way to put it is in the case of loose comparisons, JavaScript is allowed to perform *[type coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)* on the values before the comparison takes place whereas it does no coercing in a strict comparison.

```javascript
let a = 4.5;

console.log(a == '4.5');     // true
console.log(a === '4.5');    // false
console.log(a === 4.5);      // true
console.log(a != '4.5');     // false
console.log(a !== '4.5');    // true
```

Note that when comparing two objects (arrays, functions), the comparison is checking to see if they are the same object... not that their contents are the same. As a result, when comparing two objects (or functions or arrays) there is no difference between `==` and `===` because both are essentially strict. However, if you compare an array object to a string, the array gets coerced to a comma separated string and therefor the comparison could potentially evaluate true, For example:

```javascript
let a = {};
let b = {};
let c = a;
let d = [1, 2, 3];
let e = '1,2,3';
let f = '1, 2, 3';

console.log(a === b);  // false (because they are different objects)
console.log(a == b);   // false (because they are still different objects)
console.log(a == c);   // true (because they are the same object)
console.log(d == e);   // true (because the array gets coerced to a string)
console.log(d == f);   // false (because the coerced array has no spaces)
```

### Equality with booleans

Note that if you try to compare a value to a boolean, you are not actually testing if the value is equal to true or false. What will actually happen is that the boolean is coerced into a number before the comparison is made.

```javascript
let a = 5;
let b = true;
let c = 1;
let d = '';

console.log(a == b);  // false (because true coerces to the number 1)
console.log(c == b);  // true
console.log(a > b);   // true
```

As a general rule, never use `==` to to test if a value is true or false, instead use `if` and `!`:

```javascript
if (a) {
  console.log('a is true');  // a is true
}

if (!d) {
  console.log('d is false');  // d is false
}
```

### Equality edge cases

In the same way that booleans coerce to numbers when used with equality operators, empty strings also coerce to numbers: `0`. As we've seen above, arrays will have their `toString` method called. As a result, an empty array becomes an empty string which becomes also coerces to number `0`.

```javascript
// since false coerces to 0:
console.log(false == 0);    // true
console.log(false == '0');  // true
console.log(false === 0);   // false

// less obvious:
console.log(false == '');   // true (because empty strings are coerced to number 0)
console.log(false == []);   // true (because empty array > to empty string > to 0)
console.log([] == 0);       // true (because empty array > to empty string > to 0)
console.log([] == '');      // true (because empty arrays are coerced to empty strings)
console.log('' == 0);       // true (because empty strings are coerced to numbers 0)

// but not surprising:
console.log('' == '0');     // false (because no coercion happens, both are strings)
console.log([] == '0');     // false (because empty arrays are coerced to empty strings)
```

### Equality with null and undefined

Another example of implicit coercion is seen with `null` and `undefined`. According to the spec, when compared with `==` the are considered equal to each other and themselves, but no other value in the language.

```javascript
let a = null;
let b;

console.log(a == null);       // true
console.log(a == undefined);  // true
console.log(a == false);      // false
console.log(a == b);          // true
console.log(a === b);         // false
```

This behaviour is actually quite helpful for testing where something could be `null` or `undefined`.

```javascript
let a = doSomething();

if (a == null) {
    // same as if (a === undefined || a === null)
}
```

### Loose/strict advice

In short, when testing for equality, remember that arrays coerce to strings and `true`, `false`, and empty strings coerce to numbers. In terms of choosing between strict `===` `!==` and loose `==` `!=` comparisons, consider this:

- If either value in a comparison could be a `true` or `false`, avoid `==` and use `===`.  
- Likewise, if either value in a comparison could be a `0`, `""`, or `[]`(empty array), avoid `==` and use `===`.  
- When comparing two objects `==` behaves the same as `===`
- When comparing with the result of the `typeof` operator, remember `typeof` will always return one of seven strings. As a result `===` is completely unnecessary here, just use `==`.  
- In all other cases, it's safe to use `==`.


## Comparison

```javascript
let a = 4.5;

console.log(a > 4.4);        // true
console.log(a < '4.6');      // true
console.log(a >= '4.5');     // true
console.log(a <= 4.5);       // true
console.log('4.5' < '4.6');  // true
```

Note the `< <= > >=` comparison operators are not strict. If you try to compare two strings, and they cannot be coerced to numbers, the comparison is made alphabetically. If one of the values is a number, then both values are coerced to numbers and a typical numeric comparison occurs. If one of the values cannot be made into a valid number it becomes `NaN` and all comparisons will be false because `NaN` is neither greater than or less than any other value.

```javascript
let a = 10;
let b = '15';
let c = 'apple';
let d = 'apples';

console.log(a < b);  // true
console.log(a < c);  // false
console.log(a > c);  // false
console.log(c < d);  // true
```


## Logical

```javascript
console.log(true && 1);      // 1
console.log(1 && false);     // false
console.log(true || 0);      // true
console.log(false || 0);     // 0
console.log(!true);          // false
```

Note that the `&&` and `||` operators aren't actually returning a boolean, they're returning either the first or second value. With `||`, if the first value is truthy, it will be returned otherwise the 2nd value will be returned whether it's true or not. With `&&` if the expression evaluates as `true`, the second value will be returned, otherwise the first false value is returned. This can be used to write some *short-circuiting* code demonstrated further down.

```javascript
let a = 0;
let b = null;
let c = 'hello';
let d = 'world';

console.log(c || d);  // 'hello' (first value returned because it's true)
console.log(a || d);  // 'world' (second value returned because the first is false)
console.log(a || b);  // null (second value returned because the first is false)

console.log(c && d);  // 'world' (second value returned because the expression is true)
console.log(c && a);  // 0 (first false value returned because the expression is false)
console.log(b && a);  // null (first false value returned because the expression is false)
```


## Conditional

The conditional (ternary) operator `?` is the only one that takes 3 operands. It says; if a condition is true, the operator is assigned the first value, otherwise the second value. For example:

```javascript
// condition ? value1 : value2

let status = (age >= 18) ? 'adult' : 'minor';
```

## '+' as a unary operator

In addition to addition and concatenation, `+` can be used as a *unary operator* to convert to a number. This is common when converting dates to an epoch timestamp number.

```javascript
let score = '200';
let date = new Date();

console.log(score, typeof score);    // 200 string
console.log(+score, typeof +score);  // 200 number
console.log(date, typeof date);      // 2020-10-20T01:41:09.140Z object
console.log(+date, typeof +date);    // 1603158069140 number
```

## Operator Precedence

See the [JavaScript Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) for a full list of opeator precedences.

Some takeaways:

- `&&` is evaluated before `||`
- `||` is evaluated before `? :`

```javascript
let a = 1;
let b = 2;
let c = 0;

let d = a && b || c;  // same as: let d = (a && b) || c
let e = c || a && b;  // same as: let d = c || (a && b)

console.log(d, e);    // 2 2
```


## False and Falsy

Note that the following values will evaluate to false when checked as a condition:

- **false** (Boolean)
- **0** (Number)
- **Empty strings** (String) such as `""` or `''`
- **null** (Object) which represent when there is no value at all
- **undefined** (Undefined) which represent when a declared variable lacks a value
- **NaN** (Number) short for *Not a Number*, it is the result of an operation that cannot produce normal result. `Nan` is nit equal to any other value, including itself.


## Shorthand (short-circuiting) with logical operators

The nature of these operators allow us to write some shorter code. For example:

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

Similarly we can use `&&` to test for a values existence before running a function:

```javascript
function foo() {
  console.log(a);
}

let a = 45;

a && foo(); // 45

// The same as saying:
if (a) {
    foo();
}
```

This concept is also referred to as short-circuit evaluation. Remember that logical operators are processed from left to right and processing will stop as soon as there is a result. Since we know that with the `||` operator, if the first condition is `true` then it doesn't need to check the rest, programmers will often put the code *most likely to return true first*. Similarly with the `&&` operator, to place anything likely to be `false` first.


## Keyword operators

There are a number of keyword operators in javascript which test/do various things for example:  
`if` - test whether the given expression is truthy  
`new` - turns a function call into a constructor call and creates an instance of the constructor.  
`instanceof` -  determines whether an object is an instance of another function (i.e. it tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object).  
`typeof` - determines the type of a given object. FYI there is a good example of the usefulness of this operator in the *undeclared vs undefined* section of [variables.md](variables.md#undeclared-vs-undefined).  
`delete` - deletes a property from an object.  
`in` - determines whether an object has a given property.  
`void` -discards an expression's return value.

## *ES2020* Nullish Coalescing Operator

> The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

[Source: MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

```javascript
let score = 0;
let pass = score ?? 60;

console.log(pass);
// 0
```

```javascript
let score;
let pass = score ?? 60;

console.log(pass);
// 60
```
