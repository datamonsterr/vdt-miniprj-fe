import type { ReactNode } from 'react'
import { useDragDropContext } from './DragDropContext'

interface DragDropConsumerProps {
  children: (dragDropState: ReturnType<typeof useDragDropContext>) => ReactNode
}

export function DragDropConsumer({ children }: DragDropConsumerProps) {
  const dragDropState = useDragDropContext()
  return children(dragDropState)
} 