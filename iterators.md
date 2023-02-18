# Iterators (iteration methods)


Iterators are methods called on arrays to manipulate elements and return values. See also [loops.md](loops.md) which covers `for`, `for...in`, `for...of`, `while` and `do...while`.

## Table of Contents

<!-- toc -->

- [forEach()](#foreach)
- [filter()](#filter)
- [map()](#map)
- [flatMap()](#flatmap)
- [reduce() & reduceRight()](#reduce--reduceright)
- [findIndex()](#findindex)
- [fill()](#fill)
- [some()](#some)
- [every()](#every)
- [keys()](#keys)
- [values()](#values)

<!-- tocstop -->

## forEach()

The `forEach()` loops through an array and executes a provided function for each element. During each execution, the current array element is passed as an argument to the callback function.

```javascript
const myArray = ['bob', 'rick', 'morty'];

function myFunc(firstname) {
  console.log('Name: ' + firstname);
}

// forEach() takes one argument; a callback function.
myArray.forEach(myFunc);
// Name: bob
// Name: rick
// Name: morty
```

This example passes an anonymous function that uses *Arrow* syntax:

```javascript
const myArray = ['bob', 'rick', 'morty'];

myArray.forEach(firstname => {
  console.log('Name: ' + firstname);
});
// Name: bob
// Name: rick
// Name: morty
```

Note with `forEach()` you have access to the loop index:

```javascript
myArray.forEach((firstname, i) => {
  console.log(i + ' Name: ' + firstname);
});
// 0 Name: bob
// 1 Name: rick
// 2 Name: morty
```


## filter()

The `filter()` method creates an array filled with all array elements that pass a test (provided as a function). The test function should return either true or false.

```javascript
const items = ['this', 'that', 5, 'other', 2.5, 100];

function onlyNumbers(item) {
  return typeof item === 'number';  // will return either true or false
}

const numbers = items.filter(onlyNumbers);

console.log(numbers);
// [ 5, 2.5, 100 ]
```

And an anonymous function that uses *Arrow* syntax:

```javascript
const items = ['this', 'that', 5, 'other', 2.5, 100];

const numbers = items.filter(item => {
  return typeof item === 'number';
});

console.log(numbers);
// [ 5, 2.5, 100 ]
```

Here's a an example of using `filter()` to counting the number of occurrences of particular property value in array of objects:

```javascript
const fruit = [
  {id : 1, name : 'apple'},
  {id : 2, name : 'apple'},
  {id : 3, name : 'orange'},
  {id : 4, name : 'apple'}
]

const count = fruit.filter((obj) => obj.name === 'apple').length;

console.log(count); // 3
```

## map()

The `map()` method creates a new array with the results of calling a function for every array element. `The map()` method calls the provided function once for each element in an array, in order.

```javascript
const numbers = [3, 5, 10];

function square(num) {
  return num * num;
}

const squareNumbers = numbers.map(square);

console.log(squareNumbers);
// [ 9, 25, 100 ]
```

This example passes an anonymous function that uses *Arrow* syntax:

```javascript
const numbers = [3, 5, 10];

const squareNumbers = numbers.map(num => {
  return num * num;
});

console.log(squareNumbers);
// [ 9, 25, 100 ]
```

Even more condensed *Arrow* syntax:

```javascript
const numbers = [3, 5, 10];

const squareNumbers = numbers.map(num => num * num);

console.log(squareNumbers);
// [ 9, 25, 100 ]
```


## flatMap()

The `flatMap()` method first maps each element using a mapping function, then flattens the result into a new array. It is identical to a `map()` followed by a `flat()` of depth 1, but `flatMap()` is often quite useful, as merging both into one method is slightly more efficient.

```javascript
const myArray = ['2 - 3456 Main Street', 'Vancouver', 'BC', 'V5Z2X5'];

// using map() the result is lists within a list
myArray.map(x => x.split(' '));
// [["2", "-", "3456", "Main", "Street"], ["Vancouver"], ["BC"], ["V5Z2X5"]]

// using flatMap(), one (and only one) level is flattened
myArray.flatMap(x => x.split(' '));
// ["2", "-", "3456", "Main", "Street", "Vancouver", "BC", "V5Z2X5"]
```

\

## reduce() & reduceRight()

The `reduce()` method reduces the array to a single value. This method executes a provided function for each value of the array (from left-to-right). The return value of the function is stored in an accumulator (result/total).

```javascript
const randomNums = [5, 10, 1, 20];

const reducedNum = randomNums.reduce((accumulator, currentValue) => accumulator * currentValue);

console.log(reducedNum);
// 1000
```

You can pass an optional second argument to `reduce()`. This second arg will be used as the accumulator start value:

```javascript
const randomNums = [5, 10, 1, 20];

const reducedNum = randomNums.reduce((accumulator, currentValue) => accumulator * currentValue, 50);

console.log(reducedNum);
// 50000
```

This example flattens an array of arrays into a single array using reduce() and .concat():

```javascript
let arrays = [[1, 2, 3], [4, 5], [6]];

let flattened = arrays.reduce((accumulator, currentValue) => accumulator.concat(currentValue));

console.log(flattened);
// [1, 2, 3, 4, 5, 6]
```


## findIndex()

Calling `.findIndex()` on an array will return the index of the first element that evaluates to true in the callback function. If there isn't a single element in the array that satisfies the condition in the callback, then `findIndex()` will return -1.

```javascript
const randomNums = [123, 25, 78, 5, 9];

const lessThanTen = randomNums.findIndex(num => num < 10);

console.log(lessThanTen);
// 3
```

## fill()

This method changes all elements from a given start index to an end index in an array to a given static value. It returns the modified array.

```javascript
const myArray = [1, 2, 3, 4, 5, 6];

// fill with 0 from position 3 to position 6
myArray.fill(0, 3, 6);

console.log(myArray);
// [ 1, 2, 3, 0, 0, 0 ]
```

## some()

Returns true if at least one element in the array satisfies the provided testing function.

```javascript
let array = [1, 3, 8, 9];

const evens = element => element % 2 === 0;

console.log(array.some(evens));
// true
```


## every()

Returns true if every element in the array satisfies the provided testing function.

```javascript
let array = [1, 3, 8, 9];

const evens = element => element % 2 === 0;

console.log(array.every(evens));
// false
```

Another example using an array of objects:

```javascript
const colors = [
  { name: 'light gray', value: '#b9b9b9' },
  { name: 'silver', value: '#cbcbcb' },
  { name: 'fog', value: '#dbdbdb' },
  { name: 'mist', value: '#ebebeb' }
];

function isNameUnique(value) {
  return colors.every(c => c.name.toLowerCase() !== value.toLowerCase());
}
```


## keys()

Returns a new Array Iterator that contains the keys for each index in the array

```javascript
let array = [1, 3, 8, 9];

let arrayKeys = array.keys();

console.log(arrayKeys);
// Object [Array Iterator] {}

for (let key of arrayKeys) {
  console.log(key);
}
// 0, 1, 2, 3
```


## values()

Returns a new Array Iterator object that contains the values for each index in the array.

```javascript
let array = [1, 3, 8, 9];

let arrayVals = array.values();

console.log(arrayVals);
// Object [Array Iterator] {}

for (let val of arrayVals) {
  console.log(val);
}
// 1, 3, 8, 9
```

_____

[See MDN for more array iteration methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods).
