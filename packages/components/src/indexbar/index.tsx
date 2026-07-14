import * as stylex from '@stylexjs/stylex';
import { forwardRef, useRef, useState } from 'react';

import { styles } from './styles';
import type { IndexBarProps } from './types';

export const IndexBar = /* @__PURE__ */ forwardRef<HTMLDivElement, IndexBarProps>(
  ({ className, defaultActiveIndex, indexes, onChange, sections, sticky = true, ...rest }, ref) => {
    const sectionRefs = useRef(new Map<string, HTMLElement>());
    const availableIndexes = indexes ?? sections.map((section) => section.index);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex ?? availableIndexes[0] ?? '');
    const selectIndex = (index: string) => {
      setActiveIndex(index);
      onChange?.(index);
      sectionRefs.current.get(index)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
      <div {...rest} {...stylex.props(styles.root, className)} ref={ref}>
        <div {...stylex.props(styles.content)}>
          {sections.map((section) => (
            <section
              {...stylex.props(styles.section)}
              data-index={section.index}
              key={section.index}
              ref={(element) => {
                if (element) sectionRefs.current.set(section.index, element);
                else sectionRefs.current.delete(section.index);
              }}
            >
              <div {...stylex.props(styles.anchor, sticky && styles.sticky)}>{section.index}</div>
              {section.children}
            </section>
          ))}
        </div>
        <nav {...stylex.props(styles.rail)} aria-label="Index navigation">
          {availableIndexes.map((index) => (
            <button
              {...stylex.props(styles.indexButton, index === activeIndex && styles.active)}
              aria-current={index === activeIndex ? 'true' : undefined}
              key={index}
              onClick={() => selectIndex(index)}
              type="button"
            >
              {index}
            </button>
          ))}
        </nav>
      </div>
    );
  },
);

IndexBar.displayName = 'IndexBar';

export type { IndexBarProps, IndexBarSection } from './types';
