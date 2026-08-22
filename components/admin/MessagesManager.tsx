"use client";

import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { adminApi, type MessageRecord } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LuMail, LuTrash2 } from "react-icons/lu";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export const MessagesManager = () => {
  const queryClient = useQueryClient();
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: adminApi.messages.list,
  });
  const [deleting, setDeleting] = useState<MessageRecord | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-messages"] });

  const markRead = useMutation({
    mutationFn: ({ id, isRead }: { id: string; isRead: boolean }) =>
      adminApi.messages.markRead(id, isRead),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.messages.remove(id),
    onSuccess: () => {
      invalidate();
      setDeleting(null);
    },
  });

  const formatDate = (value: string) =>
    new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (isLoading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <LuMail className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No messages yet</p>
        <p className="text-muted-foreground">
          Messages sent through the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-muted-foreground">
          Messages sent through the contact form.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`bg-gradient-card border-border shadow-card ${
              message.isRead ? "opacity-70" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{message.subject}</h3>
                    {!message.isRead && (
                      <Badge className="bg-primary">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {message.name} &lt;{message.email}&gt;
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(message.createdAt)}
                  </p>
                  <p className="mt-3 text-foreground whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {message.isRead ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markRead.mutate({ id: message.id, isRead: false })}
                    >
                      Mark unread
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markRead.mutate({ id: message.id, isRead: true })}
                    >
                      Mark read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleting(message)}
                  >
                    <LuTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={() => deleting && deleteMutation.mutate(deleting.id)}
        title="Delete message?"
        description={`This will permanently remove "${deleting?.subject}" from ${deleting?.name}. This cannot be undone.`}
      />
    </div>
  );
};