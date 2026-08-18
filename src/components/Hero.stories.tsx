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

export const FullCentered: Story = {
  name: 'Full — centered text, image background',
  args: {
    variant: 'full',
    textPosition: 'center',
    heading: 'A calm, confident introduction',
    subheading: 'Service A | Service B | Service C',
    posterSrc: 'https://placehold.co/1600x900',
    ctaText: 'Get in touch',
    ctaHref: '#',
  },
};

export const FullWithScrollHint: Story = {
  name: 'Full — with scroll-down hint',
  args: {
    ...FullCentered.args,
    scrollHint: true,
  },
};

export const FullLeftVideo: Story = {
  name: 'Full — left-aligned text, video background',
  args: {
    variant: 'full',
    textPosition: 'left',
    heading: 'Headline pinned to the left edge',
    subheading: 'Works well when the footage itself is the focal point on the right.',
    videoSrc: '',
    posterSrc: 'https://placehold.co/1600x900/333/fff',
    ctaText: 'Learn more',
    ctaHref: '#',
  },
};

export const FullRight: Story = {
  name: 'Full — right-aligned text',
  args: {
    variant: 'full',
    textPosition: 'right',
    heading: 'Headline pinned to the right edge',
    subheading: 'Mirrors the left variant for pages where the subject faces the other way.',
    posterSrc: 'https://placehold.co/1600x900/555/fff',
    ctaText: 'Learn more',
    ctaHref: '#',
  },
};

export const FullSplit: Story = {
  name: 'Full — split text (heading left, subtext+CTA right)',
  args: {
    variant: 'full',
    textPosition: 'split',
    eyebrow: 'Eyebrow text',
    heading: 'A large headline that anchors the left side of the screen',
    subheading: 'Shorter supporting copy sits opposite it, bottom-aligned, with the call to action.',
    posterSrc: 'https://placehold.co/1600x900/777/fff',
    ctaText: 'Get in touch',
    ctaHref: '#',
  },
};
