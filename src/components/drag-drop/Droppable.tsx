import { useDroppable } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DroppableProps {
  id: UniqueIdentifier
  children: ReactNode
  className?: string
  data?: Record<string, any>
  disabled?: boolean
}

export function Droppable({
  id,
  children,
  className,
  data,
  disabled = false,
}: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data,
    disabled,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'transition-colors select-none',
        isOver && 'bg-muted/50 border-primary',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {children}
    </div>
  )
} 