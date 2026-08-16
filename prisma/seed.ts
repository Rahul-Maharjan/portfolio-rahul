import { PrismaClient } from "@/lib/generated/prisma/client";
import {
  projects,
  experiences,
  skillCategories,
  otherTechnologies,
  defaultProfile,
} from "@/lib/portfolio-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: projects.map((project, index) => ({
      ...project,
      sortOrder: index,
    })),
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experiences.map((experience, index) => ({
      ...experience,
      sortOrder: index,
    })),
  });

  await prisma.otherTechnology.deleteMany();
  await prisma.otherTechnology.createMany({
    data: otherTechnologies.map((name, index) => ({ name, sortOrder: index })),
  });

  await prisma.siteProfile.upsert({
    where: { id: 1 },
    create: { id: 1, ...defaultProfile },
    update: defaultProfile,
  });

  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  for (const [categoryIndex, category] of skillCategories.entries()) {
    const created = await prisma.skillCategory.create({
      data: {
        title: category.title,
        icon: category.icon,
        sortOrder: categoryIndex,
      },
    });
    await prisma.skill.createMany({
      data: category.skills.map((skill, skillIndex) => ({
        name: skill.name,
        level: skill.level,
        sortOrder: skillIndex,
        categoryId: created.id,
      })),
    });
  }

  console.log(`Seeded ${projects.length} projects`);
  console.log(`Seeded ${experiences.length} experiences`);
  console.log(`Seeded ${skillCategories.length} skill categories`);
  console.log(`Seeded ${otherTechnologies.length} other technologies`);
  console.log(`Seeded site profile`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });