# Recursion


A recursive function is a function that calls itself. Here's an example function that determines a numbers factorial using recurion:

```javascript
const factorial = function factorial(n, i) {
    i = i || 1;
    if (n < 2) {
        return i;
    }
    return factorial(n - 1, n * i);
};

console.log(factorial(5));
// 120
```

Here's another example of recursion. This is also a good demonstartion of closure in that the inner function always remembers the value of `level`:

```javascript
// A function that sets A DOM node's color to yellow then fades to white.

var fade = function (node) {
  var level = 1;
  var step = function () {
    var hex = level.toString(16);
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

el = document.querySelector('h1');
console.log(el.nodeName);

fade(el);
```
