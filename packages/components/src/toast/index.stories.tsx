import { Button } from '../button';
import { Toast, toast } from './index';

export default {
  component: Toast,
  tags: ['autodocs'],
  title: 'Components/Toast',
};

export const Types = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button onClick={() => toast.success('Saved')}>Success</Button>
      <Button onClick={() => toast.error('Request failed')} type="danger">
        Error
      </Button>
      <Button onClick={() => toast.loading('Loading')}>Loading</Button>
    </div>
  ),
};
