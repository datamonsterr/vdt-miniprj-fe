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
- Hand tool for panning the canvas
- Move tool for moving tables
- Table tool for adding new tables
- Edit tool for editing tables and columns
- Connection tool for creating foreign key relationships

## Usage
\`\`\`tsx
<Toolbar 
  selectedTool={ToolType.MOVE}
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
      defaultValue: ToolType.MOVE,
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
    selectedTool: ToolType.MOVE,
  },
}

export const MoveTool: Story = {
  args: {
    selectedTool: ToolType.MOVE,
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

export const EditTool: Story = {
  args: {
    selectedTool: ToolType.EDIT,
  },
}

export const RelationshipTool: Story = {
  args: {
    selectedTool: ToolType.RELATIONSHIP,
  },
}

export const AllTools: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <div className="text-center">
        <Toolbar selectedTool={ToolType.HAND} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Hand Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.MOVE} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Move Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.TABLE} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Table Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.EDIT} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Edit Tool</p>
      </div>
      <div className="text-center">
        <Toolbar selectedTool={ToolType.RELATIONSHIP} onToolChange={fn()} />
        <p className="mt-2 text-sm text-muted-foreground">Relationship Tool</p>
      </div>
    </div>
  ),
} 