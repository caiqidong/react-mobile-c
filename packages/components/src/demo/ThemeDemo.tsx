import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

import { flex, hairline, textOverflow, touchable } from '../styles/common.stylex';
import { brandTheme, darkTheme } from '../styles/theme';
import { colors, fontSize, lineHeight, radius, spacing } from '../styles/tokens.stylex';

type ThemeName = 'light' | 'dark' | 'brand';

const themeOptions: ReadonlyArray<{ label: string; value: ThemeName }> = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Brand', value: 'brand' },
];

const styles = stylex.create({
  page: {
    backgroundColor: colors.bgBase,
    color: colors.textPrimary,
    minHeight: '100dvh',
    padding: spacing.lg,
    transition: 'background-color 150ms ease, color 150ms ease',
  },
  shell: {
    marginInline: 'auto',
    maxWidth: '8rem',
  },
  eyebrow: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: 700,
    margin: 0,
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.tight,
    marginBlock: `${spacing.sm} ${spacing.lg}`,
  },
  controls: {
    backgroundColor: colors.bgWhite,
    borderRadius: radius.base,
    display: 'grid',
    gap: spacing.xs,
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    padding: spacing.xs,
  },
  option: {
    backgroundColor: 'transparent',
    borderRadius: radius.sm,
    borderStyle: 'none',
    borderWidth: 0,
    color: colors.textSecondary,
    fontSize: fontSize.base,
    minHeight: '0.64rem',
    paddingInline: spacing.sm,
  },
  optionActive: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  preview: {
    backgroundColor: colors.bgWhite,
    borderRadius: radius.base,
    marginTop: spacing.lg,
    overflow: 'hidden',
    padding: spacing.md,
  },
  previewTitle: {
    fontSize: fontSize.md,
    margin: 0,
  },
  previewCopy: {
    color: colors.textSecondary,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    marginBlock: `${spacing.sm} ${spacing.md}`,
  },
  status: {
    color: colors.success,
    fontSize: fontSize.sm,
    fontWeight: 700,
  },
});

export function ThemeDemo() {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const selectedTheme =
    themeName === 'dark' ? darkTheme : themeName === 'brand' ? brandTheme : null;

  return (
    <main {...stylex.props(styles.page, selectedTheme)}>
      <div {...stylex.props(styles.shell)}>
        <p {...stylex.props(styles.eyebrow)}>Theme system</p>
        <h1 {...stylex.props(styles.heading)}>Semantic tokens in motion</h1>

        <div aria-label="Theme" role="group" {...stylex.props(styles.controls, hairline.surround)}>
          {themeOptions.map((option) => {
            const isActive = option.value === themeName;

            return (
              <button
                aria-pressed={isActive}
                key={option.value}
                onClick={() => setThemeName(option.value)}
                type="button"
                {...stylex.props(styles.option, touchable.base, isActive && styles.optionActive)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <section {...stylex.props(styles.preview, hairline.surround)}>
          <div {...stylex.props(flex.between)}>
            <h2 {...stylex.props(styles.previewTitle)}>Mobile preview</h2>
            <span {...stylex.props(styles.status)}>Ready</span>
          </div>
          <p {...stylex.props(styles.previewCopy, textOverflow.clamp2)}>
            Theme classes override the same semantic variables, so components update without
            changing their own styles.
          </p>
        </section>
      </div>
    </main>
  );
}
