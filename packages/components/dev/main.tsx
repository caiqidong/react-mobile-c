import * as stylex from '@stylexjs/stylex';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { mobileRootStyles } from '@/styles/base.stylex';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Development root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <main {...stylex.props(mobileRootStyles.root)}>
      <h1>React Mobile C</h1>
      <p>Vite and StyleX development environment is ready.</p>
    </main>
  </StrictMode>,
);
