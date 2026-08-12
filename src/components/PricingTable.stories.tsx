import type { Meta, StoryObj } from '@storybook/react-vite';
import PricingTable from './PricingTable';

const meta: Meta<typeof PricingTable> = {
  title: 'Blocks/PricingTable',
  component: PricingTable,
};
export default meta;

type Story = StoryObj<typeof PricingTable>;

export const Default: Story = {
  args: {
    eyebrow: 'Tarieven',
    heading: 'Wat kost een sessie',
    description: 'Duidelijke tarieven, geen verrassingen.',
    columns: ['Sessie', 'Duur', 'Prijs'],
    rows: [
      { label: 'Individueel gesprek', duration: '50 min', price: '€95' },
      { label: 'Relatietherapie', duration: '75 min', price: '€140' },
      { label: 'Intakegesprek', duration: '60 min', price: '€110', note: 'Eenmalig' },
    ],
  },
};
