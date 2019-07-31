# JSON

## Table of Contents

<!-- toc -->

- [Introduction](#introduction)
- [Encode & Decode](#encode--decode)
  * [optional arg: replacer](#optional-arg-replacer)
  * [optional arg: space](#optional-arg-space)
- [Customize Encoding](#customize-encoding)
- [See also:](#see-also)

<!-- tocstop -->

## Introduction

If you want to save data in a file for later or send it to another computer over a network, you have to *serialize* the data. That means it is converted into a flat description. A popular serialization format is JSON (JavaScript Object Notation). It is widely used as a data storage and communication format on the Web, even in languages other than JavaScript.

JSON looks similar to JavaScript’s way of writing arrays and objects, with a few restrictions. All property names have to be surrounded by double quotes, and only simple data expressions are allowed—no function calls, bindings, or anything that involves actual computation. Comments are not allowed in JSON.

JSON has six kinds of values: objects, arrays, strings, numbers, booleans (true, false), and the special value null.

## Encode & Decode

JavaScript gives us the functions `JSON.stringify` and `JSON.parse` to convert data to and from this format. The first takes a JavaScript value and returns a JSON-encoded string. The second takes such a string and converts it to the value it encodes.

```javascript
let obj = { name: 'jessica', age: 43, codeword: 'pingpong' };

let str = JSON.stringify(obj);

let name = JSON.parse(str).name;

console.log(typeof str, str);
// string {"name":"jessica","age":43,"codeword":"pingpong"}

console.log(name);
// jessica
```

Any *JSON-safe* value can be stringified. Some examples of values that cannot be stringified are: `undefined`, `functions`, `symbols`, and objects with circular references. With the exception of circular references, the `JSON.stringify()` utility will automatically omit these when it comes across them. If such a value is found in an array, it will be replaced with `null`. If you try to stringify something with a circular reference, you'll get a TypeError.


### optional arg: replacer

`JSON.stringify()` takes an optional 2nd argument called the *replacer*. This can be an array or a function that provides a filtering mechanism to determine which properties should be included in the serialization.

If the *replacer* is an **array**, then it should be an array of strings where each string specifies a property name that should be included in the serialization. If the property exists and isn't in the list, it will be skipped.

If the *replacer* is a **function** it will be called once for the object itself, and once for each property in the object. The function is passed two arguments: *key* and *value*. To skip a key in the serialization, return `undefined` otherwise return the value provided.

```javascript
let one = {};

let two = {
  a: 42,
  b: one,
  c: function () {}
};

// create a circular reference inside one:
one.d = two;

let test1 = JSON.stringify(two, ['a']);

console.log(test1);
// {"a":42}

let test2 = JSON.stringify(two, function (k, v) {
  if (k != 'b') {
    if (typeof v == 'function') {
      v = 'function';
    }
    return v;
  }
});

console.log(test2);
// {"a":42,"c":"function"}
```


### optional arg: space

`JSON.stringify()` also takes an optional 3rd argument called the *space*. If passed it converts it to a more human readable format by indenting. The number passed in indicates how many spaces should be used at each indentation level.

```javascript
let obj = {
  a: 'hello',
  b: ['jessica', 45, 'foo'],
  c: '100'
}

let test1 = JSON.stringify(obj);
let test2 = JSON.stringify(obj, null, 4);

console.log(test1);
// {"a":"hello","b":["jessica",45,"foo"],"c":"100"}

console.log(test2);
// {
//     "a": "hello",
//     "b": [
//         "jessica",
//         45,
//         "foo"
//     ],
//     "c": "100"
// }
```


## Customize Encoding

If an object has a `toJSON()` method, this method will be called first to get a value for serialization. In other words, if you intend to stringify an object that may contain illegal JSON values, you should define a `toJSON()` method that returns a *JSON-safe* version of the object. For example:

```javascript
let one = {};

let two = {
  a: 42,
  b: one,
  c: function () {}
};

// create a circular reference inside one:
one.d = two;

// JSON.stringify(two);
// TypeError: Converting circular structure to JSON


// define a custom JSON serialization helper:
two.toJSON = function () {
  return {a: this.a};
};

let test = JSON.stringify(two);

console.log(test);
// {"a":42}
```

## See also:

- [python ajax_notes.md](https://github.com/jessicarush/python-notes/blob/master/ajax_notes.md)
- [python json_example.py](https://github.com/jessicarush/python-notes/blob/master/json_example.py)
- [python structured_file_formats.py](https://github.com/jessicarush/python-notes/blob/master/structured_file_formats.py)
