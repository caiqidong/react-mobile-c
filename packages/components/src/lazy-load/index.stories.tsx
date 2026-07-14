import { LazyLoad } from './index';

export default { component: LazyLoad, tags: ['autodocs'], title: 'Components/LazyLoad' };

export const Image = {
  args: {
    children: (
      <img
        alt="Mountain lake"
        src="https://picsum.photos/id/29/800/480"
        style={{ display: 'block', width: '100%' }}
      />
    ),
    height: 240,
    placeholder: 'Loading image...',
  },
};

export const DeferredComponent = {
  args: {
    children: <div style={{ background: '#e6f4ff', padding: 24 }}>Deferred content is ready.</div>,
    height: 120,
    placeholder: 'Waiting for viewport...',
  },
};
