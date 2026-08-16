'use client'

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent } from "@/components/ui/card"

export const About = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-20 bg-background max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate developer with 5+ years of experience creating digital solutions 
              that make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a full-stack developer who loves turning complex problems into simple, 
                beautiful and intuitive solutions. When I'm not pushing pixels or writing code, 
                you'll find me exploring new technologies, contributing to open source projects, 
                or sharing my knowledge with the developer community.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey in web development started over 5 years ago, and I've had the 
                privilege of working with startups, agencies, and established companies to 
                deliver high-quality digital experiences.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Frontend</h4>
                  <p className="text-muted-foreground">React, TypeScript, Next.js, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">UI/UX</h4>
                  <p className="text-muted-foreground">Figma, Adobe Illustrator, Wireframing, Prototyping, Web and Mobile Design</p>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5+</div>
                    <div className="text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1+</div>
                    <div className="text-muted-foreground">Years Experience</div>
                  </div>
                  {/* <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">+</div>
                    <div className="text-muted-foreground">Happy Clients</div>
                  </div> */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5+</div>
                    <div className="text-muted-foreground">Technologies</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}