import type { Table, ForeignKey } from '@/types/database'

export interface SchemaCanvasProps {
  /**
   * Optional initial tables to load in the canvas
   */
  initialTables?: Table[]
  /**
   * Optional initial foreign keys to load in the canvas
   */
  initialForeignKeys?: ForeignKey[]
  /**
   * Callback when schema data changes
   */
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  /**
   * Callback when export button is clicked
   */
  onExport?: () => void
  /**
   * Callback for saving the schema
   */
  onSave?: () => void
  /**
   * Whether the schema is currently being saved
   */
  isSaving?: boolean
  /**
   * Current schema ID (if editing existing schema)
   */
  schemaId?: string
  /**
   * Whether to show the toolbar (default: true)
   */
  showToolbar?: boolean
  /**
   * Whether to show the undo/redo toolbar (default: true)
   */
  showUndoRedo?: boolean
  /**
   * Whether to show the theme toggle button (default: true)
   */
  showThemeToggle?: boolean
  /**
   * Whether to show the user settings button (default: true)
   */
  showUserSettings?: boolean
  /**
   * Initial theme for the schema builder (default: system preference)
   */
  initialTheme?: 'light' | 'dark'
  /**
   * Custom className for the canvas container
   */
  className?: string
  /**
   * Custom style for the canvas container
   */
  style?: React.CSSProperties
}

export interface SchemaCanvasViewProps extends Omit<SchemaCanvasProps, 'initialTheme'> {
  /**
   * Initial theme for the schema builder (default: 'light')
   */
  initialTheme?: 'light' | 'dark'
  /**
   * Custom wrapper className
   */
  wrapperClassName?: string
  /**
   * Custom wrapper style
   */
  wrapperStyle?: React.CSSProperties
} 