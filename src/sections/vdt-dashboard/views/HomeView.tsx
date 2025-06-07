import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Database, Presentation, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/auth'
import type { DashboardView } from '../types'

export function HomeView({ onNavigate }: { onNavigate: (view: DashboardView) => void }) {
  const { isSignedIn } = useAuth()

  // Auto-navigate to dashboard if signed in
  if (isSignedIn) {
    onNavigate('dashboard')
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-4">VDT Database Builder</h1>
        <p className="text-xl text-muted-foreground">
          Create database schemas with our visual drag-and-drop interface
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schema Builder Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('schema-builder')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Schema Builder
            </CardTitle>
            <CardDescription>
              Design database schemas with our intuitive visual interface. Create tables, columns, and relationships with ease.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={(e) => {
                e.stopPropagation()
                onNavigate('schema-builder')
              }}
            >
              <Database className="mr-2 h-4 w-4" />
              Start Building
            </Button>
          </CardContent>
        </Card>

        {/* Demo Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('demo')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Presentation className="h-6 w-6 text-secondary" />
              Interactive Demo
            </CardTitle>
            <CardDescription>
              Explore sample schemas and see how the tool works with pre-built examples and tutorials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="secondary" 
              className="w-full"
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
      </div>
      
      {/* Authentication Section */}
      <div className="border-t pt-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Get Started Today</h2>
          <p className="text-muted-foreground">
            Sign up for an account to save your schemas and access advanced features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('signup')}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 