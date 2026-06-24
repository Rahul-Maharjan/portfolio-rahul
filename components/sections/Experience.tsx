'use client'

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    "title": "Frontend Developer & UI/UX Designer",
    "company": "Core Dreams Innovations",
    "period": "Dec, 2024 - Jul, 2025",
    "description": "Designed and developed responsive web interfaces, improved UI/UX for limousine dispatch systems, and contributed to client-branded solutions.",
    "technologies": ["HTML", "CSS", "Tailwind", "React"],
    "achievements": [
      "Created user flows, wireframes, and prototypes for dispatch apps",
      "Improved UI/UX of Web Booker, Passenger App, and Chauffeur App",
      "Delivered user-friendly, client-branded solutions"
    ]
  },
  {
    "title": "UI/UX Designer",
    "company": "New Equilibria",
    "period": "Oct, 2024 - Feb, 2025",
    "description": "Optimized user journeys and designed an intuitive shopping app interface to improve engagement and conversions.",
    "technologies": ["Figma", "Wireframing", "Prototyping"],
    "achievements": [
      "Enhanced navigation and user flow",
      "Collaborated cross-functionally to align design with business goals",
      "Improved customer experience for e-commerce"
    ]
  },
  {
    "title": "UI/UX Intern",
    "company": "Treeleaf Technologies",
    "period": "Apr, 2024 - Aug, 2024",
    "description": "Contributed to 5+ projects, improved user workflows and interfaces, and enhanced usability through prototyping.",
    "technologies": ["Figma", "Wireframing", "Prototyping"],
    "achievements": [
      "Improved user workflows by 30%",
      "Delivered user-centric designs",
      "Collaborated across teams to meet project goals"
    ]
  },
  {
    "title": "UI/UX Designer Intern",
    "company": "KWS Techzone",
    "period": "Jan, 2024 - Apr, 2024",
    "description": "Designed website interfaces and implemented responsive frontend development using Tailwind CSS.",
    "technologies": ["HTML", "CSS", "Tailwind", "Figma"],
    "achievements": [
      "Enhanced platform’s user experience and visual appeal",
      "Contributed to frontend development and styling",
      "Improved responsiveness across devices"
    ]
  },
  {
    "title": "Admin",
    "company": "Lalit Academy",
    "period": "Jan, 2021 - Jan, 2023",
    "description": "Handled administrative tasks and coordination at Lalit Academy.",
    "technologies": [],
    "achievements": [
      "Provided support in daily operations",
      "Maintained organizational efficiency",
      "Assisted in academic administration"
    ]
  }  
]

export const Experience = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="experience" ref={ref} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Work <span className="bg-gradient-primary bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              My professional journey and the impact I've made along the way.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    className={`relative transition-all duration-700 delay-${index * 200} ${
                      isVisible ? "animate-fade-in-left" : "opacity-0 translate-x-8"
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    
                    <Card className="ml-20 bg-gradient-card border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                            <p className="text-primary font-semibold">{exp.company}</p>
                          </div>
                          <Badge variant="secondary" className="self-start md:self-center mt-2 md:mt-0">
                            {exp.period}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Achievements:</h4>
                          <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}