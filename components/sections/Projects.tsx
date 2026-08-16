'use client'

import { useState } from "react";
import { ExternalLink,ArrowDown as Github, Code2, Palette } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useProjects } from "@/hooks/use-projects";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ProjectImage = ({ src }: { src?: string | null }) => {
  const [error, setError] = useState(false);
  const imageSrc = src && !error ? src : "/placeholder.svg";

  return (
    <img
      src={imageSrc}
      alt="Project preview"
      onError={() => setError(true)}
      loading="lazy"
      className="h-48 w-full object-cover"
    />
  );
};

export const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { data: projects = [] } = useProjects();

  const devProjects = projects.filter(
    (project) => project.category === "development",
  );
  const designProjects = projects.filter(
    (project) => project.category === "design",
  );

  return (
    <section id="projects" ref={ref} className="py-20 bg-background max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Creative Work
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Exploring both code and creativity - from development to design.
            </p>
          </div>

          <Tabs defaultValue="development" className="w-full">
            <TabsList className="mx-auto mb-8 flex justify-center w-fit">
              <TabsTrigger value="development">
                <Code2 className="mr-2 h-5 w-5" /> Development
              </TabsTrigger>
              <TabsTrigger value="design">
                <Palette className="mr-2 h-5 w-5" /> Design
              </TabsTrigger>
            </TabsList>
            <TabsContent value="development">
              <div className="grid md:grid-cols-2 gap-8">
                {devProjects.map((project, index) => (
                  <Card
                    key={index}
                    className={`group bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.02] ${
                      isVisible
                        ? `animate-fade-in delay-${index * 200}`
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <ProjectImage src={project.image} />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <Button size="sm" variant="secondary" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="design">
              <div className="grid md:grid-cols-2 gap-8">
                {designProjects.map((project, index) => (
                  <Card
                    key={index}
                    className={`group bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.02] ${
                      isVisible
                        ? `animate-fade-in delay-${index * 200}`
                        : "opacity-0 translate-y-8"
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <ProjectImage src={project.image} />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        <Button size="sm" variant="secondary" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Palette className="mr-2 h-5 w-5" />
                            Design
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
