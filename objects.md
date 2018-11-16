# Objects


In JavaScript, objects are compound values where you can set properties (named locations, keys) that each hold their own values of any type (including functions which become methods).

## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Accessing Properties](#accessing-properties)
- [Delete and Add Properties](#delete-and-add-properties)
- [Check if a property exists](#check-if-a-property-exists)
- [Objects with Methods](#objects-with-methods)
- [Built-in Object Methods](#built-in-object-methods)
- [Nested Objects](#nested-objects)
- [Passed by Reference](#passed-by-reference)
- [Privacy](#privacy)
- [Getters & Setters](#getters--setters)
- [Arrays](#arrays)
- [Functions](#functions)

<!-- tocstop -->

## Syntax

There are many, many ways to create an object. For example:

**literal notation**
```javascript
const obj1 = {
  firstname: 'Jessica',
  age: 43,
  admin: true
};
```

**constructor notation (using built-in Object)**
```javascript
const obj2 = new Object();

obj2.firstname = 'Jessica';
obj2.age = 43;
obj2.admin = true;

// Constructing an object from the built-in Object() function
// is a little silly since using literal notation does the same thing.
// If you wanted to start with an empty object: const obj2 = {};
// But, this leads us to the next example...
```

**constructor function**
```javascript
function Person(first, age, admin) {
  this.firstname = first;
  this.age = age;
  this.admin = admin;
  };
}

const obj3 = new Person('Jessica', 43, true);

// By convention, constructor functions are named with a capital first letter.
// If a constructor function is called without the new keyword, bad things can
// happen with no runtime error. The capitalization helps as a reminder that
// the new keyword is needed.
```

**class**
```javascript
class Human {
  constructor(first, age, admin) {
    this.firstname = first;
    this.age = age;
    this.admin = admin;
  }
}

const obj4 = new Human('Jessica', 43, true);
```

**factory function**
```javascript
const personFactory = (first, age, admin) => {
  return {
    firstname: first,
    age: age,
    admin: admin
  };
};

const obj5 = personFactory('Jessica', 43, true);
```

All the the methods above produce the same results:

```javascript
console.log(typeof obj1, typeof obj2, typeof obj3, typeof obj4, typeof obj5);
// object object object object object

console.log(obj1.age, obj2.age, obj3.age, obj4.age, obj5.age);
// 43 43 43 43 43
```

While the first two don't pose too much of a question, We should be clear on the differences between the constructor, class, and factory function. The main difference with a factory function is that, unlike constructor functions, there is no *prototype linkage* between it and the objects created from it. With a constructor function, I could add a new method to the constructor, and that method would be available to all the objects that were created from it using the `new` keyword.

From what I can tell so far, classes are very similar to the constructor functions.  They're newer (ES6) and were added to the language because of how common they are in other languages. Constructor functions (and prototype inheritance) however have been in JavaScript for a long time. You will likely see classes being used more in the future but they mostly do the same thing. Beyond that here are the main differences:

- function declarations are hoisted, classes are not.
- classes allow you to use keywords like `super` for extending other classes and `static` for creating static methods.
- class definitions can not be redefined whereas function constructors can.


## Accessing Properties

```javascript
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
let p = prompt('firstname, age or admin?');

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


## Check if a property exists

The binary `in` operator, when applied to a string and an object, tells you whether that object has a property with that name:

```javascript
const obj = {
  firstname: 'Jessica',
  age: 43,
  admin: true
};

console.log('age' in obj);  // true
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

user.message();  // Hello
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

user.message();  // Hello
```

If we wanted to add a new method to the object we just assign it:

```javascript
user.greeting = function() {
  let capitalized = this.name[0].toUpperCase() + this.name.slice(1);
  console.log('Hello ' + capitalized);
};

user.greeting();  // Hello Jessica
```

We should also demonstrate what this looks like for constructor functions, classes, and factory functions. Keep in mind that you can't add a new method to a factory function after the fact, unless you reassign the whole function.

```javascript
// CONSTRUCTOR FUNCTION

function Person(first, age, admin) {
  this.firstname = first;
  this.age = age;
  this.logAge = function() {
    console.log(this.age);
  };
}

const constObj = new Person('Jessica', 43, true);

// Add a method to this object instance only
constObj.special = function() {
  console.log('special');
};

// Add a method to the Constructor (affects all instances)
Person.prototype.greeting = function() {
  let capitalized = this.firstname[0].toUpperCase() + this.firstname.slice(1);
  console.log('Hello ' + capitalized);
};

constObj.special();  // special
constObj.greeting()  // Hello Jessica


// CLASS

class Human {
  constructor(first, age, admin) {
    this.firstname = first;
    this.age = age;
    this.logAge = function() {
      console.log(this.age);
    };
  }
}

const classObj = new Human('Jessica', 43, true);

// Add a method to this object instance only
classObj.special = function() {
  console.log('special');
};

// Add a method to the Class (affects all instances)
Human.prototype.greeting = function() {
  let capitalized = this.firstname[0].toUpperCase() + this.firstname.slice(1);
  console.log('Hello ' + capitalized);
};

classObj.special();  // special
classObj.greeting()  // Hello Jessica


// FACTORY FUNCTION

const personFactory = (first, age, admin) => {
  return {
    firstname: first,
    age: age,
    logAge: function() {
      console.log(this.age);
    }
  };
};

const factoryObj = personFactory('Jessica', 43, true);

// Add a method to the object
factoryObj.special = function() {
  console.log('special');
};

factoryObj.special();  // special
```


## Built-in Object Methods

In addition to creating your own object methods, there are a number of built-in methods ([see a full list here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)). Note: this example uses a *factory function* and *destructuring* (see [functions.md](functions.md)) .

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

The `.assign()` method copies all properties from one or more source objects to a new target object. You can pass two arguments: `Object.assign(target_object, source_object)`. The method copies properties from the source object to the target object. Properties in the target object will be overwritten by properties in the source(s) if they have the same key.

```javascript
const spider ={name: 'spider plant', sunlight: 'full'};

const coffee = Object.assign(spider);
const garlic = Object.assign({name: `garlic`, edible: true}, spider);

console.log(Object.values(spider));
console.log(Object.values(coffee));
console.log(Object.values(garlic));
// [ 'spider plant', 'full' ]
// [ 'spider plant', 'full' ]
// [ 'spider plant', true, 'full' ]

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

Objects are passed by reference. This means when we pass an object into a function as an argument, the computer interprets the parameter name as pointing to the space in memory holding that object. As a result, functions which change object properties actually mutate the object permanently.

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
console.log(ship.color);  // silver
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
