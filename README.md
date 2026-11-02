# Parabondhu

Parabondhu ("friend of the neighbourhood") is a community platform where people create, join and track social service events in their local area.

**Live site:** https://parabondhu-client.vercel.app

## Features

- Create events with a type, thumbnail, location and a validated future date
- Browse upcoming events, with search by title or area and a filter by event type
- Join any upcoming event from its public details page and track joined events by date
- Update or delete your own events, with ownership enforced by JWT-protected APIs
- Log in with email and password or Google through BetterAuth
- Switch the full site between light and dark themes
- Update your name and profile picture from your profile page
- See loading skeletons while data loads, on every screen size

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, BetterAuth with the MongoDB adapter and JWT plugin, Express and MongoDB.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The API server must also be running. Set its address in `NEXT_PUBLIC_API_URL`.
