# PostCSS Default Unit

[PostCSS] plugin that adds a default unit to numeric css properties.

```css
.foo {
  width: 200;
  margin: 0 auto 20;
  z-index: 1;
}
```

```css
.foo {
  width: 200px;
  margin: 0 auto 20px;
  z-index: 1;
}
```

## Install

With [npm] do:

```
npm install github:brombal/postcss-default-unit#main --save
```

## Usage

By default `px` is used.

```js
const defaultUnit = require('postcss-default-unit');
postcss([defaultUnit]);
```

Or, with options:

```js
const defaultUnit = require('postcss-default-unit');
postcss([
  defaultUnit({
    unit: '%', // Default unit suffix
    ignore: {
      // Additional CSS properties to ignore
      'other-property': true,
    },
  }),
]);
```

This plugin must be set after the plugins that can modify the values (e.g. [postcss-simple-vars]).
See [PostCSS] docs for examples for your environment.

## Issues

Now postcss-default-unit ignores expressions in parentheses. It won't mess up your `rgba` or `calc`,
but it won't also add a unit to your `gradient`.

[ci]: https://travis-ci.org/antyakushev/postcss-default-unit
[deps]: https://gemnasium.com/antyakushev/postcss-default-unit
[npm]: http://badge.fury.io/js/postcss-default-unit
[postcss]: https://github.com/postcss/postcss
[postcss-simple-vars]: https://github.com/postcss/postcss-simple-vars
