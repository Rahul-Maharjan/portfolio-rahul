"use client";

import { useQuery } from "@tanstack/react-query";
import { projects as fallbackProjects, type Project } from "@/lib/portfolio-data";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
    placeholderData: fallbackProjects,
    staleTime: 5 * 60 * 1000,
  });
};