import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { P0Demo } from '@/demo/P0Demo';
import './dev.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Development root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <P0Demo />
  </StrictMode>,
);
