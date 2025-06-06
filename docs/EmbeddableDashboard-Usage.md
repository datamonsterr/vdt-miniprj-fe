# EmbeddableDashboard Usage Guide

The `EmbeddableDashboard` component is designed to be easily integrated into any React application. It provides a complete VDT (Visual Database Design Tool) experience through a simple button trigger that opens a modal dashboard.

## Basic Usage

```tsx
import { EmbeddableDashboard } from '@/components/EmbeddableDashboard'

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

## Advanced Configuration

```tsx
import { EmbeddableDashboard } from '@/components/EmbeddableDashboard'
import type { Table, ForeignKey } from '@/types/database'

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

## Integration Examples

### In a CMS Admin Panel

```tsx
function AdminPanel() {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <nav>
          <a href="/admin/users">Users</a>
          <a href="/admin/content">Content</a>
          <EmbeddableDashboard 
            buttonText="Database Schema"
            buttonVariant="ghost"
            buttonClassName="w-full text-left"
          />
        </nav>
      </aside>
    </div>
  )
}
```

### In a Developer Tools Section

```tsx
function DeveloperTools() {
  return (
    <div className="tools-grid">
      <button>API Generator</button>
      <button>Code Formatter</button>
      <EmbeddableDashboard 
        buttonText="Schema Designer"
        buttonSize="lg"
        modalSize="full"
      />
      <button>Database Migrator</button>
    </div>
  )
}
```

### With Data Persistence

```tsx
function MyAppWithPersistence() {
  const [schemas, setSchemas] = useState([])

  const handleSchemaChange = async (data) => {
    // Save to your backend
    await fetch('/api/schemas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    // Update local state
    setSchemas(prev => [...prev, data])
  }

  return (
    <EmbeddableDashboard 
      buttonText="New Schema"
      onSchemaChange={handleSchemaChange}
    />
  )
}
```

## Features Available in the Dashboard

- **Schema Builder**: Full visual database schema designer with drag-and-drop tables
- **Table Management**: Create, edit, and delete database tables
- **Column Management**: Add columns with different data types and constraints
- **Relationship Creation**: Visual foreign key relationships between tables
- **Undo/Redo**: Full undo/redo support with keyboard shortcuts
- **Theme Toggle**: Light/dark theme support
- **Demo Mode**: Sample schemas and tutorials (optional)

## Styling

The component uses Tailwind CSS classes and follows the shadcn/ui design system. It should integrate well with most modern React applications that use Tailwind.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## TypeScript Support

The component is fully typed with TypeScript, providing excellent IntelliSense and type safety when used in TypeScript projects. 