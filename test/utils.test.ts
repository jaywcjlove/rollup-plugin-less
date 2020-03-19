import { renderLess } from '../src/util';

const less1 = `
.hidden {
  display: none !important;
  .test {
    color: red;
  }
}
`

const output = `.hidden {
  display: none !important;
}
.hidden .test {
  color: red;
}
`;

it('Test the renderLess method', async () => {
  const css = await renderLess(less1, {});
  expect(css).toBe(output)
});