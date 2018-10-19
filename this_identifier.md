# this Identifier


In a function definition, `this` refers to the “owner” of the function. Another way to say it would be: the `this` keyword references the *calling object* which provides access to the *calling object's properties*.

When used alone, this refers to the global object (in strict mode, `this` will be `undefined`, because strict mode does not allow default binding).

We use `this` similar to the way we use pronouns in natural languages. We write, “John is running fast because *he* is trying to catch the train.” Consider the example:

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

foo();           // global bar (or in strict mode: TypeError: Cannot read property 'bar' of undefined at foo)
obj1.foo();      // obj1 bar
foo.call(obj2);  // obj2 bar
new foo();       // undefined
```
