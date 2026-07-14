import * as stylex from '@stylexjs/stylex';

import { colors, fontSize, spacing } from '../styles/tokens.stylex';

export const styles = stylex.create({
  base: {
    borderColor: colors.borderBase,
    boxSizing: 'border-box',
    color: colors.textTertiary,
    display: 'flex',
    fontSize: fontSize.sm,
  },
  horizontal: {
    alignItems: 'center',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
    marginBlock: spacing.md,
    width: '100%',
  },
  vertical: {
    alignSelf: 'stretch',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    display: 'inline-flex',
    marginInline: spacing.base,
    minHeight: '1em',
    width: 0,
  },
  dashedHorizontal: { borderTopStyle: 'dashed' },
  dashedVertical: { borderLeftStyle: 'dashed' },
  withContent: {
    borderTopWidth: 0,
    gap: spacing.base,
  },
  line: {
    borderColor: 'inherit',
    borderTopStyle: 'inherit',
    borderTopWidth: '1px',
    flex: 1,
  },
  leftLine: { flexGrow: 0, width: '10%' },
  rightLine: { flexGrow: 0, width: '10%' },
  content: { flexShrink: 0 },
});
