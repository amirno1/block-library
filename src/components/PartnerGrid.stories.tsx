import type { Meta, StoryObj } from '@storybook/react-vite';
import PartnerGrid from './PartnerGrid';

const meta: Meta<typeof PartnerGrid> = {
  title: 'Blocks/PartnerGrid',
  component: PartnerGrid,
};
export default meta;

type Story = StoryObj<typeof PartnerGrid>;

const partners = Array.from({ length: 6 }, (_, i) => ({
  name: `Organisatie ${i + 1}`,
  logoSrc: `https://placehold.co/160x80?text=Logo+${i + 1}`,
}));

export const TextLeft: Story = {
  args: {
    heading: 'Samenwerkingen',
    body: 'Mijn kennis wordt erkend door verschillende licenties en accreditaties van beroepsverenigingen.\n\nAls therapeut werk ik samen met een aantal gewaardeerde organisaties in het veld.',
    textPosition: 'left',
    partners,
  },
};

export const TextRight: Story = {
  args: {
    ...TextLeft.args,
    textPosition: 'right',
  },
};
