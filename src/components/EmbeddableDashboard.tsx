import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Eye, Presentation, Plus, X } from 'lucide-react'
import { SchemaCanvas } from '@/components/schema-builder/SchemaCanvas'
import type { Table, ForeignKey } from '@/types/database'

export interface EmbeddableDashboardProps {
  /**
   * Trigger button text (default: "Open VDT Dashboard")
   */
  buttonText?: string
  /**
   * Trigger button variant
   */
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  /**
   * Trigger button size
   */
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon'
  /**
   * Custom className for the trigger button
   */
  buttonClassName?: string
  /**
   * Whether to show demo functionality (default: true)
   */
  showDemo?: boolean
  /**
   * Whether to show view databases functionality (default: true)
   */
  showViewDatabases?: boolean
  /**
   * Callback when schema is created/modified
   */
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  /**
   * Custom modal size
   */
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * EmbeddableDashboard - A complete dashboard component that can be embedded in any React application
 * 
 * This component provides a trigger button that opens a modal containing the full VDT dashboard.
 * It's designed to be easily integrated into existing applications as a library component.
 * 
 * @example
 * ```tsx
 * <EmbeddableDashboard 
 *   buttonText="Design Database" 
 *   buttonVariant="outline"
 *   onSchemaChange={(data) => console.log('Schema changed:', data)}
 * />
 * ```
 */
export function EmbeddableDashboard({
  buttonText = "Open VDT Dashboard",
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName = "",
  showDemo = true,
  showViewDatabases = true,
  onSchemaChange,
  modalSize = "full"
}: EmbeddableDashboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'dashboard' | 'schema-builder' | 'demo'>('dashboard')

  const getModalClassName = () => {
    switch (modalSize) {
      case 'sm': return 'max-w-md'
      case 'md': return 'max-w-2xl'
      case 'lg': return 'max-w-4xl'
      case 'xl': return 'max-w-6xl'
      case 'full': return 'max-w-[95vw] h-[95vh]'
      default: return 'max-w-4xl'
    }
  }

  const handleSchemaChange = (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    if (onSchemaChange) {
      onSchemaChange(data)
    }
  }

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">VDT Dashboard</h2>
          <p className="text-sm text-muted-foreground">Visual Database Design Tool</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Schema Builder Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('schema-builder')}>
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
                setCurrentView('schema-builder')
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
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('demo')}>
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
                  setCurrentView('demo')
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
          <Button size="sm" onClick={() => setCurrentView('schema-builder')}>
            <Database className="mr-2 h-4 w-4" />
            New Schema
          </Button>
          {showDemo && (
            <Button variant="outline" size="sm" onClick={() => setCurrentView('demo')}>
              <Presentation className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  const renderSchemaBuilder = () => (
    <div className="relative h-full">
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentView('dashboard')}
        >
          ← Back to Dashboard
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <SchemaCanvas 
        onSchemaChange={handleSchemaChange}
        showToolbar={true}
        showUndoRedo={true}
        showUserSettings={false}
        className="h-full"
      />
    </div>
  )

  const renderDemo = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('dashboard')}
          >
            ← Back to Dashboard
          </Button>
          <h2 className="text-xl font-semibold">Demo & Examples</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-center py-8">
        <p className="text-muted-foreground">Demo content coming soon...</p>
        <p className="text-sm text-muted-foreground mt-2">
          This will showcase example database schemas and tutorials.
        </p>
      </div>
    </div>
  )

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        className={buttonClassName}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`${getModalClassName()} p-0`} showCloseButton={false}>
          {currentView === 'dashboard' && renderDashboard()}
          {currentView === 'schema-builder' && renderSchemaBuilder()}
          {currentView === 'demo' && renderDemo()}
        </DialogContent>
      </Dialog>
    </>
  )
} 