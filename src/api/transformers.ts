import type { 
  ApiSchema, 
  ApiTable, 
  ApiColumn, 
  ApiForeignKey,
  CreateSchemaRequest 
} from '@/types/api'
import type { 
  DatabaseSchema, 
  Table, 
  Column, 
  ForeignKey,
  SQLDataType 
} from '@/types/database'

// Convert API column to frontend column
export function apiColumnToColumn(apiColumn: ApiColumn): Column {
  return {
    id: apiColumn.id,
    name: apiColumn.name,
    dataType: apiColumn.dataType as SQLDataType,
    length: apiColumn.length,
    nullable: apiColumn.nullable,
    primaryKey: apiColumn.primaryKey,
    autoIncrement: apiColumn.autoIncrement,
    defaultValue: apiColumn.defaultValue,
  }
}

// Convert frontend column to API column
export function columnToApiColumn(column: Column): ApiColumn {
  return {
    id: column.id.toString(),
    name: column.name,
    dataType: column.dataType,
    length: column.length,
    nullable: column.nullable,
    primaryKey: column.primaryKey,
    autoIncrement: column.autoIncrement,
    unique: false, // Could be enhanced later
    defaultValue: column.defaultValue,
  }
}

// Convert API table to frontend table
export function apiTableToTable(apiTable: ApiTable): Table {
  return {
    id: apiTable.id,
    name: apiTable.name,
    columns: apiTable.columns.map(apiColumnToColumn),
    position: apiTable.position,
  }
}

// Convert frontend table to API table
export function tableToApiTable(table: Table): ApiTable {
  return {
    id: table.id.toString(),
    name: table.name,
    columns: table.columns.map(columnToApiColumn),
    position: table.position,
  }
}

// Convert API foreign key to frontend foreign key
export function apiForeignKeyToForeignKey(apiFk: ApiForeignKey): ForeignKey {
  return {
    id: apiFk.id,
    sourceTableId: apiFk.sourceTableId,
    sourceColumnId: apiFk.sourceColumnId,
    targetTableId: apiFk.targetTableId,
    targetColumnId: apiFk.targetColumnId,
    onDelete: apiFk.onDelete || 'CASCADE',
    onUpdate: apiFk.onUpdate || 'CASCADE',
  }
}

// Convert frontend foreign key to API foreign key
export function foreignKeyToApiForeignKey(fk: ForeignKey): ApiForeignKey {
  return {
    id: fk.id.toString(),
    sourceTableId: fk.sourceTableId.toString(),
    sourceColumnId: fk.sourceColumnId.toString(),
    targetTableId: fk.targetTableId.toString(),
    targetColumnId: fk.targetColumnId.toString(),
    onDelete: fk.onDelete,
    onUpdate: fk.onUpdate,
  }
}

// Convert API schema to frontend database schema
export function apiSchemaToSchema(apiSchema: ApiSchema): DatabaseSchema {
  return {
    id: apiSchema.id,
    name: apiSchema.name,
    tables: (apiSchema.tables || []).map(apiTableToTable),
    foreignKeys: (apiSchema.foreignKeys || []).map(apiForeignKeyToForeignKey),
    createdAt: new Date(apiSchema.createdAt),
    updatedAt: new Date(apiSchema.updatedAt),
  }
}

// Convert frontend database schema to API create request
export function schemaToCreateRequest(schema: DatabaseSchema): CreateSchemaRequest {
  return {
    name: schema.name,
    tables: (schema.tables || []).map(tableToApiTable),
    foreignKeys: (schema.foreignKeys || []).map(foreignKeyToApiForeignKey),
  }
} 