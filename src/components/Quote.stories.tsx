import type { Meta, StoryObj } from '@storybook/react-vite';
import Quote from './Quote';

const meta: Meta<typeof Quote> = {
  title: 'Blocks/Quote',
  component: Quote,
};
export default meta;

type Story = StoryObj<typeof Quote>;

export const Default: Story = {
  args: {
    quote: 'We believe growth starts with a single honest conversation.',
    attribution: 'Company motto',
  },
};

export const LargerSize: Story = {
  name: 'Custom font size',
  args: {
    ...Default.args,
    fontSize: '3rem',
  },
};

export const SmallerSize: Story = {
  name: 'Smaller font size',
  args: {
    ...Default.args,
    fontSize: '1.5rem',
  },
};

export const CustomFont: Story = {
  name: 'Custom font family',
  args: {
    ...Default.args,
    fontFamily: 'Georgia, serif',
  },
};
