import React from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'
import { AuthContext } from './AuthContext'
import type { AuthContextType } from './AuthContext'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoaded } = useUser()
  const { isSignedIn, signOut } = useClerkAuth()

  const value: AuthContextType = {
    user,
    isLoaded,
    isSignedIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 