# GeoMemo — Full‑stack demo

A small full‑stack project for saving geo-tagged memos (photos, notes) on a map.

This repository contains two apps:

- `backend/` — Express + MongoDB API (JWT authentication)
- `frontend/` — Vite + React frontend using Firebase for Google sign-in

This README explains how to run the project locally, required env variables, common pitfalls and quick troubleshooting steps.

---

## Features

- Google sign-in (Firebase) on the frontend
- Backend issues a JWT token for API authentication
- Create / list / delete geo memos with location (GeoJSON Point) and photos (Base64 strings)
- Leaflet map view with clickable creation flow
- Simple swagger docs exposed in backend

---

## Prerequisites

- Node.js (>=16/18) and npm installed
- A running MongoDB instance (Atlas or local)
- A Firebase project with web app configured (for Google sign-in)

If `npm` is not found, install Node.js from https://nodejs.org/en/ or use a version manager like nvm.

---

## Environment variables

### Backend (`/backend/.env`)

Create a `.env` file inside `backend/` with at least:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/...    # or mongodb://localhost:27017/geomemo
CLIENT_URL=http://localhost:5173                     # frontend origin(s), comma-separated for multiple
SESSION_SECRET=some-session-secret
JWT_SECRET=some-jwt-secret
PORT=3000
NODE_ENV=development
```

Notes:

- `CLIENT_URL` is used by the backend CORS middleware; make sure it matches the frontend URL (e.g. `http://localhost:5173` for Vite).

### Frontend (`/frontend/.env` or `.env.local`)

Create a file in `frontend/` and add the Vite env variables (prefix `VITE_`):

```
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
# Optional: other firebase values are already in code, but you may want to use env for them
```

Important: Vite only exposes env vars prefixed with `VITE_` to the browser.

---

## Install & run (development)

Open two terminals (or use your preferred process manager):

1. Backend

```bash
cd backend
npm install
# start server
npm start
# server listens on PORT (default 3000)
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
# Vite will serve the app (default http://localhost:5173)
```

Open your browser at the frontend URL, sign in with Google, and use the map to create memos.

If you prefer a single terminal, consider running the two commands in separate panes or using a process runner (concurrently, tmux, etc.).

---

## Quick API summary

- POST /auth/google

  - Body: { name, email, googlePhotoUrl } (frontend sends this after Firebase sign-in)
  - Response: { message, user, token }
  - The server returns a JWT token which the frontend stores in `localStorage`.

- GET /memos

  - Requires Authorization: `Bearer <token>` header
  - Returns list of memos for the authenticated user

- POST /memos

  - Body: { title, notes, location: { type: "Point", coordinates: [lng, lat] }, photos: [] }
  - Returns created memo

- DELETE /memos/:id

  - Requires Authorization header

- GET /users
  - Returns users (admin type route in this project)

Swagger UI is available at `http://localhost:3000/api-docs` when backend is running.

---
