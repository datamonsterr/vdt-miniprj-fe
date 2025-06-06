import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'

export function LoginView() {
  return (
    <div className="max-w-md mx-auto p-6 text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>
      <SignInButton mode="modal">
        <Button size="lg" className="w-full">
          Sign In
        </Button>
      </SignInButton>
    </div>
  )
} 