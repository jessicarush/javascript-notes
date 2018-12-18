# Prototypes


JavaScript includes a *prototype linkage feature* that allows one object to inherit the properties of another. In fact, all objects created from object literals are linked to `Object.prototype`, an object that comes standard with JavaScript. Function objects are linked to `Function,prototype` (which is in turn linked to `Object.prototype`). Strings are linked to `String.prototype`, arrays to `Array.prototype`, numbers to `Number.prototype` and so on. For a full list of these objects see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).

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

## Augmenting Types

Javascript allows the basic types (Number, String, Object, etc) to be augmented. For example, we can, if we want, add a method to the `String.prototype` so that it is avaikable to all strings. First lets look at two regular function; one that capitalizes the first letter and one that capitalizes every word in a string.

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

Now let's rewrite them to become methods of the prototypr object `String`:

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
