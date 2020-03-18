import { Plugin } from 'rollup';
import { dirname, basename, extname } from 'path';
import { createFilter, FilterPattern } from '@rollup/pluginutils';
import fs from 'fs-extra';
import { renderLess } from './util';

export interface PluginLessOptions extends Less.Options {
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

export default (opt: PluginLessOptions = {}): Plugin => {
  const { include, exclude, options, output, banner, ...lessOptions } = opt;
  const filter = createFilter(include || [ '**/*.less', '**/*.css' ], exclude || 'node_modules/**', options);
  return {
    name: 'less',
    transform: async (code, id) => {
      if (!filter(id)) {
        return null;
      }
      try {
        const optLess: Less.Options = { filename: id, ...lessOptions };
        let css = await renderLess(code, optLess);

        if (output && typeof output === 'function') {
          css = await output(css, id);
        }
        if (output && typeof output === 'string') {
          const fileName = basename(id, extname(id));
          const outputFile = output.replace(/\[name\]/g, fileName);
          if (banner) {
            css = `${banner}${css}`;
          }
          await fs.outputFile(outputFile, css);
        }

        let exportCode = `export default ${JSON.stringify(css.toString())};`;

        return {
          code: exportCode,
          map: { mappings: '' } as any
        }
      } catch (error) {
        throw error;
      }
    },
  };
}