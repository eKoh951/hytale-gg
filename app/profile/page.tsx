"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, MessageSquare, Calendar, Trophy, Clock, Gamepad2, Star, Shield, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TerrainDivider } from "@/components/ui/hytale-decorations";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "BlockMaster",
    email: "blockmaster@hytale.gg",
    bio: "Dedicated Hytale player and server explorer. Always looking for new adventures!",
    location: "The Overworld",
    discordId: "BlockMaster#1234",
    avatarUrl: "",
  });

  const stats = {
    serversJoined: 42,
    hoursPlayed: 328,
    achievementsUnlocked: 15,
    level: 27,
  };

  const achievements = [
    { icon: Trophy, name: "First Victory", color: "text-yellow-500" },
    { icon: Shield, name: "Defender", color: "text-blue-500" },
    { icon: Zap, name: "Speed Runner", color: "text-purple-500" },
    { icon: Star, name: "Master Builder", color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden border-b-2 border-border bg-gradient-to-b from-primary/20 to-background">
        {/* Subtle terrain texture background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237CBD3E' fill-opacity='1'%3E%3Crect x='0' y='0' width='30' height='30'/%3E%3Crect x='30' y='30' width='30' height='30'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Avatar Section */}
        <div className="container relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            {/* Large Avatar with Edit Button */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar className="h-32 w-32 border-4 border-border shadow-xl ring-4 ring-primary/20">
                  <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary via-purple-600 to-secondary text-4xl font-bold text-primary-foreground">
                    {profile.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Edit Avatar Button */}
                {isEditing && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-opacity hover:bg-black/70"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </motion.button>
                )}
              </motion.div>
              
              {/* Level Badge */}
              <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-gradient-to-br from-secondary to-yellow-600 shadow-lg">
                <span className="text-sm font-bold text-secondary-foreground">{stats.level}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {profile.displayName}
              </h1>
              <p className="mt-1 text-muted-foreground">{profile.email}</p>
              
              {/* Quick Stats */}
              <div className="mt-4 flex flex-wrap justify-center gap-6 sm:justify-start">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    <strong className="font-semibold text-foreground">{stats.serversJoined}</strong> Servers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    <strong className="font-semibold text-foreground">{stats.hoursPlayed}</strong> Hours
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  <span className="text-sm">
                    <strong className="font-semibold text-foreground">{stats.achievementsUnlocked}</strong> Achievements
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className={cn(
                isEditing && "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              )}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      <TerrainDivider />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Information Card */}
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing ? "Update your personal details" : "Your personal details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      disabled={!isEditing}
                      className="disabled:opacity-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="disabled:opacity-100"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    className="disabled:opacity-100"
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      disabled={!isEditing}
                      className="disabled:opacity-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discord" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Discord ID
                    </Label>
                    <Input
                      id="discord"
                      value={profile.discordId}
                      onChange={(e) => setProfile({ ...profile, discordId: e.target.value })}
                      disabled={!isEditing}
                      className="disabled:opacity-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Card */}
            <Card className="border-2 border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest adventures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Joined server", server: "Epic Survival", time: "2 hours ago" },
                    { action: "Earned achievement", server: "Speed Runner", time: "5 hours ago" },
                    { action: "Joined server", server: "Creative Haven", time: "1 day ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border border-border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.server}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="space-y-6">
            {/* Gaming Stats Card */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-primary">Gaming Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Player Level</span>
                    <span className="font-bold text-secondary">{stats.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Playtime</span>
                    <span className="font-semibold">{stats.hoursPlayed}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Servers Joined</span>
                    <span className="font-semibold">{stats.serversJoined}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Achievements</span>
                    <span className="font-semibold">{stats.achievementsUnlocked}/50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Showcase */}
            <Card className="border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-secondary">Achievements</CardTitle>
                <CardDescription>Recent unlocks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center"
                    >
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20",
                      )}>
                        <achievement.icon className={cn("h-6 w-6", achievement.color)} />
                      </div>
                      <span className="text-xs font-medium">{achievement.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
