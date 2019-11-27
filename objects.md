# Objects


In JavaScript, objects are compound values where you can set properties (named locations, keys) that each hold their own values of any type (including functions which become methods).

## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [new... a constructor call](#new-a-constructor-call)
- [Accessing Properties](#accessing-properties)
- [Computed Property Names](#computed-property-names)
- [Delete and Add Properties](#delete-and-add-properties)
- [Check if a property exists](#check-if-a-property-exists)
- [Nested Objects](#nested-objects)
- [Objects with Methods](#objects-with-methods)
  * [Adding a method to an object](#adding-a-method-to-an-object)
  * [Adding a method that points to an outside function](#adding-a-method-that-points-to-an-outside-function)
  * [Adding a method to a constructor function](#adding-a-method-to-a-constructor-function)
  * [Adding a method to a class](#adding-a-method-to-a-class)
  * [Adding a method to factory function](#adding-a-method-to-factory-function)
- [Built-in Object Methods](#built-in-object-methods)
- [Polymorphism](#polymorphism)
- [Property Descriptors](#property-descriptors)
  * [writeable](#writeable)
  * [configurable](#configurable)
  * [enumerable](#enumerable)
- [Immutability](#immutability)
  * [constant property](#constant-property)
  * [prevent extension](#prevent-extension)
  * [seal](#seal)
  * [freeze](#freeze)
- [Privacy](#privacy)
- [Getters & Setters](#getters--setters)
- [Cascade (chaining methods)](#cascade-chaining-methods)
- [Passed by Reference](#passed-by-reference)
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

**create a new instance of an existing object with Object.create()**
```javascript
const personPrototype = {
    firstname: '',
    age: undefined,
    admin: undefined
};

const obj6 = Object.create(personPrototype);

obj6.firstname = 'Jessica';
obj6.age = 43;
obj6.admin = true;
```

All the the methods above produce the same results:

```javascript
console.log(typeof obj1, typeof obj2, typeof obj3, typeof obj4, typeof obj5, typeof obj6);
// object object object object object object

console.log(obj1.age, obj2.age, obj3.age, obj4.age, obj5.age, obj6.age);
// 43 43 43 43 43 43
```

While the first two don't pose too much of a question, We should be clear on the differences between the constructor, class, factory function and the `Object.create()` method. The main difference with a factory function is that, unlike constructor functions, there is no *prototype linkage* between it and the objects created from it. With a constructor function or `Object.create()`, I could add a new method to the constructor or prototype object, and that method would be available to all the objects that were created from it using the `new` keyword or `Object.create()` respectively.

In terms of the difference between constructor functions and `Object.create()`... `Object.create()` builds an object that inherits directly from the one passed as its first argument. With constructor functions, the newly created object is linked to the constructor function's *prototype* property. For more see [prototypes.md](prototypes.md).

From what I can tell so far, classes are very similar to the constructor functions.  They're newer (ES6) and were added to the language because of how common they are in other languages. Constructor functions (and prototype inheritance) however have been in JavaScript for a long time. You will likely see classes being used more in the future but they mostly do the same thing. Beyond that here are the main differences:

- function declarations are hoisted, classes are not.
- classes allow you to use keywords like `super` for extending other classes and `static` for creating static methods.
- class definitions can not be redefined whereas function constructors can.


## new... a constructor call

Since we've used this keyword in two of the examples above, we should probably take a closer look at what `new` actually does. Pretty much any function (including built-in object functions like `Number()`) can be called with `new` in front of it. This makes the function call a *constructor call*.

When a function is invoked with as a constructor call, the following things are done automatically:

1. A brand new object is created
2. The newly constructed object is prototype-linked to the functions prototype property
3. The newly constructed object is set as the `this` binding for that function call
4. Unless the function returns its own alternate object, the `new`-invoked function call will automatically return the newly constructed object.

```javascript
function foo() {
    console.log('Plain old function');
}

let a = new foo();
// Plain old function

console.log(typeof a);
// object

console.log(foo.prototype);
// foo {}

console.log(foo.prototype.isPrototypeOf(a));
//true
```

Bottom line is functions aren't constructors, but rather function calls are *constructor calls* if and only if `new` is used.


## Accessing Properties

```javascript
// access properties using dot notation

console.log(obj.firstname);  // Jessica
console.log(obj.age);        // 43
console.log(obj.admin);      // true

// or bracket notation

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


## Computed Property Names

As noted above, often you will use bracket notation to access a property value because the property name is stored in another variable. For example:

```javascript
let widgets = {};
let serialNum = '42BX8357';
widgets[serialNum] = 'Blue fizzle top';
```

As of ES6 we can also compute the property names inside the object literal like so:

```javascript
let serialNum = '42BX8357';
let widgets = {
  [serialNum]: 'Blue fizzle top'
};
```


## Delete and Add Properties

You can assign new properties or delete existing properties on an object:

```javascript
const obj = {
  firstname: 'Jessica',
  age: 43,
  admin: true
};

obj.age = 100;
obj.lastname = 'Rush';
delete obj.admin;

console.log(obj);
// { firstname: 'Jessica', age: 100, lastname: 'Rush' }
```


## Check if a property exists

The binary `in` operator, when applied to a string and an object, tells you whether that object or an object in its prototype chain has a property with that name. By contrast, the built-in method `hasOwnProperty()` lets you check if the object itself (not a prototype) has the property.

```javascript
const obj = {
  firstname: 'Jessica',
  age: 43,
  admin: true
};

console.log('firstname' in obj);
// true

console.log('constructor' in obj);
// true (because 'constructor' is a property of obj's prototype: Object)

console.log(obj.hasOwnProperty('firstname'));
// true

console.log(obj.hasOwnProperty('constructor'));
// false
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

ship.crew.captain.greeting();
// Welcome aboard

console.log(ship.passengers[0].name);
// jessica
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

### Adding a method to an object

If we wanted to add a new method to the object we just assign it:

```javascript
user.greeting = function () {
  let capitalized = this.name[0].toUpperCase() + this.name.slice(1);
  console.log('Hello ' + capitalized);
};

user.greeting();  // Hello Jessica
```

### Adding a method that points to an outside function

If we wanted to add a new method to an object, that method doesn't need to be assigned directly to the one object, for example:

```javascript
function greeting(message) {
  let formatName = this.name[0].toUpperCase() + this.name.slice(1);
  console.log(`${message} ${formatName}.`);
}

const user = {
  name: 'jessica'
};

const other = {
  name: 'other',
  greeting
};

const another = {
  name: 'another'
};

user.greeting = greeting;

user.greeting('Hello');
// Hello Jessica.

other.greeting('Something');
// Something Other.

greeting.call(another, 'And');
// And Another.
```

We should also demonstrate what this looks like for constructor functions, classes, and factory functions. Keep in mind that you can't add a new method to a factory function after the fact, unless you reassign the whole function...

### Adding a method to a constructor function

```javascript
function Person(first, age, admin) {
  this.firstname = first;
  this.age = age;
  this.logAge = function () {
    console.log(this.age);
  };
}

const constructorObj = new Person('Jessica', 43, true);

// Add a method to this object instance only
constructorObj.special = function () {
  console.log('special');
};

// Add a method to the Constructor (affects all instances)
Person.prototype.greeting = function () {
  let capitalized = this.firstname[0].toUpperCase() + this.firstname.slice(1);
  console.log('Hello ' + capitalized);
};

constructorObj.special();  // special
constructorObj.greeting()  // Hello Jessica
```

### Adding a method to a class

```javascript
class Human {
  constructor(first, age, admin) {
    this.firstname = first;
    this.age = age;
    this.logAge = function () {
      console.log(this.age);
    };
  }
}

const classObj = new Human('Jessica', 43, true);

// Add a method to this object instance only
classObj.special = function () {
  console.log('special');
};

// Add a method to the Class (affects all instances)
Human.prototype.greeting = function () {
  let capitalized = this.firstname[0].toUpperCase() + this.firstname.slice(1);
  console.log('Hello ' + capitalized);
};

classObj.special();  // special
classObj.greeting()  // Hello Jessica
```

### Adding a method to factory function

```javascript
const personFactory = (first, age, admin) => {
  return {
    firstname: first,
    age: age,
    logAge: function () {
      console.log(this.age);
    }
  };
};

const factoryObj = personFactory('Jessica', 43, true);

// Add a method to the object
factoryObj.special = function () {
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

The `.assign()` method copies all properties from one or more source objects to a new target object. You pass two or more arguments: `Object.assign(target_object, source_object)`. The method copies properties from the source object(s) to the target object. Properties in the target object will be overwritten by properties in the source(s) if they have the same key. If the sources have the same keys, the last one in the argument list will be applied to the target.

```javascript
const plant = {name: 'plant', sunlight: 'full'}
const spider = {name: 'spider', water: 'moist'};

const coffee = Object.assign({}, plant);
const garlic = Object.assign({name: `garlic`, edible: true}, spider, plant);

coffee.name = 'coffee';

console.log(Object.values(plant));
// [ 'plant', 'full' ]
console.log(Object.values(spider));
// [ 'spider', 'moist' ]
console.log(Object.values(coffee));
// [ 'coffee', 'full' ]
console.log(Object.values(garlic));
// [ 'plant', true, 'moist', 'full' ]
```


## Polymorphism

Polymorphism is a technique where you can define a common interface for many other different abstract types, provided they support the interface it expects. A simple example of this is:

```javascript
function User(name, type) {
  this.name = name,
  this.type = type
}

const j = new User('jessica', 'admin');

console.log(j.toString());
// [object Object]

User.prototype.toString = function () {
  return `${this.type} user: ${this.name}`;
};

console.log(j.toString());
// admin user: jessica
```


## Property Descriptors

As of ES5 all object properties can be described in terms of a *property descriptor*. This data descriptor can be accessed using a built-in method that comes with `Object`, for example:

```javascript
const plant = {name: 'plant', sunlight: 'full'}
let desc = Object.getOwnPropertyDescriptor(plant, 'name');

console.log(desc);
// { value: 'plant',
//   writable: true,
//   enumerable: true,
//   configurable: true }
```

As we can see, there are three additional characteristics that describe each property. The default is for all of these to be true. If we wanted to change these characteristics, we can use  `Object.defineProperty()`. With this method we can add a new property or modify an existing one.

### writeable

`writeable` controls whether you can change the properties value.

```javascript
const plant = {name: 'plant', sunlight: 'full'};

Object.defineProperty(plant, 'special', {
  value: 'something',
  writeable: false,  // not writeable!
  configurable: true,
  enumerable: true
});

console.log(plant.special);
// something

plant.special = 'other';
// TypeError: Cannot assign to read only property 'special' of object
```

### configurable

`configurable` controls whether you can modify any these characteristics. Once you change this characteristic to false, you can't change it back. An interesting side-effect of making a value *unconfigurable* is that it can't be deleted with `delete`:

```javascript
const plant = {name: 'plant', sunlight: 'full'};

Object.defineProperty(plant, 'special', {
  value: 'something',
  writeable: true,
  configurable: false,  // not configurable!
  enumerable: true
});

console.log(plant.special);
// something

delete plant.special
// TypeError: Cannot delete property 'special' of #<Object>
```

### enumerable

`enumerable` controls whether the property will be included in enumerations such as the `for..in` loop. Interestingly, this means that the property will be hidden from some methods like `Object.keys()` but not `Object.getOwnPropertyNames()`.

```javascript
const plant = {name: 'plant', sunlight: 'full'};

Object.defineProperty(plant, 'special', {
  value: 'something',
  writeable: true,
  configurable: true,
  enumerable: false  // not enumerable!
});

console.log(plant.special);
// something

for (let property in plant) {
  console.log('property: ' + property + ', value: ' + plant[property]);
};
// property: name, value: plant
// property: sunlight, value: full

console.log(Object.keys(plant));
// [ 'name', 'sunlight' ]

console.log(Object.getOwnPropertyNames(plant));
// [ 'name', 'sunlight', 'special' ]
```


## Immutability

As of ES5, there are tools (which include the *property descriptor* stuff above), that allow you to set objects and properties so that they cannot be changed. There are a variety of ways to do this, however, it goes without saying that you should have a good reason for doing so.

### constant property

By combining `writeable: false` with `configurable: false` as described above, you can make a *constant* property that cannot be changed, redefined or deleted.

```javascript
const myObj = {};

Object.defineProperty(myObj, 'ID', {
  value: '12345',
  writeable: false,
  configurable: false,
});
```

### prevent extension

`Object.preventExtensions()` prevents an object from having new properties added to it, but leave the rest of the objects properties alone:

```javascript
const myObj = {name: 'arthur', year: 1899};

Object.preventExtensions(myObj);

myObj.new = 'something';
// TypeError: Cannot add property new, object is not extensible
```


### seal

`Object.seal()` creates a "sealed" object in that it takes an existing object, calls `Object.preventExtensions()` on it and marks all its existing properties as `configurable: false`. As a result, you can can't add any new properties or delete existing ones, but you can still modify the values.

```javascript
const myObj = {name: 'arthur', year: 1899};

Object.seal(myObj);

myObj.year = 1901;

myObj.new = 'something';
// TypeError: Cannot add property new, object is not extensible
```


### freeze

`Object.freeze()` creates a "frozen" object. It calls `Object.seal()` on an existing object and also marks all the properties as `writeable: false`, so that their values cannot be changed. This is the highest level of immutability that you can attain for an object. Note though that any referenced objects within the object are unaffected.

```javascript
const myObj = {name: 'arthur', year: 1899};

Object.freeze(myObj);

myObj.year = 1901;
// TypeError: Cannot assign to read only property 'year' of object

myObj.new = 'something';
// TypeError: Cannot add property new, object is not extensible
```

**Note** you can check if an object is frozen, sealed or extensible with: `Object.isFrozen()`, `Object.isSealed()` and `Object.isExtensible()`.


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

Keep in mind when using getter (and setter) methods, regular properties cannot share the same name as the getter/setter function. If we do so, then calling the method will result in an infinite call stack error.

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


## Cascade (chaining methods)

Some methods return nothing (i.e. undefined). If we instead return `this`, we enable **cascades** where you  call many methods on the same object in sequence using dot notation. The cascade works because the object is passed from one method to the next.

For example:

```javascript
var textProcesor = {
  text: '',

  reverseString: function () {
    this.text = this.text.split('').reverse().join('');
    return this;  // allows us to chain methods together
  },

  camelCase: function () {
    let ccText = [];
    this.text = this.text.toLowerCase().split(' ');
    ccText.push(this.text.shift());
    while (this.text.length > 0) {
      let word = this.text.shift();
      ccText.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    this.text = ccText.join('');
    return this;  // allows us to chain methods together
  }
};


textProcesor.text = 'Top hats and bees';

// textProcesor.reverseString();
// console.log(textProcesor.text);
// seeb dna stah poT

// textProcesor.camelCase();
// console.log(textProcesor.text);
// topHatsAndBees

textProcesor.reverseString().camelCase();
console.log(textProcesor.text);
// seebDnaStahPot
```

Note that in if you remove the two return statements, you can still use the methods individually. A beneficial side effect of using cascades is that it discourages you from trying to do too much in one method and in turn makes your code more descriptive.


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


## Arrays

Arrays are objects that hold values of any type which are numerically indexed. For example:

```javascript
var arr = ['Jessica', 43, true,]

console.log(arr[0]);      // 'Jessica'
console.log(arr[1]);      // 43
console.log(arr[2]);      // true
console.log(arr.length);  // 3
```
Since arrays are objects too, you can do weird stuff like add properties to arrays. Note that any added properties aren't included in `.length`. Note as well that if you assign a new value to an array by index (i.e `myArray[5] = 'value'`), any indexes that don't yet exist up to that one will be created with the value `<empty item>`.

```javascript
var arr = ['Jessica', 43, true,];

arr.name = 'Jessica Array';

console.log(arr);
// [ 'Jessica', 43, true, name: 'Jessica Array' ]

console.log(arr.name);
// Jessica Array

console.log(arr.length);
// 3

arr[4] = 'testing';

console.log(arr.length);
// 5

console.log(arr);
//[ 'Jessica',
//  43,
//  true,
//  <1 empty item>,
//  'testing',
//  name: 'Jessica Array' ]

```

see [arrays.md](arrays.md)

## Functions

Functions (like Arrays) are a subtype of JavaScript `objects`.

```javascript
function foo() {
  return 43
}

console.log(typeof foo);    // function
console.log(typeof foo());  // number
```

Like arrays, they can have properties assigned:

```javascript
function foo() {
  return 43
}

foo.bar = 'baz';

console.log(foo.bar);
// baz
```

see [functions.md](functions.md)
