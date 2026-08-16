"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useProjects } from "@/hooks/use-projects";
import { adminApi } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Trash2, Star } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  ProjectFormDialog,
  type ProjectFormValues,
} from "@/components/admin/ProjectFormDialog";

type RowProject = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  technologies: string[];
  github?: string | null;
  demo?: string | null;
  category: "development" | "design";
  featured: boolean;
};

export const ProjectsManager = () => {
  const { data: projects = [] } = useProjects();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RowProject | null>(null);
  const [deleting, setDeleting] = useState<RowProject | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

  const createMutation = useMutation({
    mutationFn: (values: ProjectFormValues) => adminApi.projects.create(values as Record<string, unknown>),
    onSuccess: invalidate,
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ProjectFormValues }) =>
      adminApi.projects.update(id, values as Record<string, unknown>),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.projects.remove(id),
    onSuccess: () => {
      invalidate();
      setDeleting(null);
    },
  });

  const toForm = (p: RowProject): ProjectFormValues => ({
    title: p.title,
    description: p.description,
    image: p.image ?? "",
    technologies: p.technologies,
    github: p.github ?? "",
    demo: p.demo ?? "",
    category: p.category,
    featured: p.featured,
  });

  const handleSubmit = async (values: ProjectFormValues) => {
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
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Manage the work shown in the Projects section.
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
          Add Project
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={(project as RowProject).id ?? project.title} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{project.title}</h3>
                    {project.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {project.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditing(project as RowProject);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleting(project as RowProject)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProjectFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing ? toForm(editing) : null}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        title="Delete project?"
        description={`This will permanently remove "${deleting?.title}". This cannot be undone.`}
      />
    </div>
  );
};