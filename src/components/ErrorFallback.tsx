import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="p-6 text-center space-y-4">
      <div className="flex items-center justify-center text-red-500">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={resetError} variant="outline">
        Try again
      </Button>
    </div>
  )
} 