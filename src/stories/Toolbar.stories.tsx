import type { Meta, StoryObj } from '@storybook/react'
import { Toolbar } from '../components/schema-builder/Toolbar'
import { ToolType } from '../types/database'
import { fn } from '@storybook/test'
import React from 'react'

const meta: Meta<typeof Toolbar> = {
  title: 'Schema Builder/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toolbar

A toolbar component for the schema builder that provides tool selection for different interaction modes.

## Features
- Select tool for moving tables
- Hand tool for panning the canvas
- Table tool for adding new tables
- Column tool for adding columns
- Connection tool for creating foreign key relationships

## Usage
\`\`\`tsx
<Toolbar 
  selectedTool={ToolType.SELECT}
  onToolChange={(tool) => console.log('Tool changed:', tool)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    selectedTool: {
      control: 'select',
      options: Object.values(ToolType),
      description: 'Currently selected tool',
      defaultValue: ToolType.SELECT,
    },
    onToolChange: {
      action: 'tool-changed',
      description: 'Callback when tool is changed',
    },
  },
  args: {
    onToolChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    selectedTool: ToolType.SELECT,
  },
}

export const SelectTool: Story = {
  args: {
    selectedTool: ToolType.SELECT,
  },
}

export const HandTool: Story = {
  args: {
    selectedTool: ToolType.HAND,
  },
}

export const TableTool: Story = {
  args: {
    selectedTool: ToolType.TABLE,
  },
}

export const ColumnTool: Story = {
  args: {
    selectedTool: ToolType.COLUMN,
  },
}

export const ConnectionTool: Story = {
  args: {
    selectedTool: ToolType.CONNECTION,
  },
}

export const AllTools: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <div className="text-center">
        <Toolbar selectedTool={ToolType.SELECT} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Select Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.HAND} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Hand Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.TABLE} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Table Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.COLUMN} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Column Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.CONNECTION} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Connection Tool</p>
      </div>
    </div>
  ),
} 