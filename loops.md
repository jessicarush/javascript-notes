# Loops

A loop includes a test condition as well as a block `{...}`. Each time a loop block executes it's called an iteration. The block will repeat until the condition no longer evaluates as true. There are different forms of loops: `for` lops, `while` loops and `do...while` loops.


## while

while (condition) { code }

```javascript
let countdown = 5;

while (countdown > 0) {
  console.log('Count...' + countdown);
  countdown -= 1;
}
```

## do...while

do { code } while (condition)

```javascript
let countdown = 5;

do {
  console.log('Count...' + countdown);
  countdown -= 1;
} while (countdown > 0);
```

The only practical difference between these two is whether the conditional is tested before or after the first iteration. In the example above, if the countdown started at 0, the `while` loop would print nothing but the `do...while` loop would print once.

## for

JavaScript also has a `for` loop. These loops take three clauses:

1. an initialization clause such as `let i = 0`
2. a conditional clause such as `i <= 5`
3. an update clause such as `i++`

Put together, it looks like this:
```javascript
for (let i = 0; i <= 5; i++) {
  console.log('Count...' + i);
}
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
for (let num = 100; ; num = num++) {
  if (num % 7 === 0) {
    console.log(num);
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

One weird thing is that when you want to access properties in nested objects, you have to explicitly list the path, for example:

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
  console.log(`${person}: ${person.name}`);
}
// captain: undefined
// chief officer: undefined
// medic: undefined

for (let person in spaceship.crew) {
  console.log(`${person}: ${[person].name}`);
}
// captain: undefined
// chief officer: undefined
// medic: undefined

for (let person in spaceship.crew) {
  console.log(`${person}: ${spaceship.crew[person].name}`);
}
// captain: Maeve
// chief officer: Dan
// medic: Clementine
```
