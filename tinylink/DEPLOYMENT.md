# Deployment Guide

## Quick Deploy to Vercel + Neon

### Step 1: Set up Neon Database

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project (choose a region close to your users)
3. Copy the connection string (it looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb`)

### Step 2: Deploy to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Configure environment variables:
   - Click "Environment Variables"
   - Add `DATABASE_URL` with your Neon connection string
   - Add `NEXT_PUBLIC_BASE_URL` with your Vercel URL (you'll get this after first deploy, or use `https://your-project.vercel.app`)

5. Click "Deploy"

### Step 3: Initialize Database

After deployment, you need to initialize the database schema:

**Option A: Using Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel env pull .env.local
npm run init-db
```

**Option B: Using a temporary script**
1. Create a temporary API route at `app/api/init/route.ts`:
```typescript
import { initDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await initDb();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

2. Visit `https://your-app.vercel.app/api/init` once
3. Delete the route after initialization

### Step 4: Update Base URL

1. Go to your Vercel project settings
2. Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL
3. Redeploy

### Step 5: Test

Visit your deployed app and test:
- Create a link
- Visit the short URL
- Check stats
- Delete a link
- Visit `/healthz`

## Alternative: Deploy to Render

1. Create account at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables
5. Deploy

## Environment Variables Reference

```env
# Required
DATABASE_URL=postgresql://user:password@host/database

# Required for production
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
```

## Troubleshooting

### Database Connection Issues
- Verify your DATABASE_URL is correct
- Check if your Neon project is active
- Ensure you're using the pooled connection string

### Build Failures
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### Redirect Not Working
- Ensure database is initialized
- Check if the link exists in the database
- Verify the code format is correct

## Monitoring

- Check Vercel logs for errors
- Monitor Neon dashboard for database performance
- Use `/healthz` endpoint for uptime monitoring
