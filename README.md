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
| DB (dev) | PostgreSQL |
| DB (prod) | PostgreSQL (e.g. Neon) |

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env — set DATABASE_URL to a PostgreSQL connection string
# and NEXTAUTH_SECRET to any random string

# 3. Apply the database schema
npx prisma migrate deploy

# 4. Start the development server
npm run dev
```

Open http://localhost:3000

## Deploying to Vercel

1. Push this repository to GitHub
2. Import it in vercel.com — it auto-detects Next.js
3. Add these Environment Variables in the Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g. from [Neon](https://neon.tech), free tier available)
   - `NEXTAUTH_SECRET`: A long random string (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: Your full Vercel deployment URL (e.g. `https://your-app.vercel.app`)

4. Deploy — Vercel runs `npm run build` which automatically runs `prisma migrate deploy` to set up the database schema.

> **Important**: SQLite is not supported on Vercel because its filesystem is read-only. This project uses PostgreSQL for both development and production. You can get a free PostgreSQL database from [Neon](https://neon.tech).
