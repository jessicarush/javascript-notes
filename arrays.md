# Arrays


Arrays are JavaScript's lists. Arrays can store any data types (including strings, numbers, booleans, and other arrays). Like lists in Python, arrays are ordered and mutable, meaning each item has a numbered position and can be assigned a new value.

```javascript
// an array literal:
const exampleArray = ['example', 10, true, ['nested', 'array']];
```

Array elements/items can be accessed with bracket notation:

```javascript
// Array indexing starts at 0
console.log(exampleArray[0]);  
// example

// Access items within nested arrays:
console.log(exampleArray[3][0]);  
// nested

// FYI bracket notation works on strings too:
console.log(exampleArray[0][1]);  
// x

//If you try to access an index out of range, you'll get `undefined`
console.log(exampleArray[4]);  
// undefined
```

You can use bracket notation to assign a new value to an array index:

```javascript
exampleArray[2] = false;

console.log(exampleArray);  
// [ 'example', 10, false ]
```

Arrays have a built-in `length` *property* which can be accessed with dot notation:
```javascript
console.log(exampleArray.length);  
// 3
```


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


### Merge two arrays into a new one with *.concat()*

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
