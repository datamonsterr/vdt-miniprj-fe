import { apiSchemaToSchema, schemaToCreateRequest } from '@/api/transformers'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useCreateSchema, useGetSchemaById, useUpdateSchema } from '@/hooks/api/useSchemas'
import { sampleForeignKeys, sampleTables } from '@/mocks/sampleData'
import { SchemaCanvasView, SchemaHeader, SchemaNameModal } from '@/sections/schema-builder'
import type { DatabaseSchema, ForeignKey, Table } from '@/types/database'
import { useEffect, useState } from 'react'

interface SchemaBuilderWrapperProps {
  schemaId?: string
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  initialTheme: 'light' | 'dark'
  initialTables: Table[]
  initialForeignKeys: ForeignKey[]
  showToolbar?: boolean
  showUndoRedo?: boolean
  showUserSettings?: boolean
  showThemeToggle?: boolean
  className?: string
  onBack: () => void
}

export function SchemaBuilderWrapper({
  schemaId,
  onSchemaChange,
  initialTheme,
  initialTables,
  initialForeignKeys,
  showToolbar = true,
  showUndoRedo = true,
  showUserSettings = false,
  showThemeToggle = true,
  className = "h-full",
  onBack
}: SchemaBuilderWrapperProps) {
  const [currentTables, setCurrentTables] = useState<Table[]>([])
  const [currentForeignKeys, setCurrentForeignKeys] = useState<ForeignKey[]>([])
  const [currentSchema, setCurrentSchema] = useState<DatabaseSchema | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [hasLoadedSchema, setHasLoadedSchema] = useState(false)

  // Modal states
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [isNoTablesModalOpen, setIsNoTablesModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // API hooks
  const { schema: loadedSchema, isLoading } = useGetSchemaById(schemaId || null)
  const { createSchema } = useCreateSchema()
  const { updateSchema } = useUpdateSchema()

  // Load schema data when schemaId changes
  useEffect(() => {
    if (schemaId && loadedSchema && !hasLoadedSchema) {
      console.log('Loading schema:', loadedSchema)
      const convertedSchema = apiSchemaToSchema(loadedSchema)
      setCurrentSchema(convertedSchema)
      setCurrentTables(convertedSchema.tables)
      setCurrentForeignKeys(convertedSchema.foreignKeys)
      setHasLoadedSchema(true)
    } else if (!schemaId && !hasLoadedSchema) {
      // Use provided initial data or samples
      const tables = initialTables.length > 0 ? initialTables : sampleTables
      const foreignKeys = initialForeignKeys.length > 0 ? initialForeignKeys : sampleForeignKeys
      setCurrentTables(tables)
      setCurrentForeignKeys(foreignKeys)
      setHasLoadedSchema(true)

      // For new schemas, set a default name
      setCurrentSchema({
        id: 'new',
        name: 'Untitled',
        tables: tables,
        foreignKeys: foreignKeys,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }, [schemaId, loadedSchema, initialTables, initialForeignKeys, hasLoadedSchema])

  // Reset when schemaId changes
  useEffect(() => {
    if (schemaId) {
      setHasLoadedSchema(false)
    }
  }, [schemaId])

  const handleSchemaChange = (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    setCurrentTables(data.tables)
    setCurrentForeignKeys(data.foreignKeys)

    // Notify parent component
    if (onSchemaChange) {
      onSchemaChange(data)
    }
  }

  const handleSave = () => {
    if (currentTables.length === 0) {
      setIsNoTablesModalOpen(true)
      return
    }

    if (schemaId && currentSchema) {
      // Update existing schema
      performSave(currentSchema.name)
    } else {
      // Create new schema - ask for name
      setIsNameModalOpen(true)
    }
  }

  const performSave = async (name: string) => {
    setIsSaving(true)
    try {
      const schemaData = schemaToCreateRequest({
        id: currentSchema?.id || 'new',
        name: name,
        tables: currentTables,
        foreignKeys: currentForeignKeys,
        createdAt: currentSchema?.createdAt || new Date(),
        updatedAt: new Date(),
      })

      let result
      if (schemaId && currentSchema) {
        // Update existing schema
        result = await updateSchema(schemaId, schemaData)
        console.log('Schema updated:', result)
        setSuccessMessage(`Schema "${result.name}" updated successfully!`)
      } else {
        // Create new schema
        result = await createSchema({
          ...schemaData,
          name: name,
        })
        console.log('Schema created:', result)
        setSuccessMessage(`Schema "${result.name}" created successfully!`)

        // Update current schema reference
        setCurrentSchema(apiSchemaToSchema(result))
      }

      setIsNameModalOpen(false)
    } catch (error) {
      console.error('Failed to save schema:', error)
      setErrorMessage(`Failed to save schema: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleNameChange = (newName: string) => {
    if (currentSchema) {
      setCurrentSchema({ ...currentSchema, name: newName })
    }
  }

  // Show loading state
  if (schemaId && isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading schema...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      <SchemaHeader
        schemaId={schemaId}
        schemaName={currentSchema?.name || 'Untitled'}
        onBack={onBack}
        onNameChange={handleNameChange}
      />

      <div className="flex-1 relative min-h-[600px]">
        <SchemaCanvasView
          onSchemaChange={handleSchemaChange}
          onSave={handleSave}
          isSaving={isSaving}
          schemaId={schemaId}
          showToolbar={showToolbar}
          showUndoRedo={showUndoRedo}
          showUserSettings={showUserSettings}
          showThemeToggle={showThemeToggle}
          initialTheme={initialTheme}
          initialTables={currentTables}
          initialForeignKeys={currentForeignKeys}
        />
      </div>

      {/* Schema Name Modal for new schemas */}
      <SchemaNameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onConfirm={performSave}
        defaultName="Untitled"
        title="Create Schema"
        description="Enter a name for your new schema"
        isLoading={isSaving}
      />

      {/* No Tables Warning */}
      <ConfirmationDialog
        open={isNoTablesModalOpen}
        onOpenChange={setIsNoTablesModalOpen}
        onConfirm={() => setIsNoTablesModalOpen(false)}
        title="Cannot Save Empty Schema"
        description="Please add at least one table before saving your schema."
        confirmText="OK"
        variant="default"
      />

      {/* Success Message */}
      {successMessage && (
        <ConfirmationDialog
          open={!!successMessage}
          onOpenChange={() => setSuccessMessage('')}
          onConfirm={() => setSuccessMessage('')}
          title="Success"
          description={successMessage}
          confirmText="OK"
          variant="default"
        />
      )}

      {/* Error Message */}
      {errorMessage && (
        <ConfirmationDialog
          open={!!errorMessage}
          onOpenChange={() => setErrorMessage('')}
          onConfirm={() => setErrorMessage('')}
          title="Error"
          description={errorMessage}
          confirmText="OK"
          variant="destructive"
        />
      )}
    </div>
  )
} 