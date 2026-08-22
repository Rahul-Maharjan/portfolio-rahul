"use client";

import { useRouter } from "next/navigation";
import { LuLogOut, LuSettings, LuExternalLink } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const AdminHeader = ({ email }: { email?: string }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <LuSettings className="h-5 w-5 text-primary" />
          <span className="font-bold">Admin</span>
          {email && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {email}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
          >
            <LuExternalLink className="h-4 w-4 mr-2" />
            View Site
          </Button>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive"
          >
            <LuLogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
