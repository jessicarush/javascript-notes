## Template literals (string interpolation)


In the ES6 version of JavaScript, we can insert, or interpolate, variables into strings using *template literals*.

Back ticks surrounding a string creates a *template literal*, and inside that we create a variable placeholder with `${...}`. For example:

```javascript
let myName = 'Jessica';

console.log(`Hello, my name is ${myName}.`);  // Hello, my name is Jessica.
```

One of the biggest benefits to using template literals is the readability of the code. Using template literals, you can more easily tell what the new string will be. You also don't have to worry about escaping double quotes or single quotes.

Note that when logging a variable, you can wrap the name in curly braces alone (no `$`) to
log the variable name along with the value. For example:

```javascript
let [r, g, b] = [120, 50, 72];

console.log({r}, {g}, {b});
// { r: 120 } { g: 50 } { b: 72 }
```

You can do any expressions you want inside teh curly braces, for example:

```javascript
let tax_rate = 0.5;
let amount = 9.99;

console.log(`Your total is: $${(amount + (amount * tax_rate)).toFixed(2)}`);
// Your total is: $14.98
```

Lastly, if you need to use a backtick `\`` in you string, just escape is with `\\`:

```javascript
`\`` === '`' // --> true
```

