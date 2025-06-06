import React, { useState } from 'react'
import { DragDropProvider } from '@/contexts/drag-drop'
import { TableComponent } from './TableComponent'
import { ConnectionLine } from './ConnectionLine'
import { Toolbar } from './Toolbar'
import { UndoRedoToolbar } from './UndoRedoToolbar'
import type { Table, ForeignKey } from '@/types/database'
import { SQLDataType, ToolType } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { SchemaBuilderThemeToggle } from '@/components/ui/schema-builder-theme-toggle'
import { SchemaBuilderThemeProvider, useSchemaBuilderTheme } from '@/contexts/schema-builder-theme'
import { UserSettings } from '@/components/auth/UserSettings'
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { useSchemaStore } from '@/stores/schema-store'
import { useUndoRedo } from '@/hooks/useUndoRedo'
import { Z_INDEX } from '@/common'

export interface SchemaCanvasProps {
  /**
   * Optional initial tables to load in the canvas
   */
  initialTables?: Table[]
  /**
   * Optional initial foreign keys to load in the canvas
   */
  initialForeignKeys?: ForeignKey[]
  /**
   * Callback when schema data changes
   */
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  /**
   * Whether to show the toolbar (default: true)
   */
  showToolbar?: boolean
  /**
   * Whether to show the undo/redo toolbar (default: true)
   */
  showUndoRedo?: boolean
  /**
   * Whether to show the theme toggle button (default: true)
   */
  showThemeToggle?: boolean
  /**
   * Whether to show the user settings button (default: true)
   */
  showUserSettings?: boolean
  /**
   * Initial theme for the schema builder (default: system preference)
   */
  initialTheme?: 'light' | 'dark'
  /**
   * Custom className for the canvas container
   */
  className?: string
  /**
   * Custom style for the canvas container
   */
  style?: React.CSSProperties
}

/**
 * SchemaCanvas - An embeddable database schema builder component
 * 
 * This component provides a full-featured database schema designer that can be
 * embedded in any React application. It includes:
 * - Interactive table creation and editing
 * - Drag and drop table positioning
 * - Foreign key relationship creation
 * - Canvas panning with hand tool
 * - Undo/redo functionality
 * - Light/dark theme toggle (isolated to the canvas)
 * 
 * @example
 * ```tsx
 * <SchemaCanvas 
 *   onSchemaChange={(data) => console.log('Schema changed:', data)}
 *   showToolbar={true}
 *   showUndoRedo={true}
 *   showThemeToggle={true}
 *   initialTheme="dark"
 * />
 * ```
 */
function SchemaCanvasInternal({
  initialTables = [],
  initialForeignKeys = [],
  onSchemaChange,
  showToolbar = true,
  showUndoRedo = true,
  showThemeToggle = true,
  showUserSettings = true,
  className = '',
  style = {},
}: Omit<SchemaCanvasProps, 'initialTheme'>) {
  const { theme } = useSchemaBuilderTheme()
  // Use Zustand store
  const {
    tables,
    foreignKeys,
    uiState,
    addTable,
    updateTable,
    deleteTable,
    addForeignKey,
    deleteForeignKey,
    setSelectedTool,
    setUIState,
    setTables,
    setForeignKeys,
  } = useSchemaStore()

  // Set up undo/redo with keyboard shortcuts
  useUndoRedo()

  // Local state for UI only
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false)
  const [newTableName, setNewTableName] = useState('')

  // Track if component has been initialized to prevent infinite loops
  const [isInitialized, setIsInitialized] = React.useState(false)

  // Initialize with provided data only once
  React.useEffect(() => {
    if (!isInitialized) {
      if (initialTables.length > 0) {
        setTables(initialTables)
      }
      if (initialForeignKeys.length > 0) {
        setForeignKeys(initialForeignKeys)
      }
      setIsInitialized(true)
    }
  }, [initialTables, initialForeignKeys, setTables, setForeignKeys, isInitialized])

  // Notify parent of schema changes (excluding initial load)
  React.useEffect(() => {
    if (isInitialized && onSchemaChange) {
      onSchemaChange({ tables, foreignKeys })
    }
  }, [tables, foreignKeys, onSchemaChange, isInitialized])

  const handleToolChange = (tool: ToolType) => {
    setUIState({
      selectedTool: tool,
      isConnecting: false,
      connectionStart: null,
    })

    // When table tool is selected, open table creation dialog
    if (tool === ToolType.TABLE) {
      setIsTableDialogOpen(true)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks on the canvas background, not on tables
    if (e.target === e.currentTarget && uiState.selectedTool === ToolType.TABLE) {
      setIsTableDialogOpen(true)
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

    // Find the table being dragged
    const tableId = active.id
    const table = tables.find(t => t.id === tableId)

    if (table && delta) {
      // Update table position
      const updatedTable = {
        ...table,
        position: {
          x: table.position.x + delta.x,
          y: table.position.y + delta.y,
        }
      }
      updateTable(updatedTable)
    }
  }

  const handleCreateTable = () => {
    if (!newTableName.trim()) return

    const newTable: Table = {
      id: `table_${Date.now()}`,
      name: newTableName.trim(),
      columns: [
        {
          id: `col_${Date.now()}`,
          name: 'id',
          dataType: SQLDataType.INT,
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
        }
      ],
      position: { x: 100 + tables.length * 50, y: 100 + tables.length * 50 },
    }

    addTable(newTable)
    setNewTableName('')
    setIsTableDialogOpen(false)
    setSelectedTool(ToolType.SELECT)
  }

  const handleUpdateTable = (updatedTable: Table) => {
    updateTable(updatedTable)
  }

  const handleDeleteTable = (tableId: string) => {
    deleteTable(tableId)
  }

  const handleDeleteConnection = (foreignKeyId: UniqueIdentifier) => {
    deleteForeignKey(foreignKeyId)
  }

  const handleColumnClick = (tableId: string, columnId: string) => {
    if (uiState.selectedTool === ToolType.CONNECTION) {
      if (!uiState.connectionStart) {
        // Start connection
        setUIState({
          isConnecting: true,
          connectionStart: { tableId, columnId },
          selectedTableId: tableId,
          selectedColumnId: columnId,
        })
      } else {
        // Complete connection
        if (uiState.connectionStart.tableId !== tableId || uiState.connectionStart.columnId !== columnId) {
          const newForeignKey: ForeignKey = {
            id: `fk_${Date.now()}`,
            sourceTableId: uiState.connectionStart.tableId,
            sourceColumnId: uiState.connectionStart.columnId,
            targetTableId: tableId,
            targetColumnId: columnId,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
          addForeignKey(newForeignKey)
        }
        setUIState({
          isConnecting: false,
          connectionStart: null,
          selectedTableId: null,
          selectedColumnId: null,
        })
      }
    } else {
      setUIState({
        selectedTableId: tableId,
        selectedColumnId: columnId,
      })
    }
  }

  return (
    <div 
      className={`relative w-full h-full bg-background ${theme} ${className}`}
      style={style}
    >
      {/* Floating Toolbar */}
      {showToolbar && (
        <div 
          className="absolute top-4 left-4" 
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <Toolbar selectedTool={uiState.selectedTool} onToolChange={handleToolChange} />
          
          {uiState.isConnecting && (
            <div className="mt-4 p-3 bg-primary/10 border border-primary rounded-lg">
              <p className="text-sm font-medium text-primary">Connection Mode</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click on a column to create a foreign key relationship
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => setUIState({
                  isConnecting: false,
                  connectionStart: null,
                  selectedTool: ToolType.SELECT,
                })}
              >
                Cancel Connection
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Floating Undo/Redo Toolbar */}
      {showUndoRedo && (
        <div 
          className="absolute top-4 right-4 flex gap-2" 
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <UndoRedoToolbar />
          {showThemeToggle && <SchemaBuilderThemeToggle />}
          {showUserSettings && <UserSettings />}
        </div>
      )}

      {/* Floating Theme Toggle (when undo/redo is hidden) */}
      {!showUndoRedo && (showThemeToggle || showUserSettings) && (
        <div 
          className="absolute top-4 right-4 flex gap-2" 
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          {showThemeToggle && <SchemaBuilderThemeToggle />}
          {showUserSettings && <UserSettings />}
        </div>
      )}

      {/* Main Canvas */}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div
          className={`w-full h-full bg-grid-pattern relative overflow-hidden schema-canvas ${
            uiState.selectedTool === ToolType.HAND ? 'cursor-grab' : ''
          } ${
            uiState.isPanning ? 'cursor-grabbing' : ''
          }`}
          onClick={handleCanvasClick}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseLeave}
          style={{
            backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            backgroundPosition: `${uiState.canvasOffset.x}px ${uiState.canvasOffset.y}px`,
          }}
        >
          {/* SVG overlay for connection lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ 
              zIndex: Z_INDEX.CONTENT,
              transform: `translate(${uiState.canvasOffset.x}px, ${uiState.canvasOffset.y}px)`
            }}
          >
            {foreignKeys.map((foreignKey) => (
              <ConnectionLine
                key={foreignKey.id}
                foreignKey={foreignKey}
                tables={tables}
                onDeleteConnection={handleDeleteConnection}
              />
            ))}
          </svg>

          {/* Instructions */}
          {tables.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <h2 className="text-xl font-semibold mb-2">Welcome to Schema Builder</h2>
                <p className="text-sm">Select the Table tool and click to add your first table</p>
                <p className="text-xs mt-2 text-muted-foreground">
                  Use <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Z</kbd> to undo and{' '}
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Shift+Z</kbd> to redo
                </p>
              </div>
            </div>
          )}

          {/* Render tables */}
          <div 
            style={{ 
              position: 'relative', 
              zIndex: Z_INDEX.TABLE,
              transform: `translate(${uiState.canvasOffset.x}px, ${uiState.canvasOffset.y}px)`
            }}
          >
            {tables.map((table) => (
              <TableComponent
                key={table.id}
                table={table}
                onUpdateTable={handleUpdateTable}
                onDeleteTable={handleDeleteTable}
                onColumnClick={handleColumnClick}
                selectedColumnId={
                  uiState.selectedTableId === table.id.toString()
                    ? uiState.selectedColumnId?.toString() || undefined
                    : undefined
                }
                isConnectionMode={uiState.selectedTool === ToolType.CONNECTION}
              />
            ))}
          </div>
        </div>
      </DragDropProvider>

      {/* Table creation dialog */}
      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tableName">Table Name</Label>
              <Input
                id="tableName"
                placeholder="Enter table name"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateTable()
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTableDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTable}
              disabled={!newTableName.trim()}
            >
              Create Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/**
 * SchemaCanvas - Main export component with theme provider
 */
export function SchemaCanvas(props: SchemaCanvasProps) {
  const { initialTheme, ...restProps } = props
  
  return (
    <SchemaBuilderThemeProvider initialTheme={initialTheme}>
      <SchemaCanvasInternal {...restProps} />
    </SchemaBuilderThemeProvider>
  )
} 