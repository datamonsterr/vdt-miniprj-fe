import type { Meta, StoryObj } from '@storybook/react'
import { VDTDashboard } from '../sections/vdt-dashboard'
import { sampleTables, sampleForeignKeys, simpleSampleTables, simpleSampleForeignKeys } from '../mocks/sampleData'
import { fn } from '@storybook/test'

const meta: Meta<typeof VDTDashboard> = {
  title: 'VDT Dashboard/VDTDashboard',
  component: VDTDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# VDTDashboard

A complete, self-contained VDT dashboard component that can be embedded in any React application.

## Features
- All necessary context providers (Clerk, theme, auth) internally
- A trigger button that opens a full screen overlay containing the VDT dashboard
- Complete isolation from the host application's state management
- Authentication system with Clerk
- Schema builder with drag-and-drop functionality
- Undo/redo capabilities
- Theme management (light/dark) isolated to the dashboard
- Back button to return to the original view
- Schema name display and editing functionality

## Usage
\`\`\`tsx
<VDTDashboard 
  buttonText="Design Database" 
  buttonVariant="outline"
  onSchemaChange={(data) => console.log('Schema changed:', data)}
  initialTheme="dark"
  requireAuthForSchemaBuilder={false}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    initialTheme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Initial theme for the schema builder',
      defaultValue: 'light',
    },
    requireAuthForSchemaBuilder: {
      control: 'boolean',
      description: 'Whether authentication is required for schema builder',
      defaultValue: true,
    },
    showDemo: {
      control: 'boolean',
      description: 'Whether to show demo functionality',
      defaultValue: true,
    },
    showViewDatabases: {
      control: 'boolean',
      description: 'Whether to show view databases functionality',
      defaultValue: true,
    },
    onSchemaChange: {
      action: 'schema-changed',
      description: 'Callback when schema is created/modified',
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
    buttonText: 'Open VDT Dashboard',
    buttonVariant: 'default',
    requireAuthForSchemaBuilder: false,
    showDemo: true,
    showViewDatabases: true,
    initialTheme: 'light',
  },
}

export const OutlineButton: Story = {
  args: {
    buttonText: 'Database Designer',
    buttonVariant: 'outline',
    requireAuthForSchemaBuilder: false,
    initialTheme: 'light',
  },
}

export const GhostButton: Story = {
  args: {
    buttonText: 'Schema Builder',
    buttonVariant: 'ghost',
    buttonSize: 'sm',
    requireAuthForSchemaBuilder: false,
    initialTheme: 'dark',
  },
}

export const WithSampleData: Story = {
  args: {
    buttonText: 'Edit Schema',
    buttonVariant: 'default',
    requireAuthForSchemaBuilder: false,
    initialTables: sampleTables,
    initialForeignKeys: sampleForeignKeys,
    initialView: 'schema-builder',
    initialTheme: 'light',
  },
}

export const SimpleSampleData: Story = {
  args: {
    buttonText: 'Quick Schema',
    buttonVariant: 'outline',
    requireAuthForSchemaBuilder: false,
    initialTables: simpleSampleTables,
    initialForeignKeys: simpleSampleForeignKeys,
    initialView: 'schema-builder',
    initialTheme: 'dark',
  },
}

export const DemoMode: Story = {
  args: {
    buttonText: 'Try Demo',
    buttonVariant: 'secondary',
    requireAuthForSchemaBuilder: false,
    initialView: 'demo',
    showDemo: true,
    initialTheme: 'light',
  },
}

export const AuthRequired: Story = {
  args: {
    buttonText: 'Pro Schema Builder',
    buttonVariant: 'default',
    requireAuthForSchemaBuilder: true,
    initialView: 'login',
    initialTheme: 'light',
  },
}

export const DirectToSchemaBuilder: Story = {
  args: {
    buttonText: 'Edit Schema',
    buttonVariant: 'outline',
    requireAuthForSchemaBuilder: false,
    initialView: 'schema-builder',
    initialTables: simpleSampleTables,
    initialForeignKeys: simpleSampleForeignKeys,
    initialTheme: 'light',
  },
}

export const DarkTheme: Story = {
  args: {
    buttonText: 'Dark Mode',
    buttonVariant: 'outline',
    requireAuthForSchemaBuilder: false,
    initialTheme: 'dark',
    initialTables: sampleTables,
    initialForeignKeys: sampleForeignKeys,
    initialView: 'schema-builder',
  },
}

export const Compact: Story = {
  args: {
    buttonText: 'Compact',
    buttonVariant: 'outline',
    buttonSize: 'sm',
    requireAuthForSchemaBuilder: false,
    initialView: 'home',
    showDemo: false,
    showViewDatabases: false,
    initialTheme: 'light',
  },
} 