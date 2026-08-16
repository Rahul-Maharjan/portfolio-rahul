"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSkills } from "@/hooks/use-skills";
import { adminApi } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

type RowCategory = {
  id: string;
  title: string;
  icon: string;
  skills: RowSkill[];
};

type RowSkill = {
  id: string;
  name: string;
  level: number;
  categoryId: string;
};

type RowTech = {
  id: string;
  name: string;
};

const CategoryFormDialog = ({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: { title: string; icon: string } | null;
  onSubmit: (values: { title: string; icon: string }) => Promise<void>;
}) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ title, icon });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit Skill Category" : "Add Skill Category"}
          </DialogTitle>
          <DialogDescription>
            Manage a skill category shown in the Skills section.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-title">Title</Label>
            <Input
              id="category-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Frontend"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-icon">Icon (emoji)</Label>
            <Input
              id="category-icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="🎨"
              required
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
              {initial ? "Save Changes" : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SkillFormDialog = ({
  open,
  onOpenChange,
  initial,
  categoryId,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: { name: string; level: number } | null;
  categoryId: string;
  onSubmit: (values: { name: string; level: number }) => Promise<void>;
}) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [level, setLevel] = useState(initial?.level ?? 80);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ name, level });
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Skill" : "Add Skill"}</DialogTitle>
          <DialogDescription>
            Manage a skill within this category (category id: {categoryId}).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skill-name">Name</Label>
            <Input
              id="skill-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="React"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill-level">Level ({level}%)</Label>
            <Input
              id="skill-level"
              type="number"
              min={0}
              max={100}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              required
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
              {initial ? "Save Changes" : "Add Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const SkillsManager = () => {
  const { data } = useSkills();
  const queryClient = useQueryClient();
  const categories = (data?.categories ?? []) as RowCategory[];
  const otherTechnologies = (data?.otherTechnologies ?? []) as RowTech[];

  const [categoryDialog, setCategoryDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<RowCategory | null>(
    null,
  );
  const [deletingCategory, setDeletingCategory] = useState<RowCategory | null>(
    null,
  );
  const [skillDialog, setSkillDialog] = useState(false);
  const [skillCategoryId, setSkillCategoryId] = useState("");
  const [editingSkill, setEditingSkill] = useState<RowSkill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<RowSkill | null>(null);
  const [deletingTech, setDeletingTech] = useState<RowTech | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["skills"] });

  const createCategory = useMutation({
    mutationFn: (values: { title: string; icon: string }) =>
      adminApi.skillCategories.create(values),
    onSuccess: invalidate,
  });
  const updateCategory = useMutation({
    mutationFn: ({ id, values }: { id: string; values: { title: string; icon: string } }) =>
      adminApi.skillCategories.update(id, values),
    onSuccess: invalidate,
  });
  const deleteCategory = useMutation({
    mutationFn: (id: string) => adminApi.skillCategories.remove(id),
    onSuccess: () => {
      invalidate();
      setDeletingCategory(null);
    },
  });
  const createSkill = useMutation({
    mutationFn: (values: { name: string; level: number; categoryId: string }) =>
      adminApi.skills.create(values),
    onSuccess: invalidate,
  });
  const updateSkill = useMutation({
    mutationFn: ({ id, values }: { id: string; values: { name: string; level: number } }) =>
      adminApi.skills.update(id, { ...values, categoryId: editingSkill?.categoryId ?? "" }),
    onSuccess: invalidate,
  });
  const deleteSkill = useMutation({
    mutationFn: (id: string) => adminApi.skills.remove(id),
    onSuccess: () => {
      invalidate();
      setDeletingSkill(null);
    },
  });
  const createTech = useMutation({
    mutationFn: (name: string) => adminApi.otherTechnologies.create({ name }),
    onSuccess: invalidate,
  });
  const deleteTech = useMutation({
    mutationFn: (id: string) => adminApi.otherTechnologies.remove(id),
    onSuccess: () => {
      invalidate();
      setDeletingTech(null);
    },
  });

  const [newTech, setNewTech] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">
            Manage skill categories, skills and other technologies.
          </p>
        </div>
        <Button
          className="bg-gradient-primary hover:shadow-glow"
          onClick={() => {
            setEditingCategory(null);
            setCategoryDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingCategory(category);
                      setCategoryDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeletingCategory(category)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-border px-2 py-1.5"
                  >
                    <span className="text-sm">
                      {skill.name}{" "}
                      <span className="text-muted-foreground">
                        {skill.level}%
                      </span>
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          setEditingSkill(skill);
                          setSkillCategoryId(category.id);
                          setSkillDialog(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => setDeletingSkill(skill)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setEditingSkill(null);
                    setSkillCategoryId(category.id);
                    setSkillDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Other Technologies</h3>
          <p className="text-muted-foreground">
            Technologies shown below the skill cards.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {otherTechnologies.map((tech) => (
            <Badge key={tech.id} variant="secondary" className="gap-2 px-3 py-1">
              {tech.name}
              <button
                className="text-muted-foreground hover:text-destructive"
                onClick={() => setDeletingTech(tech)}
                aria-label={`Delete ${tech.name}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (newTech.trim()) {
              createTech.mutate(newTech.trim());
              setNewTech("");
            }
          }}
        >
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add a technology..."
            className="max-w-xs"
          />
          <Button type="submit" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </form>
      </div>

      <CategoryFormDialog
        open={categoryDialog}
        onOpenChange={setCategoryDialog}
        initial={editingCategory ? { title: editingCategory.title, icon: editingCategory.icon } : null}
        onSubmit={async (values) => {
          if (editingCategory) {
            await updateCategory.mutateAsync({ id: editingCategory.id, values });
          } else {
            await createCategory.mutateAsync(values);
          }
        }}
      />

      <SkillFormDialog
        open={skillDialog}
        onOpenChange={setSkillDialog}
        initial={editingSkill ? { name: editingSkill.name, level: editingSkill.level } : null}
        categoryId={skillCategoryId}
        onSubmit={async (values) => {
          if (editingSkill) {
            await updateSkill.mutateAsync({ id: editingSkill.id, values });
          } else {
            await createSkill.mutateAsync({ ...values, categoryId: skillCategoryId });
          }
        }}
      />

      <ConfirmDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        onConfirm={() => deletingCategory && deleteCategory.mutate(deletingCategory.id)}
        title="Delete skill category?"
        description={`This will permanently remove "${deletingCategory?.title}" and all its skills. This cannot be undone.`}
      />

      <ConfirmDialog
        open={!!deletingSkill}
        onOpenChange={(open) => !open && setDeletingSkill(null)}
        onConfirm={() => deletingSkill && deleteSkill.mutate(deletingSkill.id)}
        title="Delete skill?"
        description={`This will permanently remove "${deletingSkill?.name}". This cannot be undone.`}
      />

      <ConfirmDialog
        open={!!deletingTech}
        onOpenChange={(open) => !open && setDeletingTech(null)}
        onConfirm={() => deletingTech && deleteTech.mutate(deletingTech.id)}
        title="Delete technology?"
        description={`This will permanently remove "${deletingTech?.name}". This cannot be undone.`}
      />
    </div>
  );
};