import type { ReactNode } from 'react'
import { useAuth } from '@/contexts/auth'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { LoginView } from './LoginView'
import type { View } from '../types'

export function ProtectedView({ children }: { children: ReactNode; fallbackView: View }) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (!isSignedIn) {
    return <LoginView />
  }

  return <>{children}</>
} 