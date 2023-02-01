# Debounce and Throttle

Debounce and throttle are both used to control how often a function or code is executed but are slightly different. These techniques are used for performance optimization and rate-limiting of certain function calls.


## Table of Contents

<!-- toc -->

- [Debounce](#debounce)
  * [Debounce example](#debounce-example)
  * [Debounce function](#debounce-function)
- [Throttle](#throttle)
  * [Throttle example](#throttle-example)
  * [Throttle function](#throttle-function)

<!-- tocstop -->

## Debounce

Debounce is when, no matter how many times a user fires the event, the attached function will be executed only after there is *no input change for the delay/timeout period*.

Use cases include:

- search input - often user input will be used to search a database or 3rd party API, this will help prevent spamming those APIs
- text field auto-saves - similar to above
- eliminating double button clicks
- resize/scroll/mousemove listeners - it would be more performant to limit the frequency of execution on these events

### Debounce example

```javascript
const debounceTest = (func, wait) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
};

const handleInput = debounceTest((e) => {
  console.count('debounced!');
  doSomething(e);
}, 1000);

function doSomething(e) {
  console.count('function executed!');
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

### Debounce function

This debounce function could be used in production.

```javascript
/**
 * Debounce a given function, by a given delay.
 *
 * Returns a function that, as long as it continues to be invoked, will not
 * be executed. The function will be executed after it stops being called for
 * N milliseconds.
 * @param {function} func The function to be debounced
 * @param {number} wait The debounce delay in milliseconds
 * @returns {function}
 */
const debounce = (func, wait) => {
  let timeout = null;
  return (...args) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
};

const handleInput = debounce((e) => {
  // Do your taxing stuff here
  console.count('debounce execution!');
}, 1000);

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

An alernate version thatincludes an immediate param:

```javascript
/**
 * Debounce a given function, by a given delay.
 *
 * Returns a function that, as long as it continues to be invoked, will not
 * be executed. The function will be executed after it stops being called for
 * N milliseconds. If 'immediate' is passed, trigger the function on the
 * leading edge instead of the trailing edge of the delay.
 *
 * @param {function} func The function to be debounced
 * @param {number} wait The debounce delay in milliseconds
 * @param {boolean} immediate If true, triggers the function before delay
 * @returns {function}
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const handleInput = debounce(function() {
  // Do your taxing stuff here
  console.count('debounce execution!');
}, 1000);

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

## Throttle

Throttling is when, no matter how many times a user fires the event, the attached function will be executed *only once in a given time period/interval*.

Use cases include:

- games - imagine a shooting game  where a weapon shoots at most 1 bullet a second. The user might spam the button, but it will still only fire every 1s.
- event listeners  - if you want to do a consistent action on resize, scroll, mousemove or other similar events
- limiting button clicks
- limiting API calls

### Throttle example

```javascript
const throttleTest = (func, interval) => {
  let toThrottle = false;
  return function () {
    if (!toThrottle) {
      toThrottle = true;
      func.apply(this, arguments);
      setTimeout(() => {toThrottle = false}, interval);
    }
  };
};

const handleInput = throttleTest((e) => {
  console.count('throttle!');
  doSomething(e);
}, 1000);

function doSomething(e) {
  console.count('function executed!');
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

### Throttle function

This throttle function could be used in production.

```javascript
/**
 * Throttle a given function, using a given interval.
 *
 * Returns a function that, no matter how often it is continuously invoked,
 * will only be executed every N milliseconds.
 * @param {function} func The function to be throttled
 * @param {number} interval The throttle interval in milliseconds
 * @returns {function}
 */
const throttle = (func, interval) => {
  let toThrottle = false;
  return (...args) => {
    if (!toThrottle) {
      toThrottle = true;
      func.apply(null, args);
      window.setTimeout(() => {
        toThrottle = false;
      }, interval);
    }
  };
};

const handleInput = throttle((e) => {
  // Do your taxing stuff here
  console.count('throttle execution!');
}, 1000);

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', handleInput);
```

