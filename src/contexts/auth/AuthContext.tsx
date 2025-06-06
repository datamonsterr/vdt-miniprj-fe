import { createContext, useContext } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import type { UserResource } from '@clerk/types'

export interface AuthContextType {
  user: UserResource | null | undefined
  isLoaded: boolean
  isSignedIn: boolean | undefined
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 