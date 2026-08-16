"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export type ExperienceFormValues = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
};

const emptyForm: ExperienceFormValues = {
  title: "",
  company: "",
  period: "",
  description: "",
  technologies: [],
  achievements: [],
};

export const ExperienceFormDialog = ({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ExperienceFormValues | null;
  onSubmit: (values: ExperienceFormValues) => Promise<void>;
}) => {
  const [form, setForm] = useState<ExperienceFormValues>(initial ?? emptyForm);
  const [techInput, setTechInput] = useState(
    initial?.technologies.join(", ") ?? "",
  );
  const [achievementInput, setAchievementInput] = useState(
    initial?.achievements.join("\n") ?? "",
  );
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof ExperienceFormValues>(
    key: K,
    value: ExperienceFormValues[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        technologies: techInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        achievements: achievementInput
          .split("\n")
          .map((a) => a.trim())
          .filter(Boolean),
      });
      onOpenChange(false);
      setForm(emptyForm);
      setTechInput("");
      setAchievementInput("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogDescription>
            {initial
              ? "Update the experience details."
              : "Fill in the details for a new experience."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Input
              id="period"
              value={form.period}
              onChange={(e) => set("period", e.target.value)}
              placeholder="Jan, 2024 - Mar, 2024"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technologies">
              Technologies (comma separated)
            </Label>
            <Input
              id="technologies"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Figma, Tailwind CSS"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements (one per line)</Label>
            <Textarea
              id="achievements"
              value={achievementInput}
              onChange={(e) => setAchievementInput(e.target.value)}
              rows={4}
              placeholder="Improved performance by 30%..."
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {initial ? "Save Changes" : "Add Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};