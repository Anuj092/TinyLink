# Quick Start Guide

Get TinyLink running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Neon account (free at [neon.tech](https://neon.tech))

## Step 1: Get the Database URL

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb`)

## Step 2: Set Up the Project

```bash
# Navigate to the project directory
cd tinylink

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and add your database URL
# DATABASE_URL=postgresql://your-connection-string
# NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Step 3: Initialize Database

```bash
npm run init-db
```

You should see: "Database initialized successfully!"

## Step 4: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Test It Out

1. Click "Add New Link"
2. Enter a URL (e.g., `https://google.com`)
3. Optionally enter a custom code (e.g., `google1`)
4. Click "Create Link"
5. Copy the short URL and test it in a new tab
6. Check the stats page
7. Watch the click count increment!

## Common Issues

### "DATABASE_URL is not set"
- Make sure you created `.env.local`
- Check that the variable name is exactly `DATABASE_URL`
- Restart the dev server after changing env files

### "Failed to initialize database"
- Verify your Neon connection string is correct
- Check if your Neon project is active
- Try using the pooled connection string from Neon

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Database connection timeout
- Check your internet connection
- Verify Neon project is not suspended
- Try the connection string in a database client

## Next Steps

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
- Check [TESTING.md](./TESTING.md) for testing guidelines
- Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) to understand the codebase

## Quick Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npm run init-db      # Initialize database schema

# Code Quality
npm run lint         # Run ESLint
```

## Environment Variables

```env
# Required
DATABASE_URL=postgresql://user:password@host/database

# Optional (defaults to http://localhost:3000 in dev)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Project URLs

- Dashboard: http://localhost:3000
- Health Check: http://localhost:3000/healthz
- API Docs: See [README.md](./README.md#api-endpoints)

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review [TESTING.md](./TESTING.md) for testing examples
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
