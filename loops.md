# Loops


A loop includes a test condition as well as a block `{...}`. Each time a loop block executes it's called an iteration. The block will repeat until the condition no longer evaluates as true. There are different forms of loops: `for` loops, `while` loops and `do...while` loops.


## Table of Contents

<!-- toc -->

- [while](#while)
- [do...while](#dowhile)
- [for](#for)
- [for...of](#forof)
- [for...in](#forin)
- [Loops and closure](#loops-and-closure)
- [Getting creative with the loop condition](#getting-creative-with-the-loop-condition)

<!-- tocstop -->

## while

while (condition) { code }

```javascript
let countdown = 5;

while (countdown > 0) {
  console.log('Count...' + countdown);
  countdown -= 1;
}
// Count...5
// Count...4
// Count...3
// Count...2
// Count...1
```


## do...while

do { code } while (condition)

```javascript
let countdown = 5;

do {
  console.log('Count...' + countdown);
  countdown -= 1;
} while (countdown > 0);  // note you need a semicolon here
// Count...5
// Count...4
// Count...3
// Count...2
// Count...1
```

The only practical difference between these two is whether the conditional is tested before or after the first iteration. In the example above, if the countdown started at 0, the `while` loop would print nothing but the `do...while` loop would print once.


## for

JavaScript also has a `for` loop. These loops take three clauses:

1. an initialization clause such as `let i = 0`
2. a conditional clause such as `i <= 5`
3. an update clause such as `i++` (not necessarily an increment or decrement...)

Put together, it looks like this:
```javascript
for (let i = 0; i <= 5; i++) {
  console.log('Count...' + i);
}
// Count...0
// Count...1
// Count...2
// Count...3
```

To iterate over an array, you would have to use the length parameter and index positions.

```javascript
const stupid = ['I', 'miss', 'Python'];

for (let i = 0; i < stupid.length; i++){
  console.log(stupid[i]);
}
```

If you're writing nested loops, be sure to use different variable names, for example, `i` and `j`:

```javascript  
const ricksFollowers = ['summer', 'bob', 'mary', 'bill'];
const mortysFollowers = ['summer', 'phil', 'susan'];
const mutualFollowers = [];

for (let i = 0; i < ricksFollowers.length; i++) {
  for (let j = 0; j < mortysFollowers.length; j++) {
    if (ricksFollowers[i] === mortysFollowers[j]) {
      mutualFollowers.push(ricksFollowers[i]);
    }
  }
}

console.log(mutualFollowers);  // [ 'summer' ]
```

You can use the `break` keyword to get out of a `for` loop early if some condition is met.

```javascript
const choices = ['apple', 'toast', 'cheese', 'cake', 'salad'];

for (let i = 0; i < choices.length; i++) {
  console.log(choices[i]);
  if (choices[i] === 'cheese') {
    break;
  }
}
// apple
// toast
// cheese
```

By using the `break` keyword, you can actually omit the the conditional clause in some cases. For example, the following loop will stop when it reaches the first number that is greater than 100 and divisible by 7:

```Javascript
for (let num = 100; ; num++) {
  if (num % 7 === 0) {
    console.log(num);  // 105
    break;
  }
}
```

The `continue` keyword skips past an iteration and moves onto the next, for example:

```javascript
let things = ['Sam', 345, null, 'Jane', true, 'Jim'];

for (let i = 0; i < things.length; i++) {
  if (typeof things[i] !== 'string') {
    continue;
  }
  console.log(things[i]);
}
// Sam
// Jane
// Jim
```


## for...of

Iterates over iterable objects (including arrays, array-like objects, strings, iterators and generators), invoking a custom iteration hook with statements to be executed for the value of each distinct property.

```javascript
// for (variable of iterable) {
//   statement
// }

const myArray = ['yes', 'no', 'yes', 'yes', 'maybe'];

let counter = 0;
for (let item of myArray) {
  if (item === 'yes') {
    counter++;
  }
}

console.log(counter); // 3
```


## for...in

`for...in` will execute a given block of code for each property in an object, in arbitrary order. You will need to use bracket notation instead if dot notation to access properties because dot notation expects the property name to be an objects actual/literal property name at the time the program was evaluated whereas bracket notation allows you to pass a variable.

```javascript
const obj = {first: 'jessica', last: 'rush', sign: 'scorpio'};

for (let property in obj) {
  console.log(obj[property]);
}
// jessica
// rush
// scorpio

for (let property in obj) {
  console.log(obj.property);
}
// undefined
// undefined
// undefined
```

When you want to access properties in nested objects, you have to explicitly list the path, for example:

```javascript
let spaceship = {
    crew: {
        captain: {
            name: 'Maeve',
            degree: 'Computer Engineering',
        },
        'chief officer': {
            name: 'Dan',
            degree: 'Aerospace Engineering',
        },
        medic: {
            name: 'Clementine',
            degree: 'Physics',
        },
    }
};

for (let person in spaceship.crew) {
  console.log(`${person}: ${person.name}`);  // no
}
// captain: undefined
// chief officer: undefined
// medic: undefined

for (let person in spaceship.crew) {
  console.log(`${person}: ${[person].name}`);  // no
}
// captain: undefined
// chief officer: undefined
// medic: undefined

for (let person in spaceship.crew) {
  console.log(`${person}: ${spaceship.crew[person].name}`);  // yes
}
// captain: Maeve
// chief officer: Dan
// medic: Clementine
```


## Loops and closure

For *closure* see first: [functions.md](functions.md)

Consider the following examples. They only difference is `var` is used in the first loop and `let` is used in the other:

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
// 6
// 6
// 6
// 6
// 6
```

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
// 1
// 2
// 3
// 4
// 5
```

In the first example, the terminating condition of the for loop is when `i = 6`. The output is reflecting the final value of `i` after the loop terminates. The timeout function callbacks are all running well after the completion of the for loop.

In the second example, the `let` keyword specifically declares a new variable for each iteration and that is scoped to that block. It essentially turns a block into a scope that we can have closure over. At each iteration it will be initialized with the value from the previous iteration.


## Getting creative with the loop condition

This will probably take some time to absorb, but the typical loop condition (which is usually a counter) *doesn't need to just be a counter*. For example:

```javascript
for (let line = "#"; line.length < 6; line += "#")
  console.log(line);
// #
// ##
// ###
// ####
// #####


// FYI Link lists are some weird C thing.

function arrayToLinkList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

let test1 = arrayToLinkList([1, 2, 3]);
console.log(test1);
// { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }


function linkListToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

let test2 = linkListToArray(test1);
console.log(test2);
// [ 1, 2, 3 ]
```
