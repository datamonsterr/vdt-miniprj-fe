import { Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from '@/contexts/theme'
import { AuthProvider } from '@/contexts/auth'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen">
            <Outlet />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ClerkProvider>
  )
} 