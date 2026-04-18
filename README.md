# SocialBook

A Facebook-inspired social media web application built with **Next.js 15**, **Prisma**, **NextAuth.js**, and **Tailwind CSS**. Fully deployable on Vercel.

## Features

- **Authentication** — Register and log in with email & password (JWT sessions)
- **News Feed** — Create posts, like posts, comment on posts
- **User Profiles** — Cover photo, avatar, bio, post history
- **Friend System** — Send, accept, and decline friend requests
- **Responsive Layout** — 3-column Facebook-style design

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js v4 |
| ORM | Prisma |
| DB (dev) | SQLite |
| DB (prod) | PostgreSQL (e.g. Neon) |

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env and set NEXTAUTH_SECRET to any random string

# 3. Create the database
npx prisma db push

# 4. Start the development server
npm run dev
```

Open http://localhost:3000

## Deploying to Vercel

1. Push this repository to GitHub
2. Import it in vercel.com — it auto-detects Next.js
3. Add these Environment Variables in the Vercel dashboard:
   - DATABASE_URL: Your PostgreSQL connection string (e.g. from Neon https://neon.tech)
   - NEXTAUTH_SECRET: A long random string
   - NEXTAUTH_URL: Your Vercel deployment URL

4. Deploy — Vercel runs npm run build automatically.

Note: For the production database, use a hosted PostgreSQL provider such as Neon (free tier available).
Change the provider in prisma/schema.prisma from "sqlite" to "postgresql" before deploying.
