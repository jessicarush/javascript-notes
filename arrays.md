# Arrays


Arrays are JavaScript's lists. Arrays can store any data types (including strings, numbers, booleans, and other arrays). Like lists in Python, arrays are ordered and mutable, meaning each item has a numbered position and can be assigned a new value.


## Table of Contents

<!-- toc -->

- [Syntax](#syntax)
- [Properties](#properties)
- [Empty Items](#empty-items)
- [Array Methods](#array-methods)
  * [Add items with *push()* or *unshift()*](#add-items-with-push-or-unshift)
  * [Remove and use items with *pop()* and *shift()*](#remove-and-use-items-with-pop-and-shift)
  * [Get a section of an array with *slice()*](#get-a-section-of-an-array-with-slice)
  * [Replace a section with *splice()*](#replace-a-section-with-splice)
  * [Merge two arrays into a new one with *concat()*](#merge-two-arrays-into-a-new-one-with-concat)
  * [Find if an item is present with *includes()*](#find-if-an-item-is-present-with-includes)
  * [Find the index of an item with *indexOf(), lastIndexOf()*](#find-the-index-of-an-item-with-indexof-lastindexof)
  * [Reverse an array with *reverse()*](#reverse-an-array-with-reverse)
  * [Convert an array to a string with *join()*](#convert-an-array-to-a-string-with-join)
  * [Convert a string to an array with *split()*](#convert-a-string-to-an-array-with-split)
- [Iteration Methods](#iteration-methods)
- [Array.from()](#arrayfrom)

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


## Array Methods

JavaScript also has a number of built-in *methods* which can be applied to arrays. Keep in mind, some methods will modify the original array, while others only return something from it.

You can see a full list of [built-in methods for arrays here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

See also: [iterators.md](iterators.md)

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

Note this method does *not* modify/mutate the original array.

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

console.log(myArray.slice(1, 4));  
// [ ''two', 'three', 'four' ]
console.log(myArray);              
// [ 'one', 'two', 'three', 'four', 'five ']
```


### Replace a section with *splice()*

This method takes 3 arguments: the starting index number, the total number of elements to remove from that position, and the items to insert. For example:

```javascript
const myArray = ['one', 'two', 'three', 'four', 'five'];

myArray.splice(2, 0, 'hey');
console.log(myArray);  
// [ 'one', 'two', 'hey', 'three', 'four', 'five' ]

myArray.splice(2, 1, 'hello');
console.log(myArray);  
// [ 'one', 'two', 'hello', 'three', 'four', 'five' ]

myArray.splice(1, 4, 'bye', 'farewell');
console.log(myArray);  
// [ 'one', 'bye', 'farewell', 'five' ]
```


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


### Find the index of an item with *indexOf(), lastIndexOf()*

Both indexOf and lastIndexOf take an optional second argument that indicates where to start searching.

```javascript
const myArray = ['one', 'two', 'three', 'four', 'one', 'five'];

console.log(myArray.indexOf('one'));  
// 0
console.log(myArray.lastIndexOf('one'));  
// 4
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
let myString = myArray.join(' ');  

console.log(myString);  
// one two three four five

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


## Iteration Methods

Arrays include a number of methods iterate over each item, performing some action/function each time. See: [iterators.md](iterators.md)


## Array.from()

As of ES6 we have this method which will convert array-like objects into actual array so that we can perform all the array methods. The most common example of this is working with DOM NodeLists (see [document_object_model.md](document_object_model.md)). While NodeLists look like arrays, they are not. If we try to use a `for...of` loop, it won't work. Here's were `Array.from()` is useful:

```javascript
let els = document.querySelectorAll('li.nav');

for (let el of Array.from(els)) {
    // pass
}
```
