# Objects

In JavaScript, objects are like a Python dictionary. They are compound values where you can set properties (named locations, keys) that each hold their own values of any type. For example:

```javascript
var obj = {
  firstname: 'Jessica',
  age: 43,
  admin: true
};

// access properties using dot notation

console.log(obj.firstname);  // Jessica
console.log(obj.age);        // 43
console.log(obj.admin);      // true

// or bracket notation:

console.log(obj['firstname']);  // Jessica
console.log(obj['age']);        // 43
console.log(obj['admin']);      // true

```

Though dot notation is preferred, bracket notation is useful for when the property name is stored in another variable. In contrast, **dot notation expects the property name to be the objects actual, literal property name** at the time the program was evaluated.

```javascript
var p = prompt('firstname, age or admin?');

console.log(obj[p]);
```

In addition we must use bracket notation when accessing keys that have numbers, spaces, or special characters in them. Without bracket notation in these situations, our code would throw an error.

You can assigned new properties or delete properties on an object:

```javascript
const obj = {
  firstname: 'Jessica',
  age: 43,
  admin: true
};

obj.age = 100;
obj.lastname = 'Rush';
delete obj.admin;

console.log(obj);  // { firstname: 'Jessica', age: 100, lastname: 'Rush' }
```

When the data stored on an object is a function we call that a method. A property is what an object has, while a method is what an object does.

## Arrays

Arrays are like Python lists. They are objects that hold values of any type which are numerically indexed. For example:

```javascript
var arr = [
  'Jessica',
  43,
  true,
]

console.log(arr[0]);      // 'Jessica'
console.log(arr[1]);      // 43
console.log(arr[2]);      // true
console.log(arr.length);  // 3
```

## Functions

Functions (like Arrays) are a subtype of JavaScript `objects`.

```javascript
function foo() {
  return 43
}

console.log(typeof foo);    // function
console.log(typeof foo());  // number
```


## Objects with Methods

We can include methods in our object literals by creating ordinary, comma-separated key-value pairs. The key serves as our method's name, while the value is an anonymous function expression.

```javascript
const user = {
    name: 'jessica',
    admin: true,
    message: function () {
        console.log('Hello');
    }
};

user.message();
```

With the new ES6 syntax, we can omit the colon and the function keyword:

```javascript
const user = {
    name: 'jessica',
    admin: true,
    message () {
        console.log('Hello');
    }
};

user.message();
```

## Nested Objects

Objects can be nested inside objects just like anything else.

```javascript
const ship = {
    passengers: [
        {name: 'jessica', ticket: 100},
        {name: 'scott', ticket: 101},
    ],
    crew : {
        captain: {
            name: 'Bob',
            greeting () {
                console.log('Welcome aboard.');
            }},
    },
};

ship.crew.captain.greeting();  // Welcome aboard
console.log(ship.passengers[0].name);  // jessica
```


## Passed by Reference

Objects are passed by reference. This means when we pass a variable assigned to an object into a function as an argument, the computer interprets the parameter name as pointing to the space in memory holding that object. As a result, functions which change object properties actually mutate the object permanently.

```javascript
const ship = {
    color: 'silver',
    port: 'vancouver'
};

const paintIt = obj => {
    obj.color = 'red';
};

paintIt(ship);
console.log(ship.color);  // red
```

That being said, this does not work for reassigning an entire object:

```javascript
let ship = {
    color: 'silver',
    port: 'vancouver'
};

const remakeIt = obj => {
    obj = {
        color: 'green',
        port: 'seattle'
    };
    console.log(obj.color);  // green
};

remakeIt(ship);
console.log(ship.color);  // red
```

The reason for this is that the when we pass `ship` into the function, `obj` becomes a reference to the memory location of the `ship` object, but not to the `ship` variable. This is because the `obj` parameter of the `remakeIt()` function is a variable in its own right. When we did the reassignment in the body of `remakeIt()`, the obj variable came to refer to the memory location of the object `{color: 'green', port: 'seattle'}`, while the ship variable was completely unchanged.
