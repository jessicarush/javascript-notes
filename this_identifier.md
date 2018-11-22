# this Identifier


In a function definition, `this` refers to the “owner” of the function. Another way to say it would be: the `this` keyword references the *calling object* which provides access to the *calling object's properties*.

When used alone, this refers to the global object (in strict mode, `this` will be `undefined`, because strict mode does not allow default binding).

We use `this` in JavaScript similar to the way we use `self` in Python classes. Consider the example:

```javascript
let plant = {
  name: 'spider plant',
  repotted: '09-15-2018',
  water () {
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
  water () {
    console.log(`Time to water ${this.name}.`);
  }
};

plant.water();  // Time to water spider plant.
```


## Avoid using *Arrow Function Syntax*

In the above examples we're using *concise* syntax which allows us to omit the colon `:` and the `function` keyword). Note that if you use *[Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)*, the `this` keyword will not work in the same way. Arrow functions save the binding of `this` in the closure that's created when the function is created. So it doesn't set `this` to the context of the call.

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


## The Calling Object

If a function has a `this` reference inside it, that `this` usually points to an object. But which object it points to depends on how the function was called. It's important to remember that `this` doesn't refer to the function itself (a common misconception).

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

foo();           // undefined (global bar)
obj1.foo();      // obj1 bar
foo.call(obj2);  // obj2 bar
new foo();       // undefined

// In strict mode foo(); will throw a TypeError: Cannot read property 'bar'
// of undefined at foo - because strict mode does not allow default binding.
```

In the browser, the default object in the global context is the window object. In the example below, the values returned will be from the window itself:

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

## Common Usage

Generally speaking, `this` is used most commonly in *objects* that contain methods (as seen in the very first example above), *object constructor functions*, and *classes*.

```javascript
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

## this Context vs Explicit Context

This example uses `this` to allow functions to be used against multiple context objects:
```javascript
function identify() {
    return this.name.toUpperCase();
}

function greet() {
    let greeting = 'Hello ' + identify.call(this);
    console.log(greeting);
}

let bob = {
    name: 'bob'
};

let jane = {
    name: 'jane'
};

greet.call(bob);
greet.call(jane);
```

In the example above, the `call()` method calls a function with a given `this` value and arguments provided individually. Instead of using `this`, you could *explicitly pass in a context object*, like so:
```javascript
function identify(object) {
    return object.name.toUpperCase();
}

function greet(object) {
    let greeting = 'Hello ' + identify(object);
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


## More comparisons

Here are some examples of different ways to approach creating a function that tracks how many times is was called:

Using a global variable:
```javascript
function foo(num) {
  console.log('foo: ' + num);

  // keep track of how many times foo is called in a GLOBAL variable
  count++;
}

let count = 0;

for (let i=0; i<3; i++) {
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

for (let i=0; i<3; i++) {
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

for (let i=0; i<3; i++) {
  foo(i);
}

console.log(foo.count);
// foo: 0
// foo: 1
// foo: 2
// 3
```

First attempt to use this:
```javascript
function foo(num) {
  console.log('foo: ' + num);

  this.count++;
}

foo.count = 0;

for (let i=0; i<3; i++) {
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

  // keep track of how many times foo is called with THIS
  this.count++;
}

foo.count = 0;

for (let i=0; i<3; i++) {
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

## this Summary

To clarify, `this` is not an *author-time binding* but a *runtime binding*. It is contextual based on the conditions of the functions invocation. It has nothing to do with where a function is declared, but everything to do with teh manner in which the function is called.

When a function is invoked, an *activation record*, otherwise known as an execution context, is created. This record contains information about where the function was called from (the call-stack), how it was invoked, what parameters were passed an so on. One of the properties of this record is the `this` reference, which will be used for the duration of that function's execution. 
