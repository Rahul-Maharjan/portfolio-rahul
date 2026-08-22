import { getSession } from "@/lib/auth";
import { AdminHeader } from "@/components/layout/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <AdminHeader email={session?.email} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
