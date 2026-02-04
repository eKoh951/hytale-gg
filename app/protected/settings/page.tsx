"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Trash2,
  Download,
  Key,
  LogOut,
  ChevronRight,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data for design purposes
const mockUser = {
  email: "player@example.com",
  username: "DragonSlayer99",
  twoFactorEnabled: false,
};

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-border last:border-0">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-2 rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function SettingLink({
  icon: Icon,
  title,
  description,
  href,
  destructive = false,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  href?: string;
  destructive?: boolean;
}) {
  const content = (
    <div
      className={`flex items-center justify-between gap-4 py-4 border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-muted/50 -mx-4 px-4 ${destructive ? "hover:bg-destructive/10" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 p-2 rounded-lg ${destructive ? "bg-destructive/20" : "bg-muted"}`}
        >
          <Icon
            className={`h-4 w-4 ${destructive ? "text-destructive" : "text-muted-foreground"}`}
          />
        </div>
        <div className="space-y-0.5">
          <p
            className={`text-sm font-medium ${destructive ? "text-destructive" : ""}`}
          >
            {title}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <ChevronRight
        className={`h-4 w-4 ${destructive ? "text-destructive" : "text-muted-foreground"}`}
      />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    serverUpdates: true,
    newFollowers: true,
    marketingEmails: false,
    soundEnabled: true,

    // Privacy
    profilePublic: true,
    showOnlineStatus: true,
    showServerHistory: false,
    allowFriendRequests: true,

    // Appearance
    darkMode: true,
    compactMode: false,

    // Security
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  const updateSetting = (key: keyof typeof settings, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/protected">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to profile</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">
                Manage your account preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="account" className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="w-full justify-start bg-muted/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    defaultValue={mockUser.username}
                    className="max-w-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is your public display name
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={mockUser.email}
                    className="max-w-md"
                  />
                </div>
                <Button className="mt-2">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how Hytale.gg looks for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={settings.darkMode ? Moon : Sun}
                  title="Dark Mode"
                  description="Use dark theme across the application"
                >
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      updateSetting("darkMode", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={Globe}
                  title="Compact Mode"
                  description="Reduce spacing for a denser layout"
                >
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) =>
                      updateSetting("compactMode", checked)
                    }
                  />
                </SettingRow>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Export or delete your account data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingLink
                  icon={Download}
                  title="Export Your Data"
                  description="Download a copy of all your data"
                />
                <SettingLink
                  icon={Trash2}
                  title="Delete Account"
                  description="Permanently delete your account and all data"
                  destructive
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={Mail}
                  title="Email Notifications"
                  description="Receive notifications via email"
                >
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting("emailNotifications", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={Smartphone}
                  title="Push Notifications"
                  description="Receive push notifications on your devices"
                >
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting("pushNotifications", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={settings.soundEnabled ? Volume2 : VolumeX}
                  title="Sound Effects"
                  description="Play sounds for notifications"
                >
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) =>
                      updateSetting("soundEnabled", checked)
                    }
                  />
                </SettingRow>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>
                  Select which events you want to be notified about
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={Globe}
                  title="Server Updates"
                  description="Get notified when your favorite servers have updates"
                >
                  <Switch
                    checked={settings.serverUpdates}
                    onCheckedChange={(checked) =>
                      updateSetting("serverUpdates", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={User}
                  title="New Followers"
                  description="Get notified when someone follows you"
                >
                  <Switch
                    checked={settings.newFollowers}
                    onCheckedChange={(checked) =>
                      updateSetting("newFollowers", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={Mail}
                  title="Marketing Emails"
                  description="Receive news and promotional content"
                >
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) =>
                      updateSetting("marketingEmails", checked)
                    }
                  />
                </SettingRow>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>
                  Control who can see your profile and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={settings.profilePublic ? Eye : EyeOff}
                  title="Public Profile"
                  description="Allow anyone to view your profile"
                >
                  <Switch
                    checked={settings.profilePublic}
                    onCheckedChange={(checked) =>
                      updateSetting("profilePublic", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={Globe}
                  title="Show Online Status"
                  description="Let others see when you're online"
                >
                  <Switch
                    checked={settings.showOnlineStatus}
                    onCheckedChange={(checked) =>
                      updateSetting("showOnlineStatus", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={Eye}
                  title="Server History"
                  description="Show which servers you've played on"
                >
                  <Switch
                    checked={settings.showServerHistory}
                    onCheckedChange={(checked) =>
                      updateSetting("showServerHistory", checked)
                    }
                  />
                </SettingRow>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Settings</CardTitle>
                <CardDescription>
                  Manage how others can interact with you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={User}
                  title="Friend Requests"
                  description="Allow others to send you friend requests"
                >
                  <Switch
                    checked={settings.allowFriendRequests}
                    onCheckedChange={(checked) =>
                      updateSetting("allowFriendRequests", checked)
                    }
                  />
                </SettingRow>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative max-w-md">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="max-w-md"
                  />
                </div>
                <Button className="mt-2">Update Password</Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Two-Factor Authentication
                  {settings.twoFactorEnabled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-grass bg-grass/20 px-2 py-0.5 rounded-full">
                      <Check className="h-3 w-3" />
                      Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary bg-secondary/20 px-2 py-0.5 rounded-full">
                      <AlertTriangle className="h-3 w-3" />
                      Disabled
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingRow
                  icon={Key}
                  title="Enable 2FA"
                  description="Use an authenticator app for additional security"
                >
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) =>
                      updateSetting("twoFactorEnabled", checked)
                    }
                  />
                </SettingRow>
                <SettingRow
                  icon={Bell}
                  title="Login Alerts"
                  description="Get notified of new sign-ins to your account"
                >
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(checked) =>
                      updateSetting("loginAlerts", checked)
                    }
                  />
                </SettingRow>
              </CardContent>
            </Card>

            {/* Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Manage devices where you're currently logged in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Session */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-grass/20">
                        <Globe className="h-4 w-4 text-grass" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">
                          Chrome on Windows - San Francisco, US
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-grass font-medium">
                      Active Now
                    </span>
                  </div>

                  {/* Other Session */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mobile Device</p>
                        <p className="text-xs text-muted-foreground">
                          Safari on iOS - New York, US
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      Revoke
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full sm:w-auto gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
