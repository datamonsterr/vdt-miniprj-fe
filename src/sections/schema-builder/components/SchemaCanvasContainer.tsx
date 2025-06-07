import { Z_INDEX } from '@/common'
import { ConnectionLine } from '@/components/schema-builder/ConnectionLine'
import { TableComponent } from '@/components/schema-builder/TableComponent'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useTheme } from '@/contexts/theme/ThemeContext'
import { useSchemaStore } from '@/stores/schema-store'
import { ToolType } from '@/types/database'
import type { DragEndEvent } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'
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
  
  // Use explicit selectors for better reactivity with temporal middleware
  const tables = useSchemaStore(state => state.tables)
  const foreignKeys = useSchemaStore(state => state.foreignKeys)
  const uiState = useSchemaStore(state => state.uiState)
  const updateTable = useSchemaStore(state => state.updateTable)
  const deleteTable = useSchemaStore(state => state.deleteTable)
  const deleteForeignKey = useSchemaStore(state => state.deleteForeignKey)
  const addForeignKey = useSchemaStore(state => state.addForeignKey)
  const setUIState = useSchemaStore(state => state.setUIState)
  const setTables = useSchemaStore(state => state.setTables)
  const setForeignKeys = useSchemaStore(state => state.setForeignKeys)
  
  // Force subscription to store changes - this helps with temporal middleware reactivity
  const tablesLength = useSchemaStore(state => state.tables.length)
  
  // Force re-render trigger for debugging reactivity issues
  const [, forceUpdate] = React.useState({})
  const triggerRerender = React.useCallback(() => {
    forceUpdate({})
  }, [])

  // State for connection deletion confirmation
  const [connectionToDelete, setConnectionToDelete] = React.useState<UniqueIdentifier | null>(null)
  const [isDeleteConnectionDialogOpen, setIsDeleteConnectionDialogOpen] = React.useState(false)
  
  // Debug: Log when tables change
  React.useEffect(() => {
    console.log('🔄 SchemaCanvasContainer tables updated:', tables.map(t => ({ id: t.id, name: t.name })))
  }, [tables, tablesLength])

  const handleDeleteTable = (tableId: UniqueIdentifier) => {
    console.log('🗑️ SchemaCanvasContainer handleDeleteTable called with ID:', tableId, 'type:', typeof tableId)
    console.log('📋 Current tables before delete:', tables.map(t => ({ id: t.id, name: t.name, idType: typeof t.id })))
    
    // Convert to string for consistent comparison (matching store logic)
    const tableIdStr = String(tableId)
    console.log('🔍 Looking for table with string ID:', tableIdStr)
    
    // Check if table exists before attempting delete
    const tableExists = tables.some(t => String(t.id) === tableIdStr)
    console.log('✅ Table exists?', tableExists)
    
    if (!tableExists) {
      console.error('❌ Table not found for deletion!', { tableId, tableIdStr, availableTables: tables.map(t => ({ id: t.id, stringId: String(t.id) })) })
      return
    }
    
    // Clear any selected states first to avoid stale references
    setUIState({ 
      selectedTableId: null,
      selectedColumnId: null,
      isConnecting: false,
      connectionStart: null
    })
    
    // Use direct table filtering and set - bypass potential temporal middleware issues
    const filteredTables = tables.filter(t => String(t.id) !== tableIdStr)
    const filteredForeignKeys = foreignKeys.filter(fk => 
      String(fk.sourceTableId) !== tableIdStr && String(fk.targetTableId) !== tableIdStr
    )
    
    console.log('🔄 Setting filtered tables directly:', filteredTables.map(t => ({ id: t.id, name: t.name })))
    
    // Set the filtered data directly to ensure UI reactivity
    setTables(filteredTables)
    setForeignKeys(filteredForeignKeys)
    
    // Also call the store delete for undo/redo tracking (but after direct update)
    setTimeout(() => {
      deleteTable(tableId)
      console.log('🔄 Delete command sent to store for undo/redo tracking')
    }, 50)
    
    // Force re-render for additional safety
    triggerRerender()
  }

  const handleDeleteConnection = (foreignKeyId: UniqueIdentifier) => {
    setConnectionToDelete(foreignKeyId)
    setIsDeleteConnectionDialogOpen(true)
  }

  const confirmDeleteConnection = () => {
    if (connectionToDelete) {
      deleteForeignKey(connectionToDelete)
      setConnectionToDelete(null)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks on the canvas background, not on tables
    if (e.target === e.currentTarget && uiState.selectedTool === ToolType.TABLE) {
      onTableDialogOpen()
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uiState.selectedTool === ToolType.HAND && e.target === e.currentTarget) {
      setUIState({ isPanning: true })
      console.log('Started panning')
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uiState.isPanning && uiState.selectedTool === ToolType.HAND) {
      const deltaX = e.movementX
      const deltaY = e.movementY
      
      console.log('Panning:', { deltaX, deltaY, offset: uiState.canvasOffset })
      
      setUIState({
        canvasOffset: {
          x: uiState.canvasOffset.x + deltaX,
          y: uiState.canvasOffset.y + deltaY
        }
      })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uiState.isPanning) {
      setUIState({ isPanning: false })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleCanvasMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uiState.isPanning) {
      setUIState({ isPanning: false })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleColumnClick = (tableId: string, columnId: string) => {
    // Only handle connection logic when in CONNECTION mode
    if (uiState.selectedTool !== ToolType.RELATIONSHIP) return

    console.log('Column clicked for connection:', { tableId, columnId, currentStart: uiState.connectionStart })

    if (!uiState.connectionStart) {
      // Start a new connection
      setUIState({
        isConnecting: true,
        connectionStart: {
          tableId: tableId as UniqueIdentifier,
          columnId: columnId as UniqueIdentifier,
        }
      })
    } else {
      // Complete the connection
      if (uiState.connectionStart.tableId !== tableId || uiState.connectionStart.columnId !== columnId) {
        const newForeignKey = {
          id: `fk_${Date.now()}`,
          sourceTableId: uiState.connectionStart.tableId,
          sourceColumnId: uiState.connectionStart.columnId,
          targetTableId: tableId as UniqueIdentifier,
          targetColumnId: columnId as UniqueIdentifier,
          onDelete: 'CASCADE' as const,
          onUpdate: 'CASCADE' as const,
        }
        addForeignKey(newForeignKey)
        console.log('Created foreign key:', newForeignKey)
      }
      
      // Reset connection state
      setUIState({
        isConnecting: false,
        connectionStart: null,
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // Allow dragging when SELECT or TABLE tool is active
    if (uiState.selectedTool !== ToolType.MOVE && uiState.selectedTool !== ToolType.TABLE) return

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

  const canvasContent = (
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
            onDeleteTable={handleDeleteTable}
            onColumnClick={(tableId, columnId) => {
              handleColumnClick(tableId, columnId)
            }}
            selectedTool={uiState.selectedTool}
            selectedColumnId={uiState.connectionStart?.columnId.toString()}
            isConnectionMode={uiState.selectedTool === ToolType.RELATIONSHIP}
            isDraggable={uiState.selectedTool === ToolType.MOVE || uiState.selectedTool === ToolType.TABLE}
          />
        ))}
      </div>

      {/* Connection Lines Container */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${uiState.canvasOffset.x}px, ${uiState.canvasOffset.y}px)`,
          zIndex: Z_INDEX.CONNECTION_LINE,
          pointerEvents: 'none',
        }}
      >
        {foreignKeys.map((fk) => (
          <ConnectionLine
            key={fk.id}
            foreignKey={fk}
            tables={tables}
            onDeleteConnection={handleDeleteConnection}
          />
        ))}
      </svg>
    </div>
  )

  // Get connection details for confirmation dialog
  const connectionToDeleteData = connectionToDelete ? foreignKeys.find(fk => fk.id === connectionToDelete) : null
  const sourceTable = connectionToDeleteData ? tables.find(t => t.id === connectionToDeleteData.sourceTableId) : null
  const targetTable = connectionToDeleteData ? tables.find(t => t.id === connectionToDeleteData.targetTableId) : null
  const sourceColumn = sourceTable && connectionToDeleteData ? sourceTable.columns.find(c => c.id === connectionToDeleteData.sourceColumnId) : null
  const targetColumn = targetTable && connectionToDeleteData ? targetTable.columns.find(c => c.id === connectionToDeleteData.targetColumnId) : null

  return (
    <>
      {(uiState.selectedTool === ToolType.MOVE || uiState.selectedTool === ToolType.TABLE) ? (
        <DndContext onDragEnd={handleDragEnd}>
          {canvasContent}
        </DndContext>
      ) : (
        canvasContent
      )}

      {/* Connection deletion confirmation dialog */}
      <ConfirmationDialog
        open={isDeleteConnectionDialogOpen}
        onOpenChange={setIsDeleteConnectionDialogOpen}
        onConfirm={confirmDeleteConnection}
        title="Delete Foreign Key"
        description={
          sourceTable && targetTable && sourceColumn && targetColumn
            ? `Are you sure you want to delete the foreign key relationship between "${sourceTable.name}.${sourceColumn.name}" and "${targetTable.name}.${targetColumn.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this foreign key relationship? This action cannot be undone."
        }
        confirmText="Delete Relationship"
      />
    </>
  )
} 