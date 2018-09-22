# Iterators (iteration methods)

Iterators are methods called on arrays to manipulate elements and return values.

## forEach()

The `forEach()` method calls a provided function once for each element in an array, in order.

```javascript
const myArray = ['bob', 'rick', 'morty'];

function myFunc(firstname) {
  console.log('Name: ' + firstname);
}

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

## findIndex()

```javascript
```

## reduce()

```javascript
```
