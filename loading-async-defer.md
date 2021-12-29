# Loading JavaScript using async & defer


[This article](https://flaviocopes.com/javascript-async-defer/) provides a great explanation. To summarize, there are a number of ways to load JavasScript into the browser. The method you choose will depend on what your script does and what, if any, DOM elements it needs access to.

Also. there is nice [diagram here](https://html.spec.whatwg.org/images/asyncdefer.svg).

## Table of Contents

<!-- toc -->

- [background](#background)
- [default behaviour (no async or defer attribute)](#default-behaviour-no-async-or-defer-attribute)
- [async attribute](#async-attribute)
- [defer attribute](#defer-attribute)
- [Using DOMContentLoaded](#using-domcontentloaded)

<!-- tocstop -->

## background

In the past, web developers would typically include their JavaScript document in one of two places in the HTML, either up in the `<head>` section or right before the closing `</body>` tag. The reasoning for this is while it's more organizationally appropriate to include a JavaScript file in the `</head>`, this simply doesn't work if your script needs to access DOM elements that haven't been created yet. In addition, the fetching and execution of the script before the HTML would make the page feel like it was loading slower to the user. As a result people moved their script to the bottom of the HTML document so that it is the last to load and therefor has access to the completed DOM tree. This method is old school.

The `async` and `defer` attributes can be added to the `<script>` element to allow us to keep it in the `<head>` where it belongs, but choose when we want it to parse and execute. In short, async blocks the parsing of the page while defer does not.


## default behaviour (no async or defer attribute)

```html
<script src="js/setup_scripts.js"></script>
```

The browser will begin parsing the HTML until in reaches the `<script>`. It will stop, go fetch the script, then execute the script. When the script has finished executing, it will then resume parsing the HTML.


## async attribute

```html
<script src="js/setup_scripts.js" async></script>
```

The browser will begin parsing the HTML. When in reaches the `<script>` it will asynchronously go fetch the script while still parsing the HTML. When it's ready to execute the script, it will then pause parsing the HTML and resume when the script has finished executing. This is fairly similar to above, though I can see how it would be very useful if you're using a bunch of external libraries.


## defer attribute

```html
<script src="js/setup_scripts.js" defer></script>
```

The browser will begin parsing the HTML. When in reaches the `<script>` it will asynchronously go fetch the script while still parsing the HTML. It will continue to parse the HTML until it is completed, then execute the script. This behaviour is similar to placing the script at the end of the doc but way better.

Scripts marked `defer` are executed immediately after the `domInteractive` event, which happens after the HTML is loaded, parsed and the DOM tree is built. CSS and images at this point are still to be parsed and loaded. Once this is done, the browser will emit the `domComplete` event, and then `onLoad`.

## Using DOMContentLoaded

DOMContentLoaded – the browser has fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may not yet have loaded.

load – not only HTML is loaded, but also all the external resources: images, styles etc.

```javascript
<script type="text/javascript" charset="utf-8">
  document.addEventListener('DOMContentLoaded', function() {
      // js goes here
  });
</script>
```
