import { Z_INDEX } from '@/common'
import { UserSettings } from '@/components/auth/UserSettings'
import { Toolbar } from '@/components/schema-builder/Toolbar'
import { UndoRedoToolbar } from '@/components/schema-builder/UndoRedoToolbar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SchemaBuilderThemeToggle } from '@/components/ui/schema-builder-theme-toggle'
import { useUndoRedo } from '@/hooks/useUndoRedo'
import { useSchemaStore } from '@/stores/schema-store'
import { ToolType } from '@/types/database'
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
  showToolbar = true,
  showUndoRedo = true,
  showThemeToggle = true,
  showUserSettings = true,
  className = '',
  style = {},
}: Omit<SchemaCanvasProps, 'initialTheme'>) {
  // Use Zustand store
  const {
    tables,
    foreignKeys,
    uiState,
    addTable,
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
        columns: [],
        position: { x: 100, y: 100 }, // Default position
      }
      addTable(newTable)
      setNewTableName('')
      setIsTableDialogOpen(false)
      
      // Reset tool to default
      setUIState({ selectedTool: ToolType.SELECT })
    }
  }

  const handleTableDialogOpen = () => {
    setIsTableDialogOpen(true)
  }

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      {/* Toolbar */}
      {showToolbar && (
        <div
          className="absolute top-4 left-4 z-50"
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <Toolbar onToolChange={handleToolChange} selectedTool={uiState.selectedTool} />
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

      {/* Theme Toggle */}
      {showThemeToggle && (
        <div
          className="absolute top-4 right-16"
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <SchemaBuilderThemeToggle />
        </div>
      )}

      {/* User Settings */}
      {showUserSettings && (
        <div
          className="absolute top-4 right-4"
          style={{ zIndex: Z_INDEX.TOOLBAR }}
        >
          <UserSettings />
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