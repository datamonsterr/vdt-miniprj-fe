import { useDraggable } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DraggableProps {
  id: UniqueIdentifier
  children: ReactNode
  className?: string
  data?: Record<string, any>
  disabled?: boolean
}

export function Draggable({
  id,
  children,
  className,
  data,
  disabled = false,
}: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
    data,
    disabled,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

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
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
} 