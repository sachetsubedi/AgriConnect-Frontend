"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { T_User } from "@/lib/Api/api";
import { Bell, Globe, Settings } from "lucide-react";
import { useState } from "react";

interface PreferencesSettingsProps {
  user: T_User;
}

export function PreferencesSettings({ user }: PreferencesSettingsProps) {
  const [preferences, setPreferences] = useState({
    // Notification preferences
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    auctionAlerts: true,
    marketingEmails: false,

    // Display preferences
    language: "en",
    timezone: "UTC+5:45", // Nepal timezone
    dateFormat: "MM/DD/YYYY",
    currency: "NPR",

    // Account preferences
    publicProfile: false,
    showOnlineStatus: true,
    allowDirectMessages: true,
  });

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSavePreferences = () => {
    // TODO: Implement API call to save preferences
    console.log("Saving preferences:", preferences);
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) =>
                handlePreferenceChange("emailNotifications", checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser
              </p>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={(checked) =>
                handlePreferenceChange("pushNotifications", checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Order Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about order status changes
              </p>
            </div>
            <Switch
              checked={preferences.orderUpdates}
              onCheckedChange={(checked) =>
                handlePreferenceChange("orderUpdates", checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auction Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for auction activities
              </p>
            </div>
            <Switch
              checked={preferences.auctionAlerts}
              onCheckedChange={(checked) =>
                handlePreferenceChange("auctionAlerts", checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive promotional emails and newsletters
              </p>
            </div>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) =>
                handlePreferenceChange("marketingEmails", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Display & Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Display & Language
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) =>
                  handlePreferenceChange("language", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ne">Nepali</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) =>
                  handlePreferenceChange("timezone", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC+5:45">Nepal (UTC+5:45)</SelectItem>
                  <SelectItem value="UTC+5:30">India (UTC+5:30)</SelectItem>
                  <SelectItem value="UTC+6">Bangladesh (UTC+6)</SelectItem>
                  <SelectItem value="UTC+8">China (UTC+8)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) =>
                  handlePreferenceChange("dateFormat", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) =>
                  handlePreferenceChange("currency", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NPR">Nepalese Rupee (NPR)</SelectItem>
                  <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                  <SelectItem value="USD">US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to other users
              </p>
            </div>
            <Switch
              checked={preferences.publicProfile}
              onCheckedChange={(checked) =>
                handlePreferenceChange("publicProfile", checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show Online Status</Label>
              <p className="text-sm text-muted-foreground">
                Let others see when you&apos;re online
              </p>
            </div>
            <Switch
              checked={preferences.showOnlineStatus}
              onCheckedChange={(checked) =>
                handlePreferenceChange("showOnlineStatus", checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Direct Messages</Label>
              <p className="text-sm text-muted-foreground">
                Allow other users to send you direct messages
              </p>
            </div>
            <Switch
              checked={preferences.allowDirectMessages}
              onCheckedChange={(checked) =>
                handlePreferenceChange("allowDirectMessages", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </div>
    </div>
  );
}
