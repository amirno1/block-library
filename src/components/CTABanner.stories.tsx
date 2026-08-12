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

export const Image: Story = {
  args: {
    variant: 'image',
    heading: 'Ready to take the next step?',
    description: 'Start strengthening yourself and your relationships today.',
    ctaText: 'Get in touch',
    ctaHref: '#',
    imageSrc: 'https://placehold.co/720x480',
    imageAlt: '',
  },
};
