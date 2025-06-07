import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { ConfirmationDialog } from '../components/ui/confirmation-dialog'
import { Button } from '../components/ui/button'
import { fn } from '@storybook/test'

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'UI/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ConfirmationDialog

A reusable confirmation dialog component for destructive actions like deletions.

## Features
- Warning icon with destructive styling
- Customizable title and description text
- Configurable button text
- Different variants (destructive, default)
- Accessible dialog implementation

## Usage
\`\`\`tsx
<ConfirmationDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  onConfirm={handleDelete}
  title="Delete Item"
  description="Are you sure you want to delete this item? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  variant="destructive"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description/warning message',
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button',
    },
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button',
    },
    variant: {
      control: 'select',
      options: ['destructive', 'default'],
      description: 'Button variant',
    },
    onConfirm: {
      action: 'confirmed',
      description: 'Callback when confirm button is clicked',
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when dialog open state changes',
    },
  },
  args: {
    onConfirm: fn(),
    onOpenChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component to manage dialog state
function DialogWrapper(args: any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Open Confirmation Dialog
      </Button>
      <ConfirmationDialog
        {...args}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'destructive',
  },
}

export const DeleteTable: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Delete Table',
    description: 'Are you sure you want to delete the table "users"? This action cannot be undone and will also remove all foreign key relationships involving this table.',
    confirmText: 'Delete Table',
    cancelText: 'Cancel',
    variant: 'destructive',
  },
}

export const DeleteColumn: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Delete Column',
    description: 'Are you sure you want to delete this column? This action cannot be undone and may affect foreign key relationships.',
    confirmText: 'Delete Column',
    cancelText: 'Cancel',
    variant: 'destructive',
  },
}

export const DeleteForeignKey: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Delete Foreign Key',
    description: 'Are you sure you want to delete the foreign key relationship between "orders.user_id" and "users.id"? This action cannot be undone.',
    confirmText: 'Delete Relationship',
    cancelText: 'Cancel',
    variant: 'destructive',
  },
}

export const CustomVariant: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    confirmText: 'Proceed',
    cancelText: 'Cancel',
    variant: 'default',
  },
} 