import type { Meta, StoryObj } from '@storybook/react-vite';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Blocks/Hero',
  component: Hero,
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Split: Story = {
  args: {
    variant: 'split',
    eyebrow: 'Eyebrow text',
    heading: 'A clear, confident headline goes here',
    subheading:
      'Supporting sentence that explains the offer in one or two lines, without repeating the headline.',
    imageSrc: 'https://placehold.co/640x800',
    imageAlt: '',
    ctaText: 'Get started',
    ctaHref: '#',
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    eyebrow: 'Eyebrow text',
    heading: 'A centered headline for a simpler hero',
    subheading: 'Works well for pages that don’t need a hero image.',
    ctaText: 'Get started',
    ctaHref: '#',
  },
};

export const Video: Story = {
  args: {
    variant: 'video',
    heading: 'A calm, confident introduction',
    subheading: 'Service A | Service B | Service C',
    posterSrc: 'https://placehold.co/1600x900',
    ctaText: 'Get in touch',
    ctaHref: '#',
  },
};
