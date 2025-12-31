# Mir Javed Jahanger – Portfolio

This repository contains the full-stack portfolio for Mir Javed Jahanger. The frontend is React, the backend is Express + MySQL, and both are set up to run locally or as a single deployable bundle.

## Tech Stack
- React (CRA) + React-Bootstrap
- Node.js / Express
- MySQL
- CSS3

## Local Development
1) Install dependencies at the root: `npm install`
2) Install backend dependencies: `cd backend && npm install`
3) Copy backend env: `cp backend/.env.example backend/.env` and set DB credentials, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, and `CORS_ORIGIN`.
4) Import sample data (optional): `mysql -u <user> -p portfolio < portfolio_full_backup.sql`
5) Start API: `cd backend && npm run dev` (default port 5001)
6) Start frontend: `npm start` (default port 3000, uses `REACT_APP_API_URL` or falls back to `http://localhost:5001/api`)
7) Admin panel: open `/admin` and sign in with the credentials from `.env` to edit About, Site Settings, Projects, etc.

## Build & Single-Folder Deploy
- Build frontend: `npm run build` (outputs `/build`)
- Start production server: `node backend/src/server.js` (serves `/api/*` and the `/build` folder)
- Health check: `GET /api/health` returns `{status:"ok"}` when the DB is reachable.

## Notes
- Replace portfolio content via the Admin panel (About, Projects, Resume link, Skills, Blogs).
- Update SEO/meta in `public/index.html` for your preferred title and preview image.
- Resume uploads are stored under `backend/uploads/resumes` and served at `/uploads/resumes/<file>.pdf`.
