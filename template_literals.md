## Template literals (string interpolation)


In the ES6 version of JavaScript, we can insert, or interpolate, variables into strings using *template literals*.

Back ticks ``` surrounding a string creates a *template literal*, and inside that we create a variable placeholder with `${...}`. For example:

```javascript
let myName = 'Jessica';

console.log(`Hello, my name is ${myName}.`);  // Hello, my name is Jessica.

```

One of the biggest benefits to using template literals is the readability of the code. Using template literals, you can more easily tell what the new string will be. You also don't have to worry about escaping double quotes or single quotes.
