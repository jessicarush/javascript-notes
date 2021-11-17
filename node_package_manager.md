# Node Package Manager


[npm](https://www.npmjs.com/) is the default package manager for node. It is used to install, share, and manage javascript packages in a project. [Node](https://nodejs.org/en/) is the main JavaScript runtime environment and allows for server-side JavaScript. npm comes pre-installed with node.js.

## Table of Contents

<!-- toc -->

- [package.json](#packagejson)
- [Installing packages](#installing-packages)
- [Misc commands](#misc-commands)
- [Working with npm_modules in client-side JavaScript](#working-with-npm_modules-in-client-side-javascript)
  * [Using browserify, watchify & babelify](#using-browserify-watchify--babelify)
    + [A Barebones Process](#a-barebones-process)
    + [A Better Process](#a-better-process)
- [Troubleshooting](#troubleshooting)
  * [Moving project files between Mac OS and Windows](#moving-project-files-between-mac-os-and-windows)

<!-- tocstop -->

## package.json

All node packages have one of these files in the root directory and while you don't need to include it in your own project, it's recommended that you do... at the very least, to keep track of your projects dependencies (npm packages). This makes your build reproducible, and therefore easier to share with other developers. This file, which can be created with the `npm init` command, basically contains:

- **Metadata** including things like title, version, description, authors, license, github source url, and more.

- **Dependencies** which lists any packages required for your project. These dependencies could be quickly installed on another environment by using the `npm install` command. By default, `npm install` will install all modules listed as dependencies in a local package.json.

- **Scripts** which are basically a bunch of key-value pairs containing command line scripts.

To learn more about each setting in the package.json see the [npm docs](https://docs.npmjs.com/files/package.json).


## Installing packages

As noted above, by default, `npm install` will install all modules listed as dependencies in a local package.json.

When installing an individual package from npm, you can choose which kind of dependency you want it to be listed as in your `package.json`. For example:

```sh
npm install babel-cli -D
```

The `-D` or `--save-dev` flag tells npm that this package is for development only. It gets recorded in your `package.json` under `devDependencies`.

Similarly, there's a `-P` or `--save-prod` or just `--save` flag which saves the package as regular production dependency (a package required at run time by your program). This is actually the default option. These get recorded in your `package.json` under `dependencies`.

There's also a `-O` or `--save-optional` where the package will appear as `optionalDependencies` and a `--no-save` which prevents saving to dependencies at all.

For more information see the [npm install page](https://docs.npmjs.com/cli/install).

## Misc commands

To see the current npm version and node version:
```
npm -v
npm --version
node -v
node --version
```

To update npm:
```
npm install -g npm
```

To instantly create a `package.json` and bypass all the questions:
```
npm init -y
```

To install from a `package.json` locally:
```
npm install
```

To re-install from a `package.json` locally:
```
npm clean-install
```

To install a package globally
```
npm install -g markdown-toc
```

To list all the globally installed packages:
```
npm list -g
```

To list the directory of the globally installed packages:
```
npm root -g
```

## Working with npm_modules in client-side JavaScript

Though npm began as the package manager for Node.js, it is now common for it to be used in client-side front-end projects as well. That being said, without the use of *additional tools*, in order to import from an npm installed package called uuid, I'd have to do something like this:

```javascript
import uuid from '../node_modules/uuid/dist/esm-browser/v4.js'
```

But what I actually want to do is this:

```javascript
import { v4 as uuidv4 } from 'uuid';
// or
const { v4: uuidv4 } = require('uuid');
```

Normally, the string that follows the `from` keyword is a relative path. When that string doesn't begin with `./`, `/`, or `../`, Node on the server-side or another tool on the client-side, will know to look in the `node_modules` directory. There are a number tools that can be used on the client-side.

1. **[browserify](http://browserify.org/), [watchify](https://github.com/browserify/watchify) and [babelify](https://www.npmjs.com/package/babelify)**  
browserify lets you `require('modules')` in the browser by bundling up all of your dependencies. As a result, it lets you directly import npm_modules. watchify simply adds watch mode for browserify builds so that you don't have to run the browserify command every time you save. babelify lets you use the ES6 `import` syntax.

2. **[webpack](https://webpack.js.org/) and [babel](https://babeljs.io/)**  
TODO

### Using browserify, watchify & babelify

#### A Barebones Process

This process installs browserify and watchify globally and will allow you to:
- manage your packages with npm
- import packages into your JavaScript using the `require()` syntax

Step 1: Install browserify and watchify globally.
```
npm install -g browserify
npm install -g watchify
```

Step 2: Create a `package.json` in your project root directory.
```
npm init
```

Step 3: Install some production modules/packages.
```
npm install uuid --save
```

Step 4: Include the module/package in your JavaScript using `require()`.
```javascript
/* js/main.js */

const { v4: uuidv4 } = require('uuid');

console.log(`Testing uuid: ${uuidv4()}`);
```

Step 5: Bundle your JavaScript.
```
browserify js/main.js -o js/bundle.js
```

You’ll have to make a new bundle every time you make a change to your main.js. To make it a bit easier, you can run the watchify command, which will create a bundle every time you save your file.

Step 6: Watch for changes.
```
watchify js/main.js -o js/bundle.js
```

Step 7: Include `bundle.js` in your html.
```html
<script src="js/bundle.js" defer></script>
```


#### A Better Process

This process installs browserify, watchify and babelify locally and will allow you to:
- manage your packages with npm
- import packages into your JavaScript using ES6 `import <thing> from '<package>' syntax;`
- watch and run the build process when changes are made with a simple command `npm run watch`

Step 1: Create a `package.json` in your project root directory.
```
npm init
```

Step 2: Install browserify and watchify locally.
```
npm install browserify watchify --save-dev
```

Step 3: Install babelify (this will allow us to use the ES6 `import` syntax).
```
npm install @babel/core @babel/preset-env babelify --save-dev
```

Step 4: Install some production modules/packages:
```
npm install uuid --save
```

Step 5: Include the module/package in your JavaScript using `import`.
```javascript
/* js/main.js */

import { v4 as uuidv4 } from 'uuid';

console.log(`Testing uuid: ${uuidv4()}`);
```

Step 6: Add a browserify preset to your `package.json` to transpile your code.
```json
"browserify": {
  "transform": [
    [
      "babelify",
      {
        "presets": [
          "@babel/preset-env"
        ]
      }
    ]
  ]
}
```

Step 7: Add build and watch scripts to your `package.json`.
```json
"scripts": {
  "build": "browserify js/main.js -o js/bundle.js",
  "watch": "watchify js/main.js -o js/bundle.js -v"
}
```

Step 8: Include `bundle.js` in your html.
```html
<script src="js/bundle.js" type="module" defer></script>
```

Step 8: Run the build script.
```
npm run build
```

Step 9: Run the watch script.
```
npm run watch
```

## Troubleshooting

### Moving project files between Mac OS and Windows

You will may find some issues (particularly with packages like React) when moving projects between different systems. If this happens, the first thing to try is removing the whole `node_modules` directly and reinstall:

```
rm -rf node_modules
npm intstall
```
