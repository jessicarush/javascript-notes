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
- [CSS Object Model](#css-object-model)

<!-- tocstop -->

## The DOM Tree

The DOM Tree, made up of the object that represent everything in the HTML page, consists of four types of *nodes*.

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
document.getElementById('name');           // returns the element
document.getElementsByTagName('p');        // returns a NodeList
document.getElementsByClassName('js-nav')  // returns a NodeList
document.querySelector('li.js-nav');       // returns the first match only
document.querySelectorAll('.js-nav');      // returns a NodeList
```

Note you don't have to search the whole document. You can use these methods to search within a specific element too. `getElementById` is the only one of these methods that is always called on `document` because obviously since id's are unique, there's no need to search a specific element.

```javascript
const section = document.getElementById('section-one');
section.querySelector('.js-whatever');  
```

Note that the `querySelector` method lets you select pretty much anything, including attributes, for example this selects an element with the attribute `type="submit"`:

```javascript
const submitBtn = document.querySelector('[type="submit"]');
```

A **NodeList** is a special collection of nodes. They look like arrays, but they're not (they're a type of object called a collection). That being said, you can access individual items from this list by using the name index notation as with arrays. Items will be indexed by the order that they appear in the HTML document. NodeLists also have a `.length` property.

Note that NodeLists can be *live* or *static*. In a *live NodeList*, when your script updates the page, the NodeList is updated as well. All the methods beginning with `.getElementBy` are live. In a *static NodeList* when your script updates the page, those changes are *not* reflected in the list. Methods beginning with `.querySelector` are static... they reflect the document when the original query was made.

```javascript
// NodeList methods

NodeList.item()     // returns an node by index given in parameter
NodeList.entries()  // returns an iterator of key/value pairs
NodeList.forEach()  // calls a callback given in parameter for each value pair
NodeList.keys()     // returns an iterator of keys
NodeList.values()   // returns an iterator of values
```

When working with a NodeList you'll either want to select one item or loop through the list. If you want one, you can use array syntax or the `item()` method (array syntax is simpler). If you want to loop through and modify all of them, some people use `.forEach()`, but I prefer e regular for loop.


Examples:
```javascript
// returns a NodeList of all <li> elements that have an id attribute
let elNavs = document.querySelectorAll('li[id]');

// modify the last one using array syntax
elNavs[elNavs.length - 1].className = 'newclass';

// modify the second one using item() method
elNavs.item(1).className = 'newclass';

// modify all using a traditional for loop
for (let i = 0; i < elNavs.length; i++) {
    elNavs[i].className = 'newclass';
}

// modify all using for...of by converting to an array first
for (let el of Array.from(elNavs)) {
    el.className = 'newclass';
}
```


### Traverse the DOM

You can also *traverse* from one element node to another related node using the following properties. There is a weirdness with this in that whitespace is considered a node. So in order for the first five to work as expected, you have to remove all whitespace in your HTML, including line breaks. No Thanks. The last five were added later (probably ES6) but are definitely useful.

```javascript
let startNode = document.getElementById('main-nav');

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

Another useful method for traversing the DOM is by using `closest()` demonstrated below in [More Element Properties & Methods](#more-element-properties--methods).

## Working With Elements

See [MDN Nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node)
and [MDN Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element)  
See also: [W3schools DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)  
See [here a full list of node types](https://developer.mozilla.org/en-US/docs/Web/API/Node).  

```javascript
let node = document.getElementById('main-nav');

// some properties for working with nodes:

node.nodeName;      // return name of the node (e.g. DIV, LI, #text)
node.nodeType;      // return node type (1=element, 2=attribute, 3=text, ...)
node.nodeValue;     // return or set nodes value
node.textContent;   // return or set all the text content of a node
node.innerText      // return or set the text content of a node
element.innerHTML;  // return or set the text and markup content of an element
node.attributes     // returns a live collection of all attribute nodes registered to the specified node

// some methods that let you create new nodes, add & remove

createElement()     // creates a new html element
createTextNode()    // creates a new text node
cloneNode()         // clones an element
insertBefore()      // inserts a new child node before the an existing one
appendChild()       // adds a new child node to an element
removeChild()       // removes a child node from an element
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

```javascript
let list = document.querySelector('ul.fancy-list');

// Add an element to the end of a list
let newLastItem = document.createElement('li');
let newLastText = document.createTextNode('new last')
newLastItem.appendChild(newLastText);
list.appendChild(newLastItem);

// Add an element to the start of a list
let newFirstItem = document.createElement('li');
let newFirstText = document.createTextNode('new first')
newFirstItem.appendChild(newFirstText);
list.insertBefore(newFirstItem, list.firstChild);
```

#### Removing elements

```javascript
let removeEl = document.getElementsByClassName('item')[3];
let containerEl = removeEl.parentNode;
containerEl.removeChild(removeEl);
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
let shipping = true;
let elShipping = document.getElementById('shipping');
elShipping.className = shipping;
// For this example, the CSS would contain a class selector .true {}

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

In case it's not already clear, the intention with `setAttribute()` is that you're using it to add/change an attribute on an element, for example: class, id, src, href, etc. If you want to change a particular CSS property, use `el.style.property` syntax.


## More Element Properties & Methods

For a full list see the links listed under [Working With Elements](#working-with-elements).
Note that the `style` property gives you access to all CSS properties.
[See here for a complete list of Style Object Properties](https://www.w3schools.com/jsref/dom_obj_style.asp).

```javascript
el.childElementCount  // returns the number of child elements  
el.children           // returns a live 'HTMLCollection' of all the child elements  
el.classList          // returns the class name(s) of an element.  
el.classList.add('mystyle')
el.classList.remove('mystyle')
el.classList.toggle('mystyle')
el.classList.contains('mystyle')
el.className          // sets or returns the value of the class attribute  
el.clientHeight       // returns the height of an element, including padding  
el.clientWidth        // returns the width of an element, including padding  
el.innerHTML  
el.id  
el.name   
el.scrollHeight       // entire height of an element including overflow and padding  
el.scrollWidth        // entire width of an element including overflow and padding  
el.style              // sets or returns the value of the style attribute.  
el.style.backgroundColor
el.style.flexBasis  
el.tagName             // returns the tag name of an element  
el.title               // sets or returns the value of the title attribute  
el.selectedIndex       // returns or sets the index (selected option) in a select menu  

el.closest('.mystyle')        // returns the closest ancestor of the current element
el.compareDocumentPosition()  // compares the document position of two elements  
el.contains()                 // returns true if a node is a descendant of a node  
el.focus()                    // gives focus to an element  
el.getBoundingClientRect()    // returns size and position relative to the viewport.
el.matches('.mystyle')        // returns true if the element matches the selector string.
el.scroll()                   // scrolls the element to a particular set of coordinates
el.scrollBy()                 // scrolls the element by a given amount
el.toggleAttribute()          // toggles a Boolean attribute
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
```

So far I can't seem to find an MDN reference for these particular objects and their properties, but you could see what properties are available by logging an element as an event target to the console:

```javascript
const checkbox = document.getElementById('mycheckbox');
checkbox.addEventListener('click', function (e) {
  console.log(e.target);
},false);
```

## CSS Object Model

In addition to setting CSS properties with the syntax `el.style.propertyName = value` (which is a standard HTML DOM thing), there is also a [CSS Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model) method called [setProperty](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty) that looks like: `el.style.setProperty('border-radius', '10px')`. I'm still sorting out the differences between these two approaches and haven't looked deeply at this [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) thing but will add information here as I figure it out.

I'm guessing that the key insight is that while the `el.style.propertyName` assignment method is modifying the style attribute in the DOM, the `el.style.setProperty()` method *"sets or modifies a CSS property in a CSS declaration block"*. In other words, being a CSS Object Model method, the property is being set in the the actual CSS document. This allows us to do weird stuff like modify custom CSS properties (--my-variable). There's an example of this below.

Some things discovered so far:

The *CSS Object Model* syntax allows us to write CSS property names as they are in CSS (hyphen-case) rather than their camelCase version. Actually, you can use the hyphen-case property name if you use bracket syntax, but most people don't seem to like bracket syntax. For example:

```javascript
// using the DOM
el.style.backgroundColor = '#000';
el.style['background-color'] = '#000';

// using the CSSOM
el.style.setProperty('background-color', '#000');
```

Beyond that, here are some other differences:

1. `setProperty()` takes an optional third *priority* parameter which lets you set the `!important` priority. For example:

```javascript
el.style.setProperty('background-color', '#000', 'important');
```

2. Since `setProperty()` is modifying the actual CSS Object, we can use it to modify custom properties (variables). This allows us to target a property that's part of a transition (not to be confused with animations), `:hover` or `:focus` selector. For example...

HTML
```html
<div class="flex-centered color-box">
  <div>Hover</div>
</div>
```
CSS
```css
.color-box {
  background: #fff;
  transition: background 0.5s;
}

.color-box:hover {
  background: var(--random-bg);
}
```
JavaScript
```javascript
function randomBg() {
  // Generate a random number between 0 and given number (inclusive)
  function random(n) {
    return Math.floor(Math.random() * (n + 1));
  }
  // Generate a random rgb color
  function randomRGB() {
    let rgbColor = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    return rgbColor;
  }
  // Set an elements --random-bg property to a random color
  function changeBg() {
    let el = document.querySelector('.color-box');
    el.style.setProperty('--random-bg', randomRGB());
  }
  changeBg();
}

randomBg();
```

Note: The [CSS Object Model](https://drafts.csswg.org/cssom/#the-cssstyledeclaration-interface) is classified as a Working Draft.
