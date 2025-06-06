import React, { useState, useCallback } from 'react'
import { SchemaCanvas } from '@/components/schema-builder/SchemaCanvas'
import type { Table, ForeignKey } from '@/types/database'
import { SQLDataType } from '@/types/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Demo() {
  const [schemaData, setSchemaData] = useState<{ tables: Table[]; foreignKeys: ForeignKey[] }>({
    tables: [],
    foreignKeys: []
  })

  // Sample data for demo
  const sampleTables: Table[] = [
    {
      id: 'users_table',
      name: 'users',
      columns: [
        {
          id: 'user_id',
          name: 'id',
          dataType: SQLDataType.INT,
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
        },
        {
          id: 'user_email',
          name: 'email',
          dataType: SQLDataType.VARCHAR,
          length: 255,
          nullable: false,
          primaryKey: false,
          autoIncrement: false,
        },
      ],
      position: { x: 100, y: 100 },
    },
    {
      id: 'posts_table',
      name: 'posts',
      columns: [
        {
          id: 'post_id',
          name: 'id',
          dataType: SQLDataType.INT,
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
        },
        {
          id: 'post_user_id',
          name: 'user_id',
          dataType: SQLDataType.INT,
          nullable: false,
          primaryKey: false,
          autoIncrement: false,
        },
      ],
      position: { x: 400, y: 100 },
    },
  ]

  const sampleForeignKeys: ForeignKey[] = [
    {
      id: 'fk_posts_users',
      sourceTableId: 'posts_table',
      sourceColumnId: 'post_user_id',
      targetTableId: 'users_table',
      targetColumnId: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  ]

  const handleSchemaChange = useCallback((data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    setSchemaData(data)
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">SchemaCanvas Demo</h1>
          <p className="text-xl text-muted-foreground">
            Embeddable Database Schema Builder Component
          </p>
          <div className="flex justify-center gap-2 text-sm">
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">React Component</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">TypeScript</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">Drag & Drop</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">Canvas Panning</span>
          </div>
        </div>

        {/* Full Featured Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Full-Featured Schema Builder</CardTitle>
            <CardDescription>
              Complete schema builder with floating toolbars and all features enabled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] border rounded-lg overflow-hidden bg-white">
              <SchemaCanvas 
                onSchemaChange={handleSchemaChange}
                showToolbar={true}
                showUndoRedo={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Embedded View */}
          <Card>
            <CardHeader>
              <CardTitle>Embedded View (with sample data)</CardTitle>
              <CardDescription>
                Smaller embedded canvas with pre-loaded sample data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg overflow-hidden bg-white">
                <SchemaCanvas 
                  onSchemaChange={handleSchemaChange}
                  showToolbar={true}
                  showUndoRedo={false}
                  initialTables={sampleTables}
                  initialForeignKeys={sampleForeignKeys}
                />
              </div>
            </CardContent>
          </Card>

          {/* Live Data */}
          <Card>
            <CardHeader>
              <CardTitle>Live Schema Data</CardTitle>
              <CardDescription>
                Real-time updates from the schema builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Tables: {schemaData.tables.length}</h4>
                  <ul className="text-sm text-muted-foreground max-h-32 overflow-y-auto">
                    {schemaData.tables.map(table => (
                      <li key={table.id}>• {table.name} ({table.columns.length} columns)</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Foreign Keys: {schemaData.foreignKeys.length}</h4>
                  <ul className="text-sm text-muted-foreground">
                    {schemaData.foreignKeys.map(fk => (
                      <li key={fk.id}>• {fk.sourceTableId} → {fk.targetTableId}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h5 className="font-mono text-sm mb-2">Usage Example:</h5>
                  <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
{`<SchemaCanvas 
  onSchemaChange={handleChange}
  showToolbar={true}
  showUndoRedo={true}
  initialTables={tables}
  initialForeignKeys={foreignKeys}
/>`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Minimal View */}
        <Card>
          <CardHeader>
            <CardTitle>Minimal Schema Canvas (No Toolbars)</CardTitle>
            <CardDescription>
              Canvas without toolbars - perfect for embedding in your own UI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] border rounded-lg overflow-hidden bg-white">
              <SchemaCanvas 
                onSchemaChange={handleSchemaChange}
                showToolbar={false}
                showUndoRedo={false}
                initialTables={sampleTables}
                initialForeignKeys={sampleForeignKeys}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 