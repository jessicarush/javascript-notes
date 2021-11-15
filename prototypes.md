# Prototypes


In classical languages, objects are instances of classes, and a class can inherit from another class. The term inheritance traditionally implies a copy operation from class to instance. While JavaScript pretends it has classes with its `class` keyword, it is a *prototypal* language, which means that objects are *linked* directly to other objects. The distinction here is that JavaScript, by default, doesn't copy object properties at all. Instead, it creates a link between two objects where one can *delegate* property/function access to another. Often you'll hear the term *prototypal inheritance*. This term is misleading. Delegation is a much more accurate term for JavaScripts prototypal, object-linking mechanism.

## Table of Contents

<!-- toc -->

- [Overview](#overview)
- [Assigning the prototype](#assigning-the-prototype)
- [Modifying prototype objects](#modifying-prototype-objects)
- [Differential Inheritance](#differential-inheritance)
- [Delegation-Oriented Design](#delegation-oriented-design)
- [Reflection](#reflection)
- [Augmenting Built-in Types](#augmenting-built-in-types)
- [Prototype linked functions](#prototype-linked-functions)

<!-- tocstop -->

## Overview

JavaScript includes a *prototype linkage feature* that allows one object to reach the properties of another. In fact, all objects created from object literals are linked to `Object.prototype`, an object that comes standard with JavaScript. Function objects are linked to `Function.prototype` (which is in turn linked to `Object.prototype`). Strings are linked to `String.prototype`, arrays to `Array.prototype`, numbers to `Number.prototype` and so on. For a full list of these objects see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects). **Note:** For each global object here, if you look at the sidebar you'll see a subheading: **Inheritance**. This tells you the next global object in the prototype chain. For example: `String` inherits from `Function` inherits from `Object`.


## Assigning the prototype

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

This concept is similar to inheritance (but shouldn't be used to try to emulate a class). In this case `bar` is *prototype linked* to `foo` so it has access to foo's properties. A natural way of applying prototypes is through a pattern called *behaviour delegation* where you design your linked objects to delegate from one to the other.

**Note:** you can also prototype-link functions using `Object.create()`. This is used to achieve something close to classical inheritance as well. See [Prototype linked functions](#prototype-linked-functions) below.


## Modifying prototype objects

The prototype relationship is dynamic. If we add properties to a prototype, those will become immediately available to the objects that are based off it.

```javascript
let foo = {
    a: 40
};

let bar = Object.create(foo);

foo.c = 'cheese';
console.log(bar.c);  // cheese
```

That being said, when we make changes on an object, the object's prototype is not touched.

```javascript
let foo = {
  a: 40,
  b: 'world'
};

let bar = Object.create(foo);

bar.b = 'hello';
console.log(bar.b, foo.b);  // hello world
```


## Differential Inheritance

Though the use of the word *Inheritance* is misleading here, the idea is: when customizing a new object, we specify the differences from the object on which it is based (linked).

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

console.log(myCat.get_name());  // meow Oscar meow
```


## Delegation-Oriented Design

In the example above, we are still trying to emulate a class design pattern by overriding certain properties and behaviours (polymorphism). In JavaScript this is called shadowing. In behaviour delegation we try to avoid naming things the same at different levels of the prototype chain, because having those name collisions can create awkward/brittle syntax.

Behaviour delegation means to let an object delegate certain properties or behaviours (that don't exist in itself) to another object. This pattern is distinct from the idea of parent and child classes, inheritance, polymorphism etc. Rather than organizing objects in our mind vertically (parents on top, children below), we think of objects side by side.


## Reflection

You can check which properties come from the prototype with `Object.getPrototypeOf()` and which ones belong to the object itself with `Object.getOwnPropertyNames()`.

```javascript
let foo = {
  a: 40,
  b: 'world'
};

let bar = Object.create(foo);

foo.c = 'cheese';
bar.b = 'hello';

console.log(Object.getPrototypeOf(bar));
// { a: 40, b: 'world', c: 'cheese' }

console.log(Object.getOwnPropertyNames(bar));
// [ 'b' ]
```

The `isPrototypeOf()` method checks if an object exists in another object's prototype chain.

```javascript
const obj1 = {};

const obj2 = Object.create(obj1);

console.log(obj1.isPrototypeOf(obj2));  // true
```

**Note:** if the object was constructed from a function (or class) using `new`, you must call this method on the functions prototype property instead. When functions are created, they automatically get this public *prototype* property which points to a somewhat arbitrary object. It's this arbitrary object that get's prototype-linked to any objects constructed from the function with `new`.

```javascript
function obj3() {}

const obj4 = new obj3();

console.log(obj3.isPrototypeOf(obj4));            // false
console.log(obj3.prototype.isPrototypeOf(obj4));  // true
console.log(obj3.prototype);                      // obj3 {}
console.log(obj4 instanceof obj3);                // true
```

In general, the use of the keyword `new` is just a long roundabout way of linking two objects. A more direct approach is to use `Object.create()`.


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

console.log(capitalFirstLetter(s));  // The great escape

console.log(capitalize(s));  // The Great Escape
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

console.log(s.capitalFirstLetter());  // The great escape

console.log(s.capitalize());  // The Great Escape
```


## Prototype linked functions

This is an example of how to use `Object.create()` with functions to achieve classical inheritance. This can be used for single inheritance, which is all that JavaScript supports.

```javascript
// Superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// Superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info(`${this.name} moved: ${x}, ${y}`);
  console.info(`start point: ${this.x - x}, ${this.y - y}`);
  console.info(`end point: ${this.x}, ${this.y}`);
};

// Subclasses
function Rectangle() {
  this.name = 'Rectangle';
  Shape.call(this); // call super constructor.
}

function Circle() {
  this.name = 'Circle';
  Shape.call(this);
}

// pre-ES6 prototype link subclass to superclass
Rectangle.prototype = Object.create(Shape.prototype);
Circle.prototype = Object.create(Shape.prototype);

// ES6+ prototype link subclass to superclass
// Object.setPrototypeOf(Rectangle.prototype, Shape.prototype);
// Object.setPrototypeOf(Circle.prototype, Shape.prototype);

// Create some shapes
let rect = new Rectangle();
let circ = new Circle();

// Reflection
console.log(rect instanceof Rectangle);                // true
console.log(rect instanceof Shape);                    // true
console.log(Rectangle.prototype.isPrototypeOf(rect));  // true
console.log(Shape.prototype.isPrototypeOf(rect));      // true
console.log(Rectangle.prototype);                      // Shape {}
console.log(rect.prototype);                           // undefined

rect.move(2, 1);
// Rectangle moved: 2, 1
// start point: 0, 0
// end point: 2, 1

circ.move(10, 5);
// Circle moved: 10, 5
// start point: 0, 0
// end point: 10, 5

circ.move(5, 10);
// Circle moved: 5, 10
// start point: 10, 5
// end point: 15, 15

rect.move(3, 4);
// Rectangle moved: 3, 4
// start point: 2, 1
// end point: 5, 5
```

For some reason it feels strange to me that we would want/need to use functions here. For the sake of comparison, here's what the above would look like using objects instead. The output is pretty similar and to me the code is simpler. I'll have to look further into the benefit (if any at all) of using functions over objects.

``` javascript
// Base prototype (superclass)
const shape = {
  x: 0,
  y: 0
};

// Base prototype method
shape.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info(`${this.name} moved: ${x}, ${y}`);
  console.info(`start point: ${this.x - x}, ${this.y - y}`);
  console.info(`end point: ${this.x}, ${this.y}`);
};

// Prototype chain: rectangle > shape > Object
const rectangle = Object.create(shape);
rectangle.name = 'Rectangle';

// Prototype chain: circle > shape > Object
const circle = Object.create(shape);
circle.name = 'Circle';

// Prototype chain: rect > rectangle > shape > Object
let rect = Object.create(rectangle);

// Prototype chain: circ1 > circle > shape > Object
let circ1 = Object.create(circle);
circ1.name = 'Circle 1';

// Prototype chain: circ2 > circle > shape > Object
let circ2 = Object.create(circle);
circ2.name = 'Circle 2';

// Reflection
console.log(Object.prototype.isPrototypeOf(rect));  // true
console.log(shape.isPrototypeOf(rect));             // true
console.log(rectangle.isPrototypeOf(rect));         // true
console.log(rectangle.isPrototypeOf(circ1));        // false
console.log(circle.isPrototypeOf(circ1));           // true
console.log(shape.isPrototypeOf(circ1));            // true

rect.move(2, 1);
// Rectangle moved: 2, 1
// start point: 0, 0
// end point: 2, 1

circ1.move(10, 5);
// Circle 1 moved: 10, 5
// start point: 0, 0
// end point: 10, 5

circ1.move(5, 10);
// Circle 1 moved: 5, 10
// start point: 10, 5
// end point: 15, 15

circ2.move(8, 8);
// Circle 2 moved: 10, 5
// start point: 0, 0
// end point: 10, 5

rect.move(3, 4);
// Rectangle moved: 3, 4
// start point: 2, 1
// end point: 5, 5
```
