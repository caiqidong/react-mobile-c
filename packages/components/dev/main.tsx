import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AnimationDemo } from '@/demo/AnimationDemo';
import './dev.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Development root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <AnimationDemo />
  </StrictMode>,
);
