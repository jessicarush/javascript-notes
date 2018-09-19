# Misc JavaScript Notes

## Comments
Code comments can be done in two ways:
```javascript
a = 5;  // single line comment

/*
Multi-line
comment
*/
 ```

Comments in your code should explain *why*, not *what*. They can also explain *how* if the code is particularly confusing.

## Output

This function is used to print (or log), text to the developer console. In this case, `console` is the object and `.log()` is the function call.

```javascript
console.log('Hello!');
```

This function will print to the HTML page:

```javascript
document.writeln('Hello?');
```

This function will write to an alert pop-up:
```javascript
alert('Hello.');
```

## Input

While you would generally create an HTML form to receive user input, a cheap and easy way for learning and demonstration purposes is to use the `prompt()` function:

```javascript
x = prompt('Enter a number:');
console.log(x);
```


## Strict mode

SE5 added a *strict mode*, which tightens the rules for certain behaviors. This is generally recommended as these restrictions help keep code safer, more optimizable and more closely represents the future direction of the language. You can enable *strict mode* for individual functions or entire files depending on where you place the *strict mode pragma*:

```javascript
function foo() {
  'use strict';
  // this functions code is strict mode
}
```
versus:

```javascript
'use strict';
// the whole document is strict mode... just do this

function foo() {
}
```
