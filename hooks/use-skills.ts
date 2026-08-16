"use client";

import { useQuery } from "@tanstack/react-query";
import {
  skillCategories as fallbackSkillCategories,
  otherTechnologies as fallbackOtherTechnologies,
  type SkillCategory,
} from "@/lib/portfolio-data";

export type OtherTechnology = {
  id: string;
  name: string;
};

type SkillsResponse = {
  categories: SkillCategory[];
  otherTechnologies: OtherTechnology[];
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async (): Promise<SkillsResponse> => {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error("Failed to fetch skills");
      return res.json();
    },
    placeholderData: {
      categories: fallbackSkillCategories,
      otherTechnologies: fallbackOtherTechnologies.map((name) => ({
        id: name,
        name,
      })),
    },
    staleTime: 5 * 60 * 1000,
  });
};