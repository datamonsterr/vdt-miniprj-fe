import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import React from 'react'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# LoadingSpinner

A simple loading spinner component for indicating loading states.

## Usage
\`\`\`tsx
<LoadingSpinner />
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-2 text-sm text-muted-foreground">Default</p>
      </div>
      <div className="text-center">
        <div className="p-4 bg-primary text-primary-foreground rounded">
          <LoadingSpinner />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">On colored background</p>
      </div>
      <div className="text-center">
        <div className="p-4 bg-secondary text-secondary-foreground rounded">
          <LoadingSpinner />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">On secondary background</p>
      </div>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <LoadingSpinner />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  ),
} 