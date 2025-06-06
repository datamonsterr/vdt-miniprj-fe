import { createContext, useContext } from 'react'

export type SchemaBuilderTheme = 'light' | 'dark'

export interface SchemaBuilderThemeContextType {
  theme: SchemaBuilderTheme
  setTheme: (theme: SchemaBuilderTheme) => void
  toggleTheme: () => void
}

export const SchemaBuilderThemeContext = createContext<SchemaBuilderThemeContextType | null>(null)

export const useSchemaBuilderTheme = () => {
  const context = useContext(SchemaBuilderThemeContext)
  if (!context) {
    throw new Error('useSchemaBuilderTheme must be used within SchemaBuilderThemeProvider')
  }
  return context
} 