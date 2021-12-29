# Documenting

The following is a common approach of documenting functions called [JSDoc](https://jsdoc.app/index.html).

```javascript
/**
 * Summary - one line.
 *
 * Description.
 *
 * @param {type} arg1 description
 * @param {type} arg2 description
 * @returns {type} description
 */
function someFunction(arg1, arg2) {
 // Do something
}
```

For simpler functions, this could be shortened:

```javascript
/**
 * Summary.
 * @param {type} arg1 description
 * @param {type} arg2 description
 * @returns {type} description
 */
function someFunction(arg1, arg2) {
 // Do something
}
```

A real example, long form:

```javascript
/**
 * Debounce a given function, by a given delay.
 *
 * Returns a function that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If 'immediate' is passed, trigger the function on the
 * leading edge instead of the trailing edge.
 *
 * @param {function} func The function to be debounced
 * @param {number} delay The debounce delay in milliseconds
 * @param {boolean} immediate If true, triggers the function before delay
 * @returns {function}
 */
function debounce(func, delay, immediate) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) func.apply(context, args);
  };
};
```

A real example shorter form:

```javascript
/**
 * Return a random item from a given array.
 * @param {Array} array The array to choose a random item from
 * @returns {Object} A random item from the array
 */
function randomSelect(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
```

## types

The `{type}` should apparently be one of JavaScripts primitive built-ins, for example:

```text
{null}
{undefined}
{boolean}
{number}
{bigInt}
{string}
{Object}
{symbol}
```

Though it seems like this isn't strict. For example, though functions and arrays are not primitives types, I think it's acceptable to use them:

```text
{function}
{Array}
```

This syntax is also common:

```text
{*}               Allows any type
{(string|number)} A string or a number
{string[]}        An array of strings
{Object[]}        An array of objects
{Array<string>}   An array of strings
{Array<object>}   An array of objects
```

You will often see types written in both uppercase and lowercase. As it turns out, JSDoc doesn't care. It's a user preference. Some choose lowercase because that's what the `typeof` operator returns, some do a mix.

There are many, many more syntax examples but IMO it's best to keep it simple.
