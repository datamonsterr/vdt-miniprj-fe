import { Z_INDEX } from '@/common'
import { Toolbar } from '@/components/schema-builder/Toolbar'
import { UndoRedoToolbar } from '@/components/schema-builder/UndoRedoToolbar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUndoRedo } from '@/hooks/useUndoRedo'
import { useSchemaStore } from '@/stores/schema-store'
import { ToolType, SQLDataType } from '@/types/database'
import { useEffect, useState } from 'react'
import type { SchemaCanvasProps } from '../types'
import { SchemaCanvasContainer } from './SchemaCanvasContainer'

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
export function SchemaCanvas({
  initialTables = [],
  initialForeignKeys = [],
  onSchemaChange,
  onExport,
  onSave,
  isSaving = false,
  showToolbar = true,
  showUndoRedo = true,
  className = '',
  style = {},
}: Omit<SchemaCanvasProps, 'initialTheme'>) {
  // Use explicit selectors for better reactivity with temporal middleware
  const tables = useSchemaStore(state => state.tables)
  const foreignKeys = useSchemaStore(state => state.foreignKeys)
  const uiState = useSchemaStore(state => state.uiState)
  const addTable = useSchemaStore(state => state.addTable)
  const setUIState = useSchemaStore(state => state.setUIState)
  const setTables = useSchemaStore(state => state.setTables)
  const setForeignKeys = useSchemaStore(state => state.setForeignKeys)

  // Set up undo/redo with keyboard shortcuts
  useUndoRedo()

  // Local state for UI only
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false)
  const [newTableName, setNewTableName] = useState('')

  // Track if component has been initialized to prevent infinite loops
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize with provided data only once
  useEffect(() => {
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
  useEffect(() => {
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

  const handleCreateTable = () => {
    if (newTableName.trim()) {
      const newTable = {
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
        position: { x: 100, y: 100 }, // Default position
      }
      addTable(newTable)
      setNewTableName('')
      setIsTableDialogOpen(false)
      
      // Reset tool to default
      setUIState({ selectedTool: ToolType.MOVE })
    }
  }

  const handleTableDialogOpen = () => {
    setIsTableDialogOpen(true)
  }

  const handleExport = () => {
    // Create export data
    const exportData = {
      tables,
      foreignKeys,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }
    
    // Create and download JSON file
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `database-schema-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      {/* Toolbar */}
      {showToolbar && (
        <div
          className="absolute top-4 left-4 z-50"
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <Toolbar 
            onToolChange={handleToolChange} 
            selectedTool={uiState.selectedTool}
            onExport={onExport || handleExport}
            onSave={onSave}
            isSaving={isSaving}
          />
        </div>
      )}

      {/* Undo/Redo Controls */}
      {showUndoRedo && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2"
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <UndoRedoToolbar />
        </div>
      )}

      {/* Main Canvas */}
      <SchemaCanvasContainer 
        className="schema-canvas"
        onTableDialogOpen={handleTableDialogOpen}
      />

      {/* Table Creation Dialog */}
      <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Table</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tableName">Table Name</Label>
              <Input
                id="tableName"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                placeholder="Enter table name"
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
            <Button onClick={handleCreateTable} disabled={!newTableName.trim()}>
              Create Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 