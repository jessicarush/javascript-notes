# Ajax


## Table of Contents

<!-- toc -->

- [Creating a request & receiving the response](#creating-a-request--receiving-the-response)
  * [1. using the .onreadystatechange property](#1-using-the-onreadystatechange-property)
  * [2. using the .onload event handler](#2-using-the-onload-event-handler)
  * [3. using addEventListener()](#3-using-addeventlistener)
- [Triggering the request](#triggering-the-request)
- [Links](#links)

<!-- tocstop -->

## Creating a request & receiving the response

There are a few slight variations on how you can do this (mostly in receiving the response part). According to MDN:

> onreadystatechange as a property of the XMLHttpRequest instance is supported in all browsers. Since then, a number of additional event handlers have been implemented in various browsers (onload, onerror, onprogress, etc.). More recent browsers, including Firefox, also support listening to the XMLHttpRequest events via standard addEventListener() APIs in addition to setting on* properties to a handler function.

In other words, the method I'm showing first above is a fail-safe method supported in all browsers. The following are alternate methods (note that just the response handling part changes).

### 1. using the .onreadystatechange property

```javascript
function ajaxRequest() {

  const xhr = new XMLHttpRequest();                      // <--- 1

  xhr.onreadystatechange = function () {                 // <--- 2
    if (this.readyState === 4 && this.status === 200) {
      // do something with the response
      console.log(this.response);
      console.log(this.responseText);
    }
  };

  xhr.open('GET', 'ajax_demo.json', true);               // <--- 3
  xhr.send();                                            // <--- 4
}
```

1. An instance of the XMLHttpRequest object in created.

2. `XMLHttpRequest.onreadystatechange` is an EventHandler that is called whenever the `readyState` attribute changes. In other words, when the server sends back a response, this is the callback to be executed. The `if` statement checks that the response was successful. The status is the [standard numerical http status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). The possible `readyStates` are:

Value | State | Description
----- | ----- | -----------
0 | UNSENT | Client has been created. open() not called yet.
1 | OPENED | open() has been called.
2 | HEADERS_RECEIVED | send() has been called, and headers and status are available.
3 | LOADING | Downloading; responseText holds partial data.
4 | DONE | The operation is complete.

3. The `open()` method prepares the request. It takes three parameters:
 - i. the http method, e.g. `GET` or `POST`
 - ii. the url of the page, file or route that will handle the request
 - iii. a boolean indicating if it should be asynchronous

4. The `send()` method actually sends the request. Optionally data (often a JSON string) can be sent with is by passing it as an argument.


### 2. using the .onload event handler

```javascript
function ajaxRequest() {

  let xhr = new XMLHttpRequest();

  xhr.onload = function() {                       // <-- this changed
    if (this.status === 200) {                    // <-- this changed
      // do something with the response
      console.log(this.response);
      console.log(this.responseText);
    }
  };

  xhr.open('GET', 'ajax_demo.json', true);
  xhr.send();
}
```

### 3. using addEventListener()

```javascript
function ajaxRequest() {

  let xhr = new XMLHttpRequest();

  function responseListener() {                   // <-- this changed
    // do something with the response
    console.log(this.response);
    console.log(this.responseText);
  }

  xhr.addEventListener('load', responseListener);  // <-- this is new
  xhr.open('GET', 'ajax_demo.json', true);
  xhr.send();
}
```

One of the nice things about using event listeners is that you can also respond to other things, for example:

```javascript
function ajaxRequest() {

  let xhr = new XMLHttpRequest();

  function updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total * 100;
      console.log(percentComplete);
    } else {
      console.log('Unable to compute progress since the total size is unknown')
    }
  }

  function transferComplete(e) {
    console.log('The transfer is complete.');
    // do something with the response
    console.log(this.responseText);
  }

  function transferFailed(e) {
    console.log('An error occurred while transferring the file.');
  }

  function transferCanceled(e) {
    console.log('The transfer has been canceled by the user.');
  }

  xhr.addEventListener('progress', updateProgress);
  xhr.addEventListener('load', transferComplete);
  xhr.addEventListener('error', transferFailed);
  xhr.addEventListener('abort', transferCanceled);

  xhr.open('GET', 'ajax_demo.json', true);
  xhr.send();
}
```

The XMLHttpRequest events are:

**progress** - fires when the amount of data that has been retrieved has changed.  
**load** - fires when the transfer is complete; all data is now in the response.  
**error** -  fires when the request encounters an error.  
**abort** - fires when a request has been aborted, for example because the program called `XMLHttpRequest.abort()`.  
**onreadystatechange** - fires whenever the `readyState` attribute changes.  
**loadend** -  fires when a request has completed, whether successfully (after load) or unsuccessfully (after abort or error).  
**loadstart** - fires when a request has started to load data.  
**timeout** - fires when progression is terminated due to preset time expiring.  


## Triggering the request

Note that for all three examples above, the request can be triggered the same way with something like:

```javascript
document.getElementById('js-ajax-requester').addEventListener('click', ajaxRequest);
```

## Links

- [python-notes/ajax_notes.md](https://github.com/jessicarush/python-notes/blob/master/ajax_notes.md)  
- [javascript-notes/requests.md](https://github.com/jessicarush/javascript-notes/blob/master/requests.md)  
- [MDN XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [MDN Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
