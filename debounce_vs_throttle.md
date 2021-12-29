# Debounce and Throttle

Debounce and throttle are both used to control how often a function or code is executed but are slightly different. These techniques are used for performance optimization and rate-limiting of certain function calls.


## Table of Contents

<!-- toc -->


## Debounce

Debounce is when, no matter how many times a user fires the event, the attached function will be executed only after there is *no input change for the delay/timeout period*.

Use cases include:

- search input - often user input will be used to search a database or 3rd party API, this will help prevent spamming those APIs
- text field auto-saves - similar to above
- eliminating double button clicks
- resize/scroll/mousemove listeners - it would be more performant to limit the frequency of execution on these events

### Debounce example

```javascript
const debounce = (func, delay) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, arguments), delay);
  };
};

function handleInput() {
  callbackfn();
}

function outputText() {
  console.count('executed!');
}

let callbackfn = debounce(outputText, 1000);
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

### Libraries with debounce

Lodash `_.debounce(callback, timeout)`
Underscore `_.debounce(callback, timeout)`


## Throttle

Throttling is when, no matter how many times a user fires the event, the attached function will be executed *only once in a given time period/interval*.

Use cases include:

- games - imagine a shooting game  where a weapon shoots at most 1 bullet a second. The user might spam the button, but it will still only fire every 1s.
- event listeners  - if you want to do a consistent action on resize, scroll, mousemove or other similar events
- limiting button clicks
- limiting API calls

### Throttle example

```javascript
const throttle = (func, delay) => {
  let toThrottle = false;
  return function () {
    if (!toThrottle) {
      toThrottle = true;
      func.apply(this, arguments);
      setTimeout(() => {toThrottle = false}, delay);
    }
  };
};

function handleInput() {
  callbackfn();
}

function outputText() {
  console.count('executed!');
}

let callbackfn = throttle(outputText, 1000);
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

### Libraries with throttle

TODO