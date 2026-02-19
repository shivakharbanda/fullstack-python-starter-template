import { Link, useLocation } from 'react-router-dom'
import { Home, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

const bottomNavItems: BottomNavItem[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings
  },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
      <div className="grid grid-cols-2 h-16">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.url
          const Icon = item.icon

          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs transition-colors",
                "hover:text-foreground hover:bg-accent/50",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                isActive && "text-primary"
              )} />
              <span className={cn(
                "font-medium",
                isActive && "text-primary"
              )}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
