import type { Meta, StoryObj } from '@storybook/react-vite';
import ErrorPage from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
  title: 'Blocks/ErrorPage',
  component: ErrorPage,
};
export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const NotFound: Story = {
  args: {
    code: '404',
    heading: "We couldn't find the page you were looking for",
    message: 'This is usually because the URL was mistyped, or the page has moved or been removed.',
    reasons: [
      'There is an error in the URL entered into your browser — check it and try again.',
      'The page you are looking for has been moved or deleted.',
    ],
    primaryAction: { text: 'Go to the homepage', href: '#' },
    secondaryAction: { text: 'Contact us', href: '#' },
  },
};

export const ServerError: Story = {
  name: 'Server error (500), no reasons list',
  args: {
    code: '500',
    heading: 'Something went wrong on our end',
    message: "We're looking into it — please try again in a moment.",
    primaryAction: { text: 'Go to the homepage', href: '#' },
  },
};

export const WithRetryAction: Story = {
  name: 'Retry action (onClick instead of href) — e.g. a Next.js error boundary',
  args: {
    code: '500',
    heading: 'Something went wrong',
    message: 'An unexpected error occurred. Try again, or go back to the homepage.',
    primaryAction: { text: 'Try again', onClick: () => alert('retry() called') },
    secondaryAction: { text: 'Go to the homepage', href: '#' },
  },
};

export const Minimal: Story = {
  name: 'Minimal — no code, single action',
  args: {
    heading: 'Page unavailable',
    primaryAction: { text: 'Go back', href: '#' },
  },
};
