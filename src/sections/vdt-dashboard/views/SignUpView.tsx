import { Button } from '@/components/ui/button'
import { SignUpButton } from '@clerk/clerk-react'

export function SignUpView() {
  return (
    <div className="max-w-md mx-auto p-6 text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
        <p className="text-muted-foreground">Get started with VDT Database Builder</p>
      </div>
      <SignUpButton mode="modal">
        <Button size="lg" className="w-full">
          Create Account
        </Button>
      </SignUpButton>
    </div>
  )
} 