import type { Meta, StoryObj } from '@storybook/react-vite';
import ServiceTabs from './ServiceTabs';

const meta: Meta<typeof ServiceTabs> = {
  title: 'Blocks/ServiceTabs',
  component: ServiceTabs,
};
export default meta;

type Story = StoryObj<typeof ServiceTabs>;

export const Default: Story = {
  args: {
    eyebrow: 'Diensten',
    heading: 'Waarmee ik je kan helpen',
    description: 'Kies een dienst om te lezen wat het inhoudt.',
    items: [
      {
        title: 'Relatietherapie',
        description: 'Voor stellen die vastlopen in hun communicatie en verbinding willen herstellen.',
        imageSrc: 'https://placehold.co/720x540',
        imageAlt: '',
      },
      {
        title: 'Schematherapie',
        description: 'Diepgaand werken aan terugkerende patronen die voortkomen uit vroegere ervaringen.',
        imageSrc: 'https://placehold.co/720x540/eee/333',
        imageAlt: '',
      },
      {
        title: 'Psychodrama',
        description: 'Ervaringsgericht werken met rollenspel om vastzittende situaties te doorbreken.',
        imageSrc: 'https://placehold.co/720x540/ddd/333',
        imageAlt: '',
      },
    ],
  },
};
