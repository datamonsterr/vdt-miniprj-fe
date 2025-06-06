
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'
import { useTheme } from '@/contexts/theme'

interface ThemeToggleProps {
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  className?: string
}

export function ThemeToggle({ 
  size = 'sm', 
  variant = 'outline',
  className = ''
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={`h-9 w-9 p-0 ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 