import React, { useState, useEffect } from 'react'
import { SchemaBuilderThemeContext, type SchemaBuilderTheme } from './SchemaBuilderThemeContext'

interface SchemaBuilderThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: SchemaBuilderTheme
  /**
   * Optional initial theme override
   */
  initialTheme?: SchemaBuilderTheme
}

export function SchemaBuilderThemeProvider({ 
  children, 
  defaultTheme = 'light',
  initialTheme
}: SchemaBuilderThemeProviderProps) {
  const [theme, setTheme] = useState<SchemaBuilderTheme>(() => {
    // Use initial theme if provided
    if (initialTheme) {
      return initialTheme
    }
    
    // Check if there's a saved schema builder theme in localStorage
    const savedTheme = localStorage.getItem('schema-builder-theme') as SchemaBuilderTheme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }
    
    return defaultTheme
  })

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Save to localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('schema-builder-theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no manual theme is set (check localStorage)
      const savedTheme = localStorage.getItem('schema-builder-theme')
      if (!savedTheme && !initialTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [initialTheme])

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <SchemaBuilderThemeContext.Provider value={value}>
      {children}
    </SchemaBuilderThemeContext.Provider>
  )
} 