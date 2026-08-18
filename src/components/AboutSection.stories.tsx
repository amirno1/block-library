import type { Meta, StoryObj } from '@storybook/react-vite';
import AboutSection from './AboutSection';

const meta: Meta<typeof AboutSection> = {
  title: 'Blocks/AboutSection',
  component: AboutSection,
};
export default meta;

type Story = StoryObj<typeof AboutSection>;

const baseArgs = {
  eyebrow: 'About',
  heading: 'A short, human introduction goes here',
  body: 'First paragraph of the story — who this is and what they do.\n\nSecond paragraph, a bit more specific about the approach or background.',
  credentials: ['Credential one', 'Credential two', 'Credential three'],
  imageSrc: 'https://placehold.co/720x900',
  imageAlt: '',
};

export const SplitImageLeft: Story = {
  name: 'Split — image left (default)',
  args: { ...baseArgs, variant: 'split', imagePosition: 'left' },
};

export const SplitImageRight: Story = {
  name: 'Split — image right',
  args: { ...baseArgs, variant: 'split', imagePosition: 'right' },
};

export const Stacked: Story = {
  args: { ...baseArgs, variant: 'stacked' },
};

export const OverlapImageLeft: Story = {
  name: 'Overlap — image left',
  args: { ...baseArgs, variant: 'overlap', imagePosition: 'left' },
};

export const OverlapImageRight: Story = {
  name: 'Overlap — image right',
  args: { ...baseArgs, variant: 'overlap', imagePosition: 'right' },
};
