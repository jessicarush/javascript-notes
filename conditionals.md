# Conditionals

Any series of statements in JavaScript can be grouped together into a *block* using the curly braces `{...}`. When working with conditionals or loops, we'll have to move our statements into blocks. Note that you don't need a semicolon after a block `{...}`

## if

The simplest form of an `if` conditional statement:

```javascript
let flag = true;

if (flag) {
  console.log('Do some work.');
}
```


## if...else statements

```javascript
const LEGAL_AGE = 19;  
const RETIREMENT_AGE = 65;
var age = prompt('Enter your age:');

if (age < LEGAL_AGE) {
  console.log('Young enough to dream!');
}
else if (age > RETIREMENT_AGE) {
  console.log('Old enough to relax!');
}
else {
  console.log('Get back to work!');
}
```


## switch statements

This `if...else if...else` structure works but there's another option using `switch` that reduces the amount of code required to specify the condition **if you are comparing against single values** (in other words, `switch` does not work with `<, >`):

```javascript
var day = prompt('What day of the week?').toLowerCase();

switch (day) {
  case 'saturday':
  case 'sunday':
    console.log('Relax');
    break;
  case 'wednesday':
    console.log('Water plants');
    break;
  default:
    console.log('Get back to work!');
}
```

The `switch` statement is often used together with a `break` or a `default` keyword (or both). These are both optional:
The `break` keyword breaks out of the switch block. This will stop the execution of code and/or case testing inside the block. If `break` is omitted, the next code block in the switch statement is executed. That being said, if you are returning something, you don't need a `break`. The `default` keyword specifies some code to run if there is no case match. There can only be one `default` keyword in a switch. Although this is optional, it is recommended that you use it, as it takes care of unexpected cases.

```javascript
function getRandom() {
  const num = Math.floor(Math.random() * 3);
  switch (num) {
    case 0:
      // no break required because we are using return
      return 'rock';
    case 1:
      return 'paper';
    default:
      return 'scissors';
  }
}
```


## conditional operator

Also called the *ternary operator*, this is like a condensed form of a single `if...else` statement. For example:

```javascript
var a = 50;

// if...else statement:
if (a > 25) {
  b = 'hello';
}
else {
  b = 'world';
}

// same as conditional operator:
var b = (a > 25) ? 'hello' :  'world';
```

Note the conditional operator doesn't have to be used in an assignment, but it's definitely the most common usage.
