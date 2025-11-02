import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language for the interface
                    </p>
                  </div>
                  <select 
                    id="language" 
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="en">English</option>
                    <option value="ne">Nepali</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <p className="text-sm text-muted-foreground">
                      Set your local timezone for accurate scheduling
                    </p>
                  </div>
                  <select 
                    id="timezone" 
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="asia/kathmandu">Asia/Kathmandu (GMT+5:45)</option>
                    <option value="asia/kolkata">Asia/Kolkata (GMT+5:30)</option>
                    <option value="utc">UTC (GMT+0)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred currency for transactions
                    </p>
                  </div>
                  <select 
                    id="currency" 
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="npr">Nepalese Rupee (NPR)</option>
                    <option value="inr">Indian Rupee (INR)</option>
                    <option value="usd">US Dollar (USD)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Date Format</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose how dates are displayed
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="dmy" name="date-format" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="dmy">DD/MM/YYYY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="mdy" name="date-format" className="h-4 w-4" />
                      <Label htmlFor="mdy">MM/DD/YYYY</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <select 
                    id="session-timeout" 
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred theme
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="light" name="theme" className="h-4 w-4" />
                      <Label htmlFor="light" className="flex items-center">
                        <Sun className="h-4 w-4 mr-1" /> Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="dark" name="theme" className="h-4 w-4" />
                      <Label htmlFor="dark" className="flex items-center">
                        <Moon className="h-4 w-4 mr-1" /> Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="system" name="theme" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="density">Density</Label>
                    <p className="text-sm text-muted-foreground">
                      Adjust the density of the user interface
                    </p>
                  </div>
                  <select 
                    id="density" 
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal" selected>Normal</option>
                    <option value="comfortable">Comfortable</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable interface animations
                    </p>
                  </div>
              <Switch id="animations" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>
  )
}
