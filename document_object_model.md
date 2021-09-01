# Document Object Model


The DOM is neither part of the HTML nor part of JavaScript it is a separate set of rules that is implemented by all major browsers. It covers two primary areas:

**Making a model of the HTML page** - When the browser loads a web page, it makes a model of that page in memory. The DOM specifies how the browser should structure this model using a *DOM Tree*. The *DOM Tree* is made of objects, each of which represent a different part of the page.

**Accessing and changing the HTML page** - The DOM also defines methods and properties to access and update each object in this model. The DOM is called an *API* (Application Programming Interface) because it acts as an interface between programming languages and HTML documents. Scripts access and update the *DOM tree*, not the source HTML. Changes made to the *DOM Tree* are reflected in the browser.

see also: [object_models.md](object_models.md)


## Table of Contents

<!-- toc -->

- [The DOM Tree](#the-dom-tree)
- [Accessing Elements](#accessing-elements)
  * [Traverse the DOM](#traverse-the-dom)
- [Working With Elements](#working-with-elements)
  * [nodeValue example](#nodevalue-example)
  * [textContent example](#textcontent-example)
  * [innerHTML example](#innerhtml-example)
  * [DOM manipulation](#dom-manipulation)
    + [Adding elements](#adding-elements)
    + [Removing elements](#removing-elements)
- [Working With Attributes](#working-with-attributes)
- [More Element Properties & Methods](#more-element-properties--methods)
  * [Special properties for special elements](#special-properties-for-special-elements)
- [Getting the browser-rendered style](#getting-the-browser-rendered-style)
- [Avoiding inline styles](#avoiding-inline-styles)
  * [Approach 1: Add global styles](#approach-1-add-global-styles)
  * [Approach 2: Use the CSSStyleSheet API](#approach-2-use-the-cssstylesheet-api)

<!-- tocstop -->

## The DOM Tree

The DOM Tree, made up of the objects that represent everything in the HTML page, consists of four types of *nodes*.

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
document.getElementById('name');               // returns the element
document.getElementsByTagName('p');            // returns a live HTMLCollection
document.getElementsByClassName('js-nav btn')  // returns a live HTMLCollection
document.querySelector('li.js-nav');           // returns the first match only
document.querySelectorAll('.js-nav');          // returns a static NodeList
```

Note you don't have to search the whole document. You can use these methods to search within a specific element too. `getElementById` is the only one of these methods that is always called on `document` because ids are unique, there's no need to search a specific element.

```javascript
const section = document.getElementById('section-one');
section.querySelector('.js-whatever');  
```

Note that the `querySelector` methods let you select pretty much anything, including attributes, for example this selects an element with the attribute `type="submit"`:

```javascript
const submitBtn = document.querySelector('[type="submit"]');
```

Note that the `getElementsByClassName` method lets you pass a string containing one or more class names to match on, separated by whitespace:

```javascript
const testBtns = document.getElementsByClassName('btn test');
```

A **NodeList** is a special collection of nodes. They look like arrays, but they're not (they're a type of object called a collection). That being said, you can access individual items from this list by using the index notation as with arrays. Items will be indexed by the order that they appear in the HTML document. NodeLists also have a `.length` property.

Note that NodeLists are *static*. The live version of this is called an **HTMLCollection**. With a live collection, when a script updates the DOM, the HTMLCollection is updated as well. All the methods beginning with `.getElementBy` are live. In a *static NodeList* when a script updates the DOM, those changes are *not* reflected in the resulting list. Methods beginning with `.querySelector` are static... they reflect the document when the original query was made.

```javascript
// NodeList methods

NodeList.item()     // returns a node given the zero-based index
NodeList.entries()  // returns an iterator of key/value pairs
NodeList.forEach()  // calls a callback given in parameter for each value pair
NodeList.keys()     // returns an iterator of keys
NodeList.values()   // returns an iterator of values

// HTMLCollection methods

HTMLCollection.item()  // returns a node given the zero-based index
```

When working with a NodeList or live HTMLCollection, you'll either want to select one item or loop through the list. If you want one, you can use array syntax or the `item()` method (array syntax is simpler). If you want to loop through and modify all of them, you can use a regular `for` loop, or `.forEach()` if it's a static NodeList or convert either static or live lists to an array with `Array.from()`, then use `for...of`. My least favourite option is `.forEach()` method, simply because it bugs me that it only works on the static lists.


Examples:
```javascript
// returns a static NodeList of all <li> elements that have an id attribute
let myStaticList = document.querySelectorAll('li[id]');

// modify the last one using array syntax
myStaticList[elNavs.length - 1].className = 'newclass';

// modify the second one using item() method
myStaticList.item(1).className = 'newclass';

// modify all elements in a static list using a traditional for loop
for (let i = 0; i < elNavs.length; i++) {
    myStaticList[i].className = 'newclass';
}

//  modify all elements in a static list using forEach()
myStaticList.forEach(el => {
  el.className = 'newclass';
});

// alternate syntax using forEach():
myStaticList.forEach(
  function (el) {
    el.className = 'newclass';
  }
);

// modify all by using for...of by converting to an array first
for (let el of Array.from(myStaticList)) {
    el.className = 'newclass';
}

// returns a live HTMLCollection of all elements that have the class 'myclass'
let myLiveList = document.getElementsByClassName('myclass');

// modify all using a traditional for loop
for (let i = 0; i < myLiveList.length; i++) {
    myLiveList[i].className = 'newclass';
}

// modify all using for...of by converting to an array first
for (let el of Array.from(myLiveList)) {
    el.className = 'newclass';
}

// NOTE: the forEach() method does not work directly on live HTMLCollections!
```


### Traverse the DOM

You can also *traverse* from one element node to another related node using the following properties. There is a weirdness with this in that whitespace is considered a node. So in order for the first six to work as expected, you have to remove all whitespace in your HTML, including line breaks. No Thanks. The last six were added later and are definitely more useful.

```javascript
let startNode = document.getElementById('main-nav');

startNode.parentNode;              // returns the parent node
startNode.previousSibling;         // returns the previous node
startNode.nextSibling;             // returns the next node
startNode.firstChild;              // returns the first child node
startNode.lastChild;               // returns the last child node
startNode.childNodes;              // returns a collection of all child nodes

startNode.parentElement;           // returns the parent element node
startNode.previousElementSibling;  // returns the previous element node
startNode.nextElementSibling;      // returns the next element node
startNode.firstElementChild;       // returns the first child element node
startNode.lastElementChild;        // returns the last child element node
startNode.children                 // returns a collection of all child elements

startNode.firstElementChild.className = 'green';
startNode.firstElementChild.nextElementSibling.className = 'blue';
```

Another useful method for traversing the DOM is by using `closest()` demonstrated below in [More Element Properties & Methods](#more-element-properties--methods).

## Working With Elements

See [MDN Nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node)
and [MDN Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element)  
See also: [W3schools DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)  
See also: [a full list of node types](https://developer.mozilla.org/en-US/docs/Web/API/Node).  

```javascript
let node = document.getElementById('main-nav');

// some properties for working with nodes:

node.nodeName;        // return name of the node (e.g. DIV, LI, #text)
node.nodeType;        // return node type (1=element, 2=attribute, 3=text, ...)
node.nodeValue;       // return or set nodes value
node.textContent;     // return or set all the text content of a node
node.innerText;       // return or set the text content of a node
element.innerHTML;    // return or set the text and markup content of an element
node.attributes;      // returns a live collection of all attribute nodes registered to the specified node

// some methods that let you create new nodes, add & remove

document.createElement();   // creates a new html element
document.createTextNode();  // creates a new text node
node.cloneNode();           // clones an element
node.insertBefore();        // inserts a new child node before the an existing one
node.appendChild();         // adds a new child node to an element
node.removeChild();         // removes a child node from an element
node.replaceChild();        // replaces a node
element.replaceWith()       // replaces an element from its parent with another

// Some newer ones (not supported in IE):
parentNode.append()         // lets you append multiple elements at a time!
parentNode.prepend()
childNode.after()
childNode.before()
```

When you are working with an element node (rather than its text node), that element may contain markup. You have to choose whether to get & set the markup as well as the text. When you use these properties to update content, all the old content will be overwritten (both text and markup).


### nodeValue example

```html
<!-- original html -->
<li id="one"><em>fresh</em> figs</li>
```
```javascript
let itemOne = document.getElementById('one');
itemOne.firstElementChild.firstChild.nodeValue = 'dried';
```
```html
<!-- resulting html -->
<li id="one"><em>dried</em> figs</li>
```


### textContent example

```html
<!-- original html -->
<li id="one"><em>fresh</em> figs</li>
```
```javascript
let itemOne = document.getElementById('one');
itemOne.textContent = 'dried fruit';
```
```html
<!-- resulting html -->
<li id="one">dried fruit</li>
```

`innerText` works the same except that it will not return text that is hidden by CSS.


### innerHTML example

```html
<!-- original html -->
<li id="one"><em>fresh</em> figs</li>
```
```javascript
let itemOne = document.getElementById('one');
itemOne.innerHTML = '<em>dried</em> fruit';
```
```html
<!-- resulting html -->
<li id="one"><em>dried</em> fruit</li>
```

`innerHTML` is used when you want to replace an entire fragment or segment of code (html included), however, there are some security risks with this. *Cross-Site Scripting* attacks or *XSS*. In other words, this isn't safe to use with data you're not in control of. Some simple ways of defending against this is to always validate data supplied by untrusted sources. This validation should be double checked on the server-side since some users have JS turned off in their browser. During this validation, potentially dangerous characters should be escaped (&<>\`'"/).

### DOM manipulation

A safer (but longer) way of adding HTML content to a page involves using the methods listed above for example:

```html
<!-- original html -->
<li id="one"><em>fresh</em> figs</li>
```
```javascript
// create a new element
let newEl = document.createElement('li');

// create a new text node
let newText = document.createTextNode('fruit');

// find the position where the new element should be added
let itemOne = document.getElementById('main-nav');

// attach text node to the new element
newEl.appendChild(newText);

// insert the new element
itemOne.appendChild(newEl);
```
```html
<!-- resulting html -->
<li id="one"><em>fresh</em> figs</li>
<li><em>dried</em> fruit</li>
```

#### Adding elements

This example combines uses both methods and properties to add new content:

```javascript
let list = document.querySelector('ul.fancy-list');

// Add an element to the end of a list
let newLastItem = document.createElement('li');
newLastItem.textContent = 'last item';
list.appendChild(newLastItem);

// Add an element to the start of a list
let newFirstItem = document.createElement('li');
newFirstItem.textContent = 'first item';
// parentNode.insertBefore(newNode, referenceNode)
list.insertBefore(newFirstItem, list.firstElementChild);
```

#### Removing elements

```javascript
let removeEl = document.getElementsByClassName('item')[3];
let parentEl = removeEl.parentNode;
parentEl.removeChild(removeEl);
```


## Working With Attributes

```javascript
let node = document.getElementById('main-nav');

// properties to access attributes:

node.id;           // get or update the id value
node.className;    // get or update the class value

// methods to access and update attributes:

hasAttribute();    // checks if an element node has an attribute
getAttribute();    // gets the value of an attribute
setAttribute();    // sets the value of an attribute
removeAttribute(); // removes an attribute from an element node
```

Examples:

```javascript
// Apply a new class
let shippingEl = document.getElementById('shipping');
shippingEl.className = 'shipping-active';

// check if a class exists, then add another
let el = document.getElementById('one');

if (el.hasAttribute('class')) {
  let attr = el.getAttribute('class');
  attr += ' test';
  el.setAttribute('class', attr);
} else {
    el.className = 'test';
}
```

As we'll see below, there's actually easier methods to add and remove classes from a list but this just demonstrates the concept. In case it's not already clear, the intention with `setAttribute()` is that you're using it to add/change an attribute on an element, for example: class, id, src, href, etc. If you wanted to change a particular CSS property, use `el.style.property` syntax.


## More Element Properties & Methods

For a full list see the links listed under [Working With Elements](#working-with-elements).
Note that the `style` property gives you access to all CSS properties.
See here for a [complete list of Style Object Properties](https://www.w3schools.com/jsref/dom_obj_style.asp).

```javascript
el.childElementCount         // returns the number of child elements  
el.children                  // returns a live 'HTMLCollection' of all the child elements  
el.classList                 // returns the class name(s) of an element.  
el.classList.add('mystyle')
el.classList.remove('mystyle')
el.classList.toggle('mystyle')
el.classList.contains('mystyle')
el.className                 // sets or returns the value of the class attribute  
el.clientHeight              // returns the height of an element, including padding  
el.clientWidth               // returns the width of an element, including padding  
el.innerHTML  
el.id  
el.name   
el.scrollHeight              // entire height of an element including overflow and padding  
el.scrollWidth               // entire width of an element including overflow and padding  
el.style                     // sets or returns the value of the style attribute.  
el.style.backgroundColor
el.style.flexBasis  
el.tagName                    // returns the tag name of an element  
el.title                      // sets or returns the value of the title attribute  
el.selectedIndex              // returns or sets the index (selected option) in a select menu  

el.closest('.mystyle')        // returns the closest ancestor of the current element (includes itself)
el.compareDocumentPosition()  // compares the document position of two elements  
el.contains()                 // returns true if a node is a descendant of a node  
el.focus()                    // gives focus to an element  
el.getBoundingClientRect()    // returns size and position relative to the viewport.
el.matches('.mystyle')        // returns true if the element matches the selector string.
el.scroll()                   // scrolls the element to a particular set of coordinates
el.scrollBy()                 // scrolls the element by a given amount
el.toggleAttribute()          // toggles a Boolean attribute
```

Note: you can add and remove multiple classes:

```javascript
// add or remove multiple classes
div.classList.add("foo", "bar", "baz");
div.classList.remove("foo", "bar", "baz");
```

Note: you can get all properties of a node using the attributes property:

```javascript
let test = document.getElementById('my_el');

console.log(test.attributes);

```

The `.matches()` method is particularly helpful for using [event delegation](events.md#event-delegation).

The `.closest()` method is also really helpful in many situations. You can pass any selector you want, e.g. class, id, tag, compound, pseudo, etc. It will return the closest element (or the current element itself) as it goes up through its ancestors. For example:

```html
<section>
    <div id="one" class="box"> div 1
        <div id="two" class="box"> div 2
            <div id="three"> div 3 </div>
        </div>
    </div>
</section>
```
```javascript
const el = document.getElementById('three');

const a1 = el.closest('.box');
// returns the closest ancestor with the class 'box'- (div 2)

const a2 = el.closest('div');
// returns the closest ancestor that is a div - (itself)

const a3 = el.closest('section');
// returns the closest ancestor that is a section - (section)

const a4 = el.closest(':not(div)');
// returns the closest ancestor that is not a div - (section)

const a5 = el.closest('section > div');
// returns the closest ancestor that is a div whose parent is section - (div 1)
```

### Special properties for special elements

Note that some types of elements have their own unique properties. For example, a checkbox or radio button can be set to checked or unchecked using its property:

```javascript
document.getElementById('mycheckbox').checked = true;
document.getElementById('myfield').required = true;
document.getElementById('myfield').disabled = true;
document.getElementById('mylabel').htmlFor = 'myfield';
```

So far I can't seem to find an MDN reference for these particular objects and their properties, but you could see what properties are available by logging an element as an event target to the console:

```javascript
const checkbox = document.getElementById('mycheckbox');
checkbox.addEventListener('click', function (e) {
  console.log(e.target);
},false);
```


## Getting the browser-rendered style

If you want to get the value of an *inline* style property, you can use the same syntax as was used to set it. For example:

```javascript
let el = document.getElementById('test');

// Set the font-size
el.style.fontSize = '2rem';

// Get the font-size
console.log(el.style.fontSize);  // 2rem
```

To reiterate, this only works for inline styles. If a style is set via a stylesheet or the browser, the above `el.style.fontSize` would return `null`.  If we want to get the true CSS property that the browser is using an element we can use `getComputedStyle()` which is a method in the [Window API](https://developer.mozilla.org/en-US/docs/Web/API/Window).

The `Window.getComputedStyle()` method returns an object containing the values of all CSS properties of a given element. Keep in mind though, this object is *read-only*. You cannot set css values this way. For example:

```javascript
// Get styles object
let styles = window.getComputedStyle(el);

console.log(styles);
// TLDR
```

In *theory*, you can get any particular value directly by adding the property name:

```javascript
let size = window.getComputedStyle(el).fontSize;

let color = window.getComputedStyle(el).color;

console.log({size, color});
// Object { size: "32px", color: "rgb(0, 0, 0)" }
```

You can also access property values via their real css names by using the `getPropertyValue()` method:

```javascript
let size = window.getComputedStyle(el).getPropertyValue('font-size');

let color = window.getComputedStyle(el).getPropertyValue('color');

console.log({size, color});
// Object { size: "32px", color: "rgba(70, 70, 85, 0.9)" }
```

I've found though that often times the first method doesn't work. I'm too lazy to figure out why at this point, and will just stick to the second way of using the `getPropertyValue()`.

Note that you can also pass an optional second argument that is a pseudo-element such as `::before` or `::after`:

```javascript
let color = window.getComputedStyle(el, ':after').getPropertyValue('color');

let content = window.getComputedStyle(el, ':after').getPropertyValue('content');

console.log({color, content});
// Object { color: "rgb(255, 0, 0)", content: "\"!\"" }
```


## Avoiding inline styles

Using the style property syntax `el.style.propertyName` is perfectly fine but it does insert all the styles into the `style` attribute of the html element aka *inline*. If you're setting a number of styles, this can make your markup pretty messy. I've also heard that it’s less performant for browsers to render.

For example, here is my opening `<div>` element whose grid values needed to be set by my javascript:

```html
<div id="js-calendar-heatmap" class="calendar-heatmap" style="grid-auto-flow: row; gap: 0.8rem; grid-template: repeat(2, calc(34.2px + 6rem)) / repeat(6, calc(21px + 7rem));">
```

So how do we set styles NOT inline?

### Approach 1: Add global styles

Basically we create a `<style>` element, place our selectors and styles into it, then inject that style element into the DOM.

```javascript
// Create the style element
let style = document.createElement('style');

// Add css using innerHTML
style.innerHTML =
  `.my-element {
    color: #fff;
    background: rgb(50,50,55);
    border-radius: 3px;
    padding: 20px;
  }`;

// Find an existing element in the head
let ref = document.querySelector('script');

// Insert our new style before it
ref.parentNode.insertBefore(style, ref);
```

### Approach 2: Use the CSSStyleSheet API

From MDN:

> The CSSStyleDeclaration interface represents an object that is a CSS declaration block, and exposes style information and various style-related methods and properties.
>
> A CSSStyleDeclaration object can be exposed using three different APIs:
>
> - Via `HTMLElement.style`, which deals with the inline styles of a single element
> - Via `Window.getComputedStyle()`, which exposes the CSSStyleDeclaration object as a read-only interface.
> - Via the CSSStyleSheet API. For example, `document.styleSheets[0].cssRules[0].style` returns a CSSStyleDeclaration object on the first CSS rule in the document's first stylesheet.

So far we've looked at the first two APIs, for this new one, see: [css_object_model.md](css_object_model.md).


Additional resources:
- [CSSStyleDeclaration API](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)  
- [CSSStyleSheet API](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)
