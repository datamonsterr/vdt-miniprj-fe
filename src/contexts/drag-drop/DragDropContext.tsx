import type { UniqueIdentifier } from '@dnd-kit/core'
import { createContext, useContext } from 'react'

export interface DragDropContextType {
  activeId: UniqueIdentifier | null
  overId: UniqueIdentifier | null
  isDragging: boolean
}

export const DragDropContext = createContext<DragDropContextType | null>(null)

export const useDragDropContext = () => {
  const context = useContext(DragDropContext)
  if (!context) {
    throw new Error('useDragDropContext must be used within DragDropProvider')
  }
  return context
} 