# Iterators (iteration methods)

Iterators are methods called on arrays to manipulate elements and return values.


## forEach()

The `forEach()` method calls a provided function once for each element in an array, in order. `forEach()` loops through the array and executes the callback function for each element. During each execution, the current element is passed as an argument to the callback function.

```javascript
const myArray = ['bob', 'rick', 'morty'];

function myFunc(firstname) {
  console.log('Name: ' + firstname);
}

myArray.forEach(myFunc); // forEach() takes one argument; a callback function.
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


## map()

The `map()` method creates a new array with the results of calling a function for every array element. `The map()` method calls the provided function once for each element in an array, in order.

```javascript
const numbers = [3, 5, 10];

function square(num) {
  return num * num;
}

const squareNumbers = numbers.map(square);

console.log(squareNumbers);  // [ 9, 25, 100 ]
```

This example passes an anonymous function that uses *Arrow* syntax:

```javascript
const numbers = [3, 5, 10];

const squareNumbers = numbers.map(num => {
  return num * num;
});

console.log(squareNumbers);  // [ 9, 25, 100 ]
```


## filter()

The `filter()` method creates an array filled with all array elements that pass a test (provided as a function). The test function should return either true or false.

```javascript
const items = ['this', 'that', 5, 'other', 2.5, 100];

function onlyNumbers(item) {
  return typeof item === 'number';  // will return either true or false
}

const numbers = items.filter(onlyNumbers);

console.log(numbers);  // [ 5, 2.5, 100 ]
```

And an anonymous function that uses *Arrow* syntax:

```javascript
const items = ['this', 'that', 5, 'other', 2.5, 100];

const numbers = items.filter(item => {
  return typeof item === 'number';
});

console.log(numbers);  // [ 5, 2.5, 100 ]
```


## reduce()

The `reduce()` method reduces the array to a single value. This method executes a provided function for each value of the array (from left-to-right). The return value of the function is stored in an accumulator (result/total).

```javascript
const randomNums = [5, 10, 1, 20];

const reducedNum = randomNums.reduce((accumulator, currentValue) => accumulator * currentValue);

console.log(reducedNum);  // 1000
```

You can pass an optional second argument to `reduce()`. This second arg will be used as the accumulator start value:

```javascript
const randomNums = [5, 10, 1, 20];

const reducedNum = randomNums.reduce((accumulator, currentValue) => accumulator * currentValue, 50);

console.log(reducedNum);  // 50000
```


## findIndex()

Calling `.findIndex()` on an array will return the index of the first element that evaluates to true in the callback function. If there isn't a single element in the array that satisfies the condition in the callback, then `findIndex()` will return -1.

```javascript
const randomNums = [123, 25, 78, 5, 9];

const lessThanTen = randomNums.findIndex(num => num < 10);

console.log(lessThanTen);  // 3
```


______

More [array iteration methods here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods).
