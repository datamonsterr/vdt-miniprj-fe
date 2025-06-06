import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserSettings } from '@/components/auth/UserSettings'
import { Database, Eye, Presentation, Plus } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold">VDT Dashboard</h1>
            <p className="text-sm text-muted-foreground">Visual Database Design Tool</p>
          </div>
          <UserSettings />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Schema Builder Card */}
          <Card className="hover:shadow-lg transition-shadow">
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
                <Link to="/schema-builder">
                  <Button className="w-full" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Database Schema
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" size="sm" disabled>
                  <Eye className="mr-2 h-4 w-4" />
                  View Created Databases
                  <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Demo Card */}
          <Card className="hover:shadow-lg transition-shadow">
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
              <Link to="/demo">
                <Button variant="secondary" className="w-full" size="sm">
                  <Presentation className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
              </Link>
            </CardContent>
          </Card>

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

        {/* Quick Actions Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/schema-builder">
              <Button size="sm">
                <Database className="mr-2 h-4 w-4" />
                New Schema
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="sm">
                <Presentation className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
          <p className="text-muted-foreground mb-4">
            Welcome to VDT! Start by creating your first database schema or explore our demo to see what's possible.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Click "Create Database Schema" to start designing your database</p>
            <p>• Use the demo to see sample schemas and learn the interface</p>
            <p>• Drag and drop tables, create relationships, and export your schema</p>
          </div>
        </div>
      </main>
    </div>
  )
} 