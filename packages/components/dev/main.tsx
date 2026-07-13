import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeDemo } from '@/demo/ThemeDemo';
import './dev.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Development root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeDemo />
  </StrictMode>,
);
