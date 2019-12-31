# Common Helper Functions


## Table of Contents

<!-- toc -->

- [Random array element](#random-array-element)
- [Random boolean](#random-boolean)
- [Check if all values in array of arrays are equal](#check-if-all-values-in-array-of-arrays-are-equal)
- [Random RGB color](#random-rgb-color)

<!-- tocstop -->

## Random array element

```javascript
/**
 * Returns a random element from a given list
 */
 function randomSelect(array) {
   let randomIndex = Math.floor(Math.random() * array.length);
   return array[randomIndex];
 }

 export { randomSelect };
```


## Random boolean

```javascript
/**
 * Returns a random boolean
 */
function randomBoolean() {
  return Math.random() >= 0.5;
}

 export { randomBoolean };
```

## Check if all values in array of arrays are equal

```javascript
/**
 * Checks if all values in an array of arrays are the same.
 */
function checkValuesEqual(array) {
  let s = new Set([].concat(...array));
  return s.size === 1;
}

/**
 * Checks if all values in array of arrays are equal to a given value.
 *
 * let arrays = [[true, true, true], [true, true, true], [true]];
 */
function checkValuesEqualTo(array, value) {
  let s = new Set([].concat(...array));
  return (s.size === 1 && s.has(value));
}

/**
 * Checks if all values in array of arrays are equal to a given value.
 *
 * let arrays = [[true, true, true], [true, true, true], [true]];
 */
function checkValuesEqualTo(array, value) {
  return array.every(row => row.every(col => col === value));
}
```

## Random RGB color

```javascript
/**
 * Generate a random RGB color for CSS purposes
 *
 * Returns a string css rgb value like: rgb(255,120,10)
 */
function randomRGB() {
  // Generate a random number between 0 and given number (inclusive)
  function random(n) {
    return Math.floor(Math.random() * (n + 1));
  }
  return `rgb(${random(255)},${random(255)},${random(255)})`;
}

console.log(randomRGB());
// rgb(104,118,229)
```
