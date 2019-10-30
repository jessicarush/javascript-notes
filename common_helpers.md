# Common Helper Functions

## Table of Contents
<!-- toc -->

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
