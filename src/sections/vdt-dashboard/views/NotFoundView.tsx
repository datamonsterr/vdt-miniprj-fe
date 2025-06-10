import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { View } from '../types'

export function NotFoundView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="p-6 text-center space-y-4">
      <div className="flex items-center justify-center text-muted-foreground">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => onNavigate(View.DASHBOARD)}>
        Go Home
      </Button>
    </div>
  )
} 