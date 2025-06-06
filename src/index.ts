// Main web component export - this is the primary export for the library
export { VDTDashboard } from './sections/vdt-dashboard'
export type { VDTDashboardProps } from './sections/vdt-dashboard'

// Advanced components for power users
export { StandaloneSchemaCanvas } from './sections/schema-builder'

// Schema Builder components (for users who want to integrate more deeply)
export { SchemaCanvas } from './components/schema-builder/SchemaCanvas'

// Types that consumers might need
export type { Table, ForeignKey, Column } from './types/database'
export { SQLDataType } from './types/database'

// Context providers (for advanced integration scenarios)
export { ThemeProvider, ThemeConsumer } from './contexts/theme'

// Hooks for advanced users
export { useTheme } from './contexts/theme'

// Sample data for demos and testing
export { sampleTables, sampleForeignKeys, simpleSampleTables, simpleSampleForeignKeys } from './mocks/sampleData'

// CSS import for consumers - this ensures Tailwind styles are included
import './index.css' 