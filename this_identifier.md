# this Identifier


In a function definition, `this` refers to the “owner” of the function. Another way to say it would be: the `this` keyword references the *calling object* which provides access to the *calling object's properties*. When there isn't a calling object, this refers to the global object (in strict mode, referencing the global object with `this` will throw an error, because strict mode does not allow *default binding*).

## Table of Contents

<!-- toc -->

- [Example](#example)
- [The Calling Object](#the-calling-object)
- [Explicit and Hard Binding](#explicit-and-hard-binding)
- [this Context vs Explicit Context](#this-context-vs-explicit-context)
- [Common Usage](#common-usage)
- [Function Invocation Patterns](#function-invocation-patterns)
  * [Method Invocation Pattern](#method-invocation-pattern)
  * [Function Invocation Pattern](#function-invocation-pattern)
  * [Constructor Invocation Pattern](#constructor-invocation-pattern)
  * [Apply Invocation Pattern](#apply-invocation-pattern)
- [Comparisons](#comparisons)
- [Avoid using *Arrow Function Syntax*](#avoid-using-arrow-function-syntax)
- [this Summary](#this-summary)

<!-- tocstop -->

## Example

Consider the example:

```javascript
let plant = {
  name: 'spider plant',
  repotted: '09-15-2018',
  water() {
    console.log(`Time to water ${name}.`);
  }
};

plant.water();  // ReferenceError: name is not defined
```

The above doesn't work because **methods do not automatically have access to other internal properties of the calling object**. Here's where the `this` keyword comes into play.

```javascript
let plant = {
  name: 'spider plant',
  repotted: '09-15-2018',
  water() {
    console.log(`Time to water ${this.name}.`);
  }
};

plant.water();  // Time to water spider plant.
```


## The Calling Object

If a function has a `this` reference inside it, that `this` usually points to an object. But which object it points to depends on how the function was called. It's important to remember that `this` doesn't refer to the function itself (a common misconception). For example:

```javascript
function foo() {
  console.log(this.bar);
}

var bar = 'global bar';

var obj1 = {
  bar: 'obj1 bar',
  foo: foo
};

var obj2 = {
  bar: 'obj2 bar'
};

foo();           // undefined (global bar) or TypeError
obj1.foo();      // obj1 bar
foo.call(obj2);  // obj2 bar
new foo();       // undefined
```

In the example above, `call()` is a special method that most functions have access to via their prototype. The purpose of this function is to allow you to *explicitly* state which object you want to be bound to `this`. The functions first parameter is the object to use for `this`.

**Note:** When chained, only the top/last level of the object property reference chain matters. For example:

```javascript
function foo() {
  console.log(this.a);
}

var obj1 = {
    a: 2,
    obj2: obj2
};

var obj2 = {
    a: 50,
    foo: foo
};

obj1.obj2.foo() // 50
```

**Note:** In the browser, the default object in the global context is the window object. In the example below, the values returned will be from the window itself:

```javascript
function windowSize() {
  var width = this.innerWidth;
  var height = this.innerHeight;
  console.log(width, height);
  return [width, height];
}

windowSize();
// 863 673
```


## Explicit and Hard Binding

In the examples above, we are seeing the `this` value resulting from an *implicit binding* (with the exception of the `call()` example). When you start passing functions around as parameters (callbacks), the implicit `this` binding can become a problem. For example, let's start with something fairly straightforward:

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo();  // 2
```

The result is what we expect. But what happens if we want to pass `obj.foo` as a parameter?

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

setTimeout(obj.foo, 100); // undefined
```

The reason for the loss of the `this` binding is that the *call-site* has changed (see: [call-stack.md](call-stack.md)) and therefor the *calling object* has changed. To see this more clearly, we can pass `obj.foo` to our own function:

```javascript
function foo() {
    console.log(this.a);
}

function doFoo(func) {  // <-- calling object
  func();               // <-- call-site
}

var obj = {
  a: 2,
  foo: foo
};

doFoo(obj.foo); // TypeError: Cannot read property 'a' of undefined
```

Instead of relying on this *implicit binding* through the use of `obj.foo`, we can use `call()` to create an *explicit binding*.

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj);  // 2
```

If we want to pass that *explicit binding* as a parameter, we can assign it to another function expression and pass that around instead. In the example below, no matter where we pass `bar` it will always invoke `foo` with `obj`. This binding is both explicit and strong so we call it *hard binding*.

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = function () {
  foo.call(obj);
};

bar();  // 2
setTimeout(bar, 100);  // 2
```

Since *hard binding* is such a common pattern, it's provided as a built-in utility (as of ES5) `Function.prototype.bind()`. Basically, `bind()` returns a new function that is hardcoded to call the original function with the specified `this` context.

```javascript
function foo() {
    console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = foo.bind(obj);

bar();  // 2
setTimeout(bar, 100);  // 2
```


## this Context vs Explicit Context

This example uses `this` to allow functions to be used against multiple objects:

```javascript
function format() {
    return this.name.toUpperCase();
}

function greet() {
    let greeting = 'Hello ' + format.call(this);
    console.log(greeting);
}

let bob = {
    name: 'bob'
};

let jane = {
    name: 'jane'
};

greet.call(bob);   // Hello BOB
greet.call(jane);  // Hello JANE
```

In the example above, the `call()` method calls a function with a given `this` value and arguments provided individually. Instead of using `this`, you could *explicitly pass in a context object*, like so:

```javascript
function format(object) {
    return object.name.toUpperCase();
}

function greet(object) {
    let greeting = 'Hello ' + format(object);
    console.log(greeting);
}

let bob = {
    name: 'bob'
};

let jane = {
    name: 'jane'
};

greet(bob);
greet(jane);
```

This method seems way simpler to me coming from Python, but apparently the `this` mechanism provides a more elegant way of implicitly passing along an object reference which can make a cleaner API design that's easier to reuse. The more complex the pattern, the messier it is to pass context around as an explicit parameter. **More to come to validate this point.**


## Common Usage

Generally speaking, `this` is used most commonly in *objects* that contain methods (as seen in the very first example above), *object constructor functions*, and *classes*.

```javascript
// objects with methods:
let user = {
  name: 'bob',
  greet() {
    console.log(`Hello ${this.name}`);
  }
};

// constructor function
function Person(first, age, admin) {
  this.firstname = first;
  this.age = age;
  this.admin = admin;
}

// class
class Human {
  constructor(first, age, admin) {
    this.firstname = first;
    this.age = age;
    this.admin = admin;
  }
}
```


## Function Invocation Patterns

So we know that in addition to declared parameters, every function receives a `this` parameter. Its value is determined by its *invocation pattern*. There are four invocation patterns in JavaScript and they differ in how the `this` parameter is initialized.

### Method Invocation Pattern

When a function is stored as a property of an object (or in a class), it's a method. When a method is invoked it's bound to that object. A method can use `this` to retrieve values from the object or modify the object. Methods that get their object context from `this` are called *public methods*.

```javascript
// Creates myObject with a value and a method.
// The increment method takes 1 optional parameter.
// If the argument is not a number, 1 is used as a default.

const myObject = {
  value: 0,
  increment: function (num) {
    this.value += (typeof num === 'number' ? num : 1);
  }
};

myObject.increment();
console.log(myObject.value);  // 1

myObject.increment(2);
console.log(myObject.value);  // 3
```

### Function Invocation Pattern

When a function is not a direct property of an object, then it is invoked as a function. As noted above, `this` will be bound to the global object and will throw and error in strict mode. A consequence of this behaviour is that a method cannot employ an inner helper function because that inner function doesn't share the method's access to the object because it's own `this` is bound to a different value. For example:

```javascript
const myObject = {
  value: 3
};

myObject.double = function () {
  const helper = function () {
    this.value *= 2;  // TypeError: Cannot read property 'value' of undefined
  };
  helper();
};

myObject.double();
console.log(myObject.value);
```

There's a simple workaround for this situation though: assign the value of this to a new variable. The common naming convention is to use the word `that`:

```javascript
const myObject = {
  value: 3
};

myObject.double = function () {
  const that = this;
  const helper = function () {
    that.value *= 2;
  };
  helper();
};

myObject.double();
console.log(myObject.value);  // 6
```

### Constructor Invocation Pattern

Constructor functions are one of the many ways to create an object. See [objects.md](objects.md). Constructor functions are invoked with the `new` prefix. The new object that's created has a hidden link to the functions prototype and `this` will be bound to that new object.

```javascript
var Thing = function (string) {
  this.string = string;
  this.logString = function () {
    console.log(this.string);
  };
};

var thingOne = new Thing('confused');
var thingTwo = new Thing('clear');

thingOne.logString();  // confused
thingTwo.logString();  // clear
```

As a side note, if I wanted to assign a new method to a constructor function and have it be available to each instance, I have to use the `prototype` property (every function has this property). For example:

```javascript
Thing.logStringUpper = function () {
  console.log(this.string.toUpperCase());
};
// TypeError: thingOne.logStringUpper is not a function:
```

```javascript
Thing.prototype.logStringUpper = function () {
  console.log(this.string.toUpperCase());
};

thingOne.logStringUpper();  // CONFUSED
thingTwo.logStringUpper();  // CLEAR
```

### Apply Invocation Pattern

The `apply()` method is very similar to the `call()` method described briefly above in *The Calling Object*. The syntax is almost identical. The fundamental difference is that following the first parameter, call() accepts an argument list, while apply() accepts a single array of arguments.

The `apply()` method lets us call a function with a given object to be used for the `this` value along with an array of other arguments. The syntax is `function.apply(thisArg, [additionalArgs])` For example:

```javascript
console.log(Math.max(1, 10, 12, 5));  // 12

var array = [1, 10, 12, 5];

console.log(Math.max.apply(null, array));  // 12
```

As a side note, you can use `apply()` in some interesting ways. For example, we could merge two arrays together as if we were using `concat()`:

``` javascript
var myArray = ['a', 'b'];
var myThis = [0, 1, 2];

myThis.push.apply(myThis, myArray);

console.log(myThis);  // [ 0, 1, 2, 'a', 'b' ]
```

And for the big finale, we can use `apply()` to invoke a method on an object where there is no existing prototype link.

```javascript
var Thing = function (string) {
  this.string = string;
};

Thing.prototype.logStringUpper = function () {
  console.log(this.string.toUpperCase());
};

var notThing = {
  string: 'bumblebee'
};

Thing.prototype.logStringUpper.apply(notThing);  // BUMBLEBEE
```


## Comparisons

Here are some examples of different ways to approach creating a function that tracks how many times it was called:

Using a global variable:

```javascript
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times foo is called in a GLOBAL variable
  count++;
}

let count = 0;

for (let i = 0; i < 3; i++) {
  foo(i);
}

console.log(count);
// foo: 0
// foo: 1
// foo: 2
// 3
```

Using the lexical scope of an object:

```javascript
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times foo is called in an OBJECT
  data.count++;
}

let data = {
  count: 0
};

for (let i = 0; i < 3; i++) {
  foo(i);
}

console.log(data.count);
// foo: 0
// foo: 1
// foo: 2
// 3
```

Using the lexical scope of the function itself:

```javascript
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times foo is called as a PROPERTY
  foo.count++;
}

foo.count = 0;

for (let i = 0; i < 3; i++) {
  foo(i);
}

console.log(foo.count);
// foo: 0
// foo: 1
// foo: 2
// 3
```

First (incorrect) attempt to use this:

```javascript
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times foo is called with THIS
  this.count++;
}

foo.count = 0;

for (let i = 0; i < 3; i++) {
  foo(i);
}

console.log(foo.count);
// strict mode = TypeError: Cannot read property 'count' of undefined
// foo: 0
// foo: 1
// foo: 2
// 0
```

This first (incorrect) attempt to use `this`, fails because `this.count` is not the same as `foo.count` because once again, `this.count` refers to the global (calling) object (and in strict mode, will be undefined). A correct solution for using this would be:

```javascript
function foo(num) {
  console.log('foo: ' + num);

  this.count++;
}

foo.count = 0;

for (let i = 0; i < 3; i++) {
  // we use call() to make foo the calling function of itself
  foo.call(foo, i);
}

console.log(foo.count);
// foo: 0
// foo: 1
// foo: 2
// 3
```

In this example, we use `.call()` to make `foo()` the calling function, so `this.count` now refers to `foo.count`. I'm still not sure why we'd do it this way but... moving on for now.


## Avoid using *Arrow Function Syntax*

In many of the examples above, we're using *concise* syntax which allows us to omit the colon `:` and the `function` keyword). Note that if you use *[Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)*, the `this` keyword will not work in the same way. Arrow functions save the binding of `this` in the closure that's created when the function is created. So it doesn't set `this` to the context of the call.

```javascript
let plant = {
  name: 'spider plant',
  repotted: '09-15-2018',
  water: () => {
    console.log(`Time to water ${this.name}.`);
  }
};

plant.water();  // TypeError: Cannot read property 'name' of undefined
```

The key takeaway from the example above is to avoid using arrow functions when using `this` in a method!


## this Summary

To clarify, `this` is not an *author-time binding* but a *runtime binding*. It is contextual based on the conditions of the functions invocation. It has nothing to do with where a function is declared, but everything to do with the manner in which the function is called.

When a function is invoked, an *activation record*, otherwise known as an execution context, is created. This record contains information about where the function was called from (the call-stack), how it was invoked, what parameters were passed an so on. One of the properties of this record is the `this` reference, which will be used for the duration of that function's execution.

To summarize, we can ask these questions in order of precedence to determine a `this` binding:

1. Is the function called with the `new` keyword? If so, `this` is the newly constructed object. (see: [objects.md](objects.md))

```javascript
var bar = new foo();  // this is bar
```

2. Is the function called with `call()` or `apply()` (explicit binding)? If so, `this` is the explicitly specified object.

```javascript
var bar = foo.call(obj);  // this is obj
```

3. Is the function called with a context (implicit binding)? If so, `this` is that context object.

```javascript
var bar = obj1.foo();  // this is obj1
```

4. Otherwise, `this` is a default binding (in strict mode undefined, otherwise the global object).

```javascript
var bar = foo();  // this is undefined
```
