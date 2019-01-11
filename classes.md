# Classes


ES6 added the `class` keyword which gives us the ability to create *class-like* functions. Classes are a tool for creating templates to quickly produce similar objects. They work similar to constructor functions but have a few key differences mainly `super` and `static` (described below).

It should be noted JavaScript has tried to satisfy the desire to design with classes by providing class-like syntax, but classes in JS are *not* like classes in other languages. Under the hood, it's still just objects and prototypes. Basically, they're just faking it as best they can. For example, JavaScript doesn't provide a native mechanism for multiple inheritance the way say, Python does. What it boils down to is that classes in JavaScript are an optional design pattern that some developers prefer.

## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Inheritance](#inheritance)
- [Static Methods](#static-methods)

<!-- tocstop -->

## Syntax

Classes begin with a `class` keyword and include a `constructor` method. JavaScript calls this `constructor()` method every time it creates a new instance of the class.

```javascript
class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

const scott = new Contact('Scott', 'scott@email.com');

console.log(typeof Contact);
// function

console.log(typeof scott);
// object
```

Methods are also passed down to instances:

```javascript
class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  greeting(day) {
      console.log(`Hello ${this.name}, happy ${day}!`);
  }
}

const scott = new Contact('Scott', 'scott@email.com');

scott.greeting('Friday');
// Hello Scott, happy Friday!
```

Getters & setters work the same as they do on regular objects:

```javascript
class Contact {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  greeting(day) {
      console.log(`Hello ${this.name}, happy ${day}!`);
  }
}

const scott = new Contact('Scott', 'scott@email.com');

console.log(scott.email);
// scott@email.com
```

## Inheritance

With inheritance, you can create a parent class (also known as a superclass) with properties and methods that multiple child classes (also known as subclasses) share. The child classes inherit the properties and methods from their parent class.

The `extends` keyword makes the methods of the parent class available to a child class. The `super` keyword calls the constructor of the parent class.

In a `constructor()`, you must always call the `super` method before you can use the `this` keyword — if you don't, JavaScript will throw a reference error.

```javascript
class Contact {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  greeting(day) {
      console.log(`Hello ${this.name}, happy ${day}!`);
  }
}

class Family extends Contact {
  constructor(name, email, relationship) {
    super(name, email);
    this._relationship = relationship;
  }

  get relationship() {
    return this._relationship;
  }
}

const scott = new Family('Scott', 'scott@email.com', 'BF');
```

## Static Methods

Sometimes you will want a class to have methods that aren't available in individual instances, but that you can call directly from the class.

Take the `Date` class, for example — you can both create `Date` instances to represent whatever date you want, and call static methods, like `Date.now()` which returns the current date, directly from the class. The `.now()` method is static, so you can call it directly from the class, but not from an instance of the class.

```javascript
class Contact {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  greeting(day) {
      console.log(`Hello ${this.name}, happy ${day}!`);
  }

  static randomColor() {
    const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Violet', 'Black'];
    const randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];
  }
}

const scott = new Contact('Scott', 'scott@email.com');

console.log(Contact.randomColor());
// Yellow

// console.log(scott.randomColor());
// TypeError: scott.randomColor is not a function
```
