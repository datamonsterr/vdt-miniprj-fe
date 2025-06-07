# VDT Dashboard - Embeddable Database Schema Builder

[![npm version](https://badge.fury.io/js/@datamonsterr%2Fvdt-dashboard.svg)](https://badge.fury.io/js/@datamonsterr%2Fvdt-dashboard)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)

A powerful, embeddable visual database schema builder for React applications. Create database schemas with an intuitive drag-and-drop interface, complete with authentication, theme management, and comprehensive TypeScript support.

## ✨ Features

- 🎨 **Visual Schema Design** - Intuitive drag-and-drop interface for creating database tables and relationships
- 🔐 **Managed Authentication** - Built-in authentication system with Clerk integration, no setup required
- 🌓 **Isolated Themes** - Light/dark themes that don't interfere with your app's styling
- ↩️ **Undo/Redo System** - Complete history management with keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- 🔗 **Relationship Management** - Visual foreign key creation and management between tables
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎯 **TypeScript First** - Comprehensive type definitions with excellent IntelliSense support
- 🚀 **Zero Configuration** - Works out of the box with sensible defaults
- 🎭 **Demo Mode** - Interactive examples and tutorials for new users
- 📦 **Flexible Integration** - Multiple components for different use cases
- 🔄 **Real-time Updates** - Live schema validation and change detection

## 🚀 Quick Start

### Installation

```bash
# Using Yarn (recommended)
yarn add @datamonsterr/vdt-dashboard

# Using npm
npm install @datamonsterr/vdt-dashboard

# Using pnpm
pnpm add @datamonsterr/vdt-dashboard
```

### Basic Usage

The simplest way to integrate VDT Dashboard into your app:

```tsx
import { VDTDashboard } from '@datamonsterr/vdt-dashboard'
import '@datamonsterr/vdt-dashboard/styles'

function App() {
  const handleSchemaChange = (data) => {
    console.log('Schema updated:', data.tables)
    console.log('Relationships:', data.foreignKeys)
    // Save to your backend, state management, etc.
  }

  return (
    <div>
      <h1>My Application</h1>
      
      {/* Simple button that opens the schema builder */}
      <VDTDashboard 
        buttonText="Design Database Schema"
        onSchemaChange={handleSchemaChange}
      />
    </div>
  )
}
```

That's it! The button will open a complete database schema builder in a modal dialog.

## 📋 Usage Examples

### 1. Basic Integration with Custom Styling

```tsx
<VDTDashboard 
  buttonText="Database Designer"
  buttonVariant="outline"
  buttonClassName="my-custom-button-class"
  modalSize="xl"
  onSchemaChange={(data) => {
    // Handle schema changes
    saveToDatabase(data)
  }}
/>
```

### 2. With Initial Data

```tsx
import { sampleTables, sampleForeignKeys } from '@datamonsterr/vdt-dashboard'

<VDTDashboard 
  buttonText="Edit Schema"
  initialTables={sampleTables}
  initialForeignKeys={sampleForeignKeys}
  onSchemaChange={handleSchemaChange}
/>
```

### 3. Embedded Canvas (No Modal)

```tsx
import { StandaloneSchemaCanvas } from '@datamonsterr/vdt-dashboard'

function SchemaEditor() {
  return (
    <div className="h-96 border rounded">
      <StandaloneSchemaCanvas 
        showToolbar={true}
        showUndoRedo={true}
        onSchemaChange={handleSchemaChange}
      />
    </div>
  )
}
```

### 4. Authentication Required

```tsx
<VDTDashboard 
  buttonText="Pro Schema Builder"
  requireAuthForSchemaBuilder={true}
  clerkPublishableKey="your-clerk-key"
  onSchemaChange={handleSchemaChange}
/>
```

## 🔐 Authentication

VDT Dashboard includes **managed authentication** powered by Clerk:

### Zero Configuration (Recommended)
```tsx
// Uses VDT's managed authentication - no setup required
<VDTDashboard 
  requireAuthForSchemaBuilder={true}
  onSchemaChange={handleSchemaChange}
/>
```

### Bring Your Own Clerk Instance
```tsx
// Use your existing Clerk setup
<VDTDashboard 
  clerkPublishableKey="pk_test_your-clerk-key"
  requireAuthForSchemaBuilder={true}
  onSchemaChange={handleSchemaChange}
/>
```

### Anonymous Usage
```tsx
// Allow usage without authentication
<VDTDashboard 
  requireAuthForSchemaBuilder={false}
  onSchemaChange={handleSchemaChange}
/>
```

## 🎨 Theming

The dashboard uses isolated CSS to prevent conflicts with your app's styling:

```tsx
<VDTDashboard 
  initialTheme="dark"  // 'light' | 'dark'
  buttonText="Schema Builder"
  // Your app's theme remains completely unaffected
/>
```

The dashboard's theme is managed independently and won't interfere with your application's styling.

## 📝 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { 
  Table, 
  ForeignKey, 
  Column, 
  SQLDataType,
  SchemaData 
} from '@datamonsterr/vdt-dashboard'

const handleSchemaChange = (data: SchemaData) => {
  // data is fully typed
  data.tables.forEach((table: Table) => {
    console.log(`Table: ${table.name}`)
    table.columns.forEach((column: Column) => {
      console.log(`  ${column.name}: ${column.dataType}`)
    })
  })
  
  data.foreignKeys.forEach((fk: ForeignKey) => {
    console.log(`Relationship: ${fk.sourceTable} -> ${fk.targetTable}`)
  })
}
```

## 🏗️ Advanced Integration

### Custom Component Placement

Place the dashboard button anywhere in your UI:

```tsx
// In a navigation bar
<nav className="flex items-center space-x-4">
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/users">Users</Link>
  <VDTDashboard 
    buttonText="Schema"
    buttonVariant="ghost"
    buttonClassName="text-sm"
  />
</nav>

// In a toolbar
<div className="toolbar">
  <button>Save</button>
  <button>Export</button>
  <VDTDashboard buttonText="Design DB" buttonVariant="outline" />
</div>

// As a card action
<Card>
  <CardHeader>
    <CardTitle>Database Schema</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Design your database schema visually</p>
  </CardContent>
  <CardFooter>
    <VDTDashboard buttonText="Open Designer" />
  </CardFooter>
</Card>
```

### Data Persistence

Integrate with your backend or state management:

```tsx
// With REST API
const handleSchemaChange = async (data: SchemaData) => {
  try {
    await fetch('/api/schemas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    toast.success('Schema saved successfully!')
  } catch (error) {
    toast.error('Failed to save schema')
  }
}

// With React Query
const mutation = useMutation({
  mutationFn: (data: SchemaData) => saveSchema(data),
  onSuccess: () => queryClient.invalidateQueries(['schemas'])
})

<VDTDashboard onSchemaChange={mutation.mutate} />

// With Zustand/Redux
const updateSchema = useSchemaStore(state => state.updateSchema)
<VDTDashboard onSchemaChange={updateSchema} />
```

### Error Handling

```tsx
const [error, setError] = useState<string | null>(null)

<VDTDashboard 
  onSchemaChange={(data) => {
    try {
      validateSchema(data)
      saveSchema(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }}
/>

{error && <div className="error">{error}</div>}
```

## 📖 API Reference

### VDTDashboard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonText` | `string` | `"Open VDT Dashboard"` | Text displayed on the trigger button |
| `buttonVariant` | `ButtonVariant` | `'default'` | Button style variant (default, outline, ghost, etc.) |
| `buttonClassName` | `string` | `undefined` | Additional CSS classes for the button |
| `modalSize` | `ModalSize` | `'full'` | Modal dialog size (sm, md, lg, xl, full) |
| `clerkPublishableKey` | `string` | `undefined` | Your Clerk publishable key (optional) |
| `requireAuthForSchemaBuilder` | `boolean` | `true` | Whether authentication is required |
| `onSchemaChange` | `(data: SchemaData) => void` | `undefined` | Callback when schema changes |
| `initialTables` | `Table[]` | `[]` | Initial tables to load |
| `initialForeignKeys` | `ForeignKey[]` | `[]` | Initial relationships to load |
| `showDemo` | `boolean` | `true` | Show demo functionality |
| `initialTheme` | `'light' \| 'dark'` | `'light'` | Initial theme |

### StandaloneSchemaCanvas Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showToolbar` | `boolean` | `true` | Show the toolbar with tools |
| `showUndoRedo` | `boolean` | `true` | Show undo/redo buttons |
| `initialTables` | `Table[]` | `[]` | Initial tables to load |
| `initialForeignKeys` | `ForeignKey[]` | `[]` | Initial relationships to load |
| `onSchemaChange` | `(data: SchemaData) => void` | `undefined` | Callback when schema changes |
| `className` | `string` | `undefined` | Additional CSS classes |

### Type Definitions

```tsx
interface Table {
  id: string
  name: string
  columns: Column[]
  position: { x: number; y: number }
}

interface Column {
  id: string
  name: string
  dataType: SQLDataType
  isPrimaryKey: boolean
  isNullable: boolean
  isUnique: boolean
  defaultValue?: string
}

interface ForeignKey {
  id: string
  sourceTable: string
  sourceColumn: string
  targetTable: string
  targetColumn: string
}

interface SchemaData {
  tables: Table[]
  foreignKeys: ForeignKey[]
}
```

## 🌐 Browser Support

- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🎮 Demo Data

Pre-built sample data for testing and demonstrations:

```tsx
import { 
  sampleTables, 
  sampleForeignKeys,
  generateSampleEcommerce,
  generateSampleBlog 
} from '@datamonsterr/vdt-dashboard'

// Use predefined samples
<VDTDashboard 
  initialTables={sampleTables}
  initialForeignKeys={sampleForeignKeys}
/>

// Generate specific domain samples
const ecommerceData = generateSampleEcommerce()
<VDTDashboard 
  initialTables={ecommerceData.tables}
  initialForeignKeys={ecommerceData.foreignKeys}
/>
```

## 🔧 Development & Contributing

```bash
# Clone the repository
git clone https://github.com/datamonsterr/vdt-dashboard.git
cd vdt-dashboard

# Install dependencies
yarn install

# Start development server
yarn dev

# Build the library
yarn build:lib

# Run tests
yarn test

# Type checking
yarn type-check

# Linting
yarn lint

# Start Storybook for component development and testing
yarn storybook

# Build Storybook for deployment
yarn build-storybook
```

### 📚 Storybook Development

This project includes a comprehensive Storybook setup for component development and testing:

- **Interactive Component Testing**: Test all components with different props and configurations
- **Visual Documentation**: See components in action with live examples
- **Sample Data Integration**: Test with realistic database schema examples
- **Responsive Testing**: View components across different screen sizes
- **Theme Testing**: Test both light and dark themes

**Access Storybook**: Run `yarn storybook` and visit `http://localhost:6006`

**Available Stories**:
- **Introduction** - Overview and getting started guide
- **VDT Dashboard** - Complete dashboard component with all variants
- **StandaloneSchemaCanvas** - Embedded canvas component options
- **UI Components** - Individual UI components (Button, Card, LoadingSpinner, etc.)
- **Schema Builder** - Specialized schema building components (Toolbar, etc.)

## 🚨 Troubleshooting

### Common Issues

**Styles not loading:**
```tsx
// Make sure to import the styles
import '@datamonsterr/vdt-dashboard/styles'
```

**TypeScript errors:**
```tsx
// Ensure you have the latest types
yarn add -D @types/react @types/react-dom
```

**Authentication not working:**
```tsx
// Check your Clerk configuration
<VDTDashboard 
  clerkPublishableKey="pk_test_your-actual-key"
  requireAuthForSchemaBuilder={true}
/>
```

## 📚 Documentation

- [**Complete Usage Guide**](./docs/EmbeddableDashboard-Usage.md) - Comprehensive documentation
- [**API Reference**](./docs/api-reference.md) - Detailed API documentation
- [**Examples**](./docs/examples.md) - Code examples and use cases
- [**Migration Guide**](./docs/migration.md) - Upgrading between versions

## 🤝 Community & Support

- 🐛 [Issue Tracker](https://github.com/datamonsterr/vdt-dashboard/issues) - Report bugs or request features
- 💬 [Discussions](https://github.com/datamonsterr/vdt-dashboard/discussions) - Community support and ideas
- 📧 [Email Support](mailto:support@datamonster.dev) - Direct support
- 📖 [Documentation](./docs/) - Comprehensive guides and examples

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🚀 What You Get

✅ **Complete Schema Builder** - Visual table and relationship designer  
✅ **Zero Setup Authentication** - Managed authentication with Clerk  
✅ **Isolated Theming** - No conflicts with your app's styles  
✅ **Full Undo/Redo** - Complete history with keyboard shortcuts  
✅ **TypeScript First** - Comprehensive type definitions  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **Framework Agnostic** - Works with any React setup  
✅ **Production Ready** - Battle-tested in real applications  

---

**Ready to build?** Add VDT Dashboard to your app in under 2 minutes! 🚀

Made with ❤️ by [DataMonster](https://github.com/datamonsterr)
