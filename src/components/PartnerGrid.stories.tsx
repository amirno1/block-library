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

// Mixed on purpose: cards with a description become click-to-reveal;
// a card with only an href stays a plain direct link; a card with neither
// stays inert — all three should coexist without regressing each other.
const partnersWithDetail = [
  {
    name: 'Organisatie 1',
    logoSrc: 'https://placehold.co/160x80?text=Logo+1',
    href: 'https://example.com/1',
    description: 'Een korte beschrijving van deze samenwerking en waarom die relevant is voor cliënten.',
  },
  {
    name: 'Organisatie 2',
    logoSrc: 'https://placehold.co/160x80?text=Logo+2',
    description: 'Deze organisatie heeft geen link, dus geen "Bezoek website"-knop in het paneel.',
  },
  {
    name: 'Organisatie 3 (plain link)',
    logoSrc: 'https://placehold.co/160x80?text=Logo+3',
    href: 'https://example.com/3',
  },
  {
    name: 'Organisatie 4 (inert)',
    logoSrc: 'https://placehold.co/160x80?text=Logo+4',
  },
];

export const WithClickToRevealDetail: Story = {
  args: {
    ...TextLeft.args,
    visitLabel: 'Bezoek website',
    partners: partnersWithDetail,
  },
};

export const OnePartner: Story = {
  args: {
    ...TextLeft.args,
    partners: [partnersWithDetail[0]],
  },
};

export const TwoPartners: Story = {
  args: {
    ...TextLeft.args,
    partners: partnersWithDetail.slice(0, 2),
  },
};

export const NoLogoFallback: Story = {
  args: {
    ...TextLeft.args,
    partners: [
      { name: 'Organisatie Zonder Logo', description: 'Deze organisatie heeft geen logo geüpload, dus de naam wordt als tekst getoond.' },
      ...partnersWithDetail.slice(0, 2),
    ],
  },
};
