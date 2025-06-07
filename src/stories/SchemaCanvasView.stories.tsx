import type { Meta, StoryObj } from '@storybook/react'
import { SchemaCanvasView } from '../sections/schema-builder'
import { sampleTables, sampleForeignKeys, simpleSampleTables, simpleSampleForeignKeys } from '../mocks/sampleData'
import { fn } from '@storybook/test'

const meta: Meta<typeof SchemaCanvasView> = {
  title: 'VDT Dashboard/StandaloneSchemaCanvas',
  component: SchemaCanvasView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# StandaloneSchemaCanvas

A complete, self-contained schema canvas component that can be embedded in any React application without external dependencies.

## Features
- All necessary context providers (theme, drag-drop, stores) internally
- Complete isolation from the host application's state management
- Schema builder with drag-and-drop functionality
- Undo/redo capabilities
- Theme management (light/dark) isolated to the canvas
- Interactive table creation and editing
- Foreign key relationship creation
- Canvas panning with hand tool

## Usage
\`\`\`tsx
<StandaloneSchemaCanvas 
  onSchemaChange={(data) => console.log('Schema changed:', data)}
  showToolbar={true}
  showUndoRedo={true}
  initialTheme="dark"
  className="h-[600px] w-full"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the toolbar with tools',
      defaultValue: true,
    },
    showUndoRedo: {
      control: 'boolean',
      description: 'Whether to show undo/redo buttons',
      defaultValue: true,
    },
    showThemeToggle: {
      control: 'boolean',
      description: 'Whether to show the theme toggle button',
      defaultValue: true,
    },
    showUserSettings: {
      control: 'boolean',
      description: 'Whether to show the user settings button',
      defaultValue: true,
    },
    initialTheme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Initial theme for the schema builder',
      defaultValue: 'light',
    },
    className: {
      control: 'text',
      description: 'Custom className for the canvas container',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Custom wrapper className',
    },
    onSchemaChange: {
      action: 'schema-changed',
      description: 'Callback when schema data changes',
    },
  },
  args: {
    onSchemaChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTheme: 'light',
    className: 'h-[600px] w-full border rounded-lg',
  },
}

export const WithSampleData: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTables: sampleTables,
    initialForeignKeys: sampleForeignKeys,
    initialTheme: 'light',
    className: 'h-[600px] w-full border rounded-lg',
  },
}

export const SimpleSample: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTables: simpleSampleTables,
    initialForeignKeys: simpleSampleForeignKeys,
    initialTheme: 'light',
    className: 'h-[500px] w-full border rounded-lg',
  },
}

export const DarkTheme: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTables: sampleTables,
    initialForeignKeys: sampleForeignKeys,
    initialTheme: 'dark',
    className: 'h-[600px] w-full border rounded-lg',
  },
}

export const MinimalInterface: Story = {
  args: {
    showToolbar: false,
    showUndoRedo: false,
    showThemeToggle: false,
    showUserSettings: false,
    initialTables: simpleSampleTables,
    initialForeignKeys: simpleSampleForeignKeys,
    initialTheme: 'light',
    className: 'h-[500px] w-full border rounded-lg',
  },
}

export const ToolbarOnly: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: false,
    showThemeToggle: false,
    showUserSettings: false,
    initialTheme: 'light',
    className: 'h-[500px] w-full border rounded-lg',
  },
}

export const UndoRedoOnly: Story = {
  args: {
    showToolbar: false,
    showUndoRedo: true,
    showThemeToggle: false,
    showUserSettings: false,
    initialTables: simpleSampleTables,
    initialForeignKeys: simpleSampleForeignKeys,
    initialTheme: 'light',
    className: 'h-[500px] w-full border rounded-lg',
  },
}

export const Compact: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTables: simpleSampleTables,
    initialForeignKeys: simpleSampleForeignKeys,
    initialTheme: 'light',
    className: 'h-[400px] w-[600px] border rounded-lg',
  },
}

export const Large: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTables: sampleTables,
    initialForeignKeys: sampleForeignKeys,
    initialTheme: 'light',
    className: 'h-[800px] w-full border rounded-lg',
  },
}

export const EmptyCanvas: Story = {
  args: {
    showToolbar: true,
    showUndoRedo: true,
    showThemeToggle: true,
    showUserSettings: false,
    initialTables: [],
    initialForeignKeys: [],
    initialTheme: 'light',
    className: 'h-[600px] w-full border rounded-lg',
  },
} 