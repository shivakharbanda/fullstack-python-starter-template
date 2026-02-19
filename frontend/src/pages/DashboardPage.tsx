import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const { user } = useAuth()

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'U'

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.full_name ? `, ${user.full_name}` : ''}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-base">{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-medium">{user?.email}</p>
              {user?.full_name && (
                <p className="text-sm text-muted-foreground">{user.full_name}</p>
              )}
              <Badge variant={user?.is_active ? 'default' : 'secondary'}>
                {user?.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
