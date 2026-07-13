import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

import { fade, scale, slideUp } from '../styles/animation.stylex';
import { flex, hairline, touchable } from '../styles/common.stylex';
import { colors, fontSize, lineHeight, radius, shadow, spacing } from '../styles/tokens.stylex';

type AnimationName = 'fade' | 'slideUp' | 'scale';

const animationOptions: ReadonlyArray<{ label: string; value: AnimationName }> = [
  { label: 'Fade', value: 'fade' },
  { label: 'Slide up', value: 'slideUp' },
  { label: 'Scale', value: 'scale' },
];

const animationStyles = { fade, slideUp, scale } as const;

const styles = stylex.create({
  page: {
    backgroundColor: colors.bgBase,
    color: colors.textPrimary,
    minHeight: '100dvh',
    padding: spacing.lg,
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
  stage: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    borderRadius: radius.base,
    display: 'flex',
    height: '3.2rem',
    justifyContent: 'center',
    marginTop: spacing.lg,
    overflow: 'hidden',
    padding: spacing.md,
  },
  sample: {
    backgroundColor: colors.primary,
    borderRadius: radius.base,
    boxShadow: shadow.md,
    color: colors.white,
    maxWidth: '4.8rem',
    padding: spacing.md,
    textAlign: 'center',
    width: '100%',
  },
  sampleTitle: {
    fontSize: fontSize.md,
    margin: 0,
  },
  sampleCopy: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.base,
    marginBlock: `${spacing.xs} 0`,
    opacity: 0.85,
  },
  actions: {
    marginTop: spacing.md,
  },
  toggle: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.base,
    borderStyle: 'none',
    borderWidth: 0,
    color: colors.bgWhite,
    fontSize: fontSize.base,
    minHeight: '0.72rem',
    paddingInline: spacing.md,
  },
  status: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
  },
});

export function AnimationDemo() {
  const [animationName, setAnimationName] = useState<AnimationName>('fade');
  const [isVisible, setIsVisible] = useState(true);
  const activeAnimation = animationStyles[animationName];

  return (
    <main {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.shell)}>
        <p {...stylex.props(styles.eyebrow)}>Motion system</p>
        <h1 {...stylex.props(styles.heading)}>Purposeful transitions</h1>

        <div
          aria-label="Animation"
          role="group"
          {...stylex.props(styles.controls, hairline.surround)}
        >
          {animationOptions.map((option) => {
            const isActive = option.value === animationName;

            return (
              <button
                aria-pressed={isActive}
                key={option.value}
                onClick={() => setAnimationName(option.value)}
                type="button"
                {...stylex.props(styles.option, touchable.base, isActive && styles.optionActive)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <section aria-label="Animation preview" {...stylex.props(styles.stage, hairline.surround)}>
          <div
            {...stylex.props(
              styles.sample,
              isVisible ? activeAnimation.enter : activeAnimation.exit,
            )}
          >
            <h2 {...stylex.props(styles.sampleTitle)}>{animationName}</h2>
            <p {...stylex.props(styles.sampleCopy)}>Optimized for mobile feedback and overlays.</p>
          </div>
        </section>

        <div {...stylex.props(styles.actions, flex.between)}>
          <button
            aria-pressed={isVisible}
            onClick={() => setIsVisible((visible) => !visible)}
            type="button"
            {...stylex.props(styles.toggle, touchable.base)}
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
          <span aria-live="polite" {...stylex.props(styles.status)}>
            {isVisible ? 'Entered' : 'Exited'}
          </span>
        </div>
      </div>
    </main>
  );
}
