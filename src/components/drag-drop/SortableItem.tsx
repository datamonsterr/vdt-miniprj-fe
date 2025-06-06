import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { UniqueIdentifier } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Z_INDEX } from '@/common'

interface SortableItemProps {
  id: UniqueIdentifier
  children: ReactNode
  className?: string
  data?: Record<string, any>
  disabled?: boolean
}

export function SortableItem({
  id,
  children,
  className,
  data,
  disabled = false,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging && { zIndex: Z_INDEX.DRAGGING_ITEM }),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'touch-none select-none',
        isDragging && 'opacity-50',
        disabled && 'cursor-not-allowed opacity-50',
        !disabled && 'cursor-grab active:cursor-grabbing',
        className
      )}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
} 