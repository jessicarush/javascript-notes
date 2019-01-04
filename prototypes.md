# Prototypes


In classical languages, objects are instances of classes, and a class can inherit from another class. JavaScript is a prototypal language, which means that the objects inherit directly from other objects.

## Table of Contents

<!-- toc -->

- [Overview](#overview)
- [Choosing the prototype](#choosing-the-prototype)
- [Differential Inheritance](#differential-inheritance)
- [Augmenting Built-in Types](#augmenting-built-in-types)

<!-- tocstop -->

## Overview

JavaScript includes a *prototype linkage feature* that allows one object to inherit the properties of another. In fact, all objects created from object literals are linked to `Object.prototype`, an object that comes standard with JavaScript. Function objects are linked to `Function.prototype` (which is in turn linked to `Object.prototype`). Strings are linked to `String.prototype`, arrays to `Array.prototype`, numbers to `Number.prototype` and so on. For a full list of these objects see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects). For each global object if you look at the sidebar here you'll see a subheading **Inheritance:**. This tells you the next global object in the prototype chain. For example: `String` inherits from `Function` inherits from `Object`.


## Choosing the prototype

When you make a new object, you can choose the object that should be its prototype.

When you reference a property on an object, if the property doesn't exist, JavaScript can use that objects *internal prototype reference* to find the property on the other (linked) object. And if that object is lacking the property then it goes to *its* prototype and so on until the process finally bottoms out with `Object.prototype`. If the desired property exists nowhere in the prototype chain, then the result is the undefined value. This *internal prototype reference linking* to another object is done at the time the object is created.

Here's an example using a built-in utility `Object.create()`:

```JavaScript
let foo = {
  a: 40
};

// create 'bar' and link it to 'foo'
let bar = Object.create(foo);

bar.b = 'hello';

console.log(bar.b);  // hello
console.log(bar.a);  // 40
console.log(foo.b);  // undefined (doesn't go both ways)
```

This concept is similar to inheritance in Python (but shouldn't be used to try to emulate a class). In this case `bar` is *prototype linked* to `foo` so it has access to foo's properties. A natural way of applying prototypes is through a pattern called *behaviour delegation* where you design your linked objects to delegate from one to the other.

When we make changes on an object, the object's prototype is not touched.

```javascript
let foo = {
  a: 40,
  b: 'world'
};

let bar = Object.create(foo);
bar.b = 'hello';

console.log(bar.b, foo.b);
// hello world
```

The prototype relationship is dynamic. If we add properties to a prototype, those will become immediately available to the objects that are based off it.

```javascript
foo.c = 'cheese';
console.log(bar.c);
// cheese
```

## Differential Inheritance

When customizing a new object, we specify the differences from the object on which it is based.

```javascript
const mammal = {
  name: 'A Mammal',
  get_name: function () {
    return this.name;
  },
  says: function () {
    return this.saying || '';
  }
};

const myCat = Object.create(mammal);

myCat.name = 'Oscar';
myCat.saying = 'meow';
myCat.get_name = function () {
  return this.says() + ' ' + this.name + ' ' + this.says();
};

console.log(myCat.get_name());
// meow Oscar meow
```


## Augmenting Built-in Types

Javascript allows the basic types (Number, String, Object, etc) to be augmented. For example, we can, if we want, add a method to the `String.prototype` so that it is available to all strings. Let's look at two regular functions: one that capitalizes the first letter and one that capitalizes every word in a string.

```Javascript
function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalize(string) {
  let words = [];
  string.split(' ').forEach(word => {
    words.push(capitalFirstLetter(word));
  });
  return words.join(' ');
}

let s = 'the great escape';

console.log(capitalFirstLetter(s));
// The great escape

console.log(capitalize(s));
// The Great Escape
```

Now let's rewrite them to become methods of the prototype object `String`:

```javascript
String.prototype.capitalFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalize = function () {
  let words = [];
  this.split(' ').forEach(word => {
    words.push(word.capitalFirstLetter());
  });
  return words.join(' ');
};

let s = 'the great escape';

console.log(s.capitalFirstLetter());
// The great escape

console.log(s.capitalize());
// The Great Escape
```
