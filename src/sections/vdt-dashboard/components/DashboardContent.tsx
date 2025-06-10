import type { ForeignKey, Table } from '@/types/database'
import { View } from '../types'
import { DashboardMainView } from '../views/DashboardMainView'
import { DemoView } from '../views/DemoView'
import { LoginView } from '../views/LoginView'
import { NotFoundView } from '../views/NotFoundView'
import { SchemaBuilderWrapper } from './SchemaBuilderWrapper'
import { SignUpView } from '../views/SignUpView'
import { ProtectedView } from '../views/ProtectedView'
import { UserProfileView } from '@/sections/user-profile'
import { useCallback } from 'react'

interface DashboardContentProps {
  currentView: View
  onNavigate: (view: View) => void
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  onSchemaSelect?: (schemaId: string) => void
  selectedSchemaId?: string
  showDemo: boolean
  showViewDatabases: boolean
  initialTheme: 'light' | 'dark'
  initialTables: Table[]
  initialForeignKeys: ForeignKey[]
  requireAuthForSchemaBuilder: boolean
}

export function DashboardContent({
  currentView,
  onNavigate,
  onSchemaChange,
  onSchemaSelect,
  selectedSchemaId,
  showDemo,
  showViewDatabases,
  initialTheme,
  initialTables,
  initialForeignKeys,
  requireAuthForSchemaBuilder
}: DashboardContentProps) {
  const handleBack = useCallback(
    () => onNavigate(View.DASHBOARD),
    []
  )
  switch (currentView) {
    case 'dashboard':
      return (
        <ProtectedView fallbackView={View.LOGIN}>
          <DashboardMainView 
            onNavigate={onNavigate} 
            showDemo={showDemo} 
            showViewDatabases={showViewDatabases} 
            onSchemaSelect={onSchemaSelect}
          />
        </ProtectedView>
      )
    case 'schema-builder':
      return requireAuthForSchemaBuilder ? (
        <ProtectedView fallbackView={View.LOGIN}>
          <SchemaBuilderWrapper
            onBack={handleBack}
            schemaId={selectedSchemaId}
            onSchemaChange={onSchemaChange}
            initialTheme={initialTheme}
            initialTables={initialTables}
            initialForeignKeys={initialForeignKeys}
          />
        </ProtectedView>
      ) : (
        <SchemaBuilderWrapper
          onBack={handleBack}
          schemaId={selectedSchemaId}
          onSchemaChange={onSchemaChange}
          initialTheme={initialTheme}
          initialTables={initialTables}
          initialForeignKeys={initialForeignKeys}
        />
      )
    case 'demo':
      return <DemoView onNavigate={onNavigate} />
    case 'login':
      return <LoginView />
    case 'signup':
      return <SignUpView />
    case 'user-profile':
      return (
        <ProtectedView fallbackView={View.LOGIN}>
          <UserProfileView onBack={handleBack} />
        </ProtectedView>
      )
    case 'not-found':
      return <NotFoundView onNavigate={onNavigate} />
    default:
      return <NotFoundView onNavigate={onNavigate} />
  }
} 