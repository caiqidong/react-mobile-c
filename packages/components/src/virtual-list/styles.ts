import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  root: { overflowY: 'auto', position: 'relative', width: '100%' },
  spacer: { position: 'relative', width: '100%' },
  item: { left: 0, position: 'absolute', right: 0 },
});
