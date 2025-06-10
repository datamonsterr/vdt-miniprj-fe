// API Response wrapper type
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T | null
  error?: {
    code: string
    details: string
  }
}

// Pagination type
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// API Schema types (matching backend format)
export interface ApiColumn {
  id: string
  name: string
  dataType: string
  length?: number
  nullable: boolean
  primaryKey: boolean
  autoIncrement: boolean
  unique?: boolean
  defaultValue?: string
}

export interface ApiTable {
  id: string
  name: string
  columns: ApiColumn[]
  position: { x: number; y: number }
}

export interface ApiForeignKey {
  id: string
  sourceTableId: string
  sourceColumnId: string
  targetTableId: string
  targetColumnId: string
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION'
  onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION'
}

// Schema list item (for GET /schemas)
export interface ApiSchemaListItem {
  id: string
  name: string
  description?: string
  databaseName: string
  status: string
  tableCount: number
  createdAt: string
  updatedAt: string
  version: string
}

// Full schema (for GET /schemas/{id})
export interface ApiSchema {
  id: string
  name: string
  description?: string
  databaseName: string
  status: string
  tables: ApiTable[]
  foreignKeys?: ApiForeignKey[]
  createdAt: string
  updatedAt: string
  version: string
}

// Schema creation/update request
export interface CreateSchemaRequest {
  name: string
  description?: string
  tables: ApiTable[]
  foreignKeys?: ApiForeignKey[]
}

// Schema list response
export interface SchemasResponse {
  data: ApiSchemaListItem[]
  pagination: Pagination
}

// Delete schema response
export interface DeleteSchemaResponse {
  id: string
  databaseDropped: boolean
} 