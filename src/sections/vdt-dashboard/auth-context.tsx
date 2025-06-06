import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import type { InternalAuthContextType } from './types'

// VDT Dashboard Clerk Configuration
export const VDT_CLERK_PUBLISHABLE_KEY = "pk_test_cHJvZC1idXNoa2l0LTMyLmNsZXJrLmFjY291bnRzLmRldiQ"

// Internal auth context for the embeddable component
const InternalAuthContext = createContext<InternalAuthContextType | null>(null)

export function InternalAuthProvider({ children, hasClerkProvider }: { children: ReactNode; hasClerkProvider: boolean }) {
  // Only use Clerk hooks if we're inside a ClerkProvider
  const clerk = hasClerkProvider ? useClerkAuth() : { isLoaded: true, isSignedIn: false }
  
  const contextValue: InternalAuthContextType = {
    isLoaded: clerk.isLoaded,
    isSignedIn: clerk.isSignedIn || false
  }

  return (
    <InternalAuthContext.Provider value={contextValue}>
      {children}
    </InternalAuthContext.Provider>
  )
}

export function useInternalAuth() {
  const context = useContext(InternalAuthContext)
  if (!context) {
    throw new Error('useInternalAuth must be used within InternalAuthProvider')
  }
  return context
} 