export enum View {
  DASHBOARD = 'dashboard',
  SCHEMA_BUILDER = 'schema-builder',
  DEMO = 'demo',
  LOGIN = 'login',
  SIGNUP = 'signup',
  USER_PROFILE = 'user-profile',
  NOT_FOUND = 'not-found'
}

export interface VDTDashboardProps {
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
}

import type { Table, ForeignKey } from '@/types/database' 