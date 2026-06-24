'use client'

import { ExternalLink,ArrowDown as Github, Code2, Palette } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const designProjects = [
  {
    title: "Portfolio Website",
    description:
      "Responsive portfolio website with modern design and smooth animations.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    title: "UI Kit",
    description: "Reusable UI kit for rapid prototyping and design systems.",
    image: "/api/placeholder/400/250",
    technologies: ["Figma", "React", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
];

const devProjects = [
  {
    title: "Royal Home Hotel",
    description:
      "Hotel booking website with room reservations, booking management, and modern UI design.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "JavaScript", "CSS3", "Vercel"],
    github: "https://github.com/Rahul-Maharjan",
    demo: "https://royal-home-xdigisoft-pied.vercel.app/",
    featured: true,
  },
  {
    title: "Mini Cart E-commerce",
    description:
      "Full-stack e-commerce website with product catalog, shopping cart, and user authentication.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Rahul-Maharjan",
    demo: "https://mini-cart-5tf1.vercel.app/",
    featured: true,
  },
  {
    title: "RentX Car Rental",
    description:
      "Car rental service website with vehicle listings, booking system, and responsive design.",
    image: "/api/placeholder/400/250",
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    github: "https://github.com/Rahul-Maharjan/RentX",
    demo: "https://rahul-maharjan.github.io/RentX/",
    featured: false,
  },
  {
    title: "Spices Food Delivery",
    description:
      "Hotel food delivery website with menu display, ordering system, and modern interface.",
    image: "/api/placeholder/400/250",
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    github: "https://github.com/Rahul-Maharjan/Spices",
    demo: "https://rahul-maharjan.github.io/Spices/",
    featured: false,
  },
];

export const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" ref={ref} className="py-20 bg-background">
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
                      <div className="h-48 bg-gradient-primary/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🚀</div>
                          <p className="text-muted-foreground">
                            Project Preview
                          </p>
                        </div>
                      </div>
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
                      <div className="h-48 bg-gradient-primary/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🎨</div>
                          <p className="text-muted-foreground">
                            Design Preview
                          </p>
                        </div>
                      </div>
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
