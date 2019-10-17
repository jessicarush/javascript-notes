# Web APIs

<https://developer.mozilla.org/en-US/docs/Web/API>

## Table of Contents

<!-- toc -->

- [setInterval()](#setinterval)

<!-- tocstop -->

## setInterval()

The setInterval() method, offered on the [Window and Worker interfaces](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope), repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.

`scope.setInterval(func, delay, [arg1, arg2, ...]);`

```javascript
// logs a random number to the console every 1000ms
setInterval(() => {
  let randomNum = Math.floor(Math.random() * 100);
  console.log(randomNum);
}, 1000);

```

## setTimeout()

The setTimeout() method, offered on the [Window and Worker interfaces](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope), sets a timer which executes a function or specified piece of code once the timer expires.

`scope.setTimeout(func[, delay, arg1, arg2, ...]);`

```javascript
// logs a random number to the console after 5 seconds
setTimeout(() => {
  let randomNum = Math.floor(Math.random() * 100);
  console.log(randomNum);
}, 5000);
```
