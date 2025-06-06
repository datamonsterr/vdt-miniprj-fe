import React from 'react'
import { ThemeContext, type ThemeContextType } from './ThemeContext'

interface ThemeConsumerProps {
  children: (context: ThemeContextType) => React.ReactNode
}

export function ThemeConsumer({ children }: ThemeConsumerProps) {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        if (!context) {
          throw new Error('ThemeConsumer must be used within ThemeProvider')
        }
        return children(context)
      }}
    </ThemeContext.Consumer>
  )
} 