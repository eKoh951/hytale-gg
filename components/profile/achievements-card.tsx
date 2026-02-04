import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserAchievements } from '@/lib/data/profile'
import { AchievementItem } from './achievement-item'

interface AchievementsCardProps {
  userId: string
}

export async function AchievementsCard({ userId }: AchievementsCardProps) {
  const userAchievements = await getUserAchievements(userId)

  return (
    <Card className="border-2 border-secondary/30 bg-linear-to-br from-secondary/5 to-transparent">
      <CardHeader>
        <CardTitle className="text-secondary">Achievements</CardTitle>
        <CardDescription>Recent unlocks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {userAchievements.map((ua) => {
            if (!ua.achievements) return null
            return (
              <AchievementItem
                key={ua.id}
                achievement={ua.achievements}
              />
            )
          })}
        </div>
        {userAchievements.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No achievements unlocked yet. Keep playing!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
