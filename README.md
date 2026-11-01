# AI Mystery Room

An AI-powered detective experience built around the product requirements in [`spec.md`](./spec.md). Guests create a fictional case, inspect evidence and suspect profiles, track reviewed clues, submit one accusation, and unlock the solution.

## Stack

- **Client:** React, TypeScript, Vite, React Router, Axios, Lucide, custom responsive CSS
- **Server:** Node.js, Express, TypeScript, MongoDB/Mongoose, Zod, Google Gemini (`@google/genai`)
- **Security:** Gemini credentials stay on the server; public case responses omit the solution; random guest investigation tokens protect access; accusation submissions are locked after first use; Helmet and API rate limiting are enabled.

## Run locally

Requirements: Node.js 20+ and MongoDB. Create `server/.env` from `server/.env.example` and provide a MongoDB URI and Gemini API key.

```sh
npm install
npm run dev
```

The client runs at http://localhost:5173 and the API at http://localhost:4000. Configure `GEMINI_API_KEY`, `MONGODB_URI`, `GEMINI_MODEL`, and `CLIENT_ORIGIN` in `server/.env`. The client can use another API URL through `client/.env` with `VITE_API_URL`.

The server requires Gemini and MongoDB to generate and persist a case. If either service is not configured or reachable, generation reports an actionable error; the product does not fall back to hardcoded mystery content.

## API

Base path: `/api/v1`

- `GET /health`
- `POST /mysteries/generate`
- `GET /mysteries/:caseId`
- `GET /mysteries/:caseId/evidence?type=&suspectId=&search=`
- `POST /investigations/:caseId/evidence/:evidenceId/review`
- `POST /investigations/:caseId/accusation`
- `GET /investigations/:caseId/result` (locked until accusation)

Investigation routes require the `x-investigation-token` header returned by mystery generation. The token is kept in browser local storage for guest continuity.

## Project map

- `client/src/App.tsx` — landing page, intake, case dashboard, evidence viewer, accusation, results
- `client/src/styles.css` — responsive dark editorial design system
- `server/src/prompts/` — standalone generation prompt
- `server/src/validators/` — generated case schema and consistency checks
- `server/src/services/` — Gemini generation and retry flow
- `server/src/models/` — MongoDB case model
- `server/src/app.ts` — API, guest authorization, progress, and accusation lifecycle
