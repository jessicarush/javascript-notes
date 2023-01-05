# Web Interfaces

Web interfaces are the types of objects that are available when developing fot the Web. These are just a few. For the full list see: <https://developer.mozilla.org/en-US/docs/Web/API#interfaces>

## Table of Contents

<!-- toc -->

- [Window](#window)
- [fetch()](#fetch)
- [setInterval()](#setinterval)
- [setTimeout()](#settimeout)
- [clearInterval()](#clearinterval)
- [clearTimeout()](#cleartimeout)

<!-- tocstop -->

## Window

> The Window interface represents a window containing a DOM document; the document property points to the DOM document loaded in that window.

> The Window interface is home to a variety of functions, namespaces, objects, and constructors which are not necessarily directly associated with the concept of a user interface window. However, the Window interface is a suitable place to include these items that need to be globally available. Many of these are documented in the [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) and the [DOM Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).


## fetch()

See: [requests.md](requests.md)


## setInterval()

The setInterval() method, offered on the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) and [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) interfaces, repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.

`scope.setInterval(func, delay, [arg1, arg2, ...]);`

```javascript
// logs a random number to the console every 1000ms
setInterval(() => {
  let randomNum = Math.floor(Math.random() * 100);
  console.log(randomNum);
}, 1000);

```

## setTimeout()

The setTimeout() method, offered on the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window) and [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) interfaces, sets a timer which executes a function or specified piece of code once the timer expires.

`scope.setTimeout(func[, delay, arg1, arg2, ...]);`

```javascript
// logs a random number to the console after 5 seconds
setTimeout(() => {
  let randomNum = Math.floor(Math.random() * 100);
  console.log(randomNum);
}, 5000);
```

## clearInterval()

Todo...

## clearTimeout()

Todo...
