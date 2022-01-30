# Requests

## Table of Contents

<!-- toc -->

- [Introduction](#introduction)
- [First, the Event Loop](#first-the-event-loop)
- [XMLHttpRequest](#xmlhttprequest)
  * [XMLHttpRequest GET](#xmlhttprequest-get)
  * [XMLHttpRequest POST](#xmlhttprequest-post)
- [Fetch API (ES6 requests with promises)](#fetch-api-es6-requests-with-promises)
  * [GET with fetch()](#get-with-fetch)
  * [POST with fetch()](#post-with-fetch)
- [async/await fetch (ES8)](#asyncawait-fetch-es8)
  * [GET with async/await fetch()](#get-with-asyncawait-fetch)
  * [POST with async/await fetch()](#post-with-asyncawait-fetch)
- [Headers Object](#headers-object)
- [Request Object](#request-object)
- [Response Object](#response-object)
- [Summary](#summary)

<!-- tocstop -->

## Introduction

There are many ways to handle asynchronous communication with a server. Traditionally this was done using the `XMLHttpRequest` object. The XMLHttpRequest API is the core of Ajax.

`Fetch` is the newer standard API for handling network requests. It is similar to `XMLHttpRequest` and a bit like the definition of Ajax but it is built on the `Promise` object. The Fetch API simplifies code for asynchronous requests and handles responses better than the older `XMLHttpRequest`. Since it's built with promises, fetch can also be used in conjunction with async/await, which allows us to simplify code even further.


## First, the Event Loop

JavaScript is an asynchronous language. It uses an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) to handle asynchronous function calls. When a program is run, function calls are made and added to a stack. The functions that make requests that need to wait for servers to respond get sent to a separate queue. Once the stack has cleared, then the functions in the queue are executed one at a time.

To get a glimpse of how the event loop works the following example uses ``setTimeout()``, which will pass a function call to the queue. The first argument is a callback and the second argument is the number of milliseconds the program must wait before the callback can be run. The other ``console.log()`` calls are run from the stack.

```javascript
console.log('First');
setTimeout(() => {console.log('Last')}, 0);
console.log('Second');
// First
// Second
// Last
```

Web developers use the event loop to create a smoother browsing experience by deciding when to call functions and how to handle asynchronous events. One set of tools for this is AJAX *(Asynchronous JavaScript and XML)*. AJAX enables requests to be made after the initial page load.


## XMLHttpRequest

The `XMLHttpRequest` object is used to retrieve data from a server asynchronously. Despite it's name, it can fetch data not only in XML but also JSON, Html or plain text. All modern browsers have a built-in `XMLHttpRequest` object to request data from a server.

See also my notes in [ajax.md](ajax.md).

### XMLHttpRequest GET

The XMLHttpRequest (XHR) API, can be used to make many kinds of requests and supports other forms of data. Here's an example of boilerplate code for an AJAX request using an XHR object:

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://api-to-call.com/endpoint';

xhr.responseType = 'json';
xhr.onreadystatechange = () => {
  // checks to see of the request has finished
  if (xhr.readyState === XMLHttpRequest.DONE) {
    return xhr.response;
  }
};

xhr.open('GET', url);
xhr.send();
```

A query string contains additional information to be sent with a request. A query string is separated from the URL using a `?` character. After `?`, you can create a parameter which is a key/value pair joined by `=`. For example:

`https://api.datamuse.com/words?key=value`

If you want to add additional parameters, use the `&` character to separate key/value pairs:

`https://api.datamuse.com/words?key1=value1&key2=value2`


### XMLHttpRequest POST

The major difference between a GET request and POST request is that a POST request requires additional information to be sent through with the request. This additional information is sent in the body of the post request.

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://api-to-call.com/endpoint';
// converts data to a string:
const data = JSON.stringify({id: '200'});

xhr.responseType = 'json';
xhr.onreadystatechange = () => {
  // checks to see of the request has finished
  if (xhr.readyState === XMLHttpRequest.DONE) {
    return xhr.response;
  }
};

xhr.open('POST', url);
xhr.send(data);
```

In short, writing GET and POST requests with XHR objects and vanilla JavaScript requires constructing the XHR object using new, setting the responseType, creating a function that will handle the response object, and opening and sending the request.

Determining how to correctly write the actual requests and how to properly implement them requires carefully reading the documentation of the API with which you're working.


## Fetch API (ES6 requests with promises)

[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a newer native JavaScript API, supported by most modern browsers. Fetch allows you to make network requests similar to `XMLHttpRequest` but improves on the asynchronous part and is better at handling the response.

To make asynchronous event handling easier, [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) were introduced in JavaScript in ES6. A promise is a JavaScript object that handles asynchronous data. They represent data that will eventually be returned from a request. A promise has three states:

- *pending:* when a promise is created or waiting for data.
- *fulfilled:* the asynchronous operation was handled successfully.
- *rejected:* the asynchronous operation was unsuccessful.

See also my notes in [promises.md](promises.md).

### GET with fetch()

`fetch()` can be used to create requests. The `fetch()` function:

1. creates a request object that contains relevant information that an API needs.
2. sends that request object to the API endpoint provided.
3. returns a promise that ultimately resolves to a response object, which contains the status of the promise with information the API sent back.

```javascript
fetch('https://api-to-call.com/endpoint').then(response => {
  if (response.ok) {
      return response.json();
  } else {
      throw new Error('Request failed!');
  }
}, networkError => { console.log(networkError.message); }
).then(jsonResponse => {
    return jsonResponse;
});
```

`.then()` will fire only after the promise status of `fetch()` has been resolved. the first argument passed to `then()` is a success callback which takes one parameter: `response`. The second argument passed to `then()` is a function that will handle any failures. This second function also takes a single parameter: `networkError`.

The second `.then()'`s success callback won’t run until the previous `.then()` method has finished running. It will also not run if there was an error thrown.

Note: `json()` is a method of the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) interface (part of the Fetch API). It takes a response stream and reads it to completion. It returns a promise which resolves with the result of parsing text as JSON.

### POST with fetch()

The main difference with POST requests with `fetch()`, is that the initial call takes two arguments: an endpoint and an object that contains information for the POST request. The rest of the request is identical to the GET request.

```javascript
fetch('https://api-to-call.com/endpoint', {
    method: 'POST',
    body: JSON.stringify({id: '200'})
}).then(response => {
  if (response.ok) {
      return response.json();
  } else {
      throw new Error('Request failed!');
  }
}, networkError => { console.log(networkError.message); }
).then(jsonResponse => {
    return jsonResponse;
});
```


## async/await fetch (ES8)

The `async` and `await` keywords were added in ES8 (2017). The `async` keyword can be declared on any function to have that function return a promise. Since Fetch returns a promise, it can be used with promise chaining as shown above (using `then()`) *or* with async/await.

The main benefit to using async/await is the syntax tends to be easier to read and write (syntactic sugar) and produces better stack tracing.

See also my notes in [async_await.md](async_await.md).

### GET with async/await fetch()

This type of GET request uses the new `async` and `await` keywords.

Some key points:

- An `async` function will return a promise.
- `await` can only be used in an `async` function. `await` allows a program to run (continue moving through the message queue) while waiting for a promise to resolve .
- In a `try...catch` statement, code in the try block will be run and in the event of an exception/error, the code in the catch statement will run.


```javascript
const getData = async () => {
  try {
    const response = await fetch('https://api-to-call.com/endpoint');
    if (response.ok) {
      // Since .json() is an asynchronous method we have to await
      // until the promise status is resolved.
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
        throw new Error('Request failed!');
    }
  }
  catch(error) {
    console.log(error);
    // Generally, you would create a more sophisticated way of
    // handling the error, like redirecting users to another page.
  }
};
```


### POST with async/await fetch()

As with the above POST with `fetch()` example, the main difference here between GET and POST is that we have to pass the second argument to `fetch()`.

```javascript
const getData = async () => {
  try {
    const response = await fetch('https://api-to-call.com/endpoint', {
        method: 'POST',
        body: JSON.stringify({id: '200'})
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
        throw new Error('Request failed!');
    }
  }
  catch(error) {
    console.log(error);
  }
};
```

## Headers Object

Represents response/request headers.

The [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) interface of the Fetch API allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing headers from the list of the request's headers.

TODO...

## Request Object

Represents a resource request.

The [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface of the Fetch API represents a resource request.

TODO...

## Response Object

Represents the response to a request.

The [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) interface of the Fetch API represents the response to a request.

TODO...

## Summary

GET and POST requests can be created in a variety of ways. Traditionally these were done with `XMLHttpRequest`. The Fetch API (`fetch()`) and `async`/`await` are new functionalities developed in ES6 (using promises) and ES8 respectively. These are considered to be the new low-level replacement for `XMLHttpRequest`.

The [github fetch project](https://github.com/github/fetch) is a polyfill that implements a subset of the standard Fetch specification, enough to make fetch a viable replacement for most uses of XMLHttpRequest in traditional web applications

[Axios](https://github.com/axios/axios) is a [promise](promised.md) based http request library for the browser and node. It is very similar to the Fetch API but has more backward compatibility built-in for older browsers.

See also:

- [promises.md](https://github.com/jessicarush/javascript-notes/blob/master/promises.md)
- [async_await.md](https://github.com/jessicarush/javascript-notes/blob/master/async_await.md)
- [ajax.md](https://github.com/jessicarush/javascript-notes/blob/master/ajax.md)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)
- [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
- [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

