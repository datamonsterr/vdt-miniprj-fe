import { SchemaCanvas } from '../components/SchemaCanvas'
import { SchemaCanvasProvider } from '../components/SchemaCanvasProvider'
import type { SchemaCanvasViewProps } from '../types'

export function SchemaCanvasView({
  initialTheme = 'light',
  wrapperClassName = '',
  wrapperStyle = {},
  ...schemaCanvasProps
}: SchemaCanvasViewProps) {

  return (
    <div 
      className={`vdt-standalone-schema-canvas h-full w-full ${wrapperClassName}`} 
      style={{ minHeight: '500px', ...wrapperStyle }}
    >
      <SchemaCanvasProvider>
        <SchemaCanvas {...schemaCanvasProps} />
      </SchemaCanvasProvider>
    </div>
  )
} 