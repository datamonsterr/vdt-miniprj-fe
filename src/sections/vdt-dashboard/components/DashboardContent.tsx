import type { ForeignKey, Table } from '@/types/database'
import type { DashboardView } from '../types'
import { DashboardMainView } from '../views/DashboardMainView'
import { DemoView } from '../views/DemoView'
import { HomeView } from '../views/HomeView'
import { LoginView } from '../views/LoginView'
import { NotFoundView } from '../views/NotFoundView'
import { SchemaBuilderView } from '../views/SchemaBuilderView'
import { SignUpView } from '../views/SignUpView'
import { ProtectedView } from '../views/ProtectedView'

interface DashboardContentProps {
  currentView: DashboardView
  onNavigate: (view: DashboardView) => void
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
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
  showDemo,
  showViewDatabases,
  initialTheme,
  initialTables,
  initialForeignKeys,
  requireAuthForSchemaBuilder
}: DashboardContentProps) {
  switch (currentView) {
    case 'home':
      return <HomeView onNavigate={onNavigate} />
    case 'dashboard':
      return (
        <ProtectedView fallbackView="login">
          <DashboardMainView 
            onNavigate={onNavigate} 
            showDemo={showDemo} 
            showViewDatabases={showViewDatabases} 
          />
        </ProtectedView>
      )
    case 'schema-builder':
      return (
        <SchemaBuilderView
          onNavigate={onNavigate}
          onSchemaChange={onSchemaChange}
          initialTheme={initialTheme}
          initialTables={initialTables}
          initialForeignKeys={initialForeignKeys}
          requireAuth={requireAuthForSchemaBuilder}
        />
      )
    case 'demo':
      return <DemoView onNavigate={onNavigate} />
    case 'login':
      return <LoginView />
    case 'signup':
      return <SignUpView />
    case 'not-found':
      return <NotFoundView onNavigate={onNavigate} />
    default:
      return <NotFoundView onNavigate={onNavigate} />
  }
} 