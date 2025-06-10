import {
  createSchema,
  deleteSchema,
  exportSchemaSQL,
  getSchemaById,
  getSchemas,
  updateSchema,
  validateSchema,
} from '@/api/schemas'
import { useAuth } from '@/contexts/auth'
import type { ApiSchemaListItem, CreateSchemaRequest } from '@/types/api'
import useSWR, { useSWRConfig } from 'swr'

// Hook for getting all schemas
export function useGetSchemas(params?: {
  page?: number
  limit?: number
  search?: string
}) {
  const { getToken, isSignedIn } = useAuth()
  
  const { data, error, isLoading, mutate } = useSWR<ApiSchemaListItem[]>(
    isSignedIn ? ['schemas', params] : null,
    () => getSchemas(getToken, params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )
  
  return {
    schemas: data || [],
    isLoading,
    error,
    refresh: mutate,
  }
}

// Hook for getting schema by ID
export function useGetSchemaById(id: string | null) {
  const { getToken, isSignedIn } = useAuth()
  
  const { data, error, isLoading, mutate } = useSWR(
    isSignedIn && id ? ['schema', id] : null,
    () => getSchemaById(getToken, id!),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  )

  return {
    schema: data,
    isLoading,
    error,
    refresh: mutate,
  }
}

// Hook for creating schema
export function useCreateSchema() {
  const { getToken } = useAuth()
  const { mutate } = useSWRConfig()

  const createSchemaFn = async (schemaData: CreateSchemaRequest) => {
    const result = await createSchema(getToken, schemaData)
    // Invalidate schemas list to refresh
    await mutate(['schemas'])
    return result
  }

  return {
    createSchema: createSchemaFn,
  }
}

// Hook for updating schema
export function useUpdateSchema() {
  const { getToken } = useAuth()
  const { mutate } = useSWRConfig()

  const updateSchemaFn = async (id: string, schemaData: CreateSchemaRequest) => {
    const result = await updateSchema(getToken, id, schemaData)
    // Invalidate both specific schema and schemas list
    await Promise.all([
      mutate(['schema', id]),
      mutate(['schemas']),
    ])
    return result
  }

  return {
    updateSchema: updateSchemaFn,
  }
}

// Hook for deleting schema
export function useDeleteSchema() {
  const { getToken } = useAuth()
  const { mutate } = useSWRConfig()

  const deleteSchemaFn = async (id: string, dropDatabase = true) => {
    const result = await deleteSchema(getToken, id, dropDatabase)
    // Invalidate schemas list to refresh
    await mutate(['schemas'])
    return result
  }

  return {
    deleteSchema: deleteSchemaFn,
  }
}

// Hook for validating schema
export function useValidateSchema() {
  const { getToken } = useAuth()

  const validateSchemaFn = async (schemaData: CreateSchemaRequest) => {
    return await validateSchema(getToken, schemaData)
  }

  return {
    validateSchema: validateSchemaFn,
  }
}

// Hook for exporting schema as SQL
export function useExportSchemaSQL() {
  const { getToken } = useAuth()

  const exportSchemaFn = async (id: string) => {
    return await exportSchemaSQL(getToken, id)
  }

  return {
    exportSchemaSQL: exportSchemaFn,
  }
}

// Hook for renaming schema
export function useRenameSchema() {
  const { getToken } = useAuth()
  const { mutate } = useSWRConfig()

  const renameSchemaFn = async (id: string, newName: string) => {
    // First get the current schema to preserve its data
    const currentSchema = await getSchemaById(getToken, id)
    
    // Update only the name while preserving all other data
    const result = await updateSchema(getToken, id, {
      name: newName,
      description: currentSchema.description,
      tables: currentSchema.tables,
      foreignKeys: currentSchema.foreignKeys || [],
    })
    
    // Invalidate both specific schema and schemas list
    await Promise.all([
      mutate(['schema', id]),
      mutate(['schemas']),
    ])
    
    return result
  }

  return {
    renameSchema: renameSchemaFn,
  }
} 