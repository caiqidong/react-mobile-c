import type { CSSProperties } from 'react';

import {
  colorValues,
  durationValues,
  fontSizeValues,
  radiusValues,
  shadowValues,
  spacingValues,
} from '../../packages/components/src/styles/tokens.stylex';

import './tokens.css';

const remToPixels = (value: string) => `${Math.round(Number.parseFloat(value) * 75)}px`;

const ColorTokens = () => (
  <section className="token-section">
    <h2>Colors</h2>
    <div className="color-grid">
      {Object.entries(colorValues).map(([name, value]) => (
        <article className="color-token" key={name}>
          <div className="color-swatch" style={{ background: value }} />
          <strong>{name}</strong>
          <code>{value}</code>
        </article>
      ))}
    </div>
  </section>
);

const ScaleTokens = ({
  title,
  tokens,
  property,
}: {
  title: string;
  tokens: Record<string, string>;
  property: 'borderRadius' | 'fontSize' | 'width';
}) => (
  <section className="token-section">
    <h2>{title}</h2>
    <div className="scale-list">
      {Object.entries(tokens).map(([name, value]) => {
        const previewValue = value.endsWith('rem') ? remToPixels(value) : value;
        const previewStyle = { [property]: previewValue } as CSSProperties;

        return (
          <div className="scale-token" key={name}>
            <div className={`scale-preview scale-preview--${property}`} style={previewStyle} />
            <strong>{name}</strong>
            <code>{value}</code>
          </div>
        );
      })}
    </div>
  </section>
);

const TokenCatalog = () => (
  <main className="token-catalog">
    <header className="token-header">
      <p>React Mobile C</p>
      <h1>Design tokens</h1>
    </header>
    <ColorTokens />
    <div className="token-columns">
      <ScaleTokens title="Spacing" tokens={spacingValues} property="width" />
      <ScaleTokens title="Type scale" tokens={fontSizeValues} property="fontSize" />
      <ScaleTokens title="Radius" tokens={radiusValues} property="borderRadius" />
    </div>
    <section className="token-section">
      <h2>Elevation & motion</h2>
      <div className="effect-grid">
        {Object.entries(shadowValues).map(([name, value]) => (
          <div className="effect-token" key={name} style={{ boxShadow: value }}>
            <strong>shadow.{name}</strong>
            <code>{value}</code>
          </div>
        ))}
        {Object.entries(durationValues).map(([name, value]) => (
          <div className="effect-token" key={name}>
            <strong>duration.{name}</strong>
            <code>{value}</code>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default {
  parameters: { layout: 'fullscreen' },
  title: 'Foundation/Design Tokens',
};

export const Catalog = {
  render: () => <TokenCatalog />,
};
