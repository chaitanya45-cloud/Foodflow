# FoodFlow — Smart Inventory Management System

> *From pantry to plate — inventory that thinks ahead.*

FoodFlow is a premium restaurant inventory management platform with predictive reordering, expiry rescue suggestions, recipe-to-stock cascade, and margin analytics.

![FoodFlow](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)

## Features

- **Dashboard** — KPIs, expiry rescue panel, predictive reorder forecast
- **Inventory** — 30+ ingredients with stock levels, par tracking, status badges
- **Recipes & Menu** — Live cost/margin per dish with ingredient linkage
- **Orders** — Supplier directory and purchase order management
- **Analytics** — Waste trends, category spend, margin radar
- **Settings** — Restaurant profile, alerts, team roles

## Quick Start

```bash
# Install dependencies
npm install

# Set up database
npm run db:migrate
npm run db:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — or visit `/login` for the branded sign-in page.

## Demo Restaurant

**Bella Verde Kitchen** — Italian-inspired, farm-to-table

- 30 ingredients across 6 categories
- 5 recipes linked to menu items
- 3 suppliers with purchase orders

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** with custom FoodFlow design tokens
- **Prisma 7** + SQLite
- **Recharts** for analytics
- **Lucide React** icons

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed demo data |
| `npm run db:reset` | Reset and re-seed database |

## Environment

Create a `.env` file (included by default):

```
DATABASE_URL="file:./dev.db"
```

## Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import `chaitanya45-cloud/Foodflow` from GitHub
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — no extra env vars needed

> **Note:** SQLite only works locally. On Vercel, the app automatically uses embedded demo data so deployment works out of the box.

For local development with the real database:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

## Design

- **Colors:** Sage green, warm amber, soft cream, coral accents
- **Fonts:** Fraunces (display) + DM Sans (body)
- **Motif:** Culinary-tech aesthetic with grain textures and freshness bars

---

Built as a YC demo-day quality restaurant operations platform.
