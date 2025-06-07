import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SchemaCanvasView } from '@/sections/schema-builder'
import type { Table, ForeignKey } from '@/types/database'
import type { DashboardView } from '../types'

export function DemoView({ onNavigate }: { onNavigate: (view: DashboardView) => void }) {
  const [schemaData, setSchemaData] = useState<{ tables: Table[]; foreignKeys: ForeignKey[] }>({
    tables: [],
    foreignKeys: []
  })

  const handleSchemaChange = useCallback((data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    setSchemaData(data)
  }, [])

  // Import sample data
  const sampleTables: Table[] = [
    {
      id: 'users_demo',
      name: 'users',
      columns: [
        {
          id: 'user_id_demo',
          name: 'id',
          dataType: 'INT' as any,
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
        },
        {
          id: 'user_email_demo',
          name: 'email',
          dataType: 'VARCHAR' as any,
          length: 255,
          nullable: false,
          primaryKey: false,
          autoIncrement: false,
        },
      ],
      position: { x: 100, y: 100 },
    },
    {
      id: 'posts_demo',
      name: 'posts',
      columns: [
        {
          id: 'post_id_demo',
          name: 'id',
          dataType: 'INT' as any,
          nullable: false,
          primaryKey: true,
          autoIncrement: true,
        },
        {
          id: 'post_user_id_demo',
          name: 'user_id',
          dataType: 'INT' as any,
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
      id: 'fk_posts_users_demo',
      sourceTableId: 'posts_demo',
      sourceColumnId: 'post_user_id_demo',
      targetTableId: 'users_demo',
      targetColumnId: 'user_id_demo',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Demo & Examples</h2>
        <p className="text-muted-foreground">
          Explore the VDT Schema Builder with interactive examples
        </p>
        <div className="flex justify-center gap-2 text-sm">
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">React Component</span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">TypeScript</span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">Drag & Drop</span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded">Canvas Panning</span>
        </div>
      </div>

      {/* Interactive Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Schema Builder</CardTitle>
          <CardDescription>
            Try the full-featured schema builder with sample data. Create tables, add columns, and establish relationships.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] border rounded-lg overflow-hidden bg-white">
            <SchemaCanvasView 
              onSchemaChange={handleSchemaChange}
              showToolbar={true}
              showUndoRedo={true}
              showUserSettings={false}
              showThemeToggle={true}
              initialTables={sampleTables}
              initialForeignKeys={sampleForeignKeys}
              className="h-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Live Data Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Schema Data</CardTitle>
            <CardDescription>
              Real-time updates from the schema builder above
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Example</CardTitle>
            <CardDescription>
              How to integrate this component in your React application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
{`import { VDTDashboard } from '@datamonsterr/vdt-dashboard'

<VDTDashboard 
  buttonText="Design Database"
  buttonVariant="outline"
  modalSize="full"
  onSchemaChange={(data) => {
    console.log('Tables:', data.tables)
    console.log('Foreign Keys:', data.foreignKeys)
  }}
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Try It Out */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
          <CardDescription>
            Try the schema builder yourself or view the documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => onNavigate('schema-builder')}>
              Try Schema Builder
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/datamonsterr/vdt-dashboard#readme" target="_blank" rel="noopener noreferrer">
                View Documentation
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 