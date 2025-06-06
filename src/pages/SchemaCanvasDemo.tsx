import React, { useState } from 'react'
import { SchemaCanvas } from '@/components/schema-builder/SchemaCanvas'
import type { Table, ForeignKey } from '@/types/database'
import { SQLDataType } from '@/types/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function SchemaCanvasDemo() {
  const [schemaData, setSchemaData] = useState<{ tables: Table[]; foreignKeys: ForeignKey[] }>({
    tables: [],
    foreignKeys: []
  })

  // Sample initial data for demo
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
        {
          id: 'user_name',
          name: 'name',
          dataType: SQLDataType.VARCHAR,
          length: 100,
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
          id: 'post_title',
          name: 'title',
          dataType: SQLDataType.VARCHAR,
          length: 255,
          nullable: false,
          primaryKey: false,
          autoIncrement: false,
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

  const handleSchemaChange = (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    setSchemaData(data)
  }

  const loadSampleData = () => {
    // The sample data will be loaded via the initialTables prop
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">SchemaCanvas Demo</h1>
          <p className="text-xl text-muted-foreground">
            Embeddable Database Schema Builder Component
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">React Component</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Drag & Drop</Badge>
            <Badge variant="secondary">Undo/Redo</Badge>
          </div>
        </div>

        {/* Tabs for different demo scenarios */}
        <Tabs defaultValue="full-featured" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="full-featured">Full Featured</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
            <TabsTrigger value="embedded">Embedded View</TabsTrigger>
            <TabsTrigger value="integration">Integration Code</TabsTrigger>
          </TabsList>

          {/* Full Featured Demo */}
          <TabsContent value="full-featured" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Full-Featured Schema Builder</CardTitle>
                <CardDescription>
                  Complete schema builder with all tools, undo/redo, and floating toolbars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] border rounded-lg overflow-hidden">
                  <SchemaCanvas 
                    onSchemaChange={handleSchemaChange}
                    showToolbar={true}
                    showUndoRedo={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Minimal Demo */}
          <TabsContent value="minimal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minimal Schema Canvas</CardTitle>
                <CardDescription>
                  Schema canvas without toolbars - controlled externally
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] border rounded-lg overflow-hidden">
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
          </TabsContent>

          {/* Embedded View Demo */}
          <TabsContent value="embedded" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compact View</CardTitle>
                  <CardDescription>
                    Smaller embedded schema view
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] border rounded-lg overflow-hidden">
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

              <Card>
                <CardHeader>
                  <CardTitle>Live Schema Data</CardTitle>
                  <CardDescription>
                    Real-time schema data updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Tables: {schemaData.tables.length}</h4>
                      <ul className="text-sm text-muted-foreground">
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
            </div>
          </TabsContent>

          {/* Integration Code */}
          <TabsContent value="integration" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>React Integration</CardTitle>
                  <CardDescription>
                    How to use in React applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`import { SchemaCanvas } from '@/components/schema-builder/SchemaCanvas'

function MyApp() {
  const handleSchemaChange = (data) => {
    console.log('Schema updated:', data)
    // Save to backend, update state, etc.
  }

  return (
    <div className="h-screen">
      <SchemaCanvas 
        onSchemaChange={handleSchemaChange}
        showToolbar={true}
        showUndoRedo={true}
        initialTables={existingTables}
        initialForeignKeys={existingFKs}
      />
    </div>
  )
}`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HTML/JavaScript Integration</CardTitle>
                  <CardDescription>
                    Example for vanilla HTML/JS projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
{`<!DOCTYPE html>
<html>
<head>
  <title>Schema Builder</title>
</head>
<body>
  <div id="schema-canvas" style="height: 100vh;"></div>
  
  <script type="module">
    import { SchemaCanvas } from './schema-canvas.js'
    
    // Mount the component
    ReactDOM.render(
      React.createElement(SchemaCanvas, {
        onSchemaChange: (data) => {
          console.log('Schema changed:', data)
        },
        showToolbar: true,
        showUndoRedo: true
      }),
      document.getElementById('schema-canvas')
    )
  </script>
</body>
</html>`}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Component Props</CardTitle>
                <CardDescription>
                  Available configuration options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Prop</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Default</th>
                        <th className="text-left p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-mono">initialTables</td>
                        <td className="p-2">Table[]</td>
                        <td className="p-2">[]</td>
                        <td className="p-2">Pre-populate with existing tables</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">initialForeignKeys</td>
                        <td className="p-2">ForeignKey[]</td>
                        <td className="p-2">[]</td>
                        <td className="p-2">Pre-populate with existing relationships</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">onSchemaChange</td>
                        <td className="p-2">Function</td>
                        <td className="p-2">undefined</td>
                        <td className="p-2">Callback when schema data changes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">showToolbar</td>
                        <td className="p-2">boolean</td>
                        <td className="p-2">true</td>
                        <td className="p-2">Show floating toolbar</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">showUndoRedo</td>
                        <td className="p-2">boolean</td>
                        <td className="p-2">true</td>
                        <td className="p-2">Show undo/redo controls</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">className</td>
                        <td className="p-2">string</td>
                        <td className="p-2">""</td>
                        <td className="p-2">Additional CSS classes</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono">style</td>
                        <td className="p-2">CSSProperties</td>
                        <td className="p-2">{}</td>
                        <td className="p-2">Inline styles</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 