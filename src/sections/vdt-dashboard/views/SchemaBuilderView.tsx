import { StandaloneSchemaCanvas } from '@/sections/schema-builder'
import { ProtectedView } from '../components/ProtectedView'
import type { Table, ForeignKey } from '@/types/database'
import type { DashboardView } from '../types'

export function SchemaBuilderView({ 
  onSchemaChange, 
  initialTheme, 
  initialTables, 
  initialForeignKeys,
  requireAuth = true 
}: {
  onNavigate: (view: DashboardView) => void
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  initialTheme: 'light' | 'dark'
  initialTables: Table[]
  initialForeignKeys: ForeignKey[]
  requireAuth?: boolean
}) {
  const content = (
    <div className="relative h-full">
      <StandaloneSchemaCanvas 
        onSchemaChange={onSchemaChange}
        showToolbar={true}
        showUndoRedo={true}
        showUserSettings={false}
        showThemeToggle={true}
        initialTheme={initialTheme}
        initialTables={initialTables}
        initialForeignKeys={initialForeignKeys}
        className="h-full"
      />
    </div>
  )

  if (requireAuth) {
    return (
      <ProtectedView fallbackView="login">
        {content}
      </ProtectedView>
    )
  }

  return content
} 