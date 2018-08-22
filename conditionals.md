# Conditionals

Any series of statements in JavaScript can be grouped together into a *block* using the curly braces `{...}`. When working with conditionals or loops, we'll have to move our statements into blocks. For example:

```javascript
const LEGAL_AGE = 19;  
var age = prompt('Enter your age:');

if (age > LEGAL_AGE) {
  console.log("You're old enough to drink!");
}
else {
  console.log("You're young enough to dream!");
}
```

Note that you don't need a semicolon after a block `{...}`
