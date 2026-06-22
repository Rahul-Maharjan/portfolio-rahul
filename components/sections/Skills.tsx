'use client'

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Sass/SCSS", level: 90 },
    ],
  },
  {
    title: "UI/UX Design",
    icon: "✒️",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Wireframe", level: 85 },
      { name: "Prototype", level: 88 },
      { name: "Mood board", level: 75 },
      { name: "Design System", level: 92 },
    ],
  },
  // {
  //   title: "Database",
  //   icon: "🗄️",
  //   skills: [
  //     { name: "MongoDB", level: 88 },
  //     { name: "PostgreSQL", level: 85 },
  //     { name: "MySQL", level: 80 },
  //     { name: "Redis", level: 75 },
  //     { name: "Firebase", level: 82 },
  //     { name: "Supabase", level: 78 }
  //   ]
  // },
  {
    title: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 95 },
      { name: "AWS", level: 75 },
      { name: "Vercel", level: 90 },
      { name: "Figma", level: 85 },
    ],
  },
];

export const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Skills &{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={categoryIndex}
                className={`bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.02] ${
                  isVisible
                    ? `animate-fade-in delay-${categoryIndex * 200}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {skill.level}%
                          </Badge>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${skill.level}%` : "0%",
                              transitionDelay: `${
                                categoryIndex * 200 + skillIndex * 100
                              }ms`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">
              Other Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "JavaScript",
                "HTML5",
                "CSS3",
                "Webpack",
                "Vite",
                "npm",
                "Yarn",
                "ESLint",
                "Prettier",
                "Storybook",
                "Cypress",
                "Playwright",
                "Jenkins",
                "GitHub Actions",
                "Linux",
                "Nginx",
                "Cloudflare",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground ${
                    isVisible
                      ? `animate-scale-in delay-${index * 50}`
                      : "opacity-0 scale-75"
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
