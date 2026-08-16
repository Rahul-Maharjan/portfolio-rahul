"use client";

import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { adminApi, type ProfileRecord } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

const ProfileForm = ({
  initial,
  onSaved,
}: {
  initial: ProfileRecord;
  onSaved: () => void;
}) => {
  const [form, setForm] = useState<ProfileRecord>(initial);

  const updateMutation = useMutation({
    mutationFn: (values: ProfileRecord) => adminApi.profile.update(values),
    onSuccess: onSaved,
  });

  const set = <K extends keyof ProfileRecord>(
    key: K,
    value: ProfileRecord[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>
          <Input
            id="profile-name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-phone">Phone</Label>
            <Input
              id="profile-phone"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-location">Location</Label>
          <Input
            id="profile-location"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profile-github">GitHub URL</Label>
            <Input
              id="profile-github"
              value={form.githubUrl}
              onChange={(e) => set("githubUrl", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-linkedin">LinkedIn URL</Label>
            <Input
              id="profile-linkedin"
              value={form.linkedinUrl}
              onChange={(e) => set("linkedinUrl", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-cv">CV Download URL</Label>
          <Input
            id="profile-cv"
            value={form.cvUrl ?? ""}
            onChange={(e) => set("cvUrl", e.target.value)}
            placeholder="https://drive.google.com/... or /cv.pdf"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty to hide the Download CV button.
          </p>
        </div>

        <Button
          className="bg-gradient-primary hover:shadow-glow"
          disabled={updateMutation.isPending}
          onClick={async () => {
            await updateMutation.mutateAsync(form);
          }}
        >
          {updateMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
        {updateMutation.isError && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
            Failed to save. Check the database connection.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export const ProfileManager = () => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: adminApi.profile.get,
  });

  const handleSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile &amp; CV</h2>
        <p className="text-muted-foreground">
          Contact details shown in the Hero/Contact sections, plus your CV
          download link.
        </p>
      </div>

      {isLoading || !profile ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <ProfileForm initial={profile} onSaved={handleSaved} />
      )}
    </div>
  );
};