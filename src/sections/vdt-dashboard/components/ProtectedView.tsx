import type { ReactNode } from 'react'
import { useInternalAuth } from '../auth-context'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { LoginView } from '../views/LoginView'
import type { DashboardView } from '../types'

export function ProtectedView({ children }: { children: ReactNode; fallbackView: DashboardView }) {
  const { isLoaded, isSignedIn } = useInternalAuth()

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  if (!isSignedIn) {
    return <LoginView />
  }

  return <>{children}</>
} 