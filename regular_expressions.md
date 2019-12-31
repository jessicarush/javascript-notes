# Regular Expressions


Regular expressions are used to search, replace, and extract information from strings. JavaScript's regular expression feature was borrowed from Perl. In general, regular expressions are more performant than the equivalent string operations.

The rules for writing regular expressions can be complex because they interpret characters in some positions as operators, and in slightly different positions as literals. In addition, they don't allow comments or whitespace. This results in expressions that are difficult tp read and dangerous to modify. Tools such as <https://regex101.com/> are helpful in terms of quickly testing your expressions.

See also: [Regular Expressions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

## Table of Contents

<!-- toc -->

- [Example](#example)
- [Flags](#flags)
- [Methods that work with regular expressions](#methods-that-work-with-regular-expressions)
  * [regexp.exec()](#regexpexec)
  * [regexp.test()](#regexptest)
  * [string.match()](#stringmatch)
  * [string.replace()](#stringreplace)
  * [string.search()](#stringsearch)
  * [string.split()](#stringsplit)
- [RegExp constructor](#regexp-constructor)

<!-- tocstop -->

## Example

The following expression matches a URL.

```javascript
let parse_url = /^(?:([A-Za-z]+):)?(?:\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
```

Some insights:
- `\ / [ ] ( ) { } ? + * - | . ^ $` are special characters
- a regular expression literal starts and finishes with `/` forward slash
- `^` indicates the beginning of a string
- `$` indicates the end of a string
- `(?:)` indicates a *non-capturing group* which basically means, don't include this in the *results array*
- `()` indicates a *capturing group* which means, do include this in the *results array*
- `[]` indicates a *character class* or *character set* which matches a single character to whatever is in this list
- `[A-Z]` indicates a single character that can range from uppercase A to Z. The range `-` symbol can only be used in a character class/set `[]`.
- `[A-Za-z]` indicates a single character that can be uppercase or lowercase a to z
- `[A-Fa-f0-9]` would match a single hexadecimal digit
- `+` indicates that the character set can be matched one or more times
- `?` at the end of a group indicates that that the whole group is optional
- `\/` indicates that a literal forward slash `/` must be matched. Forward slashes need to be backslash escaped because they usually indicate the start or end of a regexp.
- `{0,3}` indicates the previous thing can be matched 0 or 1 or 2 or 3 times
- `{1,}` indicates the previous thing can be matched 1 or more times and would be equivalent to `+`
- `\-` to match a hyphen, you will need to escape it so that it's not confused as a range signal
- `[^#?]` indicates any character except `#` and `?`. The exclusion `^` symbol can only be used in a character class/set `[]`.
- `*` is similar to `+`, but means that the character can be matched zero or more times
- `.` matches any character except a line end `\n` character
- `|` means or and can often be the same as using `[]` for example, a or b could be written as both `a|b` or `[ab]`

Note that the main reason to specify a non-capturing group is that it would be more performant.

Note that when using `|`, the attempt to match stops if the first option is a success, for example in `'hello'.match(/he|hell/)` *hell* wouldn't match because *he* was successful.

To see some results:
```javascript
let parse_url = /^(?:([A-Za-z]+):)?(?:\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

let url = 'http://www.ora.com:80/goodparts?q#fragment';
let groups = ['url', 'scheme', 'host', 'port', 'path', 'query', 'hash'];
let tab = '       ';

const result = parse_url.exec(url);

for (let i = 0; i < groups.length; i++) {
  console.log(groups[i] + ':' + tab.substring(groups[i].length), result[i]);
}

// url:     http://www.ora.com:80/goodparts?q#fragment
// scheme:  http
// host:    www.ora.com
// port:    80
// path:    goodparts
// query:   q
// hash:    fragment
```

## Flags

JavaScript allows us to add optional *flags* after the closing `/` forward slash. For example, the `i` flag means *ignore case*:

```javascript
let hex_color = /^#([0-9a-f]){3,6}$/i;

let string = '#32CD32';

let result = hex_color.test(string);

console.log(result);
// true
```

Flag | Description
-----|------------
g | Global match; find all matches rather than stopping after the first match
i | Case-insensitive match
m | Multiline match; treat beginning and end characters (`^` and `$`) as working over multiple lines (i.e., match the beginning or end of each line (delimited by `\n` or `\r`), not only the very beginning or end of the whole input string)
s | Allows `.` to match newline characters
u | Unicode; treat a pattern as a sequence of unicode code points
y | sticky; matches only from the index indicated by the `lastIndex` property of this regular expression in the target string (and does not attempt to match from any later indexes)


## Methods that work with regular expressions

There are methods in both the `String` and `RegExp` built-in objects that work with regular expressions.

### regexp.exec()

The `exec()` regexp method executes a search for a match in a specified string and returns a result array of information or `null` on a mismatch.

```javascript
let hex_color = /^#([0-9a-fA-F]){3,6}$/;

let string = '#32CD32';

let result = hex_color.exec(string);

console.log(result);
// [ '#32CD32', '2', index: 0, input: '#32CD32', groups: undefined ]
```


### regexp.test()

The `test()` regexp method executes a search for a match between a regular expression and a specified string and returns true or false.

```javascript
let hex_color = /^#([0-9a-fA-F]){3,6}$/;

let string = '#32CD32';

let result = hex_color.test(string);

console.log(result);
// true
```


### string.match()

The `match()` string method returns an array containing all of the matches, including capturing groups, or `null` if no match is found.

```javascript
let hex_color = /^#([0-9a-fA-F]){3,6}$/;

let string = '#32CD32';

let result = string.match(hex_color);

console.log(result);
// [ '#32CD32', '2', index: 0, input: '#32CD32', groups: undefined ]
```


### string.replace()

The `replace()` string method executes a search for a match in a string, and replaces the matched substring with a replacement substring.

```javascript
let hex_color = /#([0-9a-fA-F]){3,6}$/;

let string = 'color: #32CD32';

let result = string.replace(hex_color, '#fff');

console.log(result);
// color: #fff
```


### string.search()

The `search()` string method tests for a match in a string. It returns the index of the match, or -1 if the search fails.

```javascript
let hex_color = /#([0-9a-fA-F]){3,6}$/;

let string = 'color: #32CD32';

let result = string.search(hex_color);

console.log(result);
// 7
```


### string.split()

The `split()` string method uses a regular expression or a fixed string to break a string into an array of substrings.

```javascript
let extension = /\.[a-zA-Z0-4]+,/;

let string = 'file1.jpg,file2.png,file3.gif,file4.m4a,';

let result = string.split(extension);

console.log(result);
// [ 'file1', 'file2', 'file3', 'file4', '' ]
```


## RegExp constructor

The preferred method to write a regular expression is as a literal, which is to enclose the expression in forward slashes `/`. That being said, you can also use the built-in `RegExp` object as a constructor and there are a few situations where this can be particularly useful. See [built-in_objects.md](built-in_objects.md).
