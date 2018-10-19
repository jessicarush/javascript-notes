# Properties


JavaScript associates certain properties with different data types. In fact, almost all JavaScript values have properties. The exceptions are null and undefined.

When you introduce a new piece of data into a JavaScript program, the browser saves it as an instance (object) of the data type. Instances automatically have additional information (properties) attached to them. For example, every string instance has a property called length that stores the number of characters (the length of a string is calculated when the instance is created). You can retrieve property information by using dot notation on the instance:

```javascript
console.log('Hello'.length);  
// 5
```
The number π (pi), or at least the closest approximation that fits in a JavaScript number, is available as `Math.PI` from the Math object:

```javascript
console.log(Math.PI);
// 3.141592653589793
```
