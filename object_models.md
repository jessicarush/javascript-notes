# Object Models

An object model is a group of objects, each of which represents something in the real world. Together they form a model of something larger. There are three main groups of built-in objects that each have a different set of tools for writing scripts for web pages.

1. [Browser Object Model](https://www.w3schools.com/js/js_window.asp) - creates the model of the browser tab or window.
2. [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) - creates a model of the current web page. See the [Mozilla DOM reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).
3. [Global JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) - A group of individual objects that relate to different parts of the JavaScript language.

## Browser Object Model

The topmost object is the window object, which represents the current browser window or tab. Its child objects represent other browser features.

**window**  
|--**document**     - current web page  
|--**history**      - pages in browser history  
|--**location**     - url of current page  
|--**navigator**    - information about browser  
|--**screen**       - device's display information  

Examples:
```javascript
window.innerHeight;     // height of window excluding browser interface
window.innerWidth;      // width of window excluding browser interface
window.pageXOffset;     // distance document has been scrolled horizontally (px)
window.pageYOffset;     // distance document has been scrolled vertically (px)
window.screenX;         // x-coordinate of pointer relative to top left (px)
window.screenY;         // y-coordinate of pointer relative to top left (px)
window.location;        // current url of window object (or local path)
window.document;        // reference to the document object (the current page)
window.history;         // reference to history object for the window or tab
window.history.length;  // the number of items in the history object
window.screen;          // reference to the screen object
window.screen.width;    // find the width of the device's screen
window.screen.height;   // find the height of the device's screen

window.alert();         // creates an alert dialogue box with a message
window.open();          // opens a new browser window
window.print();         // open the browser's print dialogue box
```

For example:

```javascript
function windowSize() {
  var width = this.innerWidth;  // this refers to the global object (window)
  var height = this.innerHeight;
  console.log(width, height);
  return [width, height];
}

windowSize();
// 863 673
console.log(window.screen.width, window.screen.height);
// 1280 800
```


## Document Object Model

The topmost object is the document object which represents the page as a whole. Its child objects represent other items (elements) on the page. The DOM creates an object for each element on the page and is vital to accessing and updating the contents of the current page.

**document**  
|--**html**  
|--**head**  
|--**body**  
|--**div**--attribute  
|--**p**--text  

Examples:
```javascript
document.title;         // returns the current page title
document.URL;           // returns a string containing the URL
document.domain;        // returns the domain of the current document
document.lastModified;  // returns the date the page was last modified

// gets an element by the value of its id attribute
document.getElementById('name');

// returns the first element that matches a CSS selector
document.querySelector('li.nav');

// returns an array of elements that match a CSS selector
document.querySelectorAll('li.nav');

// creates a new element
document.createElement('li');
```

For more see [document_object_model.md]( document_object_model.md).

## Global JavaScript Objects

The names of the global objects in JavaScript usually start with a capital letter, for example:

**String** - for working with string values  
**Number** - for working with numeric values  
**Boolean** - for working with true/false values  
**Date** - to represent and handle dates  
**Math** - for working with numbers and calculations  
**Regex** - for matching patterns within strings of text  

Examples:
```javascript
// output all letters in a string to uppercase
mystring.toUpperCase();

// return the value of pi
Math.PI;
```
