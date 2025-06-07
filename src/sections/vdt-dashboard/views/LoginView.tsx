import { SignIn } from '@clerk/clerk-react'

export function LoginView() {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <SignIn 
        routing="virtual"
        signUpUrl="#"
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