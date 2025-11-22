# Deployment Error Troubleshooting

## How to Find the Exact Error

### Step 1: Check Vercel Build Logs

1. Go to [vercel.com](https://vercel.com)
2. Click on your **tinylink** project
3. Click on **Deployments** tab
4. Click on the **latest deployment** (the one that failed)
5. You'll see the build logs - scroll through to find the error

**Look for:**
- Red error messages
- "Build failed" messages
- Module not found errors
- TypeScript errors
- Database connection errors

### Step 2: Common Deployment Errors & Solutions

---

## Error 1: "Module not found" or "Cannot find module"

**Example:**
```
Error: Cannot find module '@neondatabase/serverless'
```

**Solution:**
Make sure all dependencies are in `dependencies` (not `devDependencies`):

```bash
# Run this locally
npm install @neondatabase/serverless --save
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

---

## Error 2: TypeScript Build Errors

**Example:**
```
Type error: Property 'code' does not exist on type...
```

**Solution:**
Build locally first to catch errors:

```bash
cd tinylink
npm run build
```

If it fails locally, fix the errors shown, then push.

---

## Error 3: Environment Variables Not Set

**Example:**
```
Error: DATABASE_URL is not set
```

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add `DATABASE_URL` with your Neon connection string
3. Add `NEXT_PUBLIC_BASE_URL` with your Vercel URL
4. **Important:** Redeploy after adding variables

---

## Error 4: 404 NOT_FOUND After Deployment

**This is what you're seeing!**

**Possible Causes:**

### A. Database Table Doesn't Exist

**Solution:**
1. Make sure environment variables are set in Vercel
2. After deployment, visit: `https://your-app.vercel.app/api/init`
3. You should see: `{"success": true, "message": "Database initialized..."}`
4. Then delete the init endpoint

### B. Wrong Base URL

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL
3. Example: `https://tinylink-abc123.vercel.app` (no trailing slash)
4. Redeploy

### C. Database Connection Issues

**Solution:**
1. Check if your Neon database is active (not suspended)
2. Use the **pooled connection string** from Neon
3. Make sure it includes `?sslmode=require`
4. Test the connection by visiting `/api/healthz`

---

## Error 5: Build Timeout

**Example:**
```
Error: Build exceeded maximum duration
```

**Solution:**
This is rare with Next.js. Usually means:
- Too many dependencies
- Infinite loop in build process
- Check your build logs for what's taking long

---

## Error 6: Function Size Limit

**Example:**
```
Error: Function size exceeds limit
```

**Solution:**
- Remove unused dependencies
- Check if you're bundling large files

---

## Step-by-Step Debugging Process

### 1. Test Local Build

```bash
cd tinylink
npm run build
```

If this fails, fix the errors before deploying.

### 2. Check Environment Variables

Visit after deployment:
```
https://your-app.vercel.app/api/debug
```

Should show:
```json
{
  "env": {
    "hasDatabaseUrl": true,
    "hasBaseUrl": true,
    "nodeEnv": "production"
  }
}
```

If any are `false`, add them in Vercel settings.

### 3. Initialize Database

Visit:
```
https://your-app.vercel.app/api/init
```

Should show success message.

### 4. Test Health Check

Visit:
```
https://your-app.vercel.app/api/healthz
```

Should return:
```json
{
  "ok": true,
  "version": "1.0"
}
```

### 5. Test Main App

Visit:
```
https://your-app.vercel.app
```

Should show the dashboard.

---

## Quick Fixes Checklist

- [ ] Environment variables added in Vercel
- [ ] Redeployed after adding env vars
- [ ] Local build works (`npm run build`)
- [ ] Database is active in Neon
- [ ] Using pooled connection string
- [ ] Visited `/api/init` to create table
- [ ] `/api/healthz` returns 200
- [ ] No TypeScript errors locally

---

## Get Detailed Error Information

### Option 1: Check Vercel Function Logs

1. Vercel Dashboard → Your Project
2. Click **Deployments**
3. Click on the deployment
4. Click **Functions** tab
5. Look for error logs

### Option 2: Check Runtime Logs

1. Vercel Dashboard → Your Project
2. Click **Logs** (if available)
3. Filter by errors

### Option 3: Test API Endpoints Directly

```bash
# Test health check
curl https://your-app.vercel.app/api/healthz

# Test debug endpoint
curl https://your-app.vercel.app/api/debug

# Test init endpoint
curl https://your-app.vercel.app/api/init

# Test list links
curl https://your-app.vercel.app/api/links
```

---

## Still Not Working?

**Share these details:**

1. **Exact error message** from Vercel build logs
2. **Screenshot** of the error page
3. **Your Vercel URL**
4. **Result of** `npm run build` locally
5. **Environment variables** status (don't share actual values!)

**Example:**
```
Error: 404 NOT_FOUND
Vercel URL: https://tinylink-abc123.vercel.app
Local build: ✓ Success
Env vars: DATABASE_URL ✓ set, NEXT_PUBLIC_BASE_URL ✓ set
/api/healthz: Returns 500
/api/debug: Shows hasDatabaseUrl: true
```

This helps identify the exact issue!
