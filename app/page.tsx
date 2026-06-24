import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

    </div>
  );
};

export default Index;