'use client'
import { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import { LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  // { href: "/resume.pdf", label: "Resume", external: true },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            <h3>Rahul Maharjan</h3>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              )
            )}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <LuX className="h-5 w-5" />
              ) : (
                <LuMenu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile LuMenu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 rounded-lg backdrop-blur-md border-t border-border">
            <nav className="flex flex-col py-4">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
