import { Button } from '@/components'
import { ArrowLeft, Sun, LogOut, User } from 'lucide-react'
import { View } from '../types'
import { useTheme } from '@/contexts/theme'
import { useUser, useClerk } from '@clerk/clerk-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface NavbarProps {
    handleNavigate: (view: View) => void
}

function Navbar({ handleNavigate }: NavbarProps) {
    const { toggleTheme } = useTheme()
    const { user } = useUser()
    const { signOut } = useClerk()

    const handleLogout = () => {
        signOut()
    }

    const handleUserProfile = () => {
        handleNavigate(View.USER_PROFILE)
    }

    return (
        <div className="flex items-center p-4 border-b bg-background justify-between">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate(View.DASHBOARD)}
                className="flex items-center gap-2"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex items-center gap-2"
                >
                    <Sun className="h-4 w-4" />
                </Button>
                
                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.imageUrl} alt={user.fullName || user.username || 'User'} />
                                    <AvatarFallback>
                                        {user.fullName
                                            ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                                            : user.username?.[0]?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    {user.fullName && (
                                        <p className="font-medium">{user.fullName}</p>
                                    )}
                                    {user.primaryEmailAddress && (
                                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                                            {user.primaryEmailAddress.emailAddress}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleUserProfile} className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    )
}

export default Navbar