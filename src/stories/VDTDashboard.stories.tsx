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
- Routing and navigation within the full screen view
- Back button to return to the original view

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
    buttonText: {
      control: 'text',
      description: 'Text displayed on the trigger button',
      defaultValue: 'Open VDT Dashboard',
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Button style variant',
      defaultValue: 'default',
    },
    buttonSize: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Button size',
      defaultValue: 'default',
    },
    modalSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal dialog size',
      defaultValue: 'full',
    },
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
    showNavigation: {
      control: 'boolean',
      description: 'Whether to show navigation bar',
      defaultValue: true,
    },
    initialView: {
      control: 'select',
      options: ['home', 'dashboard', 'schema-builder', 'demo', 'login', 'signup', 'not-found'],
      description: 'Initial view to show when opened',
      defaultValue: 'home',
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
    modalSize: 'full',
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
    modalSize: 'xl',
    requireAuthForSchemaBuilder: false,
    initialTheme: 'light',
  },
}

export const GhostButton: Story = {
  args: {
    buttonText: 'Schema Builder',
    buttonVariant: 'ghost',
    buttonSize: 'sm',
    modalSize: 'lg',
    requireAuthForSchemaBuilder: false,
    initialTheme: 'dark',
  },
}

export const WithSampleData: Story = {
  args: {
    buttonText: 'Edit Schema',
    buttonVariant: 'default',
    modalSize: 'full',
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
    modalSize: 'xl',
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
    modalSize: 'full',
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
    modalSize: 'full',
    requireAuthForSchemaBuilder: true,
    initialView: 'login',
    initialTheme: 'light',
  },
}

export const NoNavigation: Story = {
  args: {
    buttonText: 'Embedded Canvas',
    buttonVariant: 'outline',
    modalSize: 'lg',
    requireAuthForSchemaBuilder: false,
    showNavigation: false,
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
    modalSize: 'full',
    requireAuthForSchemaBuilder: false,
    initialTheme: 'dark',
    initialTables: sampleTables,
    initialForeignKeys: sampleForeignKeys,
    initialView: 'schema-builder',
  },
}

export const SmallModal: Story = {
  args: {
    buttonText: 'Compact',
    buttonVariant: 'outline',
    buttonSize: 'sm',
    modalSize: 'sm',
    requireAuthForSchemaBuilder: false,
    initialView: 'home',
    showDemo: false,
    showViewDatabases: false,
    initialTheme: 'light',
  },
} 