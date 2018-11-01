# Events


[HTML Dom Events](https://www.w3schools.com/jsref/dom_obj_event.asp)  
[MDN Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)  

**UI Events**  
load - page has finished loading  
unload - page is unloading (usually because a new page is requested)  
error - browser encounters a JavaScript error or missing asset  
resize - window has been resized  
scroll - user has scrolled up or down  

**Keyboard Events**  
keydown - user presses a key (repeats while key is pressed)  
keyup - user releases a key  
keypress - user presses a key that inserts an actual character (repeats...)  

**Mouse / Touch Events**  
click - user presses & releases on an element   
dblclick - double click and releases  
contextmenu - user right-clicks
mousedown - presses mouse  
mouseup - releases mouse  
mousemove - moves the mouse (not applicable to touchscreen)  
mouseover - moves mouse over (not applicable to touchscreen)  
mouseout - moves mouse off (not applicable to touchscreen)  
touchstart - finger is placed on touchscreen  
touchend - finger is removed from touchscreen  
touchmove - finger dragged on touchscreen  
touchcancel - touch is interrupted   

**Focus Events**  
focus / focusin - element gains focus  
blur / focusout - element looses focus  

**Form Events**  
input - value in any `<input>`, `<select>` or `<textarea>` has changed  
change - value in a select box, checkbox or radio button changes   
submit - user submits a form  
reset - user resets a form  
cut - users cuts from a form field   
copy - users copies from a form field  
paste - users pastes in a form field  
select - user selects text in a form field   

**Animation & Transition Events**  
animationend - occurs when a CSS animation has ended  
animationiteration - occurs when a CSS animation is repeated  
animationstart - occurs when a CSS animation has started  
transitionstart - a CSS transition has started  
transitionend - a CSS transition has completed  
transitioncancel - a CSS transition has been canceled  
transitionrun - a CSS transition has begun running  


## Event Handling


When a user interacts with the HTML on a page, there are three steps used to trigger JavaScript code. Together these steps are known as event handling.

1. State the function to run when the event occurs  
2. Select the element nodes you want to script to respond to (except for UI events that relate to the browser window)
3. Indicate which event will trigger the response (called *binding an event* to a DOM node)  


### Binding an event to an element  

As it turns out, there are also three types of event handlers (ways to bind an event to an element).

**HTML Event Handlers** (old school).  
This outdated method of event handling is considered bad practice because it mixes JavaScript in with HTML code. It uses attributes and values to set events and functions on elements directly in the HTML. As with CSS, it's better to keep these things separated. For reference, here's what it looks like:

```html
<a onclick="myfunction()">Not good</a>
```

**Traditional DOM Event Handlers** (meh)  
Though much better than HTML event handlers (it does separate JS from HTML), this method introduced in the original specification for the DOM still has a few drawbacks. Namely, you can only attach a single function to any one event. This can often be limiting. Here's an example:

```javascript
function checkUsername() {
    // code that checks if username is long enough
}

let el = document.getElementById('username-field');
el.onblur = checkUsername;
```  

**DOM Level 2 Event Listeners** (preferred)  
Event Listeners allow for one event to trigger multiple functions. This is by far the favored way of handling events. It looks like this:

```javascript
function checkUsername() {
    // code that checks if username is long enough
    let errorMsg = document.getElementById('username-error');
    if (this.value.length < 5) {
        errorMsg.textContent = 'Username must be at least 5 characters';
    } else {
        errorMsg.textContent = '';
    }
}

let el = document.getElementById('username-field');
el.addEventListener('blur', checkUsername, false);
```
Note that the other two methods prefix all the events with `on`, as in `onclick` or `onblur`. This method does not. It uses event names as they are.

The last boolean argument passed there is optional and has to do with event flow. Event flow is related to idea that you have elements nested within other elements. For example with something like this: `<li><a id="link">text</a></li>` you could, in theory, have a click event that corresponds to each element: `<a>`, `<li>`, `<ul>`. Event flow dictates which direction the events are triggered. It will be one of the following:

**Event Bubbling** - The event starts at the most specific node and flows outwards (i.e. `a` -> `li` -> `ul` -> `body` -> `html` -> `document` ). Bubbling is the default (false) and probably what you will almost always use.  

**Event Capturing** - The event starts at the least specific node and flows inwards (i.e. `document` -> `html` -> `body` -> `ul` -> `li` -> `a` ).  



If you need to pass parameters to your function, wrap it with an anonymous function like so:

```javascript
function myFunction(p1, p2) {
    // demonstrating a function that takes arguments
    console.log(p1, p2);
}

let el = document.getElementById('username-field');
el.addEventListener('blur', function() {
    myFunction('hello', 'world');
}, false);
```
