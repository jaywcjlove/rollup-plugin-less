Rollup Plugin Less
---

[![](https://img.shields.io/github/issues/jaywcjlove/rollup-plugin-less.svg)](https://github.com/jaywcjlove/rollup-plugin-less/issues) [![](https://img.shields.io/github/forks/jaywcjlove/rollup-plugin-less.svg)](https://github.com/jaywcjlove/rollup-plugin-less/network) [![](https://img.shields.io/github/stars/jaywcjlove/rollup-plugin-less.svg)](https://github.com/jaywcjlove/rollup-plugin-less/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/rollup-plugin-less.svg)](https://github.com/jaywcjlove/rollup-plugin-less/releases) [![Build Status](https://www.travis-ci.org/jaywcjlove/rollup-plugin-less.svg?branch=master)](https://www.travis-ci.org/jaywcjlove/rollup-plugin-less)

A rollup plugin for [less](http://lesscss.org/) files.

## Install

```node
npm install @wcj/rollup-plugin-less --save
```

## Usage

```js
import './test.less';
// Generate css will be auto insert to the head tag if you set insert be true
```

```js
import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import less from '@wcj/rollup-plugin-less';

rollup({
  input: 'src/main.js',
  output: [
    { name: 'Test', file: 'dist/test.cjs.js', format: 'cjs' },
    { name: 'Test', file: 'dist/test.esm.js', format: 'esm' },
    { name: 'Test', file: 'dist/test.js', format: 'umd' },
    { name: 'Test', file: 'dist/test.min.js', format: 'umd' },
  ],
  plugins: [
    less({
      // PluginLessOptions: options....
    }),
    resolve(),
    commonjs(),
  ],
});
```

## Options

```ts
interface PluginLessOptions extends Less.Options {
  /**
   * Type: `String` | `RegExp` | `Array[...String|RegExp]`
   * A valid [minimatch](https://www.npmjs.com/package/minimatch) pattern, or array of patterns.
   * If options.include is omitted or has zero length, filter will return true by default.
   * Otherwise, an ID must match one or more of the minimatch patterns,
   * and must not match any of the options.exclude patterns.
   * > https://github.com/rollup/plugins/tree/master/packages/pluginutils#include-and-exclude
   */
  include?: FilterPattern,
  /**
   * Type: `String` | `RegExp` | `Array[...String|RegExp]`
   * A valid [minimatch](https://www.npmjs.com/package/minimatch) pattern, or array of patterns.
   * If options.include is omitted or has zero length, filter will return true by default.
   * Otherwise, an ID must match one or more of the minimatch patterns,
   * and must not match any of the options.exclude patterns.
   * > https://github.com/rollup/plugins/tree/master/packages/pluginutils#include-and-exclude
   */
  exclude?: FilterPattern,
  /**
   * https://github.com/rollup/plugins/tree/master/packages/pluginutils#options
   */
  options?: { resolve?: string | false | null },
  /**
   * If you specify a string, it will be the path to write the generated CSS.
   * If you specify a function, call it passing the generated CSS as an argument.
   */
  output?: string | ((code: string, id:string) => string | Promise<string>);
  /**
   * Add a banner to the string.
   */
  banner?: string;
}
```

## Development

```bash
npm run watch # Listen compile .ts files.
npm run build # compile .ts files.

npm run test
```

## License

MIT © [Kenny Wong](https://wangchujiang.com/)