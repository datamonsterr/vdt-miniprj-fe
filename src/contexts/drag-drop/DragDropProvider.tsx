import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { DragDropContext } from './DragDropContext'

interface DragDropProviderProps {
  children: ReactNode
  onDragStart?: (event: DragStartEvent) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragOver?: (event: DragOverEvent) => void
}

export function DragDropProvider({
  children,
  onDragStart,
  onDragEnd,
  onDragOver,
}: DragDropProviderProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
    onDragStart?.(event)
  }

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id || null)
    onDragOver?.(event)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    setOverId(null)
    onDragEnd?.(event)
  }

  const contextValue = {
    activeId,
    overId,
    isDragging: activeId !== null,
  }

  return (
    <DragDropContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
    </DragDropContext.Provider>
  )
} 