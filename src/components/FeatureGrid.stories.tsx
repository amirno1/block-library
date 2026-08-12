import type { Meta, StoryObj } from '@storybook/react-vite';
import FeatureGrid from './FeatureGrid';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Blocks/FeatureGrid',
  component: FeatureGrid,
};
export default meta;

type Story = StoryObj<typeof FeatureGrid>;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const items = [
  {
    icon: <Icon d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
    title: 'Fast turnaround',
    description: 'Most requests are quoted within a day and delivered within a week, not a month.',
  },
  {
    icon: <Icon d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />,
    title: 'Fully insured',
    description: 'Every project is covered end to end, with documentation available on request.',
  },
  {
    icon: <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
    title: 'A dedicated team',
    description: 'One point of contact from first call to final delivery — no handoffs, no repeating yourself.',
  },
];

export const Cards: Story = {
  args: {
    variant: 'cards',
    eyebrow: 'Why us',
    heading: 'What working together looks like',
    description: 'Three things clients mention most often when asked what they’d tell a friend.',
    items,
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    eyebrow: 'Why us',
    heading: 'What working together looks like',
    items,
  },
};
