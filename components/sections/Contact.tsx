"use client";

import { useState } from "react";
import { LuMail, LuPhone, LuMapPin, LuSend } from "react-icons/lu";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useProfile } from "@/hooks/use-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save message");

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Failed to send message",
        description:
          "Please try again later or contact me through other means.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get In{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to
              bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "animate-fade-in-left" : "opacity-0 translate-x-8"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new projects and
                  opportunities. Whether you're a company looking to hire, or
                  you're a developer looking to collaborate, I'd love to hear
                  from you.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: LuMail,
                    label: "Email",
                    value: profile?.email ?? "",
                    href: `mailto:${profile?.email ?? ""}`,
                  },
                  {
                    icon: LuPhone,
                    label: "Phone",
                    value: profile?.phone ?? "",
                    href: `tel:${profile?.phone?.replace(/\D/g, "") ?? ""}`,
                  },
                  {
                    icon: LuMapPin,
                    label: "Location",
                    value: profile?.location ?? "",
                    href: null,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 transition-all duration-700 delay-${
                      index * 200
                    } ${
                      isVisible
                        ? "animate-fade-in-left"
                        : "opacity-0 translate-x-8"
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card
                className={`bg-gradient-card border-border shadow-card transition-all duration-700 delay-300 ${
                  isVisible
                    ? "animate-fade-in-right"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">LuSend a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={6}
                        required
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <LuSend className="h-4 w-4" />
                          <span> Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
