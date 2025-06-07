import type { Meta, StoryObj } from '@storybook/react'
import { VDTDashboard } from '../sections/vdt-dashboard'
import { StandaloneSchemaCanvas } from '../sections/schema-builder'
import { simpleSampleTables, simpleSampleForeignKeys } from '../mocks/sampleData'
import React from 'react'

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# VDT Dashboard Library

Welcome to the **VDT Dashboard** component library! This is a comprehensive, embeddable database schema builder for React applications.

## 🚀 What is VDT Dashboard?

VDT Dashboard is a powerful, self-contained visual database schema builder that can be embedded in any React application. It provides an intuitive drag-and-drop interface for creating database schemas, complete with authentication, theme management, and comprehensive TypeScript support.

## ✨ Key Features

- **🎨 Visual Schema Design** - Intuitive drag-and-drop interface for creating database tables and relationships
- **🔐 Managed Authentication** - Built-in authentication system with Clerk integration, no setup required
- **🌓 Isolated Themes** - Light/dark themes that don't interfere with your app's styling
- **↩️ Undo/Redo System** - Complete history management with keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- **🔗 Relationship Management** - Visual foreign key creation and management between tables
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🎯 TypeScript First** - Comprehensive type definitions with excellent IntelliSense support
- **🚀 Zero Configuration** - Works out of the box with sensible defaults

## 🚀 Quick Start

\`\`\`bash
yarn add @datamonsterr/vdt-dashboard
\`\`\`

\`\`\`tsx
import { VDTDashboard } from '@datamonsterr/vdt-dashboard'
import '@datamonsterr/vdt-dashboard/styles'

function App() {
  return (
    <VDTDashboard 
      buttonText="Open Schema Builder"
      onSchemaChange={(data) => console.log('Schema changed:', data)}
    />
  )
}
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  render: () => (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">VDT Dashboard Library</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive, embeddable database schema builder for React applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">VDTDashboard Component</h2>
          <p className="text-muted-foreground">
            The primary component - a complete dashboard with modal interface, authentication, and navigation.
          </p>
          <div className="flex justify-center">
            <VDTDashboard 
              buttonText="Try VDT Dashboard"
              buttonVariant="default"
              modalSize="lg"
              requireAuthForSchemaBuilder={false}
              initialTables={simpleSampleTables}
              initialForeignKeys={simpleSampleForeignKeys}
              initialView="schema-builder"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">StandaloneSchemaCanvas</h2>
          <p className="text-muted-foreground">
            A self-contained schema canvas that can be embedded directly in your UI without a modal.
          </p>
          <div className="h-[400px] border rounded-lg overflow-hidden">
            <StandaloneSchemaCanvas 
              className="h-full"
              showToolbar={true}
              showUndoRedo={true}
              showThemeToggle={true}
              showUserSettings={false}
              initialTables={simpleSampleTables}
              initialForeignKeys={simpleSampleForeignKeys}
              initialTheme="light"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-2xl">🎨</div>
            <h3 className="font-semibold">Visual Schema Design</h3>
            <p className="text-sm text-muted-foreground">
              Intuitive drag-and-drop interface for creating database tables and relationships
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">🔐</div>
            <h3 className="font-semibold">Managed Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Built-in authentication system with Clerk integration, no setup required
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">🌓</div>
            <h3 className="font-semibold">Isolated Themes</h3>
            <p className="text-sm text-muted-foreground">
              Light/dark themes that don't interfere with your app's styling
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">↩️</div>
            <h3 className="font-semibold">Undo/Redo System</h3>
            <p className="text-sm text-muted-foreground">
              Complete history management with keyboard shortcuts (Ctrl+Z, Ctrl+Y)
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">🎯</div>
            <h3 className="font-semibold">TypeScript First</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive type definitions with excellent IntelliSense support
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl">🚀</div>
            <h3 className="font-semibold">Zero Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Works out of the box with sensible defaults
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <p className="text-muted-foreground">
          Explore the components in the sidebar to see all available options and configurations!
        </p>
      </div>
    </div>
  ),
} 