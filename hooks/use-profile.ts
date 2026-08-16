"use client";

import { useQuery } from "@tanstack/react-query";
import { defaultProfile, type Profile } from "@/lib/portfolio-data";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile> => {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
    placeholderData: defaultProfile,
    staleTime: 5 * 60 * 1000,
  });
};