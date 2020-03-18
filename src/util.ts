import less from 'less';

export function renderLess(code: string, option: Less.Options) {
  return less.render(code, option)
    .then((output) => {
      return output.css;
    }, (error) => {
      throw error;
    });
}