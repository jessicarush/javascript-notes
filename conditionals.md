# Conditionals


Any series of statements in JavaScript can be grouped together into a *block* using the curly braces `{...}`. When working with conditionals or loops, we'll have to move our statements into blocks. Note that you don't need a semicolon after a block `{...}`


## Table of Contents

<!-- toc -->

- [if](#if)
- [if...else statements](#ifelse-statements)
- [switch statements](#switch-statements)
  * [Returning values in switch statements](#returning-values-in-switch-statements)
- [conditional operator](#conditional-operator)

<!-- tocstop -->

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
const legal_age = 19;  
const retire_age = 65;
let age = prompt('Enter your age:');

if (age < legal_age) {
  console.log('Young enough to dream!');
}
else if (age > retire_age) {
  console.log('Old enough to relax!');
}
else {
  console.log('Get back to work!');
}
```

Technically speaking, if your condition holds only a single statement, you can omit the `{}` braces. That being said, most programmers use them anyways to avoid having to think about whether they are needed.

```javascript
const legal_age = 19;
const retire_age = 65;
let age = prompt('Enter your age:');

if (age < legal_age) console.log('Young enough to dream!');
else if (age > retire_age) console.log('Old enough to relax!');
else console.log('Get back to work!');
```


## switch statements

This `if...else if...else` structure works but there's another option using `switch` that reduces the amount of code required to specify the condition **if you are comparing against single values** (in other words, `switch` does not work with `<, >`):

```javascript
let day = prompt('What day of the week?').toLowerCase();

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
    break;
}
```

The `switch` block usually includes the `break` and `default` keywords. These are both optional bur very much recommended. The `break` keyword breaks out of the switch block. This will stop the execution of code and/or case testing inside the block and continue on to the rest of the code. If `break` is omitted, the next code block in the switch statement is executed. The `default` keyword specifies some code to run if there is no case match. There can only be one `default` keyword in a switch. Although this is optional, it is recommended that you use it, as it takes care of unexpected cases. In this last `default` section, you technically don't need to `break` but many programmers add it anyways for consistency and because other languages require it.

### Returning values in switch statements

Note that if you want to `return` something from your switch block, there's a couple things to consider.

First off, if you are using the `return` keyword in your cases, you wouldn't need a `break` as well. In the function example below, each case returns a value. Placing breaks after the return would be pointless because once something is returned, we exit the function. In other words, if we use multiple returns like this, any code that follows the switch block (inside the function) will never run.

```javascript
function badSwitch() {
  const i = Math.floor(Math.random() * 3);
  switch (i) {
    case 0:
      return 'rock';
      /* Using breaks here would be pointless.
      In general, this is bad practice anyways.
      Our last line of code will never run and,
      debugging will be more difficult. */
    case 1:
      return 'paper';
    default:
      return 'scissors';
  }
  console.log('This will never run.');
}

console.log(badSwitch());
```

Even if you have no intention of running additional code after the block **putting multiple returns in a `switch` statement like this is not ideal** because it increases your *[cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)*. Basically, this means that debugging can become much more difficult. A better approach would be to use breaks and return once at the end:

```javascript
function goodSwitch() {
  const i = Math.floor(Math.random() * 3);
  let item;
  switch (i) {
    case 0:
      item = 'rock';
      break;
    case 1:
      item = 'paper';
      break;
    default:
      item = 'scissors';
      break;
  }
  console.log('Item is assigned, time to return it.');
  return item;
}

console.log(goodSwitch());
```

Technically speaking, the downside of using breaks and returning at the end is you are ever-so-slightly reducing performance in terms of the extra step, but this is by far the better trade-off.


## conditional operator

Also called the *ternary operator*, this is like a condensed form of a single `if...else` statement. For example:

```javascript
let a = 50;

// if...else statement:
if (a > 25) {
  b = 'hello';
}
else {
  b = 'world';
}

// same as conditional operator:
let b = (a > 25) ? 'hello' :  'world';
```

Note the conditional operator doesn't have to be used in an assignment, but it's definitely the most common usage.
