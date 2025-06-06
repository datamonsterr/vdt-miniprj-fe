import { useState } from 'react'
import { Plus, Edit, Trash2, Key, Link as LinkIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Draggable } from '@/components/drag-drop'
import type { Table, Column, SQLDataType } from '@/types/database'
import { ColumnDialog } from './ColumnDialog'

interface TableComponentProps {
  table: Table
  onUpdateTable: (table: Table) => void
  onDeleteTable: (tableId: string) => void
  onColumnClick: (tableId: string, columnId: string) => void
  selectedColumnId?: string
  isConnectionMode?: boolean
}

export function TableComponent({
  table,
  onUpdateTable,
  onDeleteTable,
  onColumnClick,
  selectedColumnId,
  isConnectionMode = false,
}: TableComponentProps) {
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false)
  const [editingColumn, setEditingColumn] = useState<Column | null>(null)

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

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = table.columns.filter(col => col.id !== columnId)
    onUpdateTable({ ...table, columns: updatedColumns })
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

  return (
    <>
      <div
        className="absolute"
        style={{
          left: table.position.x,
          top: table.position.y,
        }}
      >
        <Draggable id={table.id}>
        <Card className="w-80 bg-background border-2 border-border shadow-lg" data-table-id={table.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{table.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTable(table.id.toString())}
                className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
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
                  className={`flex items-center justify-between p-2 rounded border transition-colors cursor-pointer ${
                    selectedColumnId === column.id
                      ? 'bg-primary/20 border-primary'
                      : 'bg-muted/50 border-border hover:bg-muted'
                  } ${isConnectionMode ? 'hover:bg-primary/10' : ''}`}
                  onClick={() => onColumnClick(table.id.toString(), column.id.toString())}
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
                          e.stopPropagation()
                          handleEditColumn(column)
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteColumn(column.id.toString())
                        }}
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
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
                  onClick={handleAddColumn}
                  className="w-full mt-2 h-8 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Column
                </Button>
              )}
            </div>
                     </CardContent>
         </Card>
         </Draggable>
       </div>

      <ColumnDialog
        open={isColumnDialogOpen}
        onOpenChange={setIsColumnDialogOpen}
        onSave={handleSaveColumn}
        initialData={editingColumn}
        isEditing={!!editingColumn}
      />
    </>
  )
} 