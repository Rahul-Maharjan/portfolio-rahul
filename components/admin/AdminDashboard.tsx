"use client";

import { useRouter } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { ProfileManager } from "@/components/admin/ProfileManager";
import { MessagesManager } from "@/components/admin/MessagesManager";

export const AdminDashboard = ({ email }: { email: string }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">Admin</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              View Site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="projects">Work</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="profile">Profile &amp; CV</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6">
            <ProjectsManager />
          </TabsContent>
          <TabsContent value="experience" className="mt-6">
            <ExperienceManager />
          </TabsContent>
          <TabsContent value="skills" className="mt-6">
            <SkillsManager />
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
            <ProfileManager />
          </TabsContent>
          <TabsContent value="messages" className="mt-6">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};