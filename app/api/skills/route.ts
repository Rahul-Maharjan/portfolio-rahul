import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  skillCategories as fallbackSkillCategories,
  otherTechnologies as fallbackOtherTechnologies,
} from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        skills: { orderBy: { sortOrder: "asc" } },
      },
    });
    const otherTechnologies = await prisma.otherTechnology.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({
      categories,
      otherTechnologies,
    });
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return NextResponse.json({
      categories: fallbackSkillCategories.map((category, categoryIndex) => ({
        title: category.title,
        icon: category.icon,
        sortOrder: categoryIndex,
        skills: category.skills.map((skill, skillIndex) => ({
          ...skill,
          sortOrder: skillIndex,
        })),
      })),
      otherTechnologies: fallbackOtherTechnologies.map((name) => ({
        id: name,
        name,
      })),
    });
  }
}