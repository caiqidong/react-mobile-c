import { Image } from './index';

const source =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=480&q=80';

export default {
  component: Image,
  tags: ['autodocs'],
  title: 'Components/Image',
};

export const FitsAndRadii = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Image alt="Watch" height={160} radius="medium" src={source} width={160} />
      <Image alt="Round watch" height={160} radius="round" src={source} width={160} />
      <Image alt="Contained watch" fit="contain" height={160} src={source} width={240} />
    </div>
  ),
};

export const ErrorState = {
  render: () => <Image alt="Unavailable product" height={160} src="/missing.jpg" width={240} />,
};
