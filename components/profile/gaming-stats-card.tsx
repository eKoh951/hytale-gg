import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserStats } from '@/lib/data/profile'

interface GamingStatsCardProps {
  userId: string
}

export async function GamingStatsCard({ userId }: GamingStatsCardProps) {
  const stats = await getUserStats(userId)

  return (
    <Card className="border-2 border-primary/30 bg-linear-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="text-primary">Gaming Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Player Level</span>
            <span className="font-bold text-secondary">
              {/* Level comes from profile, not stats */}
              1
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total Playtime</span>
            <span className="font-semibold">{stats.hours_played || 0}h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Servers Joined</span>
            <span className="font-semibold">{stats.servers_joined || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Achievements</span>
            <span className="font-semibold">
              {stats.achievements_unlocked || 0}/50
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
