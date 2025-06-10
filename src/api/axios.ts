import axios from 'axios'

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Token will be added by individual API functions using getToken
    return config
  },
  (error) => {
    console.error('📤 Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('📥 API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      responseData: error.response?.data
    })
    
    // Handle common errors
    if (error.response?.status === 401) {
      console.error('🚫 Authentication failed - Token might be invalid or missing')
      // Could trigger logout here if needed
    }
    return Promise.reject(error)
  }
)

// Endpoints object as per API rule
export const endpoints = {
  // Schema management
  schemas: '/schemas',
  schemaById: (id: string) => `/schemas/${id}`,
  validateSchema: '/schemas/validate',
  exportSchemaSQL: (id: string) => `/schemas/${id}/export/sql`,
  
  // Database management
  databaseStatus: (id: string) => `/schemas/${id}/database/status`,
  regenerateDatabase: (id: string) => `/schemas/${id}/database/regenerate`,
  
  // Health check
  health: '/health',
}

export default apiClient 