export type DashboardView = 'home' | 'dashboard' | 'schema-builder' | 'demo' | 'login' | 'signup' | 'not-found'

export interface VDTDashboardProps {
  /**
   * Trigger button text (default: "Open VDT Dashboard")
   */
  buttonText?: string
  /**
   * Trigger button variant
   */
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  /**
   * Trigger button size
   */
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon'
  /**
   * Custom className for the trigger button
   */
  buttonClassName?: string
  /**
   * Whether to show demo functionality (default: true)
   */
  showDemo?: boolean
  /**
   * Whether to show view databases functionality (default: true)
   */
  showViewDatabases?: boolean
  /**
   * Callback when schema is created/modified
   */
  onSchemaChange?: (data: { tables: Table[]; foreignKeys: ForeignKey[] }) => void
  /**
   * Custom modal size
   */
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /**
   * Initial theme for the schema builder (default: light)
   */
  initialTheme?: 'light' | 'dark'
  /**
   * Initial tables to load in the schema canvas
   */
  initialTables?: Table[]
  /**
   * Initial foreign keys to load in the schema canvas
   */
  initialForeignKeys?: ForeignKey[]
  /**
   * Whether to require authentication for schema builder (default: true)
   */
  requireAuthForSchemaBuilder?: boolean
  /**
   * Initial view to show when opened (default: 'home')
   */
  initialView?: DashboardView
  /**
   * Whether to show navigation bar (default: true)
   */
  showNavigation?: boolean
}

import type { Table, ForeignKey } from '@/types/database' 