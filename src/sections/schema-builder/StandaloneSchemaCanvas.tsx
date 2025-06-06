import { SchemaCanvas } from './components/SchemaCanvas'
import { SchemaCanvasProvider } from './components/SchemaCanvasProvider'
import type { StandaloneSchemaCanvasProps } from './types'



/**
 * StandaloneSchemaCanvas - A complete, self-contained schema canvas component
 * that can be embedded in any React application without external dependencies
 * 
 * This component provides:
 * - All necessary context providers (theme, drag-drop, stores) internally
 * - Complete isolation from the host application's state management
 * - Schema builder with drag-and-drop functionality
 * - Undo/redo capabilities
 * - Theme management (light/dark) isolated to the canvas
 * 
 * @example
 * ```tsx
 * <StandaloneSchemaCanvas 
 *   onSchemaChange={(data) => console.log('Schema changed:', data)}
 *   showToolbar={true}
 *   showUndoRedo={true}
 *   initialTheme="dark"
 *   className="h-[600px] w-full"
 * />
 * ```
 */
export function StandaloneSchemaCanvas({
  initialTheme = 'light',
  wrapperClassName = '',
  wrapperStyle = {},
  ...schemaCanvasProps
}: StandaloneSchemaCanvasProps) {
  return (
    <div 
      className={`vdt-standalone-schema-canvas ${wrapperClassName}`} 
      style={wrapperStyle}
    >
      <SchemaCanvasProvider initialTheme={initialTheme}>
        <SchemaCanvas {...schemaCanvasProps} />
      </SchemaCanvasProvider>
    </div>
  )
} 