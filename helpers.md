# Common Helper Functions


## Table of Contents

<!-- toc -->

- [Capitalize first word](#capitalize-first-word)
- [Capitalize](#capitalize)
- [Random array element](#random-array-element)
- [Random boolean](#random-boolean)
- [Check if all values in array of arrays are equal](#check-if-all-values-in-array-of-arrays-are-equal)
- [Random RGB color](#random-rgb-color)
- [Hex to RGB, RGB to Hex](#hex-to-rgb-rgb-to-hex)

<!-- tocstop -->

## Capitalize first word

```javascript
/**
 * capitalizeFirstWord
 *
 * - Takes a string and capitalizes the first word.
 * - For example 'the great escape' => 'The great escape'
 *
 * @param {string} string The string to modify
 * @returns {string} The string with the first word capitalized.
 */
export function capitalizeFirstWord(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
```

## Capitalize

```javascript
/**
 * capitalize
 *
 * - Takes a string and capitalize the first letter of each word.
 * - For example 'the great escape' => 'The Great Escape'
 *
 * @param {string} string The string to modify
 * @returns {string} The string with each word capitalized.
 */
export function capitalize(string) {
  let words = [];
  string.split(' ').forEach((word) => {
    words.push(capitalizeFirstWord(word));
  });
  return words.join(' ');
}
```

## Random array element

```javascript
/**
 * Returns a random element from a given list
 */
 function randomSelect(array) {
   const randomIndex = Math.floor(Math.random() * array.length);
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

## Hex to RGB, RGB to Hex

```javascript
function rgbToHex(rgbString) {
  const rgb = rgbString.split(',').map(Number);
  const [r, g, b] = rgb;
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

console.log(rgbToHex('127,255,212'));   // #7fffd4
console.log(rgbToHex('104, 58, 249'));  // #683af9


function hexToRgb(hexString) {
  const hex = hexString.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

console.log(hexToRgb('#7fffd4'));  // 127, 255, 212
console.log(hexToRgb('683af9'));   // 104, 58, 249
```
