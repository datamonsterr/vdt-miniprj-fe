import { SignUp } from '@clerk/clerk-react'

export function SignUpView() {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <SignUp 
        routing="virtual"
        signInUrl="#"
        fallbackRedirectUrl="#"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg"
          }
        }}
      />
    </div>
  )
} 