import { Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getRecentActivity } from '@/lib/data/profile'

interface RecentActivityCardProps {
  userId: string
}

function formatTimeAgo(dateString: string | null): string {
  if (!dateString) return 'Recently'

  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

export async function RecentActivityCard({ userId }: RecentActivityCardProps) {
  const activities = await getRecentActivity(userId, 5)

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest adventures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.action}</p>
                {activity.server_name && (
                  <p className="text-sm text-muted-foreground">
                    {activity.server_name}
                  </p>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {formatTimeAgo(activity.created_at)}
              </span>
            </div>
          ))}
        </div>
        {activities.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No recent activity. Start your adventure!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
