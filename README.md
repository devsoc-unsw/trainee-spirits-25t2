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

## Common issues & troubleshooting

1. Nothing shows in the `AppLayout` (blank loading screen)

- Cause: the app waits for memos to load and `loading` never becomes `false`. Ensure the backend is reachable and that the frontend has a valid token saved in `localStorage` (after a successful OAuth flow). If zero tokens, the frontend may skip fetching memos and leave `loading` stuck.
- Fix:
  - Check browser localStorage for `token` key.
  - Check backend console for requests to `/memos` and any errors.
  - Make sure `VITE_API_URL` matches backend URL.

2. OAuth POST `/auth/google` 500 error

- Common causes:
  - `jsonwebtoken` not imported in `backend/routes/auth.js` (server will throw ReferenceError). This repo includes a fix that imports `jsonwebtoken` and returns token, but if you modified files check `auth.js` to ensure `jwt` is defined.
  - Missing `JWT_SECRET` env var in backend `.env`.
- Fixes:
  - Ensure `JWT_SECRET` is present in `backend/.env`.
  - Check backend logs for the exact error and stack trace.

3. `Leftbar` / import casing issues (macOS vs Linux/CI)

- Problem: imports like `import Leftbar from "../components/Leftbar";` conflict with an on-disk filename `leftbar.jsx`. Some file systems (macOS default) are case-insensitive and git history can contain different casings causing build failures on case-sensitive systems or bundlers.
- Quick fix:

```bash
# from repo root
git mv frontend/src/components/Leftbar.jsx frontend/src/components/Leftbar-temp.jsx
git mv frontend/src/components/Leftbar-temp.jsx frontend/src/components/Leftbar.jsx
git add -A
git commit -m "Normalize Leftbar filename casing"
```

- Or ensure all imports match the actual file name exactly.

4. Map/Leaflet shows blank area or height problems

- Leaflet requires its container to have an explicit height. If you use `h-full` (height:100%) the parent must have a defined height too. Recommended layout:

```jsx
// in App.jsx
<div className="flex flex-col min-h-screen">
  <Navbar />
  <main className="flex-1 overflow-auto">
    <Routes>...</Routes>
  </main>
</div>
```

Then the map's container can use `className="w-full h-full"` or the Leftbar can use `min-h-screen`.

5. `npm` not found when trying to start backend

- Ensure Node and npm are installed and available in PATH. If `npm` is missing, install Node.js or use `nvm` to install a Node version.

6. CORS issues

- Backend reads `CLIENT_URL` env var to configure allowed origins. Make sure this contains your frontend URL.

---

## Testing endpoints manually

Example: create/login user via Google emulation (useful when OAuth flow is difficult to reproduce)

```bash
curl -X POST http://localhost:3000/auth/google \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo User","email":"demo@example.com","googlePhotoUrl":"https://i.pravatar.cc/150"}'
```

A successful response includes a `token` field. Save that token to localStorage in the browser (key `token`) or let the frontend store it after the OAuth flow.

Example: get memos

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/memos
```

---

## Project structure (top-level)

```
frontend/        # Vite + React app
backend/         # Express API, mongoose models
package.json     # optional root scripts (if present)
README.md
```

---

## Recommended next improvements

- Extract a frontend `services/api.js` to centralize API calls and token handling (reduces duplicate fetch logic).
- Move business logic in backend routes into service modules for easier testing.
- Add automated tests for backend services and a few critical frontend components.
- Store photos in cloud storage (S3/GCS) instead of Base64 strings for production readiness.

---

## How to contribute

- Fork the repository, create a feature branch, and open a PR. Describe the change and include any manual testing steps.

---

If you want, I can:

- Add a small `frontend/README.local.md` with step-by-step setup for Firebase and Vite env.
- Create a `src/services/api.js` and refactor a couple of components to use it.

Tell me which of the above you'd like me to do next and I will make the changes.
