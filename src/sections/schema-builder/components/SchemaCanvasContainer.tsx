import { Z_INDEX } from '@/common'
import { ConnectionLine } from '@/components/schema-builder/ConnectionLine'
import { TableComponent } from '@/components/schema-builder/TableComponent'
import { useTheme } from '@/contexts/theme/ThemeContext'
import { useSchemaStore } from '@/stores/schema-store'
import { ToolType } from '@/types/database'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import React from 'react'

interface SchemaCanvasContainerProps {
  className?: string
  style?: React.CSSProperties
  onTableDialogOpen: () => void
}

/**
 * SchemaCanvasContainer - The main canvas area for the schema builder
 * 
 * Handles:
 * - Canvas interactions (click, drag, pan)
 * - Table rendering and positioning
 * - Connection lines for foreign keys
 * - Tool-specific behaviors
 */
export function SchemaCanvasContainer({ 
  className = '', 
  style = {},
  onTableDialogOpen 
}: SchemaCanvasContainerProps) {
  const { theme } = useTheme()
  const {
    tables,
    foreignKeys,
    uiState,
    updateTable,
    deleteTable,
    deleteForeignKey,
    setUIState,
  } = useSchemaStore()

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks on the canvas background, not on tables
    if (e.target === e.currentTarget && uiState.selectedTool === ToolType.TABLE) {
      onTableDialogOpen()
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uiState.selectedTool === ToolType.HAND && e.target === e.currentTarget) {
      setUIState({ isPanning: true })
      e.preventDefault()
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uiState.isPanning && uiState.selectedTool === ToolType.HAND) {
      const deltaX = e.movementX
      const deltaY = e.movementY
      
      setUIState({
        canvasOffset: {
          x: uiState.canvasOffset.x + deltaX,
          y: uiState.canvasOffset.y + deltaY
        }
      })
    }
  }

  const handleCanvasMouseUp = () => {
    if (uiState.isPanning) {
      setUIState({ isPanning: false })
    }
  }

  const handleCanvasMouseLeave = () => {
    if (uiState.isPanning) {
      setUIState({ isPanning: false })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // Only allow dragging when not in hand tool mode
    if (uiState.selectedTool === ToolType.HAND) return

    const { active, delta } = event
    const tableId = active.id as string
    const table = tables.find(t => t.id === tableId)
    
    if (table && delta) {
      const updatedTable = {
        ...table,
        position: {
          x: table.position.x + delta.x,
          y: table.position.y + delta.y
        }
      }
      updateTable(updatedTable)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className={`relative w-full h-full bg-white dark:bg-gray-900 overflow-hidden select-none ${
          uiState.selectedTool === ToolType.HAND ? 'cursor-grab' : 'cursor-default'
        } ${
          uiState.isPanning ? 'cursor-grabbing' : ''
        } ${className}`}
        style={style}
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseLeave}
        data-theme={theme}
      >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `translate(${uiState.canvasOffset.x % 20}px, ${uiState.canvasOffset.y % 20}px)`
        }}
      />

      {/* Tables Container */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${uiState.canvasOffset.x}px, ${uiState.canvasOffset.y}px)`,
          zIndex: Z_INDEX.TABLE,
        }}
      >
        {tables.map((table) => (
          <TableComponent
            key={table.id}
            table={table}
            onUpdateTable={updateTable}
            onDeleteTable={deleteTable}
            onColumnClick={(tableId, columnId) => {
              // Handle column click for foreign key creation
              console.log('Column clicked:', tableId, columnId)
            }}
          />
        ))}
      </div>

      {/* Connection Lines Container */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${uiState.canvasOffset.x}px, ${uiState.canvasOffset.y}px)`,
          zIndex: Z_INDEX.CONNECTION_LINE,
        }}
      >
        {foreignKeys.map((fk) => (
          <ConnectionLine
            key={fk.id}
            foreignKey={fk}
            tables={tables}
            onDeleteConnection={deleteForeignKey}
          />
        ))}
      </div>
    </div>
    </DndContext>
  )
} 