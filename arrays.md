# Arrays


JavaScript arrays are like lists in Python. Arrays can store any data types (including strings, numbers, booleans, and other arrays). Like lists in Python, arrays are ordered and mutable, meaning each item has a numbered position and can be assigned a new value.


## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Properties](#properties)
- [Empty Items](#empty-items)
- [Array static methods](#array-static-methods)
  * [Array.isArray()](#arrayisarray)
  * [Array.from()](#arrayfrom)
- [Array instance methods](#array-instance-methods)
- [Iteration array methods](#iteration-array-methods)
  * [Add items with *push()* or *unshift()*](#add-items-with-push-or-unshift)
  * [Remove and use items with *pop()* and *shift()*](#remove-and-use-items-with-pop-and-shift)
  * [Get a section of an array with *slice()*](#get-a-section-of-an-array-with-slice)
  * [Replace or remove a section with *splice()*](#replace-or-remove-a-section-with-splice)
  * [Create a copy of an array with `...`](#create-a-copy-of-an-array-with-)
  * [Merge two arrays into a new one with *concat()*](#merge-two-arrays-into-a-new-one-with-concat)
  * [Find if an item is present with *includes()*](#find-if-an-item-is-present-with-includes)
  * [Find an element via a test function with *find()*](#find-an-element-via-a-test-function-with-find)
  * [Find the index of an item with *indexOf(), lastIndexOf()*](#find-the-index-of-an-item-with-indexof-lastindexof)
  * [Reverse an array with *reverse()*](#reverse-an-array-with-reverse)
  * [Convert an array to a string with *join()*](#convert-an-array-to-a-string-with-join)
  * [Convert a string to an array with *split()*](#convert-a-string-to-an-array-with-split)
  * [Sort an array in place with *sort()*](#sort-an-array-in-place-with-sort)
- [Array iteration methods](#array-iteration-methods)
- [Unpacking arrays into variables](#unpacking-arrays-into-variables)
- [Flattening arrays](#flattening-arrays)
- [Sneaky "reassignment" of an array](#sneaky-reassignment-of-an-array)

<!-- tocstop -->

## Syntax

```javascript
// an array literal (preferred):
let array1 = ['example', 10, true, ['nested', 'array']];

// an array constructor
let array2 = new Array('example', 10, true, new Array('nested', 'array'));
```

Array elements/items can be accessed with bracket notation:

```javascript
// Array indexing starts at 0
console.log(array1[0]);  
// example

// Access items within nested arrays:
console.log(array1[3][0]);  
// nested

// FYI bracket notation works on strings too:
console.log(array1[0][1]);  
// x

//If you try to access an index out of range, you'll get `undefined`
console.log(array1[4]);  
// undefined
```

You can use bracket notation to assign a new value to an array index:

```javascript
array1[3] = false;

console.log(array1);
// [ 'example', 10, true, false ]
```


## Properties

Arrays have a built-in `length` *property* which can be accessed with dot notation:
```javascript
console.log(array1.length);  // 4
```

Beyond that, arrays are objects so we can add properties to them (with dot or bracket notation), just like any other object. These properties will not impact the length reported by the `length` property.

```javascript
let array = [ 'one', 'two', 'three' ];

console.log(array.length);     // 3

array['first'] = 'foo';
array.second = 'bar';

console.log(array.length);     // 3

console.log(array.first);      // foo
console.log(array['second']);  // bar
```

That being said, just because we can, doesn't mean we should. If you need to include key/value pairs, you should probably use an object and leave arrays as simply indexed lists.


## Empty Items

If you assign a new value to an index position that is beyond the current length of the array, all the empty indexes will be filled in with values: `<# empty item>`

```javascript
let array = ['one']
array[6] = 'six';

console.log(array.length);  // 7
console.log(array[2]);      // undefined
console.log(array);         // [ 'one', <5 empty items>, 'six' ]
```

The `delete` keyword lets you remove array items, but the same thing will happen... the list will stay the same length and the value at the deleted index will be appear to be `undefined`:

```javascript
let array = [ 'one', 'two', 'three' ];

console.log(array.length);  // 3

delete array[2];

console.log(array.length);  // 3
console.log(array[2]);      // undefined
console.log(array);         // [ 'one', 'two', <1 empty item> ]
```

While the values at these empty positions appear to be `undefined`, they will not behave the same as an index explicitly set to `undefined` as in `array[0] = undefined;`. In general, be careful about creating these kinds of *sparse* arrays (leaving or creating empty/missing spots).  


## Array static methods

### Array.isArray()

One of the most useful Array static methods is `isArray()`:

```javascript
let a = [];

console.log(Array.isArray(a));  // true
```

### Array.from()

As of ES6 we have this method which will convert array-like objects into actual arrays so that we can perform all the array methods. The most common example of this is working with DOM NodeLists (see [document_object_model.md](document_object_model.md)). While NodeLists look like arrays, they are not. If we try to use a `for...of` loop, it won't work. Here's where `Array.from()` is useful:

```javascript
let els = document.querySelectorAll('li.nav');

for (let el of Array.from(els)) {
    // pass
}
```

You can also make arrays from objects with a length property. For example, the following will create an array of 4 undefined or null:

```javascript
let myArray = Array.from({ length: 4 });

console.log(myArray);
// [ undefined, undefined, undefined, undefined ]
```


## Array instance methods

JavaScript also has a number of built-in *instance methods* which can be applied to arrays. Keep in mind, some methods will modify the original array, while others return something new. See the full list of [built-in methods for arrays here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).


## Iteration array methods

Some array instance methods iterate over arrays to manipulate elements and return values. This iteration-type methods can be found in <iterators.md>.

- [forEach()](iterators.md#foreach)
- [filter()](iterators.md#filter)
- [map()](iterators.md#map)
- [flatMap()](iterators.md#flatmap)
- [reduce() & reduceRight()](iterators.md#reduce--reduceright)
- [findIndex()](iterators.md#findindex)
- [fill()](iterators.md#fill)
- [some()](iterators.md#some)
- [every()](iterators.md#every)
- [keys()](iterators.md#keys)
- [values()](iterators.md#values)


### Add items with *push()* or *unshift()*

The `push()` method adds items to the end of an array and `unshift()` adds to the start:

```javascript
const myArray = ['one', 'two', 'three'];

myArray.push('four', 'five');
myArray.unshift('zero');

console.log(myArray);  
// [ 'zero', 'one', 'two', 'three', 'four', 'five' ]
```


### Remove and use items with *pop()* and *shift()*

The `pop()` method removes the last item and makes it available for use, `shift()` removes the first item.

```javascript
const myArray = ['one', 'two', 'three'];

let removed = myArray.pop();

console.log(myArray);   
// [ 'one', 'two' ]
console.log(removed);  
// three

removed = myArray.shift();

console.log(myArray);   
// [ 'two' ]
console.log(removed);
 // one
```


### Get a section of an array with *slice()*

Note this method does *not* modify/mutate the original array, but returns a new one.

```javascript
const originalArray = ['one', 'two', 'three', 'four', 'five'];

let newArray = originalArray.slice(1, 4);

console.log(newArray);  
// [ two', 'three', 'four' ]
console.log(originalArray);
// [ 'one', 'two', 'three', 'four', 'five ']
```


### Replace or remove a section with *splice()*

This method takes 3 arguments: the starting index number, the total number of elements to remove from that position, and the (optional) items to insert. It returns a new array of the items removed. For example:

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

myArray.splice(1, 1);
console.log(myArray);
// [ 'one', 'three', 'four', 'five' ]

myArray.splice(2, 0, 'hey');
console.log(myArray);
// [ 'one', 'three', 'hey', 'four', 'five' ]

myArray.splice(2, 1, 'hello');
console.log(myArray);
// [ 'one', 'three', 'hello', 'four', 'five' ]

myArray.splice(1, 4, 'bye', 'farewell');
console.log(myArray);
// [ 'one', 'bye', 'farewell' ]

let spliced = myArray.splice(1, 2);
console.log(myArray);
// [ 'one' ]
console.log(spliced);
// [ 'bye', 'farewell' ]
```


### Create a copy of an array with `...`

```javascript
const array1 = ['a', 'b', 'c'];
const array2 = array1;          // not a copy!
const array3 = array1.slice();  // old method to copy
const array4 = [...array1];     // ES6+ method to copy

array1.push('d');

console.log(array1);  // [ 'a', 'b', 'c', 'd' ]
console.log(array2);  // [ 'a', 'b', 'c', 'd' ]
console.log(array3);  // [ 'a', 'b', 'c' ]
console.log(array4);  // [ 'a', 'b', 'c' ]
```

The `...` above is called *spread syntax* or *rest parameters* when applied to functions. It allows an iterable such as an array to be expanded in places where zero or more elements are expected.


### Merge two arrays into a new one with *concat()*

```javascript
const arrayA = ['one', 'two', 'three'];
const arrayB = ['four', 'five', 'six'];
const arrayC = arrayA.concat(arrayB);

console.log(arrayC);
// [ 'one', 'two', 'three', 'four', 'five', 'six' ]
```

Note, if you pass concat an argument that is not an array, that value will be added to the new array as if it were a one-element array.


### Find if an item is present with *includes()*

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

console.log(myArray.includes('four'));
// true
```


### Find an element via a test function with *find()*

The find() method returns the value of the first element in the array that satisfies the provided testing function.

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

function test(element) {
  return element.startsWith('f');
}

const found =  myArray.find(test);

console.log(found);
// four
```

This can be useful for looking for values within objects like so:

```javascript
let items = [
  {id: 1, data: 'one'},
  {id: 2, data: 'two'},
  {id: 3, data: 'three'}
];


if (items.find(o => o.id === 2)) {
  console.log('Found it');
} else {
  console.log('Not found');
}
// Found it
```


### Find the index of an item with *indexOf(), lastIndexOf()*

Both indexOf and lastIndexOf take an optional second argument that indicates where to start searching.

```javascript
const myArray = ['one', 'two', 'three', 'one', 'four', 'five', 'six', 'one'];

console.log(myArray.indexOf('one'));  
// 0

console.log(myArray.indexOf('one', 2));  // start from index 2
// 3

console.log(myArray.lastIndexOf('one'));
// 7
```


### Reverse an array with *reverse()*

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

myArray.reverse();

console.log(myArray);
// [ 'five', 'four', 'three', 'two', 'one' ]
```


### Convert an array to a string with *join()*

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

// the argument passed is the separator
let myString = myArray.join('_');  

console.log(myString);  
// one_two_three_four_five

console.log(typeof myString);  
// string
```


### Convert a string to an array with *split()*

```javascript
const myString = 'one two three four five';

// the argument passed is the separator
let myArray = myString.split(' ');  

console.log(myArray);  
// [ 'one', 'two', 'three', 'four', 'five' ]
```


### Sort an array in place with *sort()*

```javascript
const myArray = ['dairy', 'apple', 'elderberry', 'corn', 'banana'];

myArray.sort();

console.log(myArray);
// [ 'apple', 'banana', 'corn', 'dairy', 'elderberry' ]
```

The sort method uses a comparison function that assumes the values are strings and therefor does not work well with numbers:

```javascript
let numArray = [2, 1001, 239, 25, 1, 12];

console.log(numArray.sort());
// [ 1, 1001, 12, 2, 239, 25 ]
```

That being said, you can provide your own comparison function. The function should take two parameters and:
- return 0 if the two are equal.
- return a negative number if the first parameter should come first
- return a positive number if the second parameter should come first

```javascript
let numArray = [2, 1001, 239, 25, 1, 12];

numArray.sort(function (a, b) {
  return a - b;
});

console.log(numArray);
// [ 1, 2, 12, 25, 239, 1001 ]
```

Here's the same function but written shorter using arrow syntax:

```javascript
let numArray = [2, 1001, 239, 25, 1, 12];

numArray.sort((a, b) => a - b);

console.log(numArray);
// [ 1, 2, 12, 25, 239, 1001 ]
```

## Array iteration methods

Arrays include a number of methods that iterate over each item, performing some action/function each time.

See: [iterators.md](iterators.md)


## Unpacking arrays into variables

With ES6 destructuring, you can unpack an array into multiple variables in a short assignment:

```javascript
let rgb = '127,255,212';

let [r, g, b] = rgb.split(',');

console.log(`red: ${r}, green: ${g}, blue: ${b}`);
// red: 127, green: 255, blue: 212
```

## Flattening arrays

There are a number of ways to "flatten" and array of arrays into one array. The simplest (I think) is the [`array.flat()` method but it's still in Draft version](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) and doesn't seem to work most places.

Eventually though, this will be great:

```javascript
let arrays = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];

let flattenedArray = arrays.flat();

console.log(flattenedArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Until then, the next simplest is using the ES6 spread operator `...`:

```javascript
let arrays = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];

let flattenedArray = [].concat(...arrays);
console.log(flattenedArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Without the spread operator you could do like this:

```javascript
let arrays = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];

let flattenedArray = [].concat.apply([], arrays);
console.log(flattenedArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

or this:
```javascript
let arrays = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];

let flattenedArray = arrays.reduce((acc, curr) => {
  return acc.concat(curr);
});
console.log(flattenedArray);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```


## Sneaky "reassignment" of an array

This situation is kind of interesting. We know that because of scope, if you try to reassign a variable passed to a function, it won't work because they are pointing to different values. But we can modify the arg as much as we want, for example:

```javascript
function foo(arg) {
  arg.push(4);
  console.log(arg);  // [1, 2, 3, 4]

  arg = [5, 6, 7];   // new variable created!
  console.log(arg);  // [5, 6, 7]
}

const a = [1, 2, 3];
foo(a);
console.log(a); // [1, 2, 3, 4]
```

But check this out...
```javascript
function foo(arg) {
  arg.push(4);
  console.log(arg);  // [1, 2, 3, 4]

  arg.length = 0;    // trick to clear out an array!
  arg.push(5, 6, 7);
  console.log(arg);  // [5, 6, 7]
}

const a = [1, 2, 3];
foo(a);
console.log(a); // [5, 6, 7]
```

Bananas!
