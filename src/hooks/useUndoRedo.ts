import { useEffect, useCallback } from 'react'
import { useSchemaStore } from '@/stores/schema-store'

export function useUndoRedo() {
  // Get undo/redo functions from the temporal store
  const { undo, redo, clear, pastStates, futureStates } = useSchemaStore.temporal.getState()

  // Get current state to check if undo/redo is available
  const canUndo = pastStates.length > 0
  const canRedo = futureStates.length > 0

  // Keyboard shortcuts
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Check for Ctrl+Z (Windows/Linux) or Cmd+Z (Mac)
    const isCtrlOrCmd = event.ctrlKey || event.metaKey
    
    if (isCtrlOrCmd && event.key === 'z') {
      event.preventDefault()
      
      // Check for Shift+Ctrl+Z or Shift+Cmd+Z (redo)
      if (event.shiftKey) {
        if (canRedo) {
          redo()
        }
      } else {
        // Regular Ctrl+Z or Cmd+Z (undo)
        if (canUndo) {
          undo()
        }
      }
    }
    
    // Alternative redo shortcut: Ctrl+Y or Cmd+Y
    if (isCtrlOrCmd && event.key === 'y') {
      event.preventDefault()
      if (canRedo) {
        redo()
      }
    }
  }, [undo, redo, canUndo, canRedo])

  // Set up keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
    historySize: pastStates.length,
    futureSize: futureStates.length,
  }
} 