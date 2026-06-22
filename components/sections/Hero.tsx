'use client'

import { ArrowDown,ArrowDown as Github,ArrowDown as Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useEffect, useState } from "react"

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation()

  // Typewriter animation for Developer/Designer
  const words = ["Developer", "Designer"];
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // letter
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 60 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <section 
      id="home" 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative bg-gradient-hero"
    >
      <div className="container mx-auto px-4 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Rahul Maharjan
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
              Frontend Web {" "}
              <span className="inline-block min-w-[7ch] text-left">
                {words[index].substring(0, subIndex)}
                <span className="border-r-2 border-primary animate-pulse ml-0.5" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Crafting beautiful, responsive, and performant web applications 
              with modern technologies and best practices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-400 animate-glow-pulse"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <a 
              href="https://github.com/Rahul-Maharjan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/rahul-maharjan-a57256207/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:rahulmaharjan252@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <ArrowDown 
          className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
    </section>
  )
}