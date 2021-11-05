# Async/Await

The `async` and `await` keywords were added in ES2017 (ES8). The `async` keyword can be declared on any function to have that function return a promise (see [promises.md](https://github.com/jessicarush/javascript-notes/blob/master/promises.md)).

...

It's common to combine the terms 'async' and 'parallel', but they are actually different. Async refers to the gap between code that will execute now and later. Parallel is about things being able to execute simultaneously on separate processor threads. It is not possible to run things in parallel with single-core CPU

Concurrency is when two or more chains of events interleave over time, such that from a high-level perspective, they appear to be running simultaneously (even though at any given moment only one event is being processed). For example, it is possible to achieve concurrency with a single-core CPU. The computations take turns in execution: The CPU might run few instructions from one thread, then suspend it and switch over to a second and run a few steps from it and so on.

## Table of Contents

<!-- toc -->

- [Async](#async)
- [Await](#await)
- [Multiple awaits](#multiple-awaits)

<!-- tocstop -->

## Async

Any function can be converted to an async function that returns a promise. First, a normal function:

```javascript
function testFunc() {
  return 'Hello async';
}

let test = testFunc();

console.log(test, typeof test)
// Hello async string
```

with async:

```javascript
async function testFunc() {
  return 'Hello async';
}

let test = testFunc();

console.log(test, typeof test)
// Promise { 'Hello async' } object
```

We can use `then` on the result:

```javascript

async function testFunc() {
  return 'Hello async';
}

let test = testFunc();

test.then(msg => console.log(msg));
// Hello async
```

rejected:

```javascript
async function testFunc() {
  throw new Error('test fail');
  return 'Hello async';
}

let test = testFunc();

test.then(msg => console.log(msg)).catch(err => console.log(err));
// Error: test fail
// ...
```

## Await

The `await` expression causes an `async` function execution to pause until a Promise is settled (fulfilled or rejected), and to resume execution after fulfillment. When resumed, the value of the await expression is that of the fulfilled Promise. If the Promise is rejected, the await expression throws the rejected value. If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.

The `await` keyword may only be used in `async` functions.

```javascript
function resolveLater(seconds, value) {
  return new Promise(fulfill => {
    setTimeout(() => {
      fulfill(value);
    }, seconds * 1000);
  });
}

async function testFunc() {
  let result = await resolveLater(3, 'hello async');
  console.log(result);
}

let test = testFunc();
// hello async
// [Finished in 3.83s]
```

You can use `try` and `catch` to handle errors in async functions.

```javascript
function resolveLater(seconds, value) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      // fulfill(value);
      reject('resolveLater failed');
    }, seconds * 1000);
  });
}

async function testFunc() {
  try {
    let result = await resolveLater(3, 'hello async');
    console.log(result);
  } catch (err) {
    console.log(`something went wrong: ${err}`);
  }
}

let test = testFunc();
//something went wrong: resolveLater failed
```

## Multiple awaits

If you have more than one await in an async function, keep in mind that subsequent await statements won't get to start until the previous one has finished. If the operations take along time (such as with ajax/axios requests), this can add up:

```javascript
function resolveLater(seconds, value) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      fulfill(value);
    }, seconds * 1000);
  });
}


async function testFunc() {
  try {
    let result1 = await resolveLater(3, 'one');
    let result2 = await resolveLater(3, 'two');
    let result3 = await resolveLater(3, 'three');

    console.log(result1);
    console.log(result2);
    console.log(result3);
  } catch (err) {
    console.log(`something went wrong: ${err}`);
  }
}

let test = testFunc();
// one
// two
// three
// [Finished in 10.373s] <------- !!!

```

To avoid this, use `Promise.all()` method which takes an array of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. For example:

```javascript
function resolveLater(seconds, value) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      fulfill(value);
    }, seconds * 1000);
  });
}


async function testFunc() {
  try {
    let results = await Promise.all([
      resolveLater(3, 'one'),
      resolveLater(3, 'two'),
      resolveLater(3, 'three')
    ]);
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  } catch (err) {
    console.log(`something went wrong: ${err}`);
  }
}

let test = testFunc();
// one
// two
// three
// [Finished in 3.666s] <------- better!
```
