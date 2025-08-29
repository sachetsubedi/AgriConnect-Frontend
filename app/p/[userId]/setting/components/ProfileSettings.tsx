"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload, FileUploadTrigger } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import { API_UpdateProfile, T_User } from "@/lib/Api/api";
import { mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileSettingsProps {
  user: T_User;
}

const editProfileSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be at most 20 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(50, "Address must be at most 50 characters"),
});

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  console.log(user);
  const form = useForm({
    defaultValues: {
      name: user.name,
      phone: user.phone || "",
      address: user.aaddress,
    },
    resolver: zodResolver(editProfileSchema),
  });

  const updateProfileMutation = useMutation({
    mutationFn: API_UpdateProfile,
    onSuccess: (data) => {
      setIsEditing(false);
      return toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      mapFieldsOnError(error, form.setError);
      setIsEditing(false);
      return toast.error("Failed to update profile");
    },
  });

  const handleSave = () => {
    form.handleSubmit(() => {
      updateProfileMutation.mutate({
        address: form.watch("address"),
        name: form.watch("name"),
        phone: form.watch("phone"),
      });
    })();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <FileUpload
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                accept="image/*"
                maxFiles={1}
                onValueChange={(files) => {
                  // TODO: Handle avatar upload
                  console.log("Avatar files:", files);
                }}
              >
                <FileUploadTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </FileUploadTrigger>
              </FileUpload>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {user.userType} Account
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                disabled={!isEditing}
              />
              <div className="text-destructive">
                {form.formState.errors.name?.message}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                disabled={!isEditing}
              />
              <div className="text-destructive">
                {form.formState.errors.phone?.message}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...form.register("address")}
                disabled={!isEditing}
              />
              <div className="text-destructive">
                {form.formState.errors.address?.message}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  type={"button"}
                >
                  Cancel
                </Button>
                <LoadingButton
                  onClick={handleSave}
                  loading={updateProfileMutation.isPending}
                >
                  Save Changes
                </LoadingButton>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                User ID
              </Label>
              <p className="text-sm font-mono">{user.id}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Account Type
              </Label>
              <p className="text-sm capitalize">{user.userType}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Member Since
              </Label>
              <p className="text-sm">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </Label>
              <p className="text-sm">
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
