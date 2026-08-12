import type { Meta, StoryObj } from '@storybook/react-vite';
import Testimonials from './Testimonials';

const meta: Meta<typeof Testimonials> = {
  title: 'Blocks/Testimonials',
  component: Testimonials,
};
export default meta;

type Story = StoryObj<typeof Testimonials>;

export const Default: Story = {
  args: {
    eyebrow: 'Reviews',
    heading: 'Wat cliënten zeggen',
    items: [
      {
        quote: 'Voor het eerst voelde ik me echt gehoord. De sessies gaven ons als stel weer perspectief.',
        name: 'M. & J.',
        role: 'Relatietherapie',
      },
      {
        quote: 'Een veilige, professionele plek om patronen te doorbreken die ik al jaren met me meedroeg.',
        name: 'S.',
        role: 'Schematherapie',
      },
      {
        quote: 'Praktisch en warm tegelijk. Ik kwam met vage klachten en vertrok met concrete inzichten.',
        name: 'R.',
      },
    ],
  },
};
