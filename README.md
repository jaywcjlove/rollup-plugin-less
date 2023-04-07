Rollup Plugin Less
===

[![](https://img.shields.io/github/stars/jaywcjlove/rollup-plugin-less.svg)](https://github.com/jaywcjlove/rollup-plugin-less/stargazers)
[![](https://img.shields.io/github/release/jaywcjlove/rollup-plugin-less.svg)](https://github.com/jaywcjlove/rollup-plugin-less/releases)
[![GitHub Actions Test](https://github.com/jaywcjlove/rollup-plugin-less/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/rollup-plugin-less/actions/workflows/ci.yml)

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

Set `Less.Options` in [`@types/less`](https://www.npmjs.com/package/@types/less)

```ts
declare namespace Less {
  interface Options {
    sourceMap?: SourceMapOption;
    /** Filename of the main file to be passed to less.render() */
    filename?: string;
    /** The locations for less looking for files in @import rules */
    paths?: string[];
    /** True, if run the less parser and just reports errors without any output. */
    lint?: boolean;
    /** Pre-load global Less.js plugins */
    plugins?: Plugin[];
    /** @deprecated If true, compress using less built-in compression. */
    compress?: boolean;
    strictImports?: boolean;
    /** If true, allow imports from insecure https hosts. */
    insecure?: boolean;
    depends?: boolean;
    maxLineLen?: number;
    /** @deprecated If false, No color in compiling. */
    color?: boolean;
    /** @deprecated False by default. */
    ieCompat?: boolean;
    /** @deprecated If true, enable evaluation of JavaScript inline in `.less` files. */
    javascriptEnabled?: boolean;
    /** Whether output file information and line numbers in compiled CSS code. */
    dumpLineNumbers?: "comment" | string;
    /** Add a path to every generated import and url in output css files. */
    rootpath?: string;
    /** Math mode options for avoiding symbol conficts on math expressions. */
    math?: 'always' | 'strict' | 'parens-division' | 'parens' | 'strict-legacy' | number;
    /** If true, stops any warnings from being shown. */
    silent?: boolean;
    /** Without this option, Less attempts to guess at the output unit when it does maths. */
    strictUnits?: boolean;
    /** Defines a variable that can be referenced by the file. */
    globalVars?: {
      [key: string] : string,
    };
    /** Puts Var declaration at the end of base file. */
    modifyVars?: {
      [key: string] : string,
    };
    /** Read files synchronously in Node.js */
    syncImport?: boolean;
  }
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