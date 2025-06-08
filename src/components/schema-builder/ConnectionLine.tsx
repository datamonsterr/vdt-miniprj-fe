import { useEffect, useState } from 'react'
import type { ForeignKey, Table } from '@/types/database'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Z_INDEX } from '@/common'

interface ConnectionLineProps {
  foreignKey: ForeignKey
  tables: Table[]
  onDeleteConnection?: (foreignKeyId: UniqueIdentifier) => void
}

interface Point {
  x: number
  y: number
}

export function ConnectionLine({ foreignKey, tables, onDeleteConnection }: ConnectionLineProps) {
  const [sourcePoint, setSourcePoint] = useState<Point | null>(null)
  const [targetPoint, setTargetPoint] = useState<Point | null>(null)
  const [isSelected, setIsSelected] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateConnectionPoints = () => {
      const sourceTable = tables.find(t => t.id === foreignKey.sourceTableId)
      const targetTable = tables.find(t => t.id === foreignKey.targetTableId)

      if (!sourceTable || !targetTable) return

      const sourceColumn = sourceTable.columns.find(c => c.id === foreignKey.sourceColumnId)
      const targetColumn = targetTable.columns.find(c => c.id === foreignKey.targetColumnId)

      if (!sourceColumn || !targetColumn) return

      // Find specific column elements to get their positions
      const sourceColumnElement = document.querySelector(`[data-column-id="${sourceColumn.id}"]`)
      const targetColumnElement = document.querySelector(`[data-column-id="${targetColumn.id}"]`)
      
      // Fallback to table elements if column elements are not found
      const sourceTableElement = document.querySelector(`[data-table-id="${sourceTable.id}"]`)
      const targetTableElement = document.querySelector(`[data-table-id="${targetTable.id}"]`)

      if ((sourceColumnElement || sourceTableElement) && (targetColumnElement || targetTableElement)) {
        const canvasRect = document.querySelector('.schema-canvas')?.getBoundingClientRect()

        if (canvasRect) {
          let sourceY: number
          let targetY: number
          let sourceTableRect: DOMRect
          let targetTableRect: DOMRect

          // Get source column position or fallback to table center
          if (sourceColumnElement) {
            const sourceColumnRect = sourceColumnElement.getBoundingClientRect()
            sourceY = sourceColumnRect.top + sourceColumnRect.height / 2 - canvasRect.top
            sourceTableRect = sourceTableElement!.getBoundingClientRect()
          } else {
            sourceTableRect = sourceTableElement!.getBoundingClientRect()
            sourceY = sourceTableRect.top + sourceTableRect.height / 2 - canvasRect.top
          }

          // Get target column position or fallback to table center
          if (targetColumnElement) {
            const targetColumnRect = targetColumnElement.getBoundingClientRect()
            targetY = targetColumnRect.top + targetColumnRect.height / 2 - canvasRect.top
            targetTableRect = targetTableElement!.getBoundingClientRect()
          } else {
            targetTableRect = targetTableElement!.getBoundingClientRect()
            targetY = targetTableRect.top + targetTableRect.height / 2 - canvasRect.top
          }
          
          // Calculate optimal connection points based on table positions
          const sourceCenterX = sourceTableRect.left + sourceTableRect.width / 2 - canvasRect.left
          const sourceCenterY = sourceTableRect.top + sourceTableRect.height / 2 - canvasRect.top
          const targetCenterX = targetTableRect.left + targetTableRect.width / 2 - canvasRect.left
          const targetCenterY = targetTableRect.top + targetTableRect.height / 2 - canvasRect.top
          
          // Determine the best connection points based on relative positions
          let sourceX: number, targetX: number
          
          // Calculate horizontal and vertical distances
          const horizontalDistance = Math.abs(targetCenterX - sourceCenterX)
          const verticalDistance = Math.abs(targetCenterY - sourceCenterY)
          
          // Choose connection sides based on the dominant direction and relative positions
          if (horizontalDistance > verticalDistance) {
            // Horizontal connection is preferred
            if (targetCenterX > sourceCenterX) {
              // Target is to the right of source
              sourceX = sourceTableRect.right - canvasRect.left
              targetX = targetTableRect.left - canvasRect.left
            } else {
              // Target is to the left of source
              sourceX = sourceTableRect.left - canvasRect.left
              targetX = targetTableRect.right - canvasRect.left
            }
          } else {
            // Vertical connection is preferred, but use horizontal edges for better visibility
            if (targetCenterX > sourceCenterX) {
              // Target is to the right of source
              sourceX = sourceTableRect.right - canvasRect.left
              targetX = targetTableRect.left - canvasRect.left
            } else {
              // Target is to the left of source
              sourceX = sourceTableRect.left - canvasRect.left
              targetX = targetTableRect.right - canvasRect.left
            }
          }
          
          setSourcePoint({
            x: sourceX,
            y: sourceY
          })
          setTargetPoint({
            x: targetX,
            y: targetY
          })
        }
      }
    }

    updateConnectionPoints()
    
    // Update on scroll or resize
    const handleUpdate = () => setTimeout(updateConnectionPoints, 0)
    window.addEventListener('scroll', handleUpdate, true)
    window.addEventListener('resize', handleUpdate)
    
    return () => {
      window.removeEventListener('scroll', handleUpdate, true)
      window.removeEventListener('resize', handleUpdate)
    }
  }, [foreignKey, tables])

  // Close selection when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isSelected) {
        setIsSelected(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isSelected])

  if (!sourcePoint || !targetPoint) return null

  // Calculate 90-degree path with rounded corners
  const cornerRadius = 12
  const minOffset = 30 // Minimum distance before turning
  
  // Determine the path direction
  const dx = targetPoint.x - sourcePoint.x
  const dy = targetPoint.y - sourcePoint.y
  
  let pathData: string
  
  if (Math.abs(dy) < cornerRadius * 2 && Math.abs(dx) < minOffset * 2) {
    // If points are very close, use a direct line
    pathData = `M ${sourcePoint.x} ${sourcePoint.y} L ${targetPoint.x} ${targetPoint.y}`
  } else {
    // Determine connection orientation and calculate path accordingly
    const isHorizontalPrimary = Math.abs(dx) > Math.abs(dy)
    
    if (isHorizontalPrimary) {
      // Horizontal-first path (left-right connection)
      const midX = sourcePoint.x + Math.sign(dx) * Math.max(minOffset, Math.abs(dx) / 2)
      const isRightward = dx > 0 // true if connecting left to right
      
      if (Math.abs(dy) < cornerRadius * 2) {
        // Simple horizontal line if vertically close
        pathData = `M ${sourcePoint.x} ${sourcePoint.y} L ${targetPoint.x} ${targetPoint.y}`
      } else {
        // L-shaped path with horizontal first
        if (dy > 0) {
          // Target is below source
          if (isRightward) {
            // Left to right, going down
            pathData = `
              M ${sourcePoint.x} ${sourcePoint.y}
              L ${midX - cornerRadius} ${sourcePoint.y}
              Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y + cornerRadius}
              L ${midX} ${targetPoint.y - cornerRadius}
              Q ${midX} ${targetPoint.y} ${midX + cornerRadius} ${targetPoint.y}
              L ${targetPoint.x} ${targetPoint.y}
            `.replace(/\s+/g, ' ').trim()
          } else {
            // Right to left, going down
            pathData = `
              M ${sourcePoint.x} ${sourcePoint.y}
              L ${midX + cornerRadius} ${sourcePoint.y}
              Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y + cornerRadius}
              L ${midX} ${targetPoint.y - cornerRadius}
              Q ${midX} ${targetPoint.y} ${midX - cornerRadius} ${targetPoint.y}
              L ${targetPoint.x} ${targetPoint.y}
            `.replace(/\s+/g, ' ').trim()
          }
        } else {
          // Target is above source
          if (isRightward) {
            // Left to right, going up
            pathData = `
              M ${sourcePoint.x} ${sourcePoint.y}
              L ${midX - cornerRadius} ${sourcePoint.y}
              Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y - cornerRadius}
              L ${midX} ${targetPoint.y + cornerRadius}
              Q ${midX} ${targetPoint.y} ${midX + cornerRadius} ${targetPoint.y}
              L ${targetPoint.x} ${targetPoint.y}
            `.replace(/\s+/g, ' ').trim()
          } else {
            // Right to left, going up
            pathData = `
              M ${sourcePoint.x} ${sourcePoint.y}
              L ${midX + cornerRadius} ${sourcePoint.y}
              Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y - cornerRadius}
              L ${midX} ${targetPoint.y + cornerRadius}
              Q ${midX} ${targetPoint.y} ${midX - cornerRadius} ${targetPoint.y}
              L ${targetPoint.x} ${targetPoint.y}
            `.replace(/\s+/g, ' ').trim()
          }
        }
      }
    } else {
      // Vertical-primary path, but still using horizontal connections
      // Create a more curved path for better visual flow
      const midX = sourcePoint.x + dx / 2
      const isRightward = dx > 0 // true if connecting left to right
      
      if (dy > 0) {
        // Target is below source
        if (isRightward) {
          // Left to right, going down
          pathData = `
            M ${sourcePoint.x} ${sourcePoint.y}
            L ${midX - cornerRadius} ${sourcePoint.y}
            Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y + cornerRadius}
            L ${midX} ${targetPoint.y - cornerRadius}
            Q ${midX} ${targetPoint.y} ${midX + cornerRadius} ${targetPoint.y}
            L ${targetPoint.x} ${targetPoint.y}
          `.replace(/\s+/g, ' ').trim()
        } else {
          // Right to left, going down
          pathData = `
            M ${sourcePoint.x} ${sourcePoint.y}
            L ${midX + cornerRadius} ${sourcePoint.y}
            Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y + cornerRadius}
            L ${midX} ${targetPoint.y - cornerRadius}
            Q ${midX} ${targetPoint.y} ${midX - cornerRadius} ${targetPoint.y}
            L ${targetPoint.x} ${targetPoint.y}
          `.replace(/\s+/g, ' ').trim()
        }
      } else {
        // Target is above source
        if (isRightward) {
          // Left to right, going up
          pathData = `
            M ${sourcePoint.x} ${sourcePoint.y}
            L ${midX - cornerRadius} ${sourcePoint.y}
            Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y - cornerRadius}
            L ${midX} ${targetPoint.y + cornerRadius}
            Q ${midX} ${targetPoint.y} ${midX + cornerRadius} ${targetPoint.y}
            L ${targetPoint.x} ${targetPoint.y}
          `.replace(/\s+/g, ' ').trim()
        } else {
          // Right to left, going up
          pathData = `
            M ${sourcePoint.x} ${sourcePoint.y}
            L ${midX + cornerRadius} ${sourcePoint.y}
            Q ${midX} ${sourcePoint.y} ${midX} ${sourcePoint.y - cornerRadius}
            L ${midX} ${targetPoint.y + cornerRadius}
            Q ${midX} ${targetPoint.y} ${midX - cornerRadius} ${targetPoint.y}
            L ${targetPoint.x} ${targetPoint.y}
          `.replace(/\s+/g, ' ').trim()
        }
      }
    }
  }

  const midPoint = {
    x: (sourcePoint.x + targetPoint.x) / 2,
    y: (sourcePoint.y + targetPoint.y) / 2
  }

  const handleConnectionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSelected(!isSelected)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDeleteConnection) {
      onDeleteConnection(foreignKey.id)
    }
    setIsSelected(false)
  }

  return (
    <g style={{ zIndex: Z_INDEX.CONNECTION_LINE, pointerEvents: 'auto' }}>
      {/* Arrow head definition - smaller size */}
      <defs>
        <marker
          id={`arrowhead-${foreignKey.id}`}
          markerWidth={6}
          markerHeight={4}
          refX={5}
          refY={2}
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 6 2, 0 4"
            fill={isSelected || isHovered ? "#1d4ed8" : "#2563eb"}
          />
        </marker>
      </defs>
      
      {/* Invisible thick line for easier clicking */}
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        style={{ cursor: 'pointer' }}
        onClick={handleConnectionClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Connection line with arrow */}
      <path
        d={pathData}
        fill="none"
        stroke={isSelected || isHovered ? "#1d4ed8" : "#2563eb"}
        strokeWidth={isSelected ? 4 : 3}
        strokeDasharray="8,4"
        markerEnd={`url(#arrowhead-${foreignKey.id})`}
        opacity={isSelected || isHovered ? 1 : 0.8}
        style={{ cursor: 'pointer' }}
        onClick={handleConnectionClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {/* Source connection point - smaller */}
      <circle
        cx={sourcePoint.x}
        cy={sourcePoint.y}
        r={4}
        fill={isSelected || isHovered ? "#1d4ed8" : "#2563eb"}
        stroke="#ffffff"
        strokeWidth={2}
      />
      
      {/* Target connection point - smaller */}
      <circle
        cx={targetPoint.x}
        cy={targetPoint.y}
        r={4}
        fill={isSelected || isHovered ? "#1d4ed8" : "#2563eb"}
        stroke="#ffffff"
        strokeWidth={2}
      />
      
      {/* Connection label */}
      <text
        x={midPoint.x}
        y={midPoint.y - 10}
        textAnchor="middle"
        fontSize={12}
        fill="#374151"
        className="font-medium pointer-events-none"
      >
        FK
      </text>

      {/* Delete button when selected */}
      {isSelected && onDeleteConnection && (
        <foreignObject
          x={midPoint.x - 12}
          y={midPoint.y + 5}
          width={24}
          height={24}
        >
          <Button
            size="sm"
            variant="destructive"
            className="w-6 h-6 p-0 rounded-full"
            onClick={handleDeleteClick}
          >
            <X className="w-3 h-3" />
          </Button>
        </foreignObject>
      )}

    </g>
  )
} 