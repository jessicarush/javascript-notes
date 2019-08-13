# Intersection Observer API

[Intersection Observer API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport. In other words, this API allows for creating more efficient, performant scroll-linked events where the methods implemented in the past can be sluggish, and problematic.

## Table of Contents

<!-- toc -->

- [Background](#background)
- [Creating an intersection observer](#creating-an-intersection-observer)
- [Notes](#notes)

<!-- tocstop -->

## Background

Let's say that I wanted to write a script that animated a box into view when the user reached the bottom of the page. A common approach would have been to create a scroll event listener which would then be *polling* for a certain scroll position. Once the scroll position is within range, an animation is performed. For example:

```javascript
const $window = $(window);
const $message = $('#end-of-page-message');
const endzone = $('.page-footer').offset().top - $window.height() - 200;

$window.on('scroll', function () {
    if (endzone < $window.scrollTop()) {
        $message.animate({'right': '10px'}, 250);
    } else {
        $message.stop(true).animate({'right': '-150px'}, 250);
    }
});
```

There are a few problems with this. First, this is contrary to JavaScript's design methodology which is to *listen* for events rather than *poll* for events.

In a 2011 blog post, John Resign writes:

> It’s a very, very, bad idea to attach handlers to the window scroll event. Depending upon the browser the scroll event can fire a lot and putting code in the scroll callback will slow down any attempts to scroll the page (not a good idea). Any performance degradation in the scroll handler(s) as a result will only compound the performance of scrolling overall. Instead it’s much better to use some form of a timer to check every X milliseconds OR to attach a scroll event and only run your code after a delay (or even after a given number of executions – and then a delay).

His suggested (jQuery) workaround at the time was this:

```javascript
var outerPane = $details.find(".details-pane-outer"),
    didScroll = false;

$(window).scroll(function() {
    didScroll = true;
});

setInterval(function() {
    if ( didScroll ) {
        didScroll = false;
        // Check your page position and then load in more results
    }
}, 250);
```

More recently, if you run code with a scroll-linked event the like previous example, Firefox (I'm on v68.01) will issue a warning in the console that reads:

> This site appears to use a scroll-linked positioning effect. This may not work well with asynchronous panning; see https://developer.mozilla.org/docs/Mozilla/Performance/ScrollLinkedEffects for further details and to join the discussion on related tools and features!

In a nutshell, what they're saying is that many modern browsers implement some sort of asynchronous scrolling so that they can provide a better 60 fps experience to the user. In this model the visual scroll position and the DOM scroll position are not perfectly in sync. This can cause the effect to be laggy, janky or jittery.

Enter the *observer pattern*, specifically the `IntersectionObserver`. Rather than constantly polling the scroll position, once a certain scroll position has been reached, the IntersectionObserver event handler is executed.


## Creating an intersection observer

To create an observer you call its constructor and pass it a callback function and options object. The callback will run whenever a threshold defined in the object is crossed in one direction or the other. For example:

```javascript
const message = document.getElementById('end-of-page-message');
const target = document.querySelector('.page-footer');

const observerOptions = {
root: null,         // use the viewport
rootMargin: '0px',  //
threshold: 1.0      //
}

function observerCallback(entries, observer) {
entries.forEach(entry => {
  if (entry.intersectionRatio >= 1) {
    message.style.setProperty('right', '10px');
  } else {
    message.style.setProperty('right', '-150px');
  }
});
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

observer.observe(target);
```
About those observer options:

**root** - The element that is used as the viewport for checking the visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null

**rootMargin** - Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px"). This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.

**threshold** - Either a single number (0-1) or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.

## Notes

The Intersection Observer specification is still *Working Draft* status but seems to work in all current browsers I've tested.

Be aware that your callback is executed on the main thread. It should operate as quickly as possible; if anything time-consuming needs to be done, use [`Window.requestIdleCallback()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

Note that if you specified the `root` option, the target must be a descendant of the root element.
