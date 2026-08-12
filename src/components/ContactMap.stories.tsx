import type { Meta, StoryObj } from '@storybook/react-vite';
import ContactMap from './ContactMap';

const meta: Meta<typeof ContactMap> = {
  title: 'Blocks/ContactMap',
  component: ContactMap,
};
export default meta;

type Story = StoryObj<typeof ContactMap>;

export const Default: Story = {
  args: {
    eyebrow: 'Contact',
    heading: 'Neem contact op',
    description: 'Stuur een bericht of plan direct een kennismakingsgesprek in.',
    address: 'Hoofdstraat 1, 1234 AB Amsterdam',
    phone: '+31 6 12345678',
    email: 'info@bijfleur.nl',
  },
};
