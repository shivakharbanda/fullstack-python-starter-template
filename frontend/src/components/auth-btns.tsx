import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface AuthButtonsProps {
    variant: 'header' | 'sidebar'
    onItemClick?: () => void
}

export function AuthButtons({ variant, onItemClick }: AuthButtonsProps) {
    const { isAuthenticated, logout, user } = useAuth()

    const handleLogout = () => {
        logout()
        onItemClick?.()
    }

    const handleLinkClick = () => {
        onItemClick?.()
    }

    if (variant === 'header') {
        return (
            <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        {user?.email && (
                            <span className="text-sm text-muted-foreground hidden lg:block">
                                {user.email}
                            </span>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Sign out
                        </Button>
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">
                                Sign in
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline" size="sm">
                                Sign up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        )
    }

    // Sidebar variant
    if (isAuthenticated) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                    <span>Sign out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link to="/login" onClick={handleLinkClick}>
                        <span>Sign in</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link to="/register" onClick={handleLinkClick}>
                        <span>Sign up</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </>
    )
}
