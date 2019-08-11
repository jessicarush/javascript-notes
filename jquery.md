# jQuery

While the [necessity of jQuery is waning](https://flaviocopes.com/jquery/) in favour vanilla CSS and ES6, it's still good to know being that [it's currently used in millions of websites](https://trends.builtwith.com/javascript/jQuery). They key benefits/features of jQuery include simple access to elements using css-like selectors, methods that let you update the DOM, animate and loop, attach event listeners.


## Table of Contents

<!-- toc -->

- [Including jQuery](#including-jquery)
- [Selecting elements](#selecting-elements)
  * [Basic selectors](#basic-selectors)
  * [Hierarchy selectors](#hierarchy-selectors)
  * [Basic filters](#basic-filters)
  * [Content filters](#content-filters)
  * [Child filters](#child-filters)
  * [Attribute filters](#attribute-filters)
  * [Form selectors](#form-selectors)
  * [Other selectors](#other-selectors)
- [Applying methods](#applying-methods)

<!-- tocstop -->

## Including jQuery

In your HTML, you'll need to link to jQuery. [Select a download here](https://jquery.com/download/) or [select a CDN here](https://code.jquery.com/). Make sure link to the jQuery comes **before** any of your own scripts that use it.

```html
<!-- download -->
<script src="js/jquery-3.4.1.min.js" defer></script>

<!-- cdn -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous" defer></script>
```


## Selecting elements

jQuery has a function `jQuery()` that is usually written as shorthand `$()`. This function takes one parameter, a css-style selector, and returns a jQuery object (also known as a *matched set* or *jquery selection*) containing all the elements matched by the selector. The main advantage of this over `querySelector()` and `querySelectorAll`, is that these two methods may not work in older browsers but jQuery has some fallback code built-in.

note: When assigning a jQuery object to a variable, many give it a name starting with `$` to differentiate it from other variables in your scripts.

```javascript
// selects all headings with class="primary-heading":
$('h1.primary-heading')

// selects all uls that contain at least one li with class="high-priority":
$('ul:has(li.high-priority)')

// assigns an element with id="js-message-box" to a variable $message:å
const $message = $('#js-message-box');
```

### Basic selectors
selector                | description
--------                | -----------
`*`                     | all elements  
`element`               | all html elements e.g. `li` or `h1`
`#id`                   | element by *id* name
`.class`                | element by *class* name
`selector1, selector2`  | elements that match more than one selector


### Hierarchy selectors
selector                | description
--------                | -----------
`ancestor descendant`   | an element that is a descendant of another e.g. `li a`
`parent > child`        | an element that is a direct child of another. You can use `parent *` to select all children
`previous + next`       | elements that are immediately after the previous element
`previous ~ siblings`   | elements that come after and are siblings of the previous element


### Basic filters
selector                | description
--------                | -----------
`:not(selector)`        | all elements except selector
`:first`                | the first element from the selection e.g. `p:first`
`:last`                 | the last element from the selection
`:first-of-type`        | all elements that are the first among siblings of the same element name
`:last-of-type`         | all elements that are the last among siblings of the same element name
`:nth-of-type(expr)`    | all elements that are the nth child of their parent in relation to siblings of the same name
`:nth-last-of-type()`   | same as above but counting from the last to the first
`:only-of-type`         | all elements that have no siblings with the same element name
`:even`                 | elements with an even index number in the selection
`:odd`                  | elements with an odd index number in the selection
`:eq(index)`            | elements with an index number equal to the parameter
`:gt(index)`            | elements with an index number greater than the parameter
`:lt(index)`            | elements with an index number less than the parameter
`:header`               | all `<h1>` - `<h6>` elements
`:animated`             | elements that are currently being animated
`:focus`                | the element that currently has focus
`:hidden`               | all elements that are hidden
`:visible`              | all elements that consume space in the layout. Does not select elements with `display: none` or `height/width: 0`.


### Content filters
selector                | description
--------                | -----------
`:contains('text')`     | elements that contain the specified text
`:empty`                | all elements that have no children
`:parent`               | all elements that have a child node (text or element)
`:has(selector)`        | elements that contain at least one selector e.g. `ul:has(li.high-priority)`
`:root`                 | the element that is the root of the document i.e `<html>`

### Child filters
selector                | description
--------                | -----------
`:nth-child(expr)`      | all elements that are the nth-child of their parent e.g. `li:nth-child(2)`
`:nth-last-child(expr)` | all elements that are the nth-child of their parent, counting from the last element
`:first-child`          | first child from the current selection
`:last-child`           | last child from the current selection
`:only-child`           | when there is only one child in an element


### Attribute filters
selector                   | description
--------                   | -----------
`[attribute]`              | elements that have the specified attribute (with any value)
`[attribute='value']`      | elements that have the specified attribute and value
`[attribute!='value']`     | elements that have the specified attribute but not the specified value
`[attribute^='value']`     | the value of the attribute begins with this value
`[attribute$='value']`     | the value of the attribute end with this value
`[attribute*='value']`     | the value should appear somewhere in the attribute value
`[attribute\|='value']`    | the value should be equal to the given value or the given value followed by a hyphen
`[attribute~='value']`     | the value should be one of the values in a space separated list
`[attribute1][attribute2]` | an element matches both attribute selectors


### Form selectors
selector                | description
--------                | -----------
`:input`                | all input elements
`:text`                 | all type="text" elements
`:password`             | all type="password" elements
`:radio`                | all type="radio" elements
`:checkbox`             | all type="checkbox" elements
`:submit`               | all type="submit" elements
`:image`                | all type="text" elements
`:reset`                | all type="reset" elements
`:button`               | all type="button" elements
`:file`                 | all type="file" elements
`:selected`             | all selected items from option lists
`:enabled`              | all enabled form elements
`:disabled`             | all disabled form elements
`:checked`              | all checked radio buttons or checkboxes


### Other selectors
selector                | description
--------                | -----------
`:target`               | If the documents URI contains a fragment link, e.g. `https://example.com#foo`, then `$(':target')` will select the element with `id="foo"`
`lang(value)`           | elements that have the `lang` attribute with the given value e.g. `<div lang="fr"`

See also: <https://api.jquery.com/category/selectors/>.


## Applying methods

You can use jQuery methods to manipulate the DOM, update elements and add event listeners. These methods can, of course, be chained.

```javascript
$('h1.primary-heading').addClass('highlight');

$('#special').hide().delay(500).fadeIn(1200);

$('li.todo').on('click', function () {
    $(this).remove();
})
```

One key difference between this and vanilla JS, is that the methods can affect all the selected elements without the need to loop through each one. That being said, *some* methods, when being used to retrieve information from an element, will only return the information for the first element if your jQuery selection includes more than one. If you needed to get information from a different one, you could use another method to traverse or filter the selection. If you needed to get information from all elements you could use the `.each()` method. For example:

```html
<ul>
  <li><em>one</em></li>
  <li>two</li>
  <li>three</li>
  <li>four</li>
</ul>
```

```javascript
// getting information:
$('li').text();  // returns information from all li => 'onetwothreefour'
$('li').html();  // returns information from the first li => '<em>one</em>'

// setting information:
$('li').text('hey');           // changes the text content of all li
$('li').html('<em>hey</em>');  // changes the html content of all li
```


### Methods for modifying
method                | description
------                | -----------
`.html()`             | gets the html content of the first element in the selection or sets the html content of all elements in the selection.
`.text()`             | gets or sets the text content of all elements in the selection
`.replaceWith()`      | replaces all the elements in the selection with the new html content and returns the replaced elements as an object
`.remove()`           | removes all of the elements in the selection
`.before()`           | inserts the html content before each element in the selection
`.after()`            | inserts the html content after each element in the selection
`.prepend()`          | prepends the html content to the beginning of each element (inside the opening tag) in the selection
`.append()`           | appends the html content to the end of each element (inside the closing tag) in the selection
`.clone()`            | h
`.unwrap()`           | h
`.detach()`           | h
`.empty()`            | h
`.add()`              | h
`.attr()`             | gets or sets a specified attribute and its value e.g. `$('a.author').attr('href');` would retrieve the href value and `$('a.author').attr('href', 'https://jquery.com/');` would set the href value. When setting, if the attribute does not already exist, it will be created.
`.removeAttr()`       | removes the specified attribute of each element
`.addClass()`         | adds a class to each element
`.removeClass()`      | removes a class from each element
`.css()`              | retrieves and sets values of css properties
`.val()`              | retrieves content from `<input>` and `<textarea>`
`.isNumeric()`        | h


### Methods for finding & selecting
method                | description
------                | -----------
`.find()`             | h
`.closest()`          | h
`.parent()`           | h
`.parents()`          | h
`.children()`         | h
`.siblings()`         | h
`.next()`             | h
`.nextAll()`          | h
`.prev`               | h
`.prevAll()`          | h
`.filter()`           | h
`.not()`              | h
`.has()`              | h
`.is()`               | h
`.contains()`         | h
`.eq()`               | h
`.lt()`               | h
`.gt()`               | h


### Methods for getting/updating dimensions & positions
method                | description
------                | -----------
`.height()`           | h
`.width()`            | h
`.innerHeight()`      | h
`.innerWidth()`       | h
`.outerHeight()`      | h
`.outerWidth()`       | h
`$(document).height()`| h
`$(document).width()` | h
`$(window).height()`  | h
`$(window).width()`   | h
`.offset()`           | h
`.position()`         | h
`.scrollLeft()`       | h
`.scrollTop()`        | h


### Methods for effects & animation
method                | description
------                | -----------
`.show()`             | h
`.hide()`             | h
`.toggle()`           | d
`.fadeIn()`           | h
`.fadeOut()`          | h
`.fadeTo()`           | h
`.fadeToggle()`       | h
`.slideDown()`        | h
`.slideUp()`          | h
`.slideToggle()`      | h
`.delay()`            | h
`.stop()`             | h
`.animate()`          | h


### Methods for creating event listeners
method                | description
------                | -----------
`.ready()`            | checks that the DOM tree has been constructed before running code. This isn't needed if your `<script>` included the `defer` attribute, or is located just before the closing `</body>`.
`.load()`             | deprecated in favour of .on('load')
`.on()`               | used to handle all events. It needs two parameters, the even to respond to, and the code to run when the event occurs (passed as an anonymous or named function). Multiple events can be passed and are separated by a space. See [here for a complete list of web events](https://developer.mozilla.org/en-US/docs/Web/Events).


### Methods for looping
method                | description
------                | -----------
`.each()`             | allows you to loop through all the elements in a selection. The parameter given to each is a function. This function will usually use the `this` keyword like `$(this)` to target the current element node in the loop.


## Things to remember

### .ready()

The ready() function which is helpful if your script is placed somewhere where it may run before the page has loaded.

```javascript
$(document).ready(function () {
    // don't run this code until the DOM tree is complete
});
```

Because this is such a common thing to do in jQuery, the above can be written as shorthand:

```javascript
$(function () {
    // don't run this code until the DOM tree is complete
});
```

As a side not, wrapping your code in the above, also prevents naming collisions since all your variables are contained in the function's scope.

### functions as parameters

This may be obvious but, methods that typically take a string or variable as a parameter, can also take a function that returns a string. For example:

```javascript
$('li').html(function () {
  return `<em>${$(this).text()}</em>`
});
```

### creating new elements to add to the DOM

There are a couple of ways to create new elements, for example:

```javascript
let $newEmptyElement = $('<li>');  // creates a new empty <li></li> element
let $newElement = $('<li class="priority">item</li>')

$('ul').append($newEmptyElement);
```

### adding css properties to elements

Note that you can add multiple css properties in the same method. To do so, pass an object literal. For example:

```javascript
$('#test').css({
  'padding-left': '25px',
  'font-weight': 300,
  'background': 'honeydew'
});
```

### .each()

The `.each()` method lets you loop through each element in a selection and perform multiple actions by passing a function. You can use `this` to reference the current element node and its attributes or `$(this)` to create a jQuery object of the current element (which you will need if you want to apply jQuery methods). For example:

```javascript
$('li').each(function () {
  let html = $(this).html();
  console.log(html, this.id);
  // etc
});
```

### .on()

The `.on()` method requires two parameters but can take up to four: `.on(events[, selector][, data], function(e))`.

You can respond to multiple events by providing a space-separated list:

```javascript
$('li.todo').on('click touchstart', function () {
    // do something
})
```

You can respond to only a subset of the *direct descendants* of the initial jQuery selection by passing the optional selector parameter after the event and before the function. The following event will be triggered when anything inside the `ul` is clicked except those with the hot class.

```javascript
$('ul').on('click', ':not(.hot)', function () {
  // do something
});
```

You can pass additional information to the function that's called when the event is triggered by including the optional data parameter after the optional selector and before the function. Just like in vanilla js, the function is automatically passed the event object as a parameter but if you want to use it, or pass data, you should give it a name like `e`.

```javascript
$('ul').on('click', {status: 'important'}, function (e) {
  console.log(e.data.status);
});
```
