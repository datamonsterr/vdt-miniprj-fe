import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useInternalAuth } from '../auth-context'
import type { DashboardView } from '../types'

export function HomeView({ onNavigate }: { onNavigate: (view: DashboardView) => void }) {
  const { isLoaded, isSignedIn } = useInternalAuth()

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (isSignedIn) {
    onNavigate('dashboard')
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">VDT Database Builder</h1>
        <p className="text-xl text-muted-foreground">
          Create database schemas with our visual drag-and-drop interface
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => onNavigate('login')}>
            Sign In
          </Button>
          <Button variant="outline" size="lg" onClick={() => onNavigate('signup')}>
            Create Account
          </Button>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-lg font-semibold mb-4">Explore Without Account</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" onClick={() => onNavigate('demo')}>
            View Demo
          </Button>
          <Button variant="outline" onClick={() => onNavigate('schema-builder')}>
            Try Schema Builder
          </Button>
        </div>
      </div>
    </div>
  )
} 