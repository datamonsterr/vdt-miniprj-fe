import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { useAuth } from '@/contexts/auth'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const { isLoaded, isSignedIn } = useAuth()

  // Redirect to dashboard if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />
  }

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to VDT
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your dashboard and create database schemas
          </p>
        </div>
        
        <div className="flex justify-center">
          <SignIn 
            routing="path"
            path="/login"
            signUpUrl="/signup"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-card shadow-lg border border-border",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton: "bg-background border border-border text-foreground hover:bg-accent",
                socialButtonsBlockButtonText: "text-foreground",
                formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                formFieldInput: "bg-background border border-border text-foreground",
                footerActionLink: "text-primary hover:text-primary/80",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 