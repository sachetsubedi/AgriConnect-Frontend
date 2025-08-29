"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import { API_ChangePassword, API_DeleteAccount } from "@/lib/Api/api";
import { mapFieldsOnError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye, EyeOff, Key, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine((v, c) => {
    if (v.confirmPassword !== v.newPassword) {
      c.addIssue({
        path: ["confirmPassword"],
        message: "Passwords must match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: API_ChangePassword,
    onSuccess: () => {
      form.reset();
      return toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      mapFieldsOnError(error, form.setError);
      return toast.error("Failed to change password");
    },
  });

  const deleteAccForm = useForm({
    resolver: zodResolver(
      z.object({
        password: z.string().min(6, "Password must be at least 6 characters"),
      })
    ),
    defaultValues: {
      password: "",
    },
  });

  const deleteAccountMutataion = useMutation({
    mutationFn: API_DeleteAccount,
    onSuccess: () => {
      form.reset();
      window.location.href = "/";
      return toast.success("Account deleted successfully");
    },
    onError: (error: any) => {
      mapFieldsOnError(error, deleteAccForm.setError);
      return toast.error("Failed to delete account");
    },
  });

  const handlePasswordSubmit = () => {
    changePasswordMutation.mutate({
      newPassword: form.getValues("newPassword"),
      oldPassword: form.getValues("oldPassword"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {changePasswordMutation.isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                className="flex items-center gap-2 mb-5 border-red-200 bg-red-50"
                variant="destructive"
              >
                <div className="flex items-center gap-3 font-medium">
                  <Icon
                    icon="fluent:warning-12-filled"
                    width="20"
                    height="20"
                  />
                  {changePasswordMutation.error?.response?.data.message}
                </div>
              </Alert>
            </motion.div>
          )}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...form.register("oldPassword")}
                placeholder="Enter your current password"
              />
              <div className="text-destructive font-bold text-sm">
                {form.formState.errors.oldPassword?.message}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...form.register("newPassword")}
                placeholder="Enter your new password"
              />
              <div className="text-destructive font-bold text-sm">
                {form.formState.errors.newPassword?.message}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword")}
                placeholder="Confirm your new password"
              />
              <div className="text-destructive font-bold text-sm">
                {form.formState.errors.confirmPassword?.message}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <LoadingButton
            onClick={() => {
              form.handleSubmit(handlePasswordSubmit)();
            }}
            className="w-full"
            loading={changePasswordMutation.isPending}
          >
            Update Password
          </LoadingButton>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-destructive/20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-destructive mb-2">
              Delete Account
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDeleteAccountDialogOpen(true);
              }}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={deleteAccountDialogOpen}
        onOpenChange={setDeleteAccountDialogOpen}
      >
        <DialogContent>
          <div className="flex justify-center items-center">
            <TriangleAlert
              size={30}
              className="text-destructive"
            ></TriangleAlert>
          </div>
          <DialogTitle className="text-center">
            Are you sure you want to delete your account?
          </DialogTitle>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Deleting your account is permanent and cannot be undone. All
              personal data, listings, and settings associated with your account
              will be permanently removed and cannot be recovered. This action
              will sign you out of all devices. Please download any data you
              want to keep before proceeding.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteAccountDialogOpen(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={deleteAccountMutataion.isPending}
                variant="destructive"
                onClick={() => {
                  deleteAccForm.handleSubmit(() => {
                    deleteAccountMutataion.mutate({
                      password: deleteAccForm.watch("password"),
                    });
                  })();
                }}
              >
                Delete Account
              </LoadingButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
