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


## Delete and Add Properties

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


## Objects with Methods

When the data stored on an object is a function we call that a method. A property is what an object has, while a method is what an object does. We can include methods in our object literals by creating ordinary, comma-separated key-value pairs. The key serves as our method's name, while the value is an anonymous function expression.

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

With the new ES6 *concise* syntax, we can omit the colon and the function keyword:

```javascript
const user = {
    name: 'jessica',
    admin: true,
    message() {
        console.log('Hello');
    }
};

user.message();
```


## Built-in Object Methods

In addition to creating your own object methods, there are a number of built-in methods ([see a full list here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)). Note: this example uses a *factory function* (see [functions.md](functions.md)).

```javascript
const plantFactory = (name, age, waterFrequency, sunlight) => {
  return {
    age,
    name,
    waterFrequency,
    sunlight
  };
};

const spider = plantFactory('spider plant', 10, 7, 'full');

console.log(Object.keys(spider));  
// [ 'age', 'name', 'waterFrequency', 'sunlight' ]
console.log(Object.values(spider));  
// [ 10, 'spider plant', 7, 'full' ]
console.log(Object.entries(spider));
// [ [ 'age', 10 ],
//   [ 'name', 'spider plant' ],
//   [ 'waterFrequency', 7 ],
//   [ 'sunlight', 'full' ] ]
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
            greeting() {
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


## Privacy

Privacy in objects, is the idea that only certain properties should be changed. Some languages have privacy built-in for objects, but JavaScript does not. Instead, use naming conventions to signal how to interact with a property. One common convention is to place an underscore _ before the name of a property that is not meant to be directly manipulated. Like in Python, using an underscore doesn't prevent reassignment, it's just a signal.

```javascript
let plant = {
  _age: 15,
  name: 'spider plant',
  repotted: '09-15-2018',
};

plant._age = 'no problem';
console.log(plant._age); // no problem
```

## Getters & Setters

Getters are methods that get and return the internal properties of an object, setters are methods that assign new values to properties. A couple of things to note here: We use the `get` and `set` keywords followed by a function, and getter/setter methods don't need to be called with a set of parentheses. Syntactically, it looks like we're accessing a property:

```javascript
const person = {
  _firstName: 'Jessica',
  _lastName: 'Rush',
  get fullName() {
    if (this._firstName && this._lastName){
      return `${this._firstName} ${this._lastName}`;
    }
    else {
      return 'Missing a first or last name.';
    }
  }
};

console.log(person.fullName);  // Jessica Rush
```

Some advantages of using a getter method:

- Getters can perform an action on the data when getting a property.
- Getters can return different values using conditionals.
- In a getter, we can access the properties of the calling object using this.

Keep in mind when using getter (and setter) methods is that properties cannot share the same name as the getter/setter function. If we do so, then calling the method will result in an infinite call stack error.

```javascript
let plant = {
  _age: 15,
  name: 'spider plant',
  get age() {
    return this._age;
  },
  set age(newAge) {
    if (typeof newAge === 'number'){
      this._age = newAge;
    }
    else {
      console.log('You must assign a number to age');
    }
  }
};

plant.age = 'no problem';  // You must assign a number to age
plant.age = 18;
console.log(plant.age);  // 18
```


## Arrays

Arrays are objects that hold values of any type which are numerically indexed. For example:

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
