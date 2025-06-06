import React from 'react'
import { ThemeProvider } from '@/contexts/theme/ThemeProvider'
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
export function SchemaCanvasProvider({ children, initialTheme = 'light' }: SchemaCanvasProviderProps) {
  return (
    <ThemeProvider defaultTheme={initialTheme}>
      <DragDropProvider>
        {children}
      </DragDropProvider>
    </ThemeProvider>
  )
} 