# Objects

In JavaScript, objects are like a Python dictionary. They are compound values where you can set properties (named locations, keys) that each hold their own values of any type. For example:

```javascript
var obj = {
  name: 'Jessica',
  age: 43,
  admin: true
};

// access properties using dot notation

console.log(obj.name);   // Jessica
console.log(obj.age);    // 43
console.log(obj.admin);  // true

// or bracket notation (but dot notation is preferred):

console.log(obj['name']);   // Jessica
console.log(obj['age']);    // 43
console.log(obj['admin']);  // true

```

Though dot notation is preferred, bracket notation is useful for when the property name is stored in another variable, such as:

```javascript
var p = prompt('name, age or admin? ');

console.log(obj[p]);
```


## Arrays

Arrays are like Python lists. They are objects that hold values of any type which are numerically indexed. For example:

```javascript
var arr = [
  'Jessica',
  43,
  true,
]

console.log(arr[0]);      // 'Jessica'
console.log(arr[1]);      // 43
console.log(arr[2]);      // true
console.log(arr.length);  // 3
```

## Functions

Functions (like Arrays) are a subtype of JavaScript `objects`.

```javascript
function foo() {
  return 43
}

console.log(typeof foo);    // function
console.log(typeof foo());  // number
```
