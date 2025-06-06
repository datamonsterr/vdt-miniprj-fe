# VDT Dashboard Library

A React library for embedding a visual database design tool into your applications. Create beautiful database schemas with a drag-and-drop interface.

## Features

- 🎨 **Visual Schema Designer** - Drag and drop interface for creating database schemas
- 📱 **Embeddable Component** - Easy integration into any React application
- 🎯 **Flexible Configuration** - Customizable button, modal size, and features
- 🔄 **Undo/Redo Support** - Full history with keyboard shortcuts
- 🌙 **Theme Support** - Light/dark theme with system preference detection
- 📊 **Export Capabilities** - Get schema data via callback functions
- 🔗 **Relationship Management** - Visual foreign key relationships
- 📋 **TypeScript Support** - Fully typed with excellent IntelliSense

## Installation

```bash
# npm
npm install @your-org/vdt-dashboard

# yarn
yarn add @your-org/vdt-dashboard

# pnpm
pnpm add @your-org/vdt-dashboard
```

## Basic Usage

```tsx
import { EmbeddableDashboard } from '@your-org/vdt-dashboard'
import '@your-org/vdt-dashboard/styles'

function MyApp() {
  return (
    <div>
      <h1>My Application</h1>
      <EmbeddableDashboard 
        buttonText="Design Database"
        onSchemaChange={(data) => {
          console.log('New schema created:', data)
          // Handle schema data in your application
        }}
      />
    </div>
  )
}
```

## Advanced Usage

```tsx
import { EmbeddableDashboard } from '@your-org/vdt-dashboard'
import type { Table, ForeignKey } from '@your-org/vdt-dashboard'

function MyAdvancedApp() {
  const handleSchemaChange = (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    // Save to your backend
    console.log('Tables:', data.tables)
    console.log('Foreign Keys:', data.foreignKeys)
  }

  return (
    <EmbeddableDashboard 
      buttonText="Database Designer"
      buttonVariant="outline"
      buttonSize="lg"
      buttonClassName="my-custom-class"
      modalSize="xl"
      showDemo={false}
      showViewDatabases={false}
      onSchemaChange={handleSchemaChange}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonText` | `string` | `"Open VDT Dashboard"` | Text displayed on the trigger button |
| `buttonVariant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Button style variant |
| `buttonSize` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `buttonClassName` | `string` | `""` | Additional CSS classes for the button |
| `modalSize` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Size of the modal dialog |
| `showDemo` | `boolean` | `true` | Whether to show the demo functionality |
| `showViewDatabases` | `boolean` | `true` | Whether to show view databases button |
| `onSchemaChange` | `function` | `undefined` | Callback when schema is created/modified |

## Advanced Components

For more control, you can use the individual components:

```tsx
import { SchemaCanvas, SchemaBuilderThemeProvider } from '@your-org/vdt-dashboard'

function CustomSchemaBuilder() {
  return (
    <SchemaBuilderThemeProvider>
      <SchemaCanvas 
        onSchemaChange={(data) => console.log(data)}
        showToolbar={true}
        showUndoRedo={true}
      />
    </SchemaBuilderThemeProvider>
  )
}
```

## TypeScript Support

The library exports all necessary types:

```tsx
import type { 
  Table, 
  Column, 
  ForeignKey, 
  SQLDataType,
  EmbeddableDashboardProps 
} from '@your-org/vdt-dashboard'
```

## Styling

The library uses Tailwind CSS classes. Make sure your application has Tailwind CSS configured, or include the provided styles:

```tsx
import '@your-org/vdt-dashboard/styles'
```

## Peer Dependencies

- React 18.0.0 or 19.0.0
- React DOM 18.0.0 or 19.0.0

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
