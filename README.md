Rollup Plugin Less
---

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
import less from '@wcj/rollup-plugin-less';

rollup({
  entry: 'main.js',
  plugins: [
    less({

    })
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