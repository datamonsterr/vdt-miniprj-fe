import { create } from 'zustand'
import { temporal } from 'zundo'
import type { Table, ForeignKey, SchemaBuilderState } from '@/types/database'
import { ToolType } from '@/types/database'
import type { UniqueIdentifier } from '@dnd-kit/core'

// Define the main schema store state
interface SchemaStoreState {
  // Core data
  tables: Table[]
  foreignKeys: ForeignKey[]
  
  // UI state (not tracked by undo/redo)
  uiState: SchemaBuilderState
  
  // Actions
  setTables: (tables: Table[]) => void
  addTable: (table: Table) => void
  updateTable: (table: Table) => void
  deleteTable: (tableId: UniqueIdentifier) => void
  
  setForeignKeys: (foreignKeys: ForeignKey[]) => void
  addForeignKey: (foreignKey: ForeignKey) => void
  deleteForeignKey: (foreignKeyId: UniqueIdentifier) => void
  
  setSelectedTool: (tool: ToolType) => void
  setUIState: (uiState: Partial<SchemaBuilderState>) => void
}

// Create the store with temporal (undo/redo) middleware
export const useSchemaStore = create<SchemaStoreState>()(
  temporal(
    (set, get) => ({
      // Initial state
      tables: [],
      foreignKeys: [],
      uiState: {
        selectedTool: ToolType.SELECT,
        selectedTableId: null,
        selectedColumnId: null,
        isConnecting: false,
        connectionStart: null,
        canvasOffset: { x: 0, y: 0 },
        isPanning: false,
      },

      // Actions that affect undo/redo state
      setTables: (tables) => set({ tables }),
      
      addTable: (table) => set((state) => ({ 
        tables: [...state.tables, table] 
      })),
      
      updateTable: (updatedTable) => set((state) => ({
        tables: state.tables.map(table => 
          table.id === updatedTable.id ? updatedTable : table
        )
      })),
      
      deleteTable: (tableId) => set((state) => ({
        tables: state.tables.filter(table => table.id !== tableId),
        foreignKeys: state.foreignKeys.filter(fk => 
          fk.sourceTableId !== tableId && fk.targetTableId !== tableId
        )
      })),
      
      setForeignKeys: (foreignKeys) => set({ foreignKeys }),
      
      addForeignKey: (foreignKey) => set((state) => ({
        foreignKeys: [...state.foreignKeys, foreignKey]
      })),
      
      deleteForeignKey: (foreignKeyId) => set((state) => ({
        foreignKeys: state.foreignKeys.filter(fk => fk.id !== foreignKeyId)
      })),

      // UI actions (these don't affect undo/redo)
      setSelectedTool: (tool) => set((state) => ({
        uiState: { ...state.uiState, selectedTool: tool }
      })),
      
      setUIState: (newUIState) => set((state) => ({
        uiState: { ...state.uiState, ...newUIState }
      })),
    }),
    {
      // Configuration options
      limit: 50, // Keep last 50 states in history
      
      // Only track tables and foreignKeys in undo/redo, exclude UI state
      partialize: (state) => ({
        tables: state.tables,
        foreignKeys: state.foreignKeys,
      }),
      
      // Prevent saving when only UI state changes
      equality: (pastState, currentState) => {
        return JSON.stringify(pastState) === JSON.stringify(currentState)
      },
      
      // Callback when state is saved to history
      onSave: (pastState, currentState) => {
        console.log('Schema state saved to history')
      },
    }
  )
) 