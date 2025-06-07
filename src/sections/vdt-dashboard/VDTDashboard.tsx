import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ErrorFallback } from '@/components/ErrorFallback'
import { ArrowLeft } from 'lucide-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from '@/contexts/theme'
import { AuthProvider } from '@/contexts/auth'
import { DashboardNavigation } from './components/DashboardNavigation'
import { DashboardContent } from './components/DashboardContent'
import type { VDTDashboardProps, DashboardView } from './types'
import type { Table, ForeignKey } from '@/types/database'
import { VDT_CLERK_PUBLISHABLE_KEY } from '@/common'

/**
 * VDTDashboard - A complete, self-contained VDT dashboard component 
 * that can be embedded in any React application
 * 
 * This component provides:
 * - All necessary context providers (Clerk, theme, auth) internally
 * - A trigger button that opens a full screen overlay containing the VDT dashboard
 * - Complete isolation from the host application's state management
 * - Authentication system with Clerk
 * - Schema builder with drag-and-drop functionality
 * - Undo/redo capabilities
 * - Theme management (light/dark) isolated to the dashboard
 * - Routing and navigation within the full screen view
 * - Back button to return to the original view
 * - 404 error handling
 * - Loading states and error boundaries
 * 
 * @example
 * ```tsx
 * <VDTDashboard 
 *   buttonText="Design Database" 
 *   buttonVariant="outline"
 *   onSchemaChange={(data) => console.log('Schema changed:', data)}
 *   initialTheme="dark"
 *   requireAuthForSchemaBuilder={false}
 * />
 * ```
 */
export function VDTDashboard({
  buttonText = "Open VDT Dashboard",
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName = "",
  showDemo = true,
  showViewDatabases = true,
  onSchemaChange,
  initialTheme = "light",
  initialTables = [],
  initialForeignKeys = [],
  requireAuthForSchemaBuilder = false,
  initialView = "home",
  showNavigation = true
}: VDTDashboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentView, setCurrentView] = useState<DashboardView>(initialView)
  const [error, setError] = useState<Error | null>(null)

  // Reset view when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView(initialView)
      setError(null)
    }
  }, [isOpen, initialView])

  // Full screen overlay - modalSize is no longer needed
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNavigate = (view: DashboardView) => {
    setCurrentView(view)
    setError(null)
  }

  const handleSchemaChange = (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    if (onSchemaChange) {
      onSchemaChange(data)
    }
  }

  if (error) {
    return (
      <ErrorFallback 
        error={error} 
        resetError={() => setError(null)} 
      />
    )
  }

  const renderContent = () => {
    try {
      return (
        <div className="flex flex-col h-full">
          {/* Back button - always show when in full screen mode */}
          <div className="flex items-center p-4 border-b bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          
          {showNavigation && (
            <DashboardNavigation 
              currentView={currentView} 
              onNavigate={handleNavigate}
            />
          )}
          <div className="flex-1 overflow-auto">
            <DashboardContent
              currentView={currentView}
              onNavigate={handleNavigate}
              onSchemaChange={handleSchemaChange}
              showDemo={showDemo}
              showViewDatabases={showViewDatabases}
              initialTheme={initialTheme}
              initialTables={initialTables}
              initialForeignKeys={initialForeignKeys}
              requireAuthForSchemaBuilder={requireAuthForSchemaBuilder}
            />
          </div>
        </div>
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      return null
    }
  }

  const DashboardWithProviders = () => (
    <ThemeProvider>
      <ClerkProvider publishableKey={VDT_CLERK_PUBLISHABLE_KEY}>
        <AuthProvider>
          {renderContent()}
        </AuthProvider>
      </ClerkProvider>
    </ThemeProvider>
  )

  return (
    <>
      {!isOpen ? (
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={buttonClassName}
          onClick={() => setIsOpen(true)}
        >
          {buttonText}
        </Button>
      ) : (
        <div className="fixed inset-0 z-50 bg-background h-screen w-screen">
          <DashboardWithProviders />
        </div>
      )}
    </>
  )
} 