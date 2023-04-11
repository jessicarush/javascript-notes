# Promises

In the simplest terms, a Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Another way to put it, is a promise represents a future value. Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.

Promises can also be thought of as a flow-control mechanism, a this-then-that for two or more steps in an asynchronous task.

Once a promise is *resolved*, it becomes an *immutable* value. This makes it safe to pass around to any party and know that it cannot be modified accidentally or maliciously. This means that you can have multiple tasks happily observing the result of a single promise (think splitting/forking tasks).


## Table of Contents

<!-- toc -->

- [Terminology](#terminology)
- [Example](#example)
- [Chaining after a catch](#chaining-after-a-catch)
- [The promise constructor](#the-promise-constructor)
- [Recognizing a promise](#recognizing-a-promise)
- [Promise timeout pattern](#promise-timeout-pattern)
- [Promise.all()](#promiseall)
- [See also](#see-also)

<!-- tocstop -->

## Terminology

Promises have three possible states:

- *pending* - the promise hasn't been fulfilled or rejected yet
- *fulfilled* - the action relating to the promise succeeded
- *rejected* - the action relating to the promise failed

If a promise is either fulfilled or rejected, it is considered to be *settled* or *resolved*.


## Example

Imagine a function, `createFileAsync()`, which asynchronously generates a file given a configuration and two callback functions, one called if the file is successfully created, and the other called if an error occurs.

```javascript
function successCallback(result) {
  console.log("file ready at: " + result);
}

function failureCallback(error) {
  console.error("Error generating file: " + error);
}

createFileAsync(fileSettings, successCallback, failureCallback);
```

If `createFileAsync()` were rewritten to return a promise, you would attach your callbacks to like so:

```javascript
createFileAsync(fileSettings).then(successCallback, failureCallback);
```

Unlike old-fashioned passed-in callbacks, a promise comes with some guarantees:

- Callbacks added with `then()` will never be invoked before the completion of the current run of the JavaScript event loop.
- These callbacks will be invoked even if they were added after the success or failure of the asynchronous operation that the promise represents.
- Multiple callbacks may be added by calling then() several times. They will be invoked one after another, in the order in which they were inserted.

One of the great things about using promises is chaining. This allows us to execute two or more asynchronous operations back to back, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. Each promise represents the completion of another asynchronous step in the chain.

For example, an old callback pyramid:

```javascript
doFirst(function(firstResult) {
  doSecond(firstResult, function(secondResult) {
    doThird(secondResult, function(finalResult) {
      console.log(`The final result: ${finalResult}`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

With modern functions, we attach our callbacks to the returned promises instead, forming a promise chain:

```javascript
doFirst() // must return a promise
.then(function(firstResult) {
  return doSecond(firstResult);
})
.then(function(secondResult) {
  return doThird(secondResult);
})
.then(function(finalResult) {
  console.log(`The final result: ${finalResult}`);
})
.catch(failureCallback);
```

The arguments to `then` are optional, and `catch(failureCallback)` is short for `then(null, failureCallback)`. You might see this expressed with arrow functions instead:

```javascript
doFirst()  // must return a promise
.then(firstResult => doSecond(firstResult))
.then(secondResult => doThird(secondResult))
.then(finalResult => {
    console.log(`Got final result: ${finalResult}`);
})
.catch(failureCallback);
```

Important: Always return results, otherwise callbacks won't catch the result of a previous promise (with arrow functions `() => x` is short for `() => { return x; }`).

The above fleshed out:

```javascript
function doFirst() {
  return new Promise((fulfill, reject) => {
    console.log('running first');
    fulfill();
    // reject();
  });
}

function doSecond() {
  console.log('running second');
  return 'second';
}

function doThird() {
  console.log('running third');
  return 'third';
}

function failureCallback() {
  console.log('running failure handler');
  return 'failure handler';
}


doFirst()
.then(firstResult => doSecond(firstResult))
.then(secondResult => doThird(secondResult))
.then(finalResult => {
    console.log(`Got final result: ${finalResult}`);
})
.catch(failureCallback);
// running first
// running second
// running third
// Got final result: third
// [Finished in 0.706s]
```

## Chaining after a catch

It's possible to chain after a failure, i.e. a catch, which is useful to accomplish new actions even after an action failed in the chain. Using the example from above:

```javascript
function doFirst() {
  return new Promise((fulfill, reject) => {
    console.log('running first');
    // fulfill();
    reject();
  });
}

function doSecond() {
  console.log('running second');
  return 'second';
}

function doThird() {
  console.log('running third');
  return 'third';
}

function failureCallback() {
  console.log('running failure handler');
  return 'failure handler';
}


doFirst()
.then(firstResult => doSecond(firstResult))
.then(secondResult => doThird(secondResult))
.then(finalResult => {
  console.log(`Got final result: ${finalResult}`);
})
.catch(failureCallback)
.then(() => {
  console.log('This will run no matter what.');
});
// running first
// running failure handler
// This will run no matter what.
// [Finished in 0.735s]
```

Another way to fake an error:

```javascript
function doFirst() {
  return new Promise((fulfill, reject) => {
    console.log('running first');
    fulfill();
    // reject();
  });
}

function doSecond() {
  console.log('running second');
  // return 'second';
  throw new Error('Something failed');
}

function doThird() {
  console.log('running third');
  return 'third';
}

function failureCallback() {
  console.log('running failure handler');
  return 'failure handler';
}


doFirst()
.then(firstResult => doSecond(firstResult))
.then(secondResult => doThird(secondResult))
.then(finalResult => {
  console.log(`Got final result: ${finalResult}`);
})
.catch(failureCallback)
.then(() => {
  console.log('This will run no matter what.');
});
// running first
// running second
// running failure handler
// This will run no matter what.
// [Finished in 0.664s]
```







## The promise constructor

the promise constructor takes one argument, a callback with two parameters, fulfill and reject. It's customary, but not, required, to reject with an Error object. The benefit of using an Error object is that they capture a stack trace, making debugging tools more helpful.

```javascript
let condition = true;

const promise = new Promise(function(fulfill, reject) {
  // do something, then..
  if (condition /* success condition */) {
    fulfill('Success!');
  } else {
    reject(Error('Something Failed.'));
  }
});
```

The pattern `new Promise(function(...) {...});` is generally called the *revealing constructor*. The function passed in is executed immediately. It's two parameters, fulfill and reject, are the *resolution* functions for the promise.

In the previous examples, we created the promise with a function (the function returns the promise). In this example we're assigning a promise object to a variable. The only difference is that when we use the promise, we don't add the function call parenthesis:

```javascript
promise.then(function(result) {
  console.log(result); // Success!
}, function(error) {
  console.log(error);  // Something Failed.
});
```

could also be written as:

```javascript
function successCallback(result) {
  console.log(result);
}

function failureCallback(error) {
  console.log(error);
}

promise.then(result => successCallback(result)).catch(failureCallback);
```

As mentioned earlier, `then` takes two optional callbacks, one for the success case and one for the failure case. `catch` can be used instead for the failure case for all `then`s in the chain.

Note that if you call `then()` on a promise, and you only pass a fulfillment handler, an assumed rejection handler is added.

```javascript
const promise = new Promise(function(fulfill, reject) {
  reject('Failed!');
});

function successCallback(result) {
  console.log(result);
}

promise.then(result => successCallback(result));
// UnhandledPromiseRejectionWarning: Failed!

promise.then(function() {
  // Fulfilled function
}/* assumed rejection handler */);
// UnhandledPromiseRejectionWarning: Failed!
```


## Recognizing a promise

Sometimes you may want to check if an object is a Promise. You might think to use something like `p instanceof Promise`, however this isn't adequate for a couple of reasons:

- Promises coming from other browser windows (iframes, etc) will fail to be recognized as promises.
- Promise-like objects/values written by other libraries for older browser may not be ES6 Promises at all but still function as such.

As a result, it was decided that the best way to determine if something is a Promise (or behaves like a promise) is to check if it the object is *thenable*, that is it has a `then()` method. However, this too is flawed, as any object with a `then` method would pass as a promise. Bottom line, just beware that recognizing promises through duck-typing can be hazardous.


## Promise timeout pattern

Todo...


## Promise.all()

> The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason. [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

```javascript
Promise.all([promise1, promise2, promise3])
  .then(result) => {console.log(result)})
  .catch(error => console.log(`Error in promises: ${error}`))
```

More fleshed out:

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The first promise has resolved');
    resolve(10);
  }, 1 * 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The second promise has resolved');
    resolve(20);
  }, 2 * 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The third promise has resolved');
    resolve(30);
  }, 3 * 1000);
});

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    const total = results.reduce((p, c) => p + c);
    console.log(`Results: ${results}`);
    console.log(`Total: ${total}`);
  })
  .catch(error => console.log(`Error in promises: ${error}`));

// The first promise has resolved
// The second promise has resolved
// The third promise has resolved
// Results: 10,20,30
// Total: 60
```

## Promise.allSettled()

The `Promise.allSettled` method accepts an array of Promises and only resolves when all of them are settled – either resolved or rejected. The return is an array of objects where each object describes the outcome of input promises. By comparison, `promise.all` rejects with the first rejection of any of the promises given as input. 

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The first promise has resolved');
    resolve(10);
  }, 1 * 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The second promise is rejected');
    reject('nope');
  }, 2 * 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('The third promise has resolved');
    resolve(30);
  }, 3 * 1000);
});

Promise.allSettled([promise1, promise2, promise3]).then((data) => {
    console.log(data);
});
// The first promise has resolved
// The second promise is rejected
// The third promise has resolved
// (3) [{...}, {...}, {...}]
// 0: {status: 'fulfilled', value: 10}
// 1: {status: 'rejected', reason: 'nope'}
// 2: {status: 'fulfilled', value: 30}
// length: 3
// [[Prototype]]: Array(0)
```


## See also 

[async_await.md](async_await.md)
