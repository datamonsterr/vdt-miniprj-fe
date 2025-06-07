import type { ForeignKey, SchemaBuilderState, Table } from '@/types/database'
import { ToolType } from '@/types/database'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { temporal } from 'zundo'
import { create } from 'zustand'

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
    (set, _get) => ({
      // Initial state
      tables: [],
      foreignKeys: [],
      uiState: {
        selectedTool: ToolType.MOVE,
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
      
      deleteTable: (tableId) => {
        console.log('Store deleteTable called with ID:', tableId, 'type:', typeof tableId)
        
        set((state) => {
          console.log('Current tables in store:', state.tables.map(t => ({ id: t.id, name: t.name, idType: typeof t.id })))
          
          // Convert to string for consistent comparison
          const tableIdStr = String(tableId)
          const newTables = state.tables.filter(table => String(table.id) !== tableIdStr)
          const newForeignKeys = state.foreignKeys.filter(fk => 
            String(fk.sourceTableId) !== tableIdStr && String(fk.targetTableId) !== tableIdStr
          )
          
          console.log('Filtered tables result:', newTables.map(t => ({ id: t.id, name: t.name })))
          console.log('Tables removed:', state.tables.length - newTables.length)
          
          if (state.tables.length === newTables.length) {
            console.warn('WARNING: No tables were removed! Table ID might not match.')
            console.log('Attempting direct comparison with original ID types')
            
            // Try with exact type matching as fallback
            const exactFilterTables = state.tables.filter(table => table.id !== tableId)
            console.log('Exact filter result:', exactFilterTables.map(t => ({ id: t.id, name: t.name })))
            
            if (exactFilterTables.length !== state.tables.length) {
              console.log('Exact match worked, using exact filter result')
              return {
                tables: exactFilterTables,
                foreignKeys: state.foreignKeys.filter(fk => 
                  fk.sourceTableId !== tableId && fk.targetTableId !== tableId
                )
              }
            }
          }
          
          const result = {
            tables: newTables,
            foreignKeys: newForeignKeys
          }
          
          console.log('Returning new state with tables:', result.tables.map(t => ({ id: t.id, name: t.name })))
          return result
        })
      },
      
      setForeignKeys: (foreignKeys) => set({ foreignKeys }),
      
      addForeignKey: (foreignKey) => set((state) => {
        console.log('Adding foreign key:', foreignKey)
        console.log('Current foreign keys:', state.foreignKeys)
        const newForeignKeys = [...state.foreignKeys, foreignKey]
        console.log('New foreign keys after addition:', newForeignKeys)
        return {
          foreignKeys: newForeignKeys
        }
      }),
      
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
      
      // Use default equality comparison for temporal middleware
      // equality: (pastState, currentState) => {
      //   return JSON.stringify(pastState) === JSON.stringify(currentState)
      // },
      
      // Callback when state is saved to history
      onSave: (_pastState, _currentState) => {
        console.log('Schema state saved to history')
      },
    }
  )
) 