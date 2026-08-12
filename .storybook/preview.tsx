import type { Preview } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import './preview-tokens.css'
import '../src/styles.css'

// Blocks are designed to sit inside a client site's own page container
// (max-width + padding). Storybook has no such wrapper by default, so we
// add one here purely for realistic previewing — it's not part of the
// library itself.
function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1.5rem' }}>
      {children}
    </div>
  )
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <PageContainer>
        <Story />
      </PageContainer>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
