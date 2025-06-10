import type { UserResource } from '@clerk/types'
import { createContext, useContext } from 'react'

export interface AuthContextType {
  user: UserResource | null | undefined
  isLoaded: boolean
  isSignedIn: boolean | undefined
  signOut: () => Promise<void>
  getToken: () => Promise<string | null>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 