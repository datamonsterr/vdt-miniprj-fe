import type { ReactNode } from 'react'
import { useAuth } from '@/contexts/auth'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { LoginView } from './LoginView'
import type { DashboardView } from '../types'

export function ProtectedView({ children }: { children: ReactNode; fallbackView: DashboardView }) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (!isSignedIn) {
    return <LoginView />
  }

  return <>{children}</>
} 