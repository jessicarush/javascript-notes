# this Identifier

If a function has a `this` reference inside it, that `this` usually points to an object. But which object it points to depends on how the function was called. It's important to note that `this` doesn't refer to the function itself (a common misconception).

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

foo();           // global bar (in browser, fails in Atom parser)
obj1.foo();      // obj1 bar
foo.call(obj2);  // obj2 bar
new foo();       // undefined
```

More to come...
