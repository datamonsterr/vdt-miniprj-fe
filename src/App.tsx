import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth'
import { Button } from '@/components/ui/button'
import { EmbeddableDashboard } from '@/components/EmbeddableDashboard'

function App() {
  const { isLoaded, isSignedIn } = useAuth()

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">VDT Database Builder</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Create database schemas with our visual drag-and-drop interface
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">Explore Without Account</h2>
          <nav className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button variant="secondary" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
            <EmbeddableDashboard 
              buttonText="Try Embeddable Dashboard"
              buttonVariant="outline"
              buttonClassName="w-full sm:w-auto"
              showDemo={true}
              onSchemaChange={(data) => console.log('Schema changed:', data)}
            />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default App
