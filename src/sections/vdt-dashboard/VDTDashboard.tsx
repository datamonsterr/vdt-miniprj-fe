import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ErrorFallback } from '@/components/ErrorFallback'
import { X } from 'lucide-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from '@/contexts/theme'
import { InternalAuthProvider, VDT_CLERK_PUBLISHABLE_KEY } from './auth-context'
import { DashboardNavigation } from './components/DashboardNavigation'
import { DashboardContent } from './components/DashboardContent'
import type { VDTDashboardProps, DashboardView } from './types'
import type { Table, ForeignKey } from '@/types/database'

/**
 * VDTDashboard - A complete, self-contained VDT dashboard component 
 * that can be embedded in any React application
 * 
 * This component provides:
 * - All necessary context providers (Clerk, theme, auth) internally
 * - A trigger button that opens a modal containing the full VDT dashboard
 * - Complete isolation from the host application's state management
 * - Authentication system with Clerk
 * - Schema builder with drag-and-drop functionality
 * - Undo/redo capabilities
 * - Theme management (light/dark) isolated to the dashboard
 * - Routing and navigation within the modal
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
  modalSize = "full",
  initialTheme = "light",
  initialTables = [],
  initialForeignKeys = [],
  requireAuthForSchemaBuilder = true,
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

  // Always use authentication with our Clerk key
  const effectiveRequireAuth = requireAuthForSchemaBuilder

  const renderContent = () => {
    try {
      return (
        <div className="flex flex-col h-full">
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
              requireAuthForSchemaBuilder={effectiveRequireAuth}
            />
          </div>
          {!showNavigation && (
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
          )}
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
        <InternalAuthProvider hasClerkProvider={true}>
          {renderContent()}
        </InternalAuthProvider>
      </ClerkProvider>
    </ThemeProvider>
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
          <DashboardWithProviders />
        </DialogContent>
      </Dialog>
    </>
  )
} 