# Task: Make Next.js App Full-Stack (Postgres + ORM + Vercel)

**Stack decision:**
- DB: Neon (free tier, serverless Postgres, integrates natively with Vercel)
- ORM: Prisma
- Hosting: Vercel

---

## 0. Prerequisites
- [ ] Next.js app pushed to a GitHub repo
- [ ] Vercel account connected to that GitHub repo
- [ ] Node 18+ locally

---

## 1. Choose your ORM
- [ ] **Prisma** — best DX, great docs, auto-generated types, migration tooling. Slightly heavier, needs `prisma generate` step.
- [ ] **Drizzle** — lightweight, SQL-like, faster cold starts (good for serverless/edge), less "magic".

> Recommendation: Prisma if you want speed of development and don't mind a build step. Drizzle if you care about edge runtime / cold start latency.

This task.md assumes **Prisma**. (Drizzle steps noted in Appendix.)

---

## 2. Set up free Postgres DB (Neon)
- [ ] Go to https://neon.tech → sign up (free tier: 0.5 GB storage, autosuspend)
- [ ] Create a new project → note the connection string (starts with `postgresql://`)
- [ ] Alternative: use **Vercel Storage → Postgres** tab in your Vercel dashboard, which now provisions a Neon DB directly and auto-injects env vars into your project. This is the easiest path since it skips manual env var copying.

---

## 3. Install Prisma
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```
This creates:
- `prisma/schema.prisma`
- `.env` (add `DATABASE_URL` here)

- [ ] Paste your Neon connection string into `.env`:
```
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
```

---

## 4. Define your schema
- [ ] Edit `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```
- [ ] Push schema to DB (dev-friendly, no migration files):
```bash
npx prisma db push
```
- [ ] Or use proper migrations (recommended for production):
```bash
npx prisma migrate dev --name init
```

---

## 5. Create a Prisma client singleton
- [ ] Create `lib/prisma.ts`:
```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```
> Prevents exhausting DB connections from hot-reloading in dev.

---

## 6. Build API routes / Server Actions
- [ ] Example App Router API route — `app/api/users/route.ts`:
```ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const body = await req.json()
  const user = await prisma.user.create({ data: body })
  return NextResponse.json(user)
}
```
- [ ] Or use **Server Actions** directly in components for form submissions (simpler for many cases):
```ts
'use server'
import { prisma } from '@/lib/prisma'

export async function createUser(formData: FormData) {
  await prisma.user.create({
    data: { email: formData.get('email') as string },
  })
}
```

---

## 7. Handle connection pooling (important for serverless!)
Serverless functions on Vercel spin up many short-lived instances — raw Postgres connections will exhaust Neon's limit fast.
- [ ] Use Neon's **pooled connection string** (has `-pooler` in the hostname) for `DATABASE_URL` used at runtime.
- [ ] Optionally keep a separate `DIRECT_URL` (unpooled) for running migrations:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")   // pooled, used at runtime
  directUrl = env("DIRECT_URL")     // unpooled, used for migrations
}
```

---

## 8. Add build step for Prisma on Vercel
- [ ] In `package.json`, make sure `prisma generate` runs before build:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

---

## 9. Deploy to Vercel
- [ ] Push code to GitHub
- [ ] Import repo in Vercel dashboard (or `vercel` CLI)
- [ ] Add env vars in Vercel Project Settings → Environment Variables:
  - `DATABASE_URL` (pooled)
  - `DIRECT_URL` (unpooled, if using migrations)
  - (If you provisioned via Vercel Storage → these are auto-added)
- [ ] Trigger deploy

---

## 10. Run migrations against production DB
- [ ] Option A: run locally against prod `DIRECT_URL`:
```bash
npx prisma migrate deploy
```
- [ ] Option B: add a Vercel deploy hook / GitHub Action to run `prisma migrate deploy` on every deploy.

---

## 11. Verify
- [ ] Hit your deployed API route / form and confirm data lands in Neon (check via Neon dashboard SQL editor or `npx prisma studio` locally pointed at prod URL)
- [ ] Check Vercel function logs for connection errors

---

## Appendix: Drizzle alternative (steps 3–5 replacement)
```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```
- Define schema in `db/schema.ts` using `pgTable`
- `drizzle.config.ts` points to schema + `DATABASE_URL`
- `npx drizzle-kit push` to sync schema
- Client setup:
```ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client)
```
Drizzle has lower overhead and works better on Vercel Edge runtime if you need that.

---

## Free tier limits to keep in mind
- **Neon free**: 0.5 GB storage, autosuspend after inactivity (cold start ~ a few hundred ms on wake), 1 project with branching
- **Vercel free (Hobby)**: fine for personal projects; serverless function execution limits apply — check current limits in Vercel dashboard if you scale up
