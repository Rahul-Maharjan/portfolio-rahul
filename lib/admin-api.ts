export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      (data as { error?: string }).error || `Request failed (${res.status})`,
    );
  }
  return res.json() as Promise<T>;
}

export const adminApi = {
  projects: {
    create: (data: Record<string, unknown>) =>
      api("/api/admin/projects", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Record<string, unknown>) =>
      api(`/api/admin/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    remove: (id: string) =>
      api(`/api/admin/projects/${id}`, { method: "DELETE" }),
  },
  experience: {
    create: (data: Record<string, unknown>) =>
      api("/api/admin/experience", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Record<string, unknown>) =>
      api(`/api/admin/experience/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    remove: (id: string) =>
      api(`/api/admin/experience/${id}`, { method: "DELETE" }),
    reorder: (ids: string[]) =>
      api("/api/admin/experience/reorder", {
        method: "PUT",
        body: JSON.stringify({ ids }),
      }),
  },
  skillCategories: {
    create: (data: { title: string; icon: string }) =>
      api("/api/admin/skill-categories", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: { title: string; icon: string }) =>
      api(`/api/admin/skill-categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    remove: (id: string) =>
      api(`/api/admin/skill-categories/${id}`, { method: "DELETE" }),
  },
  skills: {
    create: (data: { name: string; level: number; categoryId: string }) =>
      api("/api/admin/skills", { method: "POST", body: JSON.stringify(data) }),
    update: (
      id: string,
      data: { name: string; level: number; categoryId: string },
    ) =>
      api(`/api/admin/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: string) =>
      api(`/api/admin/skills/${id}`, { method: "DELETE" }),
  },
  otherTechnologies: {
    create: (data: { name: string }) =>
      api("/api/admin/other-technologies", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: { name: string }) =>
      api(`/api/admin/other-technologies/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    remove: (id: string) =>
      api(`/api/admin/other-technologies/${id}`, { method: "DELETE" }),
  },
  profile: {
    get: () => api<ProfileRecord>("/api/admin/profile"),
    update: (data: ProfileRecord) =>
      api("/api/admin/profile", { method: "PUT", body: JSON.stringify(data) }),
  },
  messages: {
    list: () => api<MessageRecord[]>("/api/admin/messages"),
    markRead: (id: string, isRead: boolean) =>
      api(`/api/admin/messages/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isRead }),
      }),
    remove: (id: string) =>
      api(`/api/admin/messages/${id}`, { method: "DELETE" }),
  },
};

export type ProfileRecord = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl: string | null;
};

export type MessageRecord = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};