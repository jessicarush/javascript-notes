# Node Package Manager


[npm](https://www.npmjs.com/) is the main package manager for JavaScript. [Node](https://nodejs.org/en/) is the main JavaScript runtime environment and allows for server-side JavaScript.

## Table of Contents

<!-- toc -->

- [package.json](#packagejson)
- [Installing](#installing)
- [Misc commands](#misc-commands)

<!-- tocstop -->

## package.json

All node packages have one of these files in the root directory and while you don't need to include it in your own project, it's recommended that you do... at the very least, to keep track of your projects dependencies (npm packages). This file, which can be created with the `npm init` command, basically contains:

- **Metadata** including things like title, version, description, authors, license, github source url, and more.

- **Dependencies** which lists any packages required for your project. These dependencies could be quickly installed on another environment by using the `npm install` command. By default, `npm install` will install all modules listed as dependencies in a local package.json.

- **Scripts** which are basically a bunch of key-value pairs containing command line scripts.

To learn more about each setting in the package.json see the [npm docs](https://docs.npmjs.com/files/package.json).


## Installing

As noted above, by default,` npm install` will install all modules listed as dependencies in a local package.json.

When installing an individual package from npm, you can choose which kind of dependency you want it to be listed as in your `package.json`. For example:

```sh
npm install babel-cli -D
```

The `-D` or `--save-dev` flag tells npm that this package is for development only. It gets recorded in your `package.json` under `devDependencies`.

Similarly, there's a `-P` or `--save-prod` flag which saves the package as regular production dependency (a package required at run time by your program). This is actually the default option. These get recorded in your `package.json` under `dependencies`.

There's also a `-O` or `--save-optional` where the package will appear as `optionalDependencies` and a `--no-save` which prevents saving to dependencies at all.

For more information see the [npm install page](https://docs.npmjs.com/cli/install).

## Misc commands

To update npm:
```
npm install -g npm
```

To list all the globally installed packages:
```
npm list -g
```

To list the directory of the globally installed packages:
```
npm root -g
```
