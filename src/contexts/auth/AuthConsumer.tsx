import React from 'react'
import { AuthContext } from './AuthContext'
import type { AuthContextType } from './AuthContext'

interface AuthConsumerProps {
  children: (auth: AuthContextType) => React.ReactNode
}

export function AuthConsumer({ children }: AuthConsumerProps) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        if (!value) {
          throw new Error('AuthConsumer must be used within an AuthProvider')
        }
        return children(value)
      }}
    </AuthContext.Consumer>
  )
} 