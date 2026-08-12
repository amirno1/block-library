import type { Meta, StoryObj } from '@storybook/react-vite';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Blocks/Carousel',
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Quotes: Story = {
  args: {
    variant: 'quotes',
    slides: [
      {
        text: 'Working with this team took our launch from "someday" to three weeks. Everything just worked.',
        attribution: 'Dana Whitfield, Founder',
      },
      {
        text: 'The kind of responsiveness you hope for and rarely get. Questions answered same day, every time.',
        attribution: 'Marcus Ilyin, Operations Lead',
      },
      {
        text: "We've since recommended them to two other teams — both said the same thing: it just felt easy.",
        attribution: 'Priya Nandan, Studio Owner',
      },
    ],
  },
};

export const Images: Story = {
  args: {
    variant: 'images',
    slides: [
      { imageSrc: 'https://placehold.co/1280x720', caption: 'Opening night, October 2025' },
      { imageSrc: 'https://placehold.co/1280x720', caption: 'The main studio space' },
      { imageSrc: 'https://placehold.co/1280x720', caption: 'A weekday workshop in progress' },
    ],
  },
};
