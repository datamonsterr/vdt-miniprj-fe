import { Button } from '@/components/ui/button'
import { useRenameSchema } from '@/hooks/api/useSchemas'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { SchemaNameModal } from './SchemaNameModal'

interface SchemaHeaderProps {
  schemaId?: string
  schemaName: string
  onBack: () => void
  onNameChange?: (newName: string) => void
}

export function SchemaHeader({
  schemaId,
  schemaName,
  onNameChange,
}: SchemaHeaderProps) {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const { renameSchema } = useRenameSchema()

  const handleRename = async (newName: string) => {
    if (!schemaId || newName === schemaName) {
      setIsRenameModalOpen(false)
      return
    }

    setIsRenaming(true)
    try {
      await renameSchema(schemaId, newName)
      if (onNameChange) {
        onNameChange(newName)
      }
      setIsRenameModalOpen(false)
    } catch (error) {
      console.error('Failed to rename schema:', error)
      // TODO: Show error toast/notification
    } finally {
      setIsRenaming(false)
    }
  }

  const canRename = !!schemaId // Only allow renaming for existing schemas

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{schemaName}</h1>
            {canRename && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRenameModalOpen(true)}
                className="p-1 h-auto"
                title="Rename schema"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <SchemaNameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onConfirm={handleRename}
        defaultName={schemaName}
        title="Rename Schema"
        description="Enter a new name for your schema"
        isLoading={isRenaming}
      />
    </>
  )
} 