import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SQLDataType, type Column } from '@/types/database'

interface ColumnDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (column: Omit<Column, 'id'>) => void
  initialData?: Column | null
  isEditing?: boolean
}

export function ColumnDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
  isEditing = false,
}: ColumnDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    dataType: SQLDataType.VARCHAR,
    length: undefined as number | undefined,
    nullable: true,
    primaryKey: false,
    autoIncrement: false,
    defaultValue: '',
    description: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        dataType: initialData.dataType,
        length: initialData.length,
        nullable: initialData.nullable,
        primaryKey: initialData.primaryKey,
        autoIncrement: initialData.autoIncrement,
        defaultValue: initialData.defaultValue || '',
        description: initialData.description || '',
      })
    } else {
      setFormData({
        name: '',
        dataType: SQLDataType.VARCHAR,
        length: undefined,
        nullable: true,
        primaryKey: false,
        autoIncrement: false,
        defaultValue: '',
        description: '',
      })
    }
  }, [initialData, open])

  const handleSave = () => {
    if (!formData.name.trim()) return

    const columnData = {
      ...formData,
      name: formData.name.trim(),
      defaultValue: formData.defaultValue || undefined,
      description: formData.description || undefined,
    }

    onSave(columnData)
  }

  const requiresLength = (dataType: SQLDataType) => {
    return dataType === SQLDataType.VARCHAR || dataType === SQLDataType.CHAR || dataType === SQLDataType.DECIMAL
  }

  const canAutoIncrement = (dataType: SQLDataType) => {
    return dataType === SQLDataType.INT || dataType === SQLDataType.BIGINT || dataType === SQLDataType.SMALLINT
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Column' : 'Add Column'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Column Name</Label>
            <Input
              id="name"
              placeholder="Enter column name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataType">Data Type</Label>
            <Select
              value={formData.dataType}
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                dataType: value as SQLDataType,
                length: requiresLength(value as SQLDataType) ? prev.length || 255 : undefined,
                autoIncrement: canAutoIncrement(value as SQLDataType) ? prev.autoIncrement : false,
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SQLDataType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {requiresLength(formData.dataType) && (
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                placeholder="Enter length"
                value={formData.length || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  length: e.target.value ? parseInt(e.target.value) : undefined 
                }))}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="defaultValue">Default Value (Optional)</Label>
            <Input
              id="defaultValue"
              placeholder="Enter default value"
              value={formData.defaultValue}
              onChange={(e) => setFormData(prev => ({ ...prev, defaultValue: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.nullable}
                onChange={(e) => setFormData(prev => ({ ...prev, nullable: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Nullable</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.primaryKey}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  primaryKey: e.target.checked,
                  nullable: e.target.checked ? false : prev.nullable,
                }))}
                className="rounded"
              />
              <span className="text-sm">Primary Key</span>
            </label>

            {canAutoIncrement(formData.dataType) && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.autoIncrement}
                  onChange={(e) => setFormData(prev => ({ ...prev, autoIncrement: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm">Auto Increment</span>
              </label>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!formData.name.trim()}
          >
            {isEditing ? 'Update' : 'Add'} Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 