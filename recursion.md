# Recursion


A recursive function is a function that calls itself.

## Table of Contents

<!-- toc -->

- [Factorial example](#factorial-example)
- [Color fade example](#color-fade-example)
- [Fibonacci example](#fibonacci-example)

<!-- tocstop -->

## Factorial example

Here's an example function that determines a numbers factorial using recursion:

```javascript
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120
```

...and a variation that does the same thing:

```javascript
function factorial(n, i) {
  i = i || 1;
  if (n < 2) {
    return i;
  }
  return factorial(n - 1, n * i);
}


console.log(factorial(5));  // 120
```


## Color fade example

Here's another example of recursion. This is also a good demonstration of closure in that the inner function always remembers the value of `level`:

```javascript
// A function that sets A DOM node's background color to yellow then fades to white.

const fade = function (node) {
  let level = 1;
  const step = function () {
    let hex = level.toString(16);
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

let el = document.querySelector('.js-fade');

fade(el);
```


## Fibonacci example

```javascript
function fibonacci(n) {
  if (n === 1) {
    return [0, 1];
  } else {
    let s = fibonacci(n - 1);
    s.push(s[s.length - 2] + s[s.length - 1]);
    return s;
  }
}

console.log(fibonacci(10));  // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]
```
