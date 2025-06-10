// Main standalone component
export { SchemaCanvasView } from './views/SchemaCanvasView'

// Components from this section
export { SchemaCanvas } from './components/SchemaCanvas'
export { SchemaCanvasProvider } from './components/SchemaCanvasProvider'
export { SchemaCanvasContainer } from './components/SchemaCanvasContainer'
export { SchemaHeader } from './components/SchemaHeader'
export { SchemaNameModal } from './components/SchemaNameModal'

// Types
export type { SchemaCanvasViewProps as StandaloneSchemaCanvasProps, SchemaCanvasProps } from './types'

// Re-export from components for advanced usage
export { Toolbar } from '@/components/schema-builder/Toolbar'
export { ConnectionLine } from '@/components/schema-builder/ConnectionLine'
export { UndoRedoToolbar } from '@/components/schema-builder/UndoRedoToolbar'
export { TableComponent } from '@/components/schema-builder/TableComponent'
export { ColumnDialog } from '@/components/schema-builder/ColumnDialog' 