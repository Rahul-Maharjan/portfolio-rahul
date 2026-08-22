"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { ProfileManager } from "@/components/admin/ProfileManager";
import { MessagesManager } from "@/components/admin/MessagesManager";

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
};