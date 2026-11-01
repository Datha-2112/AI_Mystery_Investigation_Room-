# Deploy AI Mystery Room

Follow these five steps. You will use GitHub, MongoDB Atlas, Render, and Vercel.

## 1. Put the project on GitHub

Use GitHub Desktop: **File > Add Local Repository**, choose this project folder, then **Publish repository**. A private repository is fine.

Before publishing, confirm `server/.env` is ignored. Never upload that file; it contains your private keys.

## 2. Create the database

In [MongoDB Atlas](https://www.mongodb.com/atlas):

1. Create a cluster and a database user.
2. Copy the **Drivers** connection string. Keep it ready for Render.

You will add Render's network address to Atlas in step 3. Atlas only accepts connections from allowed IP addresses. [Atlas connection help](https://www.mongodb.com/docs/atlas/troubleshoot-connection/)

## 3. Deploy the API on Render

1. In [Render](https://dashboard.render.com/), select **New → Blueprint** and connect your GitHub repository.
2. Render reads `render.yaml`. When asked for values, enter:

   - `MONGODB_URI`: your Atlas connection string
   - `GEMINI_API_KEY`: your Gemini API key
   - `CLIENT_ORIGIN`: temporarily enter `http://localhost:5173`

3. Wait for the deploy, then copy the API URL. It looks like `https://ai-mystery-room-api.onrender.com`.
4. In Render, open the service's **Connect > Outbound** tab. Add the listed IP addresses in Atlas under **Network Access**. Wait until `https://YOUR-API-URL/api/v1/health/ready` says the database is ready.

Keep Gemini and MongoDB secrets in Render's Environment settings. [Render Blueprint help](https://render.com/docs/blueprint-spec)

## 4. Deploy the website on Vercel

1. In [Vercel](https://vercel.com/), choose **Add New > Project** and import the same GitHub repository.
2. Keep the root directory as-is and choose **Other** if asked for a framework. The included `vercel.json` supplies the build settings.
3. Add this environment variable:

   - `VITE_API_URL` = `https://YOUR-API-URL/api/v1`

4. Deploy. Copy the website URL Vercel gives you, such as `https://your-project.vercel.app`.

## 5. Connect the website to the API

1. In Render, open **Environment** for the API service.
2. Change `CLIENT_ORIGIN` from `http://localhost:5173` to your Vercel URL, with no trailing slash.
3. Save and redeploy the API.
4. In Vercel, open **Settings > Environment Variables**. If you changed the API URL, update `VITE_API_URL`, then redeploy the website.

Open the Vercel website and create a case to confirm everything works.

**Note:** Render's free API service may sleep after 15 minutes of inactivity, so the first request after a quiet period can take about a minute. [Render free service details](https://render.com/docs/free)
