# Prototypes

When you reference a property on an object, if the property doesn't exist, JavaScript can use that objects *internal prototype reference* to find the property on another (linked) object. This *internal prototype reference linking* to another object is done at the time the object is created. Here's an example using a built-in utility `Object.create()`:

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

More to come...
