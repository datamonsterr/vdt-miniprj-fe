import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useDeleteSchema, useGetSchemas } from '@/hooks/api/useSchemas'
import { AlertTriangle, Calendar, Database, Layers, Plus, Presentation, Trash2 } from 'lucide-react'
import { useState } from 'react'

import type { ApiSchemaListItem } from '@/types/api'
import { View } from '../types'

export function DashboardMainView({ 
  onNavigate, 
  showDemo, 
  onSchemaSelect,
}: { 
  onNavigate: (view: View) => void
  showDemo: boolean
  showViewDatabases: boolean
  onSchemaSelect?: (schemaId: string) => void
}) {
  const { schemas, isLoading, error, refresh } = useGetSchemas()
  const { deleteSchema } = useDeleteSchema()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    schema: ApiSchemaListItem | null
  }>({
    isOpen: false,
    schema: null,
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDeleteClick = (schema: ApiSchemaListItem) => {
    setDeleteConfirm({
      isOpen: true,
      schema,
    })
  }

  const handleDeleteConfirm = async () => {
    const schema = deleteConfirm.schema
    if (!schema) return

    setDeletingId(schema.id)
    setDeleteConfirm({ isOpen: false, schema: null })
    
    try {
      await deleteSchema(schema.id)
      setSuccessMessage(`Schema "${schema.name}" deleted successfully`)
      refresh()
    } catch (error) {
      console.error('Failed to delete schema:', error)
      setErrorMessage(`Failed to delete schema: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setDeletingId(null)
    }
  }

  const handleSchemaClick = (schema: ApiSchemaListItem) => {
    if (onSchemaSelect) {
      onSchemaSelect(schema.id)
    }
    onNavigate(View.SCHEMA_BUILDER)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Visual Database Design Tool</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Schema Builder Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate(View.SCHEMA_BUILDER)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Schema Builder
            </CardTitle>
            <CardDescription>
              Create and design database schemas with our visual drag-and-drop interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
              <Button className="w-full" size="sm" onClick={(e) => {
                e.stopPropagation()
                onNavigate(View.SCHEMA_BUILDER)
              }}>
                <Plus className="mr-2 h-4 w-4" />
              Create New Schema
                </Button>
          </CardContent>
        </Card>

        {/* Demo Card */}
        {showDemo && (
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate(View.DEMO)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Presentation className="h-5 w-5 text-secondary" />
                Demo & Examples
              </CardTitle>
              <CardDescription>
                Explore sample schemas and see the tool in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary" 
                className="w-full" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate(View.DEMO)
                }}
              >
                <Presentation className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Future Features Placeholder */}
        <Card className="hover:shadow-lg transition-shadow opacity-60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-muted-foreground" />
              More Features
            </CardTitle>
            <CardDescription>
              Additional tools and features will be added here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" size="sm" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Your Schemas Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Schemas</h3>
          <Button size="sm" onClick={() => refresh()}>
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load schemas: {error instanceof Error ? error.message : 'Unknown error'}
            </AlertDescription>
          </Alert>
        ) : schemas.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Database className="h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium mb-2">No schemas yet</h4>
              <p className="text-muted-foreground mb-4">
                Create your first database schema to get started
              </p>
              <Button onClick={() => onNavigate(View.SCHEMA_BUILDER)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Schema
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemas.map((schema) => (
              <Card 
                key={schema.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleSchemaClick(schema)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base flex items-center gap-2 truncate">
                        <Database className="h-4 w-4 text-primary flex-shrink-0" />
                        {schema.name}
                      </CardTitle>
                      {schema.description && (
                        <CardDescription className="text-sm mt-1 line-clamp-2">
                          {schema.description}
                        </CardDescription>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(schema)
                      }}
                      disabled={deletingId === schema.id}
                    >
                      {deletingId === schema.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      ) : (
                        <Trash2 className="h-4 w-4 text-destructive" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      {schema.tableCount} tables
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(schema.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      schema.status === 'created' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {schema.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      v{schema.version}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirm.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteConfirm({ isOpen: false, schema: null })
          }
        }}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        description={`Are you sure you want to delete "${deleteConfirm.schema?.name}"? This action cannot be undone and will also drop the database.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
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