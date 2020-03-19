import * as rollup from 'rollup';
import fs from 'fs-extra';
import path from 'path';
import less from '../src';

const toBeText1 = `body .wrap {
  color: #fff;
}
body a {
  font-size: 12px;
}
`
const toBeText2 = `.hidden {
  display: none !important;
}
.content .header {
  font-size: 12px;
}
.content .body {
  color: #333;
}
`

it('Compare generated CSS files', () => {
  rollup.rollup({
    input: path.join(__dirname, 'main.js'),
    output: [
      { file: 'bundle.cjs.js', format: 'cjs' },
    ],
    plugins: [
      less({
        output: 'test/css/test.[name].css',
      }),
    ]
  }).then(async () => {
    const less1 = path.join(__dirname, 'css/test.test.css');
    const text1 = await fs.readFile(less1);
    await expect(text1.toString()).toBe(toBeText1)
    const less2 = path.join(__dirname, 'css/test.test01.css');
    const text2 = await fs.readFile(less2);
    await expect(text2.toString()).toBe(toBeText2)
  }).catch((error) => {
    console.error('error:', error);
  });
});