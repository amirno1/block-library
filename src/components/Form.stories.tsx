import type { Meta, StoryObj } from '@storybook/react-vite';
import Form from './Form';

const meta: Meta<typeof Form> = {
  title: 'Blocks/Form',
  component: Form,
};
export default meta;

type Story = StoryObj<typeof Form>;

export const Minimal: Story = {
  name: 'Minimal — name + email',
  args: {
    eyebrow: 'Contact',
    heading: 'Get in touch',
    fields: [
      { name: 'name', type: 'text', label: 'Name', required: true, autoComplete: 'name' },
      { name: 'email', type: 'email', label: 'Email', required: true, autoComplete: 'email' },
    ],
    onSubmit: async (data) => {
      console.log('submitted', data);
      await new Promise((r) => setTimeout(r, 600));
    },
  },
};

export const FullFeatured: Story = {
  name: 'Full — phone, message, dropdown',
  args: {
    eyebrow: 'Contact',
    heading: 'Book a session',
    description: 'Fill in the form and we’ll get back to you within one business day.',
    fields: [
      { name: 'firstName', type: 'text', label: 'First name', required: true, autoComplete: 'given-name' },
      { name: 'lastName', type: 'text', label: 'Last name', required: true, autoComplete: 'family-name' },
      { name: 'email', type: 'email', label: 'Email', required: true, autoComplete: 'email' },
      { name: 'phone', type: 'tel', label: 'Phone', autoComplete: 'tel' },
      {
        name: 'topic',
        type: 'select',
        label: 'What is this about?',
        required: true,
        options: ['General question', 'Booking', 'Billing'],
      },
      { name: 'message', type: 'textarea', label: 'Message', required: true },
    ],
    submitText: 'Send message',
    onSubmit: async (data) => {
      console.log('submitted', data);
      await new Promise((r) => setTimeout(r, 600));
    },
  },
};

export const SubmissionFails: Story = {
  name: 'Submission fails (error state)',
  args: {
    ...Minimal.args,
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 400));
      throw new Error('The mail server is unreachable right now.');
    },
  },
};
