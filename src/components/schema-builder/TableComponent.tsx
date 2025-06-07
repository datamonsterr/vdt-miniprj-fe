import { useState } from 'react'
import { Plus, Edit, Trash2, Key, Link as LinkIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Draggable } from '@/components/drag-drop'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import type { Table, Column, SQLDataType } from '@/types/database'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { ColumnDialog } from './ColumnDialog'

interface TableComponentProps {
  table: Table
  onUpdateTable: (table: Table) => void
  onDeleteTable: (tableId: UniqueIdentifier) => void
  onColumnClick: (tableId: string, columnId: string) => void
  selectedColumnId?: string
  isConnectionMode?: boolean
  isDraggable?: boolean
}

export function TableComponent({
  table,
  onUpdateTable,
  onDeleteTable,
  onColumnClick,
  selectedColumnId,
  isConnectionMode = false,
  isDraggable = true,
}: TableComponentProps) {
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false)
  const [editingColumn, setEditingColumn] = useState<Column | null>(null)
  const [isDeleteTableDialogOpen, setIsDeleteTableDialogOpen] = useState(false)
  const [isDeleteColumnDialogOpen, setIsDeleteColumnDialogOpen] = useState(false)
  const [columnToDelete, setColumnToDelete] = useState<UniqueIdentifier | null>(null)

  const handleAddColumn = () => {
    setEditingColumn(null)
    setIsColumnDialogOpen(true)
  }

  const handleEditColumn = (column: Column) => {
    setEditingColumn(column)
    setIsColumnDialogOpen(true)
  }

  const handleSaveColumn = (columnData: Omit<Column, 'id'>) => {
    if (editingColumn) {
      // Update existing column
      const updatedColumns = table.columns.map(col =>
        col.id === editingColumn.id ? { ...columnData, id: editingColumn.id } : col
      )
      onUpdateTable({ ...table, columns: updatedColumns })
    } else {
      // Add new column
      const newColumn: Column = {
        ...columnData,
        id: `col_${Date.now()}`,
      }
      onUpdateTable({ ...table, columns: [...table.columns, newColumn] })
    }
    setIsColumnDialogOpen(false)
    setEditingColumn(null)
  }

  const handleDeleteColumn = (columnId: UniqueIdentifier) => {
    setColumnToDelete(columnId)
    setIsDeleteColumnDialogOpen(true)
  }

  const confirmDeleteColumn = () => {
    if (columnToDelete) {
      const updatedColumns = table.columns.filter(col => col.id !== columnToDelete)
      onUpdateTable({ ...table, columns: updatedColumns })
      setColumnToDelete(null)
    }
  }

  const getDataTypeColor = (dataType: SQLDataType): string => {
    switch (dataType) {
      case 'VARCHAR':
      case 'CHAR':
      case 'TEXT':
        return 'bg-blue-100 text-blue-800'
      case 'INT':
      case 'BIGINT':
      case 'SMALLINT':
      case 'DECIMAL':
      case 'FLOAT':
      case 'DOUBLE':
        return 'bg-green-100 text-green-800'
      case 'BOOLEAN':
        return 'bg-purple-100 text-purple-800'
      case 'DATE':
      case 'DATETIME':
      case 'TIMESTAMP':
      case 'TIME':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDeleteTableClick = (e: React.MouseEvent) => {
    console.log('🗑️ Table delete button clicked for table:', table.id)
    e.preventDefault()
    e.stopPropagation()
    // Force immediate propagation stop to prevent drag handlers from interfering
    e.nativeEvent.stopImmediatePropagation()
    setIsDeleteTableDialogOpen(true)
  }

  const confirmDeleteTable = () => {
    onDeleteTable(table.id)
  }

  const tableCard = (
    <Card 
      className="w-80 bg-background border-2 border-border shadow-lg" 
      data-table-id={table.id}
      style={{ 
        pointerEvents: 'auto',
        userSelect: 'none'
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{table.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteTableClick}
            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
            style={{ pointerEvents: 'auto' }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {table.columns.map((column) => (
            <div
              key={column.id}
              data-column-id={column.id}
              className={`flex items-center justify-between p-2 rounded border transition-colors ${
                isConnectionMode ? 'cursor-crosshair' : 'cursor-default'
              } ${
                selectedColumnId === column.id
                  ? 'bg-primary/20 border-primary'
                  : 'bg-muted/50 border-border hover:bg-muted'
              } ${isConnectionMode ? 'hover:bg-primary/10' : ''}`}
              onClick={(e) => {
                // Only handle connection logic if in connection mode
                if (isConnectionMode) {
                  onColumnClick(table.id.toString(), column.id.toString())
                } else {
                  // In other modes, prevent default behavior to avoid unwanted interactions
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  {column.primaryKey && <Key className="h-3 w-3 text-yellow-600" />}
                  {isConnectionMode && <LinkIcon className="h-3 w-3 text-blue-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate">
                    {column.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getDataTypeColor(column.dataType)}`}
                    >
                      {column.dataType}
                      {column.length && `(${column.length})`}
                    </Badge>
                    {!column.nullable && (
                      <Badge variant="outline" className="text-xs">
                        NOT NULL
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {!isConnectionMode && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Force immediate propagation stop to prevent drag handlers from interfering
                      e.nativeEvent.stopImmediatePropagation()
                      handleEditColumn(column)
                    }}
                    className="h-6 w-6 p-0"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      console.log('🗑️ Column delete button clicked for column:', column.id)
                      e.preventDefault()
                      e.stopPropagation()
                      // Force immediate propagation stop to prevent drag handlers from interfering
                      e.nativeEvent.stopImmediatePropagation()
                      handleDeleteColumn(column.id)
                    }}
                    className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          {!isConnectionMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Force immediate propagation stop to prevent drag handlers from interfering
                e.nativeEvent.stopImmediatePropagation()
                handleAddColumn()
              }}
              className="w-full mt-2 h-8 text-xs"
              style={{ pointerEvents: 'auto' }}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Column
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <div
        className="absolute"
        style={{
          left: table.position.x,
          top: table.position.y,
        }}
      >
        {isDraggable ? (
          <Draggable id={table.id}>
            {tableCard}
          </Draggable>
        ) : (
          tableCard
        )}
      </div>

      <ColumnDialog
        open={isColumnDialogOpen}
        onOpenChange={setIsColumnDialogOpen}
        onSave={handleSaveColumn}
        initialData={editingColumn}
        isEditing={!!editingColumn}
      />

      <ConfirmationDialog
        open={isDeleteTableDialogOpen}
        onOpenChange={setIsDeleteTableDialogOpen}
        onConfirm={confirmDeleteTable}
        title="Delete Table"
        description={`Are you sure you want to delete the table "${table.name}"? This action cannot be undone and will also remove all foreign key relationships involving this table.`}
        confirmText="Delete Table"
      />

      <ConfirmationDialog
        open={isDeleteColumnDialogOpen}
        onOpenChange={setIsDeleteColumnDialogOpen}
        onConfirm={confirmDeleteColumn}
        title="Delete Column"
        description={`Are you sure you want to delete this column? This action cannot be undone and may affect foreign key relationships.`}
        confirmText="Delete Column"
      />
    </>
  )
} 