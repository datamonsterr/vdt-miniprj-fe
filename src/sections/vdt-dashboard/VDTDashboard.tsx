import { VDT_CLERK_PUBLISHABLE_KEY } from '@/common'
import { ErrorFallback } from '@/components/ErrorFallback'
import { AuthProvider } from '@/contexts/auth'
import { ThemeProvider } from '@/contexts/theme'
import type { ForeignKey, Table } from '@/types/database'
import { ClerkProvider } from '@clerk/clerk-react'
import { useState } from 'react'
import { DashboardContent } from './components/DashboardContent'
import Navbar from './components/Navbar'
import { View, type VDTDashboardProps } from './types'

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
  showDemo = true,
  showViewDatabases = true,
  onSchemaChange,
  initialTheme = "light",
  initialTables = [],
  initialForeignKeys = [],
  requireAuthForSchemaBuilder = false,
}: VDTDashboardProps) {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD)
  const [error, setError] = useState<Error | null>(null)
  const [selectedSchemaId, setSelectedSchemaId] = useState<string | undefined>(undefined)

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    setError(null)
  }

  const handleSchemaChange = (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
    if (onSchemaChange) {
      onSchemaChange(data)
    }
  }

  const handleSchemaSelect = (schemaId: string) => {
    setSelectedSchemaId(schemaId)
  }

  if (error) {
    return (
      <ErrorFallback
        error={error}
        resetError={() => setError(null)}
      />
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background h-screen w-screen">
        <ThemeProvider>
          <ClerkProvider publishableKey={VDT_CLERK_PUBLISHABLE_KEY}>
            <AuthProvider>
              <div className="flex flex-col h-full">
                {currentView !== View.DASHBOARD && <Navbar handleNavigate={handleNavigate} />}

                <div className="flex-1 overflow-auto">
                  <DashboardContent
                    currentView={currentView}
                    onNavigate={handleNavigate}
                    onSchemaChange={handleSchemaChange}
                    onSchemaSelect={handleSchemaSelect}
                    selectedSchemaId={selectedSchemaId}
                    showDemo={showDemo}
                    showViewDatabases={showViewDatabases}
                    initialTheme={initialTheme}
                    initialTables={initialTables}
                    initialForeignKeys={initialForeignKeys}
                    requireAuthForSchemaBuilder={requireAuthForSchemaBuilder}
                  />
                </div>
              </div>
            </AuthProvider>
          </ClerkProvider>
        </ThemeProvider>
      </div>
    </>
  )
} 