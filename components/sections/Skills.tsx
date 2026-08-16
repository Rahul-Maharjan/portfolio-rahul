'use client'

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useSkills } from "@/hooks/use-skills";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSkills();
  const skillCategories = data?.categories ?? [];
  const otherTechnologies = data?.otherTechnologies ?? [];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 bg-secondary/30 "
    >
      <div className="max-w-7xl mx-auto px-4">
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
              {otherTechnologies.map((tech, index) => (
                <Badge
                  key={tech.id}
                  variant="secondary"
                  className={`transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground ${
                    isVisible
                      ? `animate-scale-in delay-${index * 50}`
                      : "opacity-0 scale-75"
                  }`}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
