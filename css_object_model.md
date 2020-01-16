# CSS Object Model

<!-- toc -->

- [Introduction](#introduction)
- [CSSStyleDeclaration API](#cssstyledeclaration-api)
- [CSSStyleSheet API](#cssstylesheet-api)
- [style.setProperty()](#stylesetproperty)
  * [`HTMLElement.style.setProperty()`](#htmlelementstylesetproperty)
  * [`document.styleSheets[0].style.setProperty()`](#documentstylesheets0stylesetproperty)
- [Add a new rule to a stylesheet](#add-a-new-rule-to-a-stylesheet)
- [Delete a rule from a stylesheet](#delete-a-rule-from-a-stylesheet)
- [Select a stylesheet by name](#select-a-stylesheet-by-name)
- [Using setProperty() to set a css variable](#using-setproperty-to-set-a-css-variable)

<!-- tocstop -->

## Introduction

[CSS Object Model - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)

> The CSS Object Model is a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically.


## CSSStyleDeclaration API

[CSSStyleDeclaration API](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)

> The CSSStyleDeclaration interface represents an object that is a CSS declaration block, and exposes style information and various style-related methods and properties.
>
> A CSSStyleDeclaration object can be exposed using three different APIs:
>
> - Via `HTMLElement.style`, which deals with the inline styles of a single element
> - Via `Window.getComputedStyle()`, which exposes the CSSStyleDeclaration object as a read-only interface.
> - Via the CSSStyleSheet API. For example, `document.styleSheets[0].cssRules[0].style` returns a CSSStyleDeclaration object on the first CSS rule in the document's first stylesheet.

Examples of the first two APIs can be found in [document_object_model.md](document_object_model_object_model.md).


## CSSStyleSheet API

[CSSStyleSheet API](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)

> The CSSStyleSheet interface represents a single CSS stylesheet, and lets you inspect and modify the list of rules contained in the stylesheet.
>
> A stylesheet consists of a collection of CSSRule objects representing each of the rules in the stylesheet. The rules are contained in a CSSRuleList, which can be obtained from the stylesheet's cssRules property.

`document.styleSheets` returns a `StyleSheetList` of all your stylesheets
```javascript
// view a list of all your stylesheets
const stylesheet = document.styleSheets;
```

Use indexing to select the single stylesheet that you want to work with.

```javascript
// Select the first stylesheet
const stylesheet = document.styleSheets[0];
```

To see how many rules are in the stylesheet:
```javascript
const stylesheet = document.styleSheets[0];

console.log(stylesheet.cssRules.length);
```

Note that if viewing the file locally from `file://`, you may get an error when trying to access properties on the stylesheet object. For example, these are the error messages I get:

*Firefox Dev* 73.0b5 (64-bit):
`InvalidAccessError: A parameter or an operation is not supported by the underlying object`

*Firefox* 72.0.1 (64-bit):
`SecurityError: The operation is insecure.`

*Chrome* Version 79.0.3945.117 (Official Build) (64-bit):
OK

*Opera* Version:66.0.3515.36:
`Uncaught DOMException: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules`

*Safari* Version 13.0.1 (14608.2.11.1.11):
`TypeError: undefined is not an object (evaluating 'stylesheet.cssRules')`

If I instead view the file by running a `python3 -m http.server`, everything works:

*Firefox Dev* 73.0b5 (64-bit):
OK

*Firefox* 72.0.1 (64-bit):
OK

*Chrome* Version 79.0.3945.117 (Official Build) (64-bit):
OK

*Opera* Version:66.0.3515.36:
OK

*Safari* Version 13.0.1 (14608.2.11.1.11):
OK

## style.setProperty()

[CSSStyleDeclaration.setProperty()](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)

> The CSSStyleDeclaration.setProperty() method interface sets a new value for a property on a CSS style declaration object.

The important thing to notice in the short description above, is that this method is used on a CSS style declaration object. As noted above, that object can be accessed via `HTMLElement.style` and the `CSSStyleSheet API` (remember `Window.getComputedStyle()` is read-only).


### `HTMLElement.style.setProperty()`

If we use this method on a standard DOM element, then the styles will be added to the `style` attribute of the html tag, exactly like the `el.style.propertyName = value` would.

The only difference is that this *CSS Object Model* method allows us to write CSS property names as they are actually  are in CSS (hyphen-case) rather than their camelCase version. For example:

```javascript
let el = document.getElementById('test');

// using the DOM
el.style.backgroundColor = '#000';

// using the CSSOM
el.style.setProperty('background-color', '#000');
```

In addition, `setProperty()` takes an optional third *priority* parameter which lets you set the `!important` priority. For example:

```javascript
el.style.setProperty('background-color', '#000', 'important');
```

Beyond that, there is no difference between the two approaches. Both are setting *inline styles*.


### `document.styleSheets[0].style.setProperty()`

This is were we get to avoid *inline styles*  and instead add and modify styles directly in the stylesheet.

First a simple example modifying an existing rule:

```javascript
// Select your stylesheet
const stylesheet = document.styleSheets[0];

// Set up a variable to hold the rule
let testRule;

// Loop through to rules to find the one your looking for:
for (let i = 0; i < stylesheet.cssRules.length; i++) {
  if(stylesheet.cssRules[i].selectorText === '.test') {
    testRule = stylesheet.cssRules[i];
  }
}

// Set a new property on the rule:
testRule.style.setProperty('border-radius', '4px');

// Replace an existing property on the rule:
testRule.style.setProperty('background', 'rgb(130,105,250)');
```

When you check the console you'll see that these new css properties are in fact applied to the rule (in my case `.test{}`).


## Add a new rule to a stylesheet

```javascript
// Select your stylesheet
const stylesheet = document.styleSheets[0];

// Create a rule as a string
let newRule =
  `.test {
    padding: 20px;
    background: rgb(100,150,200);
    color: #fff;
  }`;

stylesheet.insertRule(newRule);
```


Note that `insertRule()` takes a second, optional parameter that is the index representing the newly inserted rule's position. The default is 0. If you choose to set it, it must be a positive integer less than or equal to `stylesheet.cssRules.length`.

```javascript
// Insert rule at the beginning of the stylesheet
stylesheet.insertRule(newRule, 0);

// Insert rule at the end of the stylesheet
stylesheet.insertRule(newRule, stylesheet.cssRules.length);
```


## Delete a rule from a stylesheet

To delete a rule from a stylesheet, use the `deleteRule()` method on the stylesheet object and pass in the *index* of the rule to delete:

```javascript
// Select your stylesheet
const stylesheet = document.styleSheets[0];

// Loop through to rules to find the one your looking for:
for (let i = 0; i < stylesheet.cssRules.length; i++) {
  if(stylesheet.cssRules[i].selectorText === '.test') {
    // Delete rule
    stylesheet.deleteRule(i)
  }
}
```


## Select a stylesheet by name

It seems likely to me that selecting your stylesheet by index is not very practical if you're building a component or library. Instead, you can give your stylesheet a name using the HTML `title` attribute, then select it using that name:

HTML
```html  
<link href="test.css" rel="stylesheet" title="test css">
```

JavaScript
```javascript
function getStyleSheet(unique_title) {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let sheet = document.styleSheets[i];
    if (sheet.title === unique_title) {
      return sheet;
    }
  }
}

const stylesheet = getStyleSheet('test css');
```


## Using setProperty() to set a css variable

While it may not be obvious, we can also use `setProperty()` to modify custom properties (variables). To keep things short I've applied this as an inline style but it could also be modified on the stylesheet.

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
