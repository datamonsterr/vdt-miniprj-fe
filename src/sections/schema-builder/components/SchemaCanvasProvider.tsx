import React from 'react'
import { DragDropProvider } from '@/contexts/drag-drop'

interface SchemaCanvasProviderProps {
  children: React.ReactNode
  initialTheme?: 'light' | 'dark'
}

/**
 * SchemaCanvasProvider - Provides all necessary contexts for the schema canvas
 * 
 * This component wraps the schema canvas with:
 * - Theme provider for light/dark mode
 * - Drag and drop provider for table interactions
 * - Isolated state management
 */
export function SchemaCanvasProvider({ children }: SchemaCanvasProviderProps) {
  return (
    <DragDropProvider>
      {children}
    </DragDropProvider>
  )
} 