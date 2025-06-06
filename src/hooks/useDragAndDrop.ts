import { useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'

interface UseDragAndDropProps<T> {
  items: T[]
  getId: (item: T) => UniqueIdentifier
}

export function useDragAndDrop<T>({ items, getId }: UseDragAndDropProps<T>) {
  const [draggedItems, setDraggedItems] = useState<T[]>(items)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    setDraggedItems((items) => {
      const oldIndex = items.findIndex((item) => getId(item) === active.id)
      const newIndex = items.findIndex((item) => getId(item) === over.id)

      return arrayMove(items, oldIndex, newIndex)
    })
  }

  const resetItems = () => {
    setDraggedItems(items)
  }

  const updateItems = (newItems: T[]) => {
    setDraggedItems(newItems)
  }

  return {
    items: draggedItems,
    handleDragEnd,
    resetItems,
    updateItems,
  }
} 