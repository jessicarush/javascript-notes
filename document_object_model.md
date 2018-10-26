# Document Object Model


The DOM is neither part of the HTML nor part of JavaScript it is a separate set of rules that is implemented by all major browsers. It covers two primary areas:

**Making a model of the HTML page** - When the browser loads a web page, it makes a model of that page in memory. The DOM specifies how the browser should structure this model using a *DOM Tree*. The *DOM Tree* is made of objects, each of which represent a different part of the page.

**Accessing and changing the HTML page** - The DOM also defines methods and properties to access and update each object in this model. The DOM is called an *API* (Application Programming Interface) because it acts as an interface between programming languages and HTML documents. Scripts access and update the *DOM tree*, not the source HTML. Changes made to the *DOM Tree* are reflected in the browser.

see also: [object_models.md](object_models.md)


## The DOM Tree

The DOM Tree, made up of the object that represent everything in the HTML page, cocnsust of four types of *nodes*.

1. **The Document node**  
Every tree has one *document node* which represents the entire page and also corresponds to the document object. When you access any element, attribute, or text node, you navigate to it via the document node, It is the starting port for all visits to the *DOM Tree*.

2. **Element nodes**  
These represent all the HTML elements (e.g. `<h1>`, `<div>`, `<p>`, `<img>`).

3. **Attribute nodes**  
These represent any attributes found in HTML elements (e.g `class`, `src`, `href`). These attributes are not considered children of the elements, but rather part part of that element. Once you access an element, there are specific JavaScript methods and properties to read or change the element's attributes.

4. **Text nodes**  
Once you have accessed an element, you can reach the text within that element. Text nodes do not have children.


## Accessing Elements

```javascript
document.getElementById('name');        // returns the element
document.getElementsByTagName('p');     // returns a NodeList
document.getElementsByClassName('nav')  // returns a NodeList
document.querySelector('li.nav');       // returns the first match only
document.querySelectorAll('li.nav');    // returns a NodeList
```

For example:
```javascript
// returns a NodeList of all elements that match <li class="nav>"
let elNavs = document.querySelectorAll('li.nav');

// to modify the last one
elNavs[elNavs.length - 1].className = 'newclass';

// to modify all of them, convert the NodeList to an array and use for...in
for (let el of Array.from(elNavs)) {
    elNavs.className = 'newclass';
}
```

You can also traverse from one element node to another related node using the following properties. There is a weirdness with this in that whitespace is considered a node. So in order for the first five to work as expected, you have to remove all whitespace in your HTML, including line breaks. No Thanks. The last five were added later (probably ES6) but are definitely more useful.

```javascript
var startNode = document.getElementById('main-nav');

startNode.parentNode;              // returns the parent node
startNode.previousSibling;         // returns the previous node
startNode.nextSibling;             // returns the next node
startNode.firstChild;              // returns the first child node
startNode.lastChild;               // returns the last child node

startNode.parentElement;           // returns the parent element node
startNode.previousElementSibling;  // returns the previous element node
startNode.nextElementSibling;      // returns the next element node
startNode.firstElementChild;       // returns the first child element node
startNode.lastElementChild;        // returns the last child element node

startNode.firstElementChild.className = 'green';
startNode.firstElementChild.nextElementSibling.className = 'blue';
```

## Working With Elements

See [MDN Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) and [MDN Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element)  
See [W3schools DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)  
See [here a full list of node types](https://developer.mozilla.org/en-US/docs/Web/API/Node).  

```javascript
var node = document.getElementById('main-nav');

node.nodeName;     // return the name of the node (e.g. P, LI, #text)
node.nodeType;     // return the node type (1=element, 2=attribute. 3=text)
node.nodeValue;    // return or set the nodes value
node.textContent;  // return or set the text content of the node
node.innerHTML;    // return or set the content of an element

// methods that let you create new nodes, add & remove

createElement()
createTextNode()
appendChild()
removeChild()

// properties to access attributes:

node.id;         // get or update the value
node.className;  // get or update the value

// methods to access and update attributes:

hasAttribute();
getAttribute();
setAttribute();
removeAttribute();
```






Examples:

```javascript
let username = 'Jessica';

let elName = document.getElementById('name');
elName.textContent = username;
```


## Add HTML to an element

```javascript
let message = 'Here is a <a href="http://javascriptbook.com/">link</a>';

let elNote = document.getElementById('note');
elNote.innerHTML = message;
```
Note that the `innerHTML` property can pose a security risk... more to come.


## Add a class to an element

For this example, the CSS would contain a class selector called `.true`):

```javascript
let shipping = true;

let elShipping = document.getElementById('shipping');
elShipping.className = shipping;
```
