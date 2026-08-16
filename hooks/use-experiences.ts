"use client";

import { useQuery } from "@tanstack/react-query";
import {
  experiences as fallbackExperiences,
  type Experience,
} from "@/lib/portfolio-data";

export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async (): Promise<Experience[]> => {
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return res.json();
    },
    placeholderData: fallbackExperiences,
    staleTime: 5 * 60 * 1000,
  });
};