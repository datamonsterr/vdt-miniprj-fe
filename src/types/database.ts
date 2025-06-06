import type { UniqueIdentifier } from '@dnd-kit/core'

// SQL Data Types
export enum SQLDataType {
  VARCHAR = 'VARCHAR',
  CHAR = 'CHAR',
  TEXT = 'TEXT',
  INT = 'INT',
  BIGINT = 'BIGINT',
  SMALLINT = 'SMALLINT',
  DECIMAL = 'DECIMAL',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DATETIME = 'DATETIME',
  TIMESTAMP = 'TIMESTAMP',
  TIME = 'TIME',
  JSON = 'JSON',
  BLOB = 'BLOB',
}

// Column definition
export interface Column {
  id: UniqueIdentifier
  name: string
  dataType: SQLDataType
  length?: number
  nullable: boolean
  primaryKey: boolean
  autoIncrement: boolean
  defaultValue?: string
  description?: string
}

// Table definition
export interface Table {
  id: UniqueIdentifier
  name: string
  columns: Column[]
  position: { x: number; y: number }
  description?: string
}

// Foreign key relationship
export interface ForeignKey {
  id: UniqueIdentifier
  sourceTableId: UniqueIdentifier
  sourceColumnId: UniqueIdentifier
  targetTableId: UniqueIdentifier
  targetColumnId: UniqueIdentifier
  onDelete: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION'
  onUpdate: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION'
}

// Database schema
export interface DatabaseSchema {
  id: UniqueIdentifier
  name: string
  tables: Table[]
  foreignKeys: ForeignKey[]
  createdAt: Date
  updatedAt: Date
}

// Tool types for the schema builder
export enum ToolType {
  SELECT = 'SELECT',
  HAND = 'HAND',
  TABLE = 'TABLE',
  COLUMN = 'COLUMN',
  CONNECTION = 'CONNECTION',
}

// UI state for the schema builder
export interface SchemaBuilderState {
  selectedTool: ToolType
  selectedTableId: UniqueIdentifier | null
  selectedColumnId: UniqueIdentifier | null
  isConnecting: boolean
  connectionStart: {
    tableId: UniqueIdentifier
    columnId: UniqueIdentifier
  } | null
  canvasOffset: { x: number; y: number }
  isPanning: boolean
} 