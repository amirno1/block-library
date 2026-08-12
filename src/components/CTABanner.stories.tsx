import type { Meta, StoryObj } from '@storybook/react-vite';
import CTABanner from './CTABanner';

const meta: Meta<typeof CTABanner> = {
  title: 'Blocks/CTABanner',
  component: CTABanner,
};
export default meta;

type Story = StoryObj<typeof CTABanner>;

export const Split: Story = {
  args: {
    variant: 'split',
    heading: 'Ready to see it for yourself?',
    description: 'Book a free 20-minute call — no pressure, no obligation, just a conversation.',
    ctaText: 'Book a call',
    ctaHref: '#',
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    heading: 'Ready to see it for yourself?',
    description: 'Book a free 20-minute call — no pressure, no obligation, just a conversation.',
    ctaText: 'Book a call',
    ctaHref: '#',
  },
};
