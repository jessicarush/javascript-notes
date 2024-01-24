# Variables


As with many other languages, JavaScript variables are containers for storing data values.

## Table of Contents

<!-- toc -->

- [declaring variables](#declaring-variables)
- [undeclared vs undefined](#undeclared-vs-undefined)
- [constants](#constants)
- [let](#let)
- [which to use: const, let, var](#which-to-use-const-let-var)
- [global variables](#global-variables)
- [where to declare](#where-to-declare)
- [globalThis](#globalthis)
- [naming (reserved words)](#naming-reserved-words)

<!-- tocstop -->

## declaring variables

In JavaScript you need to *declare* your variables by name before you use them. This is done with the `var`, `const`, or `let` keywords. You only need to declare your variables once for each *scope*.

```javascript
var a = 5;

a = a + 1;
a = a * 2;
console.log(a);  // 12
```

You can declare more than one variable using the same `var`, `const` or `let` keyword. This is called *comma-separated variable declaration*.

```javascript
var a = 5, b = 10, c = 100;
```

Some programming languages use *Static typing* or *type enforcement* which means you declare what type of data a variable will hold. This method benefits program correctness by preventing unintended value conversions. Other languages, JavaScript included, use *weak* or *dynamic typing* which allows a variable to hold any type of value at any given time. The benefit of this is program flexibility.


## undeclared vs undefined

Note that you can declare a variable without making an assignment. Until the assignment is made, the variable will hold the `undefined` primitive data type.

```javascript
var a;
console.log(a);         // undefined
console.log(typeof a);  // undefined

a = 10;
console.log(a);         // 10
console.log(typeof a);  // number
```

But, if you forget to declare a variable, you'll raise
an error:

```javascript
b = 10; // ReferenceError: b is not defined
```

Even if you want to check if a variables exists:

```javascript
if (b) {  // ReferenceError: b is not defined
  console.log('test');
}
```

That being said, you *can* use the `typeof` operator on undeclared variables:

```javascript
console.log(typeof b);  // undefined
```

This behaviour makes the `typeof` operator useful when checking for a flag variable in multiple files. If we just check for the variable with `if`, then we need to make sure that variable is defined in every single file. If we don't want to do that you could use typeof instead.

This won't work:

```javascript
if (FLAG) {
  console.log('test');
}
```

This works:

```javascript
var FLAG = false;

if (FLAG) {
  console.log('test');
}
```

And this works:

```javascript
if (typeof FLAG !== 'undefined') {
  console.log('test');
}
```


## constants

Traditionally, variables that are considered *constants*, would be written in uppercase with underscores and defined at the top of the program. For example:

```javascript
var TAX_RATE = 0.12;  // 12% sales tax
var ADMIN_FEE = 5;    // $5 flat admin fee
```

JavaScript ES6 introduced a new way to declare constants with the `const` keyword. For example:

```javascript
const TAX_RATE = 0.12;  // 12% sales tax
const ADMIN_FEE = 5;    // $5 flat admin fee
```

However, these don't need to adhere to the uppercase, top of the program rules. Instead, `const` should simply be used for block-scoped variables where the value will not need to be reassigned. From MDN:

> Constants are block-scoped, much like variables declared using the let keyword. The value of a constant can't be changed through reassignment (i.e. by using the assignment operator), and it can't be re-declared (i.e. through a variable declaration). However, if a constant is an object or array its properties or items can be updated or removed.

If you try to reassign a const variable, you'll get a `TypeError`. `const` variables must be assigned a value when declared. If you try to declare a `const` variable without a value, you'll get a `SyntaxError`.


## let

The `let` keyword was also introduced in ES6. `let` allows you to declare variables that are limited in scope to the block, statement `{...}`, or expression on which it is used. This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope. `let` variables are usually used when there is a limited use of those variables. Say, in `for` loops, `while` loops or inside the scope of `if` conditions etc. Basically, where ever the scope of the variable has to be limited.

```javascript
for (let i = 0; i <= 5; i++) {
  console.log(i + '...');
};

console.log(i);  // ReferenceError: i is not defined

for (var i = 0; i <= 5; i++) {
  console.log(i + '...');
};

console.log(i);  // 6
```

Like `var`, you can declare a `let` variable before you assign to it:

```javascript
let a;
console.log(a); // undefined

a = 10;
console.log(a);  // 10
```

At the top level of programs and functions, let, unlike var, does not create a property on the *global object*. For example:

```javascript
var x = 'var';
let y = 'let';

console.log(this.x); // var
console.log(this.y); // undefined
```

Going forward the intention is that the `var` keyword is used in pre-ES6 versions of JS. `let` is the preferred way to declare a variable when it can be reassigned, and `const` is the preferred way to declare a variable with a constant value.

## which to use: const, let, var

A good rule of thumb:

- use `const` by default
- use `let` only when you need to reassign a variable
- don't use `var`


## global variables

JavaScript makes it easy to define global variables that can hold all of the assets of your application. Unfortunately, global variables weaken the resiliency of programs and should be avoided. There are are number of ways to do this. One way, is to create a single global variable for your application. By reducing your global footprint to a single name, you significantly reduce the chance of bad interactions with other applications, widgets or libraries.

```javascript
const myapp = {};

myapp.info = 'hello';
myapp.something = {
    // code
};
myapp.other = function () {
    // code
};
```

Another method would be to use closure.

```javascript
// todo
```

As a side note: global variables are automatically also properties of the global object (`window` in browsers). It is therefor possible to reference a global variable indirectly as a property reference: `window.a` instead of directly by it's *lexical* name `a`. This technique gives access to values that that might otherwise be *shadowed* an inner scope.

```javascript
var a = 'global a';

function foo() {
  var a = 'foo a';

  console.log(a);
  console.log(window.a);  // only works if run in the browser
}
foo();
```

Speaking of windows, using the developer tools in the console you can type `Object.keys(window)` to get a list of all the global variables. Yours will be at the end `[200...]`.


## where to declare

There are a number of approaches as to where you should declare your variables. One convention is to declare it at its first use. Another convention is, in functions, to declare all the variables at the beginning of each function. The reason for this is because blocks traditionally don't have scope, only functions do. That has changed however with the introduction of the `let` keyword. For example:

```javascript
var a = 10;
var b = 15;
{
  let b = 1;
  console.log(a + b);  // 11
}
```

So, the convention of declaring most variables at the beginning of a function feels like a good one, but that doesn't mean we can't declare some where they appear when it makes sense to do so.


## globalThis

ES2020 introduced `globalThis` which always refers to the global object, no matter where you are executing your code.

Previously, if you wrote some cross-platform JavaScript code which could run on Node, in the browser environment, and also inside web-workers, you'd have a hard time getting hold of the global object. This is because it is `window` for browsers, `global` for Node, and `self` for web workers. 

```javascript
console.log(globalThis); // Window {...} for browsers
console.log(globalThis); // Object [global] {...} for Node
console.log(globalThis); // DedicatedWorkerGlobalScope {...} for Web Workers
```


## naming (reserved words)

Variable names (including function names) must be *valid identifiers*:

- an identifier must start with `a-z`, `A-Z`, `$` or `_`.
- It can then contain any of those characters plus `0-9`
- NO dashes `-`

JavaScript has some reserved words and keywords that should not be used for variable names. In theory they can be used for property names but I'd stay away from them for clarity.

```text
abstract            arguments           await*              boolean
break               byte                case                catch
char                class*              const               continue
debugger            default             delete              do
double              else                enum*               eval
export*             extends*            false               final
finally             float               for                 function
goto                if                  implements          import*
in                  instanceof          int                 interface
let*                long                native              new
null                package             private             protected
public              return              short               static
super*              switch              synchronized        this
throw               throws              transient           true
try                 typeof              var                 void
volatile            while               with                yield
```

These have been removed from the ECMAScript 5/6 standard but should still be avoided:

```text
abstract            boolean             byte                char
double              final               float               goto
int                 long                native              short
synchronized        throws              transient           volatile
```

Also avoid using the name of JavaScript built-in objects, properties, and methods:

```text
Array               Date                eval                function
hasOwnProperty      Infinity            isFinite            isNaN
isPrototypeOf       length              Math                NaN
name                Number              Object              prototype
String              toString            undefined           valueOf
```

You should also avoid using the name of HTML and Window objects and properties:

```text
alert               all                 anchor              anchors
area                assign              blur                button
checkbox            clearInterval       clearTimeout        clientInformation
close               closed              confirm             constructor
crypto              decodeURI           decodeURIComponent  defaultStatus
document            element             elements            embed
embeds              encodeURI           encodeURIComponent  escape
event               fileUpload          focus               form
forms               frame               innerHeight         innerWidth
layer               layers              link                location
mimeTypes           navigate            navigator           frames
frameRate           hidden              history             image
images              offscreenBuffering  open                opener
option              outerHeight         outerWidth          packages
pageXOffset         pageYOffset         parent              parseFloat
parseInt            password            pkcs11              plugin
prompt              propertyIsEnum      radio               reset
screenX             screenY             scroll              secure
select              self                setInterval         setTimeout
status              submit              taint               text
textarea            top                 unescape            untaint
window
```

In addition you should avoid using the name of all HTML event handlers:

```text
onblur              onclick             onerror             onfocus
onkeydown           onkeypress          onkeyup             onmouseover
onload              onmouseup           onmousedown         onsubmit
```
