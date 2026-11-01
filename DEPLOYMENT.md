# Deployment walkthrough

This repo deploys as two services:

- **Frontend:** Vercel, from the `client` directory.
- **API:** Render Web Service, configured by the root `render.yaml`.
- **Database:** MongoDB Atlas.
- **Mystery generation:** Gemini, called only from the API.

## 1. Prepare the repository

1. Create a GitHub repository and push this project to its `main` branch.
2. Before committing, run `git status --short` and make sure `server/.env` is not listed. `.env` files are ignored. Never paste `.env` into a public issue or commit it; use the platform environment settings for secrets.

## 2. Prepare MongoDB Atlas

1. In Atlas, create or select a cluster and create a database user with a strong password.
2. In **Network Access**, add the outbound IP ranges shown for your Render service. Render shows these under the service's **Connect → Outbound** tab. If you create Atlas first, you can add these ranges after Render creates the service.
3. Copy Atlas's **Drivers** connection string. Replace the username/password placeholders, URL-encode special characters in the password, and select a database name such as `ai-mystery-room`.

Atlas rejects connections from IPs that are not on the project's access list. Add Render's outbound ranges instead of opening Atlas to every IP when possible. [Atlas connection troubleshooting](https://www.mongodb.com/docs/atlas/troubleshoot-connection/) · [Render outbound IPs](https://render.com/docs/outbound-ip-addresses)

## 3. Deploy the frontend to Vercel

1. Import the GitHub repository as a new Vercel project.
2. Keep **Root Directory** at the repository root and select **Other** as the framework preset. The root `vercel.json` installs from the npm workspace lockfile, builds only the client workspace, publishes `client/dist`, and routes app pages back to the SPA.
3. Add this environment variable for Production (and Preview too if you plan to test preview deployments):

   | Name | Value |
   | --- | --- |
   | `VITE_API_URL` | `https://YOUR-RENDER-SERVICE.onrender.com/api/v1` |

   The API URL is public configuration, not a secret. Vite embeds `VITE_` variables in the browser bundle; never put `GEMINI_API_KEY` or `MONGODB_URI` in Vercel.

4. Deploy. Vercel assigns a domain such as `https://your-project.vercel.app`. The rewrite lets app pages such as `/investigation/...` load when refreshed. [Vercel Vite deployment](https://vercel.com/docs/frameworks/frontend/vite) · [Vercel monorepos](https://vercel.com/docs/monorepos)

You can initially use a placeholder Render URL in `VITE_API_URL`; set the real service URL and redeploy after Render is live.

## 4. Deploy the API to Render

1. In Render, choose **New → Blueprint** and connect the same GitHub repository. Render reads the root `render.yaml` and creates the API web service.
2. When prompted for Blueprint values, enter:

   | Name | Value |
   | --- | --- |
   | `MONGODB_URI` | The Atlas connection string from step 2 |
   | `GEMINI_API_KEY` | Your Gemini API key |
   | `CLIENT_ORIGIN` | The exact Vercel site origin, e.g. `https://your-project.vercel.app` |

   For a custom frontend domain, use that origin instead. Multiple allowed origins may be comma-separated; do not include a path or trailing slash.

3. Wait for the build and deploy to finish. The service listens on Render's injected `PORT` and binds to `0.0.0.0`. The Blueprint health check uses the shallow `/api/v1/health` endpoint so the process can start while MongoDB reconnects.
4. Open **Connect → Outbound** on the Render service and add its listed IP ranges to Atlas **Network Access** if you have not already. Wait for MongoDB to connect; `/api/v1/health/ready` returns success once the database is ready.
5. Copy the Render service URL, for example `https://ai-mystery-room-api.onrender.com`. Update Vercel's `VITE_API_URL` to add `/api/v1` and redeploy the frontend.

Render's `sync: false` Blueprint variables are requested when the Blueprint is first created. Add or change them later in the service's **Environment** page. [Render Blueprints](https://render.com/docs/blueprint-spec) · [Render environment variables](https://render.com/docs/configure-environment-variables)

## 5. Verify the deployment

Open these URLs in a browser, replacing the hostname with your Render URL:

- `https://YOUR-RENDER-SERVICE.onrender.com/api/v1/health` — API process responds; database status is included.
- `https://YOUR-RENDER-SERVICE.onrender.com/api/v1/health/ready` — returns success only when MongoDB is connected.
- `https://YOUR-VERCEL-SITE.vercel.app` — frontend loads.

Then create a case with at least 30 characters, open evidence, submit one accusation, and confirm the results page reveals the solution. The first request to a free Render web service can be slow after inactivity: free services spin down after 15 minutes without traffic and may take about a minute to wake. For a consistently responsive public app, use an always-on plan. [Render free services](https://render.com/docs/free)

## Environment variables at a glance

**Render only:**

- `MONGODB_URI` — Atlas connection string
- `GEMINI_API_KEY` — private Gemini credential
- `GEMINI_MODEL` — defaults to `gemini-3.8-flash`
- `CLIENT_ORIGIN` — Vercel production origin(s)
- `NODE_ENV=production`
- `PORT` — supplied by Render

**Vercel only:**

- `VITE_API_URL` — public Render API URL ending in `/api/v1`
