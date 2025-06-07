import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Database, Home, LogIn, Presentation, UserPlus } from 'lucide-react'
import { useAuth } from '@/contexts/auth'
import type { DashboardView } from '../types'

export function DashboardNavigation({ 
  currentView, 
  onNavigate
}: { 
  currentView: DashboardView
  onNavigate: (view: DashboardView) => void
}) {
  const { isSignedIn } = useAuth()

  const navItems = [
    { view: 'home' as const, label: 'Home', icon: Home },
    ...(isSignedIn ? [
      { view: 'dashboard' as const, label: 'Dashboard', icon: Database },
      { view: 'schema-builder' as const, label: 'Schema Builder', icon: Database }
    ] : []),
    { view: 'demo' as const, label: 'Demo', icon: Presentation }
  ]

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">VDT Dashboard</h1>
        <nav className="flex space-x-2">
          {navItems.map(({ view, label, icon: Icon }) => (
            <Button
              key={view}
              variant={currentView === view ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate(view)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center space-x-2">
        <SignedOut>
          <Button size="sm" onClick={() => onNavigate('login')}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button variant="outline" size="sm" onClick={() => onNavigate('signup')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="#" />
        </SignedIn>
      </div>
    </div>
  )
} 