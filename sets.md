# Set Objects


## Table of Contents

<!-- toc -->

- [Introduction](#introduction)
- [Properties](#properties)
- [Methods](#methods)
  * [.add()](#add)
  * [.clear()](#clear)
  * [.delete()](#delete)
  * [.entries()](#entries)
  * [.forEach()](#foreach)
  * [.has()](#has)
  * [.values()](#values)
- [example: remove duplicates from array](#example-remove-duplicates-from-array)
- [example: common set operations](#example-common-set-operations)

<!-- tocstop -->

## Introduction

The [Set object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) lets you store *unique* values of any type, whether primitive values or object references.

The `Set` constructor accepts an iterable like a string or an array; all of its elements will be added to the new Set. If you don't specify this parameter, the new Set is empty.

```javascript
const set1 = new Set();
const set2 = new Set(['apple', 1, 2, 3]);
const set3 = new Set('apple', 1, 2, 3);
// const set4 = new Set(1, 2, 3, 'apple');
// TypeError: number 1 is not iterable

console.log(set1);
// Set(0) {}
console.log(set2);
// Set(4) { 'apple', 1, 2, 3 }
console.log(set3);
// Set(4) { 'a', 'p', 'l', 'e' }
```

## Properties

Sets have a `size` property instead of length.

```javascript
const set1 = new Set(['apple', 1, 2, 3]);

console.log(set1.size);
// 4
```

## Methods

### .add()

The `add()` method appends a new element with a specified value to the end of a Set object. Duplicate items will be ignored. If you want to add multiple items you can chain the method.

```javascript
const set1 = new Set(['apple', 1, 2, 3]);

set1.add(4);
set1.add('apple').add('orange').add('lemon');

console.log(set1);
// Set { 'apple', 1, 2, 3, 4, 'orange', 'lemon' }
```

### .clear()

The `clear()` method removes all elements from a Set object.

```javascript
const set1 = new Set(['apple', 1, 2, 3]);

set1.clear();

console.log(set1);
// Set {}
console.log(set1.size);
// 0
```

### .delete()

The `delete()` method removes the specified element from a Set object. If the specified value doesn't exist, it's ignored.

```javascript
const set1 = new Set(['apple', 1, 2, 3]);

set1.delete('apple')

console.log(set1);
// Set { 1, 2, 3 }
```

### .entries()

The `entries() `method returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. This seems a bit weird, but it's doing this to keep the API similar to the `Map` object. Since sets don't have keys, it uses the value as the key.

```javascript
const set1 = new Set(['run', 'swim', 'hike']);

const iterator = set1.entries();

console.log(typeof iterator, Array.isArray(iterator));
// object false

for (let i of iterator) {
  console.log(i);
  console.log(typeof i, Array.isArray(i));
  // [ 'run', 'run' ]
  // object true
  // [ 'swim', 'swim' ]
  // object true
  // [ 'hike', 'hike' ]
  // object true
}
```

As an iterator, you can also use the `next()` method. Note that these iterators are like Python generators in that when you've cycled through all the elements, it's done.

```javascript
const set1 = new Set(['run', 'swim', 'hike']);

const iterator = set1.entries();

console.log(iterator.next().value);
// [ 'run', 'run' ]
console.log(iterator.next().value);
// [ 'swim', 'swim' ]
console.log(iterator.next().value);
// [ 'hike', 'hike' ]
console.log(iterator.next().value);
// undefined
```

### .forEach()

The forEach() method executes a provided function (callback) once for each value in the Set object, in insertion order.

The callback is invoked with three arguments:

- the element value
- the element key
- the Set object being traversed

There are no keys in Set objects, so the first two arguments are both values contained in the Set. Like with the `entries()` method, this is to make it consistent with other forEach() methods for Map and Array.

```javascript
const set1 = new Set(['run', 'swim', 'hike']);

function imgFromSet(key, value, set) {
  let img = `<img src="${value}.png" alt="${key}" />`;
  console.log(img);
}

set1.forEach(imgFromSet);
// <img src="run.png" alt="run" />
// <img src="swim.png" alt="swim" />
// <img src="hike.png" alt="hike" />
```

That being said, looks like you can just do this to:

```javascript
const set1 = new Set(['run', 'swim', 'hike']);

function imgFromSet(value) {
  let img = `<img src="${value}.png" alt="${value}" />`;
  console.log(img);
}

set1.forEach(imgFromSet);
// <img src="run.png" alt="run" />
// <img src="swim.png" alt="swim" />
// <img src="hike.png" alt="hike" />
```

### .has()

The `has()` method returns a boolean indicating whether an element with the specified value exists in a Set object.

```javascript
const set1 = new Set(['run', 'swim', 'hike']);

console.log(set1.has('swim'));
// true

console.log(set1.has('dance'));
// false
```

### .values()

The `values()` method returns a new Iterator object that contains the values for each element in the Set object in insertion order.

There is also a `keys()` method which is an alias for this method (for similarity with Map objects); it behaves exactly the same and returns values of Set elements.

```javascript
const set1 = new Set(['run', 'swim', 'hike']);

const iterator = set1.values();

console.log(iterator.next().value);
// 'run'
console.log(iterator.next().value);
// 'swim'
console.log(iterator.next().value);
// 'hike'
console.log(iterator.next().value);
// undefined
```

## example: remove duplicates from array

```javascript
// To remove duplicate elements from an array:
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
console.log([...new Set(numbers)])
// [2, 3, 4, 5, 6, 7, 32]
```

## example: common set operations

```javascript
function isSuperset(set, subset) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

function union(setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function intersection(setA, setB) {
  const _intersection = new Set();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function symmetricDifference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }
  return _difference;
}

// Examples
const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 3])
const setC = new Set([3, 4, 5, 6])

isSuperset(setA, setB)          // returns true
union(setA, setC)               // returns Set {1, 2, 3, 4, 5, 6}
intersection(setA, setC)        // returns Set {3, 4}
difference(setA, setC)          // returns Set {1, 2}
symmetricDifference(setA, setC) // returns Set {1, 2, 5, 6}
```
