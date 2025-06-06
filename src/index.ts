// Main library entry point
export { EmbeddableDashboard } from './components/EmbeddableDashboard'
export type { EmbeddableDashboardProps } from './components/EmbeddableDashboard'

// Advanced components for power users
export { SchemaCanvas } from './components/schema-builder/SchemaCanvas'
export type { SchemaCanvasProps } from './components/schema-builder/SchemaCanvas'

// Core types that consumers might need
export type { Table, Column, ForeignKey, SQLDataType } from './types/database'

// UI components that might be useful
export { Button } from './components/ui/button'
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
export { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog'

// Theme providers for advanced integration
export { SchemaBuilderThemeProvider, useSchemaBuilderTheme } from './contexts/schema-builder-theme'

// Utility functions
export { cn } from './lib/utils'

// Import styles
import './index.css' 