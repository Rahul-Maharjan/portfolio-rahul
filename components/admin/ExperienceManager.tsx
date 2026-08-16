"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useExperiences } from "@/hooks/use-experiences";
import { adminApi } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  ExperienceFormDialog,
  type ExperienceFormValues,
} from "@/components/admin/ExperienceFormDialog";

type RowExperience = {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
};

export const ExperienceManager = () => {
  const { data: experiences = [] } = useExperiences();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RowExperience | null>(null);
  const [deleting, setDeleting] = useState<RowExperience | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragOrder, setDragOrder] = useState<string[] | null>(null);

  const rows = experiences as RowExperience[];
  const currentOrder =
    dragOrder ??
    rows.map((experience) => experience.id);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["experiences"] });

  const createMutation = useMutation({
    mutationFn: (values: ExperienceFormValues) =>
      adminApi.experience.create(values as Record<string, unknown>),
    onSuccess: invalidate,
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ExperienceFormValues }) =>
      adminApi.experience.update(id, values as Record<string, unknown>),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.experience.remove(id),
    onSuccess: () => {
      invalidate();
      setDeleting(null);
    },
  });
  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => adminApi.experience.reorder(ids),
    onSuccess: () => {
      invalidate();
      setDragOrder(null);
    },
  });

  const handleDragStart = (id: string) => {
    setDraggedId(id);
    setDragOrder(
      rows.map((experience) => experience.id),
    );
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;
    setDragOverId(targetId);
    const from = currentOrder.indexOf(draggedId);
    const to = currentOrder.indexOf(targetId);
    if (from === -1 || to === -1) return;
    const next = [...currentOrder];
    next.splice(from, 1);
    next.splice(to, 0, draggedId);
    setDragOrder(next);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
    if (dragOrder) {
      reorderMutation.mutate(dragOrder);
    }
  };

  const toForm = (e: RowExperience): ExperienceFormValues => ({
    title: e.title,
    company: e.company,
    period: e.period,
    description: e.description,
    technologies: e.technologies,
    achievements: e.achievements,
  });

  const handleSubmit = async (values: ExperienceFormValues) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, values });
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="text-muted-foreground">
            Drag cards to reorder. The new order is shown on the site.
          </p>
        </div>
        <Button
          className="bg-gradient-primary hover:shadow-glow"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {currentOrder.map((id) => {
          const experience = rows.find((row) => row.id === id);
          if (!experience) return null;
          return (
            <Card
              key={experience.id}
              draggable
              onDragStart={() => handleDragStart(experience.id)}
              onDragOver={(e) => handleDragOver(e, experience.id)}
              onDragEnd={handleDragEnd}
              className={`bg-gradient-card border-border shadow-card ${
                dragOverId === experience.id && draggedId !== experience.id
                  ? "ring-2 ring-primary scale-[1.01]"
                  : ""
              } ${
                draggedId === experience.id
                  ? "opacity-50 cursor-grabbing"
                  : "cursor-grab"
              } transition-all duration-200`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{experience.title}</h3>
                        <Badge variant="secondary">{experience.period}</Badge>
                      </div>
                      <p className="text-sm text-primary font-medium">
                        {experience.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(experience);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleting(experience)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {reorderMutation.isPending && (
        <p className="text-sm text-muted-foreground">Saving order...</p>
      )}

      <ExperienceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing ? toForm(editing) : null}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        title="Delete experience?"
        description={`This will permanently remove "${deleting?.title}" at ${deleting?.company}. This cannot be undone.`}
      />
    </div>
  );
};