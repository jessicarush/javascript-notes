# Destructuring assignment

See: [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

This is a review of some of the destructuring syntax that it sprinkled throughout the rest of these notes. 

```javascript
let [a, b] = [10, 20];

console.log(a);  // 10
console.log(b);  // 20

[a, b, ...rest] = [10, 20, 30, 40, 50]

console.log(rest);  // [ 30, 40, 50 ]

({ a, b } = { a: 10, b: 20 });

console.log(a); // 10
console.log(b); // 20

({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40, e: 50});

console.log(rest); // {c: 30, d: 40, e: 50}
```

Note if you are doing an assignment without declaring a variable (`const`, `let`), you need to wrap object destructing assignments in parentheses `()` otherwise the first `{a, b}` will be read as a block.

For example:

```javascript
// Valid
let { a, b } = { a: 10, b: 20 };

// Valid
({ a, b } = { a: 10, b: 20 });

// Not valid
// { a, b } = { a: 10, b: 20 }
```

Returning from functions:

```javascript
function foo() {
  return [10, 20]
}

let [a, b] = foo()

console.log(a, b);  // 10 20
```

If the number of assignments don't match the number of values:

```javascript
let [a, b] = [10, 20, 30, 40]

console.log(a, b);  // 10 20

let [x, y, z] = [10, 20]

console.log(x, y, z);  // 0 0 undefined
```

Ignoring values:

```javascript
let [,a,,b] = [10, 20, 30, 40

console.log(a, b);  // 20 40
```

Set default values:

```javascript
// default values
let [x=0, y=0, z=0] = [10, 20]

console.log(x, y, z);  // 10 20 0
```

Assign to new variable names:

```javascript
const location = {
  longitude: 48.458524,
  latitude: -126.943764,
}

let {longitude: long, latitude: lat} = location;

console.log(lat); // -126.943764
```

Assign to new variable names and default values:

```javascript
const location = {
  longitude: 48.458524,
  latitude: -126.943764,
}

let {longitude: long=0.0, latitude: lat=0.0, elevation: el=0} = location;

console.log(long); // 48.458524
console.log(lat);  // -126.943764
console.log(el);   // -0
```

Unpacking object properties to a function parameter:

```javascript
const user = {
  id: 4,
  displayName: 'bmcgee',
  fullName: {
    first: 'bob',
    last: 'mcgee'
  }
}

function doSomething({id}) {
  console.log(id);
}

doSomething(user);  // 4
```

Assign a new variable name:

```javascript
function doAnother({displayName: dname}) {
  console.log(dname);
}
doAnother(user);  // bmcgee
```

Nested properties:

```javascript
function doName({fullName: {first: name}}) {
  console.log(name);
}

doName(user);  // bob
```

Default values:

```javascript
const user = {
  id: 4,
  displayName: 'bobm',
  fullName: {
    // first: 'bob',
    last: 'mcgee'
  }
}

function doName({fullName: {first: name='friend'}}) {
  console.log(name);
}

doName(user);  // friend
```

Destructuring in for loops:

```javascript
const users = [
  {id: 1, name: 'bob', type: 'admin', color: 'red'},
  {id: 2, name: 'mary', type: 'admin', color: 'orange'},
  {id: 3, name: 'steve', type: 'tester', color: undefined}
]

for (const {id, type} of users) {
  console.log(`user ${id} is ${type}`);
}
// user 1 is admin
// user 2 is admin
// user 3 is tester

for (const {name: n, color: c='white'} of users) {
  console.log(`${n} gets ${c}`);
}
// bob gets red
// mary gets orange
// steve gets white
```

Computed object property name:

```javascript
let name = 'jessica';

const users = {
  jessica: 'awesome',
  scott: 'also awesome',
  bob: 'ok'
}

let {[name]: desc} = users;

console.log(desc);  //awesome
```