# Document Object Model

see first: [object_models.md](object_models.md)


## Add text to an element

```javascript
let username = 'Jessica';

let elName = document.getElementById('name');
elName.textContent = username;
```


## Add HTML to an element

```javascript
let message = 'Here is a <a href="http://javascriptbook.com/">link</a>';

let elNote = document.getElementById('note');
elNote.innerHTML = message;
```
Note that the `innerHTML` property can pose a security risk... more to come.


## Add a class to an element

For this example, the CSS would contain a class selector called `.true`):

```javascript
let shipping = true;

let elShipping = document.getElementById('shipping');
elShipping.className = shipping;
```


## Return an element by its selector

```javascript
// returns the first element that matches a CSS selector
let elNav = document.querySelector('li.nav');
elNav.className = 'newclass';

// returns an array of all elements that match a CSS selector
let elNavs = document.querySelectorAll('li.nav');

// to change the last one
elNavs[elNavs.length - 1].className = 'newclass';

// to change all of them
for (let el of elTest) {
   elNavs.className = 'newclass';
}
```



## Report the browser window size

```javascript
function windowSize() {
  var width = this.innerWidth;
  var height = this.innerHeight;
  console.log(width, height);
  return [width, height];
}

windowSize();
// 863 673
```


## Report the device's screen size

```javascript
console.log(window.screen.width, window.screen.height);
// 1280 800
```
