import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Eye, Presentation, Plus } from 'lucide-react'
import type { DashboardView } from '../types'

export function DashboardMainView({ 
  onNavigate, 
  showDemo, 
  showViewDatabases 
}: { 
  onNavigate: (view: DashboardView) => void
  showDemo: boolean
  showViewDatabases: boolean
}) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Visual Database Design Tool</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Schema Builder Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('schema-builder')}>
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
            <div className="grid grid-cols-1 gap-2">
              <Button className="w-full" size="sm" onClick={(e) => {
                e.stopPropagation()
                onNavigate('schema-builder')
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Create Database Schema
              </Button>
              {showViewDatabases && (
                <Button variant="outline" className="w-full" size="sm" disabled>
                  <Eye className="mr-2 h-4 w-4" />
                  View Created Databases
                  <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demo Card */}
        {showDemo && (
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('demo')}>
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
                  onNavigate('demo')
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

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => onNavigate('schema-builder')}>
            <Database className="mr-2 h-4 w-4" />
            New Schema
          </Button>
          {showDemo && (
            <Button variant="outline" size="sm" onClick={() => onNavigate('demo')}>
              <Presentation className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 