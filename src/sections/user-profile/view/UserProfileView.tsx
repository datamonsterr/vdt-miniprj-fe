import { UserProfile } from '@clerk/clerk-react'
import { Button } from '@/components'
import { ArrowLeft } from 'lucide-react'
import type { UserProfileProps } from '../types'

function UserProfileView({ onBack }: UserProfileProps) {
  return (
    <div className="flex flex-col h-full">
      {onBack && (
        <div className="flex items-center p-4 border-b bg-background">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center p-6">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg"
            }
          }}
        />
      </div>
    </div>
  )
}

export default UserProfileView 