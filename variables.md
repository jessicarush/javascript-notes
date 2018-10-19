# Variables


## declaring

In JavaScript you need to *declare* your variables by name before you use them. This is done with the `var` keyword. You only need to declare your variables once for each *scope*.

```javascript
var a = 5;

a = a + 1;
a = a * 2;
console.log(a);  // 12
```

You can declare more than one variable using the same `var` (or `const`,`let`) keyword:

```javascript
var a = 5, b = 10, c = 100;
```

Some programming languages use *Static typing* or *type enforcement* which means you declare what type of data a variable will be. This method benefits program correctness by preventing unintended value conversions. Other languages (including JavaScript) use *weak typing* or *dynamic typing* which allows a variable to hold any type of value at any given time. The benefit of this is program flexibility.

Note that you *can* declare a variable without making an assignment. Until the assignment is made, the variable will hold the `undefined` primitive data type.

```javascript
var a;
console.log(a); // undefined

a = 10;
console.log(a);  // 10
```


## constants

Variables that are considered *constants*, should be written in uppercase with underscores and defined at the top of the program. For example:

```javascript
var TAX_RATE = 0.12;  // 12% sales tax
var ADMIN_FEE = 5;    // $5 flat admin fee
```
JavaScript ES6 introduced a new way to declare constants with the `const` keyword. For example:

```javascript
const TAX_RATE = 0.12;  // 12% sales tax
const ADMIN_FEE = 5;    // $5 flat admin fee
```

A `const` variable cannot be reassigned because it is constant. If you try to reassign a const variable, you'll get a `TypeError`. `const` variables must be assigned a value when declared. If you try to declare a `const` variable without a value, you'll get a `SyntaxError`.


## let

The `let` keyword was introduced in ES6. `let` allows you to declare variables that are limited in scope to the block, statement `{...}`, or expression on which it is used. This is unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope. `let` variables are usually used when there is a limited use of those variables. Say, in `for` loops, `while` loops or inside the scope of `if` conditions etc. Basically, where ever the scope of the variable has to be limited.

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


## global variables

As a side note: global variables are automatically also properties of the global object (`window` in browsers, etc). It's therefor possible to reference a global variable indirectly as a property reference: `window.a` instead of directly by it's *lexical* name `a`. This technique gives access to values that that might otherwise be *shadowed* an inner scope.

```javascript
var a = 'global a';

function foo() {
  var a = 'foo a';

  console.log(a);
  console.log(window.a);  // only works if run in the browser
}
foo();
```


## naming

Variable names (including function names) must be *valid identifiers*:
- an identifier must start with `a-z`, `A-Z`, `$` or `_`.
- It can then contain any of those characters plus `0-9`

JavaScript has some reserved words and keywords that should not be used for variable names. In theory they can be used for property names but I'd stay away from them for clarity.

```
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
```
abstract            boolean             byte                char
double              final               float               goto
int                 long                native              short
synchronized        throws              transient           volatile
```

Also avoid using the name of JavaScript built-in objects, properties, and methods:
```
Array               Date                eval                function
hasOwnProperty      Infinity            isFinite            isNaN
isPrototypeOf       length              Math                NaN
name                Number              Object              prototype
String              toString            undefined           valueOf
```

You should also avoid using the name of HTML and Window objects and properties:
```
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
```
onblur              onclick             onerror             onfocus
onkeydown           onkeypress          onkeyup             onmouseover
onload              onmouseup           onmousedown         onsubmit
```
