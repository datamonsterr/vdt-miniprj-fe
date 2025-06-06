import React from 'react'
import { SchemaBuilderThemeContext, type SchemaBuilderThemeContextType } from './SchemaBuilderThemeContext'

interface SchemaBuilderThemeConsumerProps {
  children: (context: SchemaBuilderThemeContextType) => React.ReactNode
}

export function SchemaBuilderThemeConsumer({ children }: SchemaBuilderThemeConsumerProps) {
  return (
    <SchemaBuilderThemeContext.Consumer>
      {(context) => {
        if (!context) {
          throw new Error('SchemaBuilderThemeConsumer must be used within SchemaBuilderThemeProvider')
        }
        return children(context)
      }}
    </SchemaBuilderThemeContext.Consumer>
  )
} 