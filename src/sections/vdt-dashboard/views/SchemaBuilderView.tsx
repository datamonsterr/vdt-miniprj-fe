import { StandaloneSchemaCanvas } from '@/sections/schema-builder'
import { ProtectedView } from '../components/ProtectedView'
import { sampleTables, sampleForeignKeys } from '@/mocks/sampleData'
import type { Table, ForeignKey } from '@/types/database'
import type { DashboardView } from '../types'

export function SchemaBuilderView({ 
  onSchemaChange, 
  initialTheme, 
  initialTables, 
  initialForeignKeys,
  requireAuth = false 
}: {
  onNavigate: (view: DashboardView) => void
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  initialTheme: 'light' | 'dark'
  initialTables: Table[]
  initialForeignKeys: ForeignKey[]
  requireAuth?: boolean
}) {
  const content = (
    <div className="relative h-full w-full min-h-[600px]">
      <StandaloneSchemaCanvas 
        onSchemaChange={onSchemaChange}
        showToolbar={true}
        showUndoRedo={true}
        showUserSettings={false}
        showThemeToggle={true}
        initialTheme={initialTheme}
        initialTables={initialTables.length > 0 ? initialTables : sampleTables}
        initialForeignKeys={initialForeignKeys.length > 0 ? initialForeignKeys : sampleForeignKeys}
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