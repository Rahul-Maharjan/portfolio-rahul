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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export type ProjectFormValues = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  category: "development" | "design";
  featured: boolean;
};

const emptyForm: ProjectFormValues = {
  title: "",
  description: "",
  image: "",
  technologies: [],
  github: "",
  demo: "",
  category: "development",
  featured: false,
};

export const ProjectFormDialog = ({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ProjectFormValues | null;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
}) => {
  const [form, setForm] = useState<ProjectFormValues>(initial ?? emptyForm);
  const [techInput, setTechInput] = useState(
    initial?.technologies.join(", ") ?? "",
  );
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
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
      });
      onOpenChange(false);
      setForm(emptyForm);
      setTechInput("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogDescription>
            {initial
              ? "Update the project details."
              : "Fill in the details for a new project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="/api/placeholder/400/250"
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
              placeholder="React, Next.js, Tailwind CSS"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                value={form.github}
                onChange={(e) => set("github", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo">Demo URL</Label>
              <Input
                id="demo"
                value={form.demo}
                onChange={(e) => set("demo", e.target.value)}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  set("category", value as "development" | "design")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) => set("featured", checked)}
              />
            </div>
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
              {initial ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};