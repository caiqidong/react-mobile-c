import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

import { Button } from '../button';
import { Icon } from '../icon';
import { Image } from '../image';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { colors, fontSize, lineHeight, radius, spacing } from '../styles/tokens.stylex';

const productImage =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=640&q=85';

const styles = stylex.create({
  page: {
    backgroundColor: colors.bgBase,
    color: colors.textPrimary,
    minHeight: '100dvh',
  },
  header: {
    backgroundColor: colors.bgWhite,
    borderBottomColor: colors.borderBase,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    paddingBlock: spacing.lg,
    paddingInline: spacing.lg,
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
  },
  heading: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.tight,
    marginBlock: `${spacing.xs} 0`,
  },
  intro: {
    color: colors.textSecondary,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    marginBlock: `${spacing.sm} 0`,
  },
  section: {
    borderBottomColor: colors.borderBase,
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    paddingBlock: spacing.lg,
    paddingInline: spacing.lg,
  },
  sectionWhite: {
    backgroundColor: colors.bgWhite,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    marginBlock: `0 ${spacing.md}`,
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  form: {
    display: 'grid',
    gap: spacing.md,
  },
  imageLayout: {
    alignItems: 'center',
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: '1.6rem minmax(0, 1fr)',
  },
  productImage: {
    height: '1.6rem',
    width: '1.6rem',
  },
  productName: {
    fontSize: fontSize.md,
    margin: 0,
  },
  productMeta: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBlock: `${spacing.xs} 0`,
  },
  status: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBlock: `${spacing.sm} 0`,
  },
  iconButton: {
    borderRadius: radius.round,
    minWidth: '0.64rem',
    paddingInline: spacing.sm,
  },
});

export function P0Demo() {
  const [submitted, setSubmitted] = useState(0);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');

  return (
    <main {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.shell)}>
          <p {...stylex.props(styles.eyebrow)}>React Mobile C</p>
          <h1 {...stylex.props(styles.heading)}>P0 component workbench</h1>
          <p {...stylex.props(styles.intro)}>Core controls tuned for touch, forms, and media.</p>
        </div>
      </header>

      <section {...stylex.props(styles.section, styles.sectionWhite)}>
        <div {...stylex.props(styles.shell)}>
          <h2 {...stylex.props(styles.sectionTitle)}>Actions</h2>
          <div {...stylex.props(styles.row)}>
            <Button onClick={() => setSubmitted((count) => count + 1)}>Continue</Button>
            <Button type="outline">Review</Button>
            <Button loading>Saving</Button>
            <Button
              aria-label="Confirm"
              className={styles.iconButton}
              icon={
                <Icon size="1.15em">
                  <path
                    d="M5 12.5 9.5 17 19 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </Icon>
              }
            />
          </div>
          <p {...stylex.props(styles.status)} aria-live="polite">
            Continue pressed {submitted} times
          </p>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.shell)}>
          <h2 {...stylex.props(styles.sectionTitle)}>Form controls</h2>
          <div {...stylex.props(styles.form)}>
            <Input
              aria-label="Search components"
              clearable
              onChange={setSearch}
              placeholder="Search components"
              prefix={
                <Icon size="1em">
                  <circle cx="10.5" cy="10.5" fill="none" r="5.5" stroke="currentColor" />
                  <path d="m15 15 4 4" fill="none" stroke="currentColor" />
                </Icon>
              }
              value={search}
            />
            <Textarea
              aria-label="Feedback"
              autoSize
              maxLength={120}
              onChange={setFeedback}
              placeholder="Share feedback"
              showCount
              value={feedback}
            />
          </div>
        </div>
      </section>

      <section {...stylex.props(styles.section, styles.sectionWhite)}>
        <div {...stylex.props(styles.shell)}>
          <h2 {...stylex.props(styles.sectionTitle)}>Media</h2>
          <div {...stylex.props(styles.imageLayout)}>
            <Image
              alt="Silver wrist watch"
              className={styles.productImage}
              placeholder="Loading"
              radius="large"
              src={productImage}
            />
            <div>
              <h3 {...stylex.props(styles.productName)}>Everyday watch</h3>
              <p {...stylex.props(styles.productMeta)}>Lazy loaded · cover fit · rounded</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
