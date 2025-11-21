# Troubleshooting Guide

## Common Errors and Solutions

### 1. 500 Internal Server Error on /api/links

**Symptoms:**
- Console shows: `Failed to load resource: the server responded with a status of 500`
- Dashboard doesn't load links

**Causes & Solutions:**

#### A. Database not configured
```
Error: DATABASE_URL is not set
```
**Solution:**
1. Open `.env.local`
2. Replace the placeholder with your actual Neon connection string
3. Restart the dev server

#### B. Database table doesn't exist
```
Error: relation "links" does not exist
```
**Solution:**
```bash
npm run init-db
```

#### C. Invalid connection string
```
Error: Connection timeout / Connection refused
```
**Solution:**
1. Go to your Neon dashboard
2. Copy the connection string again
3. Make sure you're using the "Pooled connection" string
4. Update `.env.local`
5. Restart dev server

---

### 2. Environment Variables Not Loading

**Symptoms:**
- Changes to `.env.local` don't take effect
- Still seeing placeholder values

**Solution:**
1. Make sure the file is named exactly `.env.local` (not `.env.local.txt`)
2. Restart your dev server completely (Ctrl+C, then `npm run dev`)
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### 3. Port 3000 Already in Use

**Symptoms:**
```
Error: Port 3000 is already in use
```

**Solution:**

**Option A:** Use a different port
```bash
npm run dev -- -p 3001
```

**Option B:** Kill the process using port 3000

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -ti:3000 | xargs kill -9
```

---

### 4. Module Not Found Errors

**Symptoms:**
```
Error: Cannot find module '@neondatabase/serverless'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### 5. TypeScript Errors

**Symptoms:**
- Red squiggly lines in VS Code
- Build fails with type errors

**Solution:**
1. Make sure TypeScript is installed:
   ```bash
   npm install -D typescript @types/node @types/react @types/react-dom
   ```

2. Restart your IDE/editor

3. Check `tsconfig.json` exists

---

### 6. Redirect Not Working (404)

**Symptoms:**
- Created a link successfully
- But visiting `/:code` returns 404

**Possible Causes:**

#### A. Link doesn't exist in database
**Check:**
```bash
# Visit the API directly
curl http://localhost:3000/api/links/yourcode
```

If it returns 404, the link wasn't created properly.

#### B. Code format is wrong
**Solution:**
- Codes must be 6-8 alphanumeric characters
- Only letters and numbers (no special characters)

---

### 7. Clicks Not Incrementing

**Symptoms:**
- Redirect works
- But click count stays at 0

**Solution:**
1. Check browser console for errors
2. Verify database connection is working
3. Try creating a new link and testing it
4. Check if the `last_clicked_at` field is updating

---

### 8. Neon Database Issues

#### A. Project Suspended
**Symptoms:**
```
Error: Connection timeout
```

**Solution:**
- Free Neon projects suspend after inactivity
- Go to Neon dashboard and wake up the project
- Or create a new project

#### B. Connection Limit Reached
**Symptoms:**
```
Error: Too many connections
```

**Solution:**
- Use the "Pooled connection" string from Neon
- Close unused database connections
- Restart your dev server

---

### 9. Build Errors

**Symptoms:**
```
npm run build fails
```

**Common Issues:**

#### A. TypeScript errors
```bash
# Check for errors
npm run lint
```

#### B. Missing dependencies
```bash
npm install
```

#### C. Environment variables
- Make sure `.env.local` is set up
- For production, set environment variables in Vercel

---

### 10. Deployment Issues

#### A. Vercel Build Fails
**Solution:**
1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version (should be 18+)

#### B. Database Connection in Production
**Solution:**
1. Add `DATABASE_URL` to Vercel environment variables
2. Use the Neon connection string (not localhost)
3. Redeploy after adding env vars

#### C. Redirects Don't Work in Production
**Solution:**
1. Make sure database is initialized
2. Check Vercel function logs
3. Verify `NEXT_PUBLIC_BASE_URL` is set correctly

---

## Debugging Tips

### 1. Check Server Logs
Look at your terminal where `npm run dev` is running for error messages.

### 2. Check Browser Console
Open DevTools (F12) and look at the Console tab for errors.

### 3. Check Network Tab
In DevTools, go to Network tab to see API request/response details.

### 4. Test API Directly
Use curl or Postman to test API endpoints:
```bash
# Health check
curl http://localhost:3000/api/healthz

# List links
curl http://localhost:3000/api/links

# Create link
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}'
```

### 5. Check Database
Use a database client (like TablePlus or pgAdmin) to connect to your Neon database and verify:
- Table exists
- Data is being inserted
- Queries work

---

## Still Stuck?

1. Read the error message carefully
2. Check the [README.md](./README.md) for setup instructions
3. Review [SETUP_NOW.md](./SETUP_NOW.md) for quick start
4. Search for the error message online
5. Check Next.js documentation
6. Check Neon documentation

---

## Getting Help

When asking for help, include:
1. The exact error message
2. What you were trying to do
3. What you've already tried
4. Your Node.js version (`node --version`)
5. Your npm version (`npm --version`)
6. Operating system

Example:
```
I'm getting a 500 error when trying to create a link.
Error: "relation 'links' does not exist"
I've tried running npm run init-db but it says DATABASE_URL is not set.
Node: v20.0.0, npm: 10.0.0, Windows 11
```
