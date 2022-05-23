# Web APIs


<https://developer.mozilla.org/en-US/docs/Web/API>

## Table of Contents

<!-- toc -->

- [Feature detection](#feature-detection)
- [geolocation](#geolocation)
- [localStorage & sessionStorage](#localstorage--sessionstorage)
- [history](#history)
- [location object](#location-object)

<!-- tocstop -->

## Feature detection

When writing code that uses HTML5 APIs, it's' good idea to check if the browser supports that feature before trying to use it. For example:

```javascript
if (navigator.geolocation) {
  // the feature is supported
  console.log('geolocation is supported');
} else {
  // the feature isn't supported
  console.log('geolocation NOT supported');
}
```

That being said, some older browsers(i.e. IE9) apparently have issues with this type of detection. Another approach is to use [Modernizr](https://modernizr.com) which handles these issues for you. It can check if the browser supports a given HTML or CSS feature. To use it, go to <https://modernizr.com/download?setclasses>, select which features you want to detect and download. When you use this script in your page, it adds an object called Modernizr. Each feature you want to test becomes a property of this object. Their values will be either true or false. For example:

```html
<script src="js/modernizr-custom.js"></script>
```

```javascript
if (Modernizr.geolocation) {
  console.log('geolocation is supported');
} else {
  console.log('geolocation NOT supported');
}

if (Modernizr.cssgrid) {
  console.log('css grid is supported');
} else {
  console.log('css grid NOT supported');
}

if (Modernizr.sessionstorage) {
  console.log('session storage is supported');
} else {
  console.log('session storage NOT supported');
}

if (Modernizr.localstorage) {
  console.log('local storage is supported');
} else {
  console.log('local storage NOT supported');
}

if (Modernizr.history) {
  console.log('history is supported');
} else {
  console.log('history NOT supported');
}

if (Modernizr.rgba) {
  console.log('rgba is supported');
} else {
  console.log('rgba NOT supported');
}
```


## geolocation

This API describes a geolocation object that lets you ask users for their location and two objects that handle the browsers response. If the user agrees, the location is provided as a longitude, latitude. There are a number of ways for the browser to choose a location including using data from its IP address, wireless network connection, cell towers or GPS hardware.

To request the location, use the `getCurrentPosition()` method on the `navigator.geolocation` object. This method takes two callback functions; one to run in the event the user allows and the latitude/longitude are successfully returns, and another to run if the user declines or the information cannot be obtained. The success callback will automatically receive an object called *position* which holds the user location. The fail callback will be automatically receive an object called *PositionError* which contains details about the error.

```javascript
if (Modernizr.geolocation) {
  // the feature is supported
  navigator.geolocation.getCurrentPosition(success, fail);
} else {
  // the feature isn't supported
  console.log('geolocation NOT supported');
}

function success(position) {
  console.log(position.coords.latitude);  // latitude in decimal degrees
  console.log(position.coords.longitude);  // longitude in decimal degrees
  console.log(position.coords.accuracy);  // accuracy in meters
  console.log(position.coords.altitude);  // meters above sea level
  console.log(position.coords.altitudeAccuracy);  // accuracy in meters
  console.log(position.coords.heading);  // degrees clockwise from north
  console.log(position.coords.speed);  // speed traveling meters per second
  console.log(position.coords.timestamp); // time since created
}

function fail(error) {
  console.log(error.code);  // 1=permission denied, 2=unavailable, 3=timeout
  console.log(error.message);  // error message
}
```

## localStorage & sessionStorage

These let you store information within the browser without relying on cookies. The main difference between the two is that with local storage, other open tabs and windows can also access the data and the data is stored even when the tab or window is closed. Commonly, browsers will allow 5MB of data per domain in a storage object. The data is stored as properties of the storage objects. The value is always a string. To protect the information in these objects, browsers use a *same origin policy*, which means only pages from the same `protocol://subdomain.domain:port` can access the data. Data in `sessionStorage` is cleared when the page session ends.

Both local and session storage objects are implemented on the window object, so you don't need to prefix the method names with another object. Be aware that data for the storage objects are processed in a synchronous manner (all other processing stops while the script accesses or saves data).

To save an item into the storage object, use dot notation or `setItem()`. This method takes two arguments; a key and a value.

```javascript
// methods
localStorage.setItem('name', 'jessica');
sessionStorage.setItem('theme', 'dark');
// dot notation
localStorage.name = 'jessica';
sessionStorage.theme = 'dark';
```

To retrieve an item from the storage object, use use dot notation or `getItem()`. This method takes one argument; a key.

```javascript
// methods
let name = localStorage.getItem('name');
let theme = sessionStorage.getItem('theme');

// dot notation
name = localStorage.name;
theme = sessionStorage.theme;
```

Remove an item from storage with `removeItem()`.

```javascript
localStorage.removeItem('name');
sessionStorage.removeItem('theme');
```

Clear all information from the storage object with `clear()`.

```javascript
localStorage.clear();
sessionStorage.clear();
```

Get the number of keys with the length property:

```javascript
console.log(localStorage.length);
console.log(sessionStorage.length);
```

So, `sessionStorage` is better for things that change frequently and/or do not need to be retained from session to session or tab to tab. `sessionStorage` data is cleared as soon as the tab is closed. `localStorage` is best for settings and preferences that should be maintained over time, even when the browser or tab is closed. There is no expiry date on `localStorage` but it can be cleared out by the user in their "clear history" options.

Example:
```javascript
if (window.sessionStorage) {
  console.log('storage available');
  console.log(sessionStorage.name);
  console.log(localStorage.length);
  console.log(sessionStorage.length);

  document.getElementById('name').addEventListener('input', function (e) {
    sessionStorage.name = e.target.value;
  });

  document.getElementById('clear-storage').addEventListener('click', function () {
    sessionStorage.clear();
  });
}
```


## history

Lets you access and update items from the browser history (only for pages visited on this site). This is often used in single-page Ajax applications to update the location bar and history. Even though the user is never leaving the page, they could use the browsers back/forward buttons to get to their previous *states*.

`.pushState()` adds an entry to the history object and `.replaceState()` updates the current entry. They both take the same parameters and as with the storage object, the history object is a child of window so you can attach these methods directly to history:

```javascript
history.pushState(state, title, url);
```

The *state* represents additional data stored with the history object for that page. It is often an object but can also be a string.

The *title* represents the page title as a string. It is currently unsupported in many browsers but that may change in the future so just pass it anyways.

The *url* is the url string that should be shown in the address bar.


method, property, event | description
----------------------- | -----------
`history.back()`        | like hitting the browsers back button
`history.forward()`     | like hitting the browsers forward button
`history.go()`          | takes you to a specific index in the history
`history.pushState()`   | adds an item to the history stack
`history.replaceState()`| modifies the current history entry
`history.length`        | how many items are in the history
`window.onpopstate`     | event used to handle user moving forwards or backwards


Example:

```html
<a id="one" href="#content">one</a>
<a id="two" href="#content">two</a>
<a id="three" href="#content">three</a>
<div id="content"></div>
```

```javascript
const content = document.getElementById('content');

document.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.matches('#one')) {
    content.textContent = '1';
  } else if (e.target.matches('#two')) {
    content.textContent = '2';
  } else {
    content.textContent = '3';
  }
  history.pushState(content.textContent, e.target.id, e.target.href);
});

window.onpopstate = function () {
  content.textContent = history.state;
};
```


## location object

Note that there is a `location` object that represents the browsers address bar. When the user presses back or forward, the address bar will update itself. You can get its current information:

```javascript
console.log(location.href);      // http://0.0.0.0:8000/#content
console.log(location.origin);    // http://0.0.0.0:8000
console.log(location.protocol);  // http:
console.log(location.host);      // 0.0.0.0:8000
console.log(location.hostname);  // 0.0.0.0
console.log(location.port);      // 8000
console.log(location.pathname);  // /
console.log(location.hash);      // #content
```
