# Web

**Add text to an element:**

```javascript
let username = 'Jessica';

let elName = document.getElementById('name');
elName.textContent = username;
```

**Add HTML to an element:**

```javascript
let message = 'Here is a <a href="http://javascriptbook.com/">link</a>';

let elNote = document.getElementById('note');
elNote.innerHTML = message;
```
Note that the `innerHTML` property can pose a security risk... more to come.

**Add a class to an element:**

For this example, the CSS would contain a class selector called `.true`):

```javascript
let shipping = true;

let elShipping = document.getElementById('shipping');
elShipping.className = shipping;
```
