import { apiClient, endpoints } from './axios'
import type {
  ApiResponse,
  ApiSchema,
  ApiSchemaListItem,
  CreateSchemaRequest,
  DeleteSchemaResponse,
} from '@/types/api'

// Helper function to add auth header
const getAuthHeaders = async (getToken: () => Promise<string | null>) => {
  try {
    const token = await getToken()
    
    if (!token) {
      console.warn('⚠️ No token available - user might not be signed in')
      return {}
    }
    
    return { Authorization: `Bearer ${token}` }
  } catch (error) {
    console.error('❌ Error getting token:', error)
    return {}
  }
}

// Get all schemas with pagination
export async function getSchemas(
  getToken: () => Promise<string | null>,
  params?: {
    page?: number
    limit?: number
    search?: string
  }
): Promise<ApiSchemaListItem[]> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.get<ApiResponse<ApiSchemaListItem[]>>(
    endpoints.schemas,
    {
      headers,
      params,
    }
  )
  console.log('response', response)
  
  if (!response.data.success) {
    throw new Error(response.data.error?.details || 'Failed to fetch schemas')
  }
  
  // Handle the case where data is null (no schemas found)
  return response.data.data || []
}

// Get schema by ID
export async function getSchemaById(
  getToken: () => Promise<string | null>,
  id: string
): Promise<ApiSchema> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.get<ApiResponse<ApiSchema>>(
    endpoints.schemaById(id),
    { headers }
  )
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.details || 'Failed to fetch schema')
  }
  
  return response.data.data
}

// Create new schema
export async function createSchema(
  getToken: () => Promise<string | null>,
  schemaData: CreateSchemaRequest
): Promise<ApiSchema> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.post<ApiResponse<ApiSchema>>(
    endpoints.schemas,
    schemaData,
    { headers }
  )
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.details || 'Failed to create schema')
  }
  
  return response.data.data
}

// Update existing schema
export async function updateSchema(
  getToken: () => Promise<string | null>,
  id: string,
  schemaData: CreateSchemaRequest
): Promise<ApiSchema> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.put<ApiResponse<ApiSchema>>(
    endpoints.schemaById(id),
    schemaData,
    { headers }
  )
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.details || 'Failed to update schema')
  }
  
  return response.data.data
}

// Delete schema
export async function deleteSchema(
  getToken: () => Promise<string | null>,
  id: string,
  dropDatabase = true
): Promise<DeleteSchemaResponse> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.delete<ApiResponse<DeleteSchemaResponse>>(
    endpoints.schemaById(id),
    {
      headers,
      params: { dropDatabase },
    }
  )
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.details || 'Failed to delete schema')
  }
  
  return response.data.data
}

// Validate schema
export async function validateSchema(
  getToken: () => Promise<string | null>,
  schemaData: CreateSchemaRequest
): Promise<any> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.post<ApiResponse<any>>(
    endpoints.validateSchema,
    schemaData,
    { headers }
  )
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.details || 'Failed to validate schema')
  }
  
  return response.data.data
}

// Export schema as SQL
export async function exportSchemaSQL(
  getToken: () => Promise<string | null>,
  id: string
): Promise<{ sql: string; generatedAt: string }> {
  const headers = await getAuthHeaders(getToken)
  const response = await apiClient.get<ApiResponse<any>>(
    endpoints.exportSchemaSQL(id),
    { headers }
  )
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.details || 'Failed to export schema')
  }
  
  return response.data.data
} 