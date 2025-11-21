# 🚀 Setup Instructions - Start Here!

## You're seeing a 500 error because the database isn't configured yet. Here's how to fix it:

### Step 1: Get a Free Neon Database (2 minutes)

1. Go to **[neon.tech](https://neon.tech)** and sign up (it's free!)
2. Click **"Create a project"**
3. Give it a name like "tinylink"
4. Click **"Create project"**
5. You'll see a connection string that looks like:
   ```
   postgresql://username:password@ep-cool-sound-12345.us-east-2.aws.neon.tech/neondb
   ```
6. **Copy this entire string!**

### Step 2: Update Your Environment File

1. Open the file: `tinylink/.env.local`
2. Replace this line:
   ```
   DATABASE_URL=postgresql://user:password@host/database
   ```
   
   With your actual connection string:
   ```
   DATABASE_URL=postgresql://username:password@ep-cool-sound-12345.us-east-2.aws.neon.tech/neondb
   ```

3. Save the file

### Step 3: Initialize the Database

Open a terminal in the `tinylink` folder and run:

```bash
npm run init-db
```

You should see: **"Database initialized successfully!"**

### Step 4: Restart the Dev Server

If your dev server is running, stop it (Ctrl+C) and restart:

```bash
npm run dev
```

### Step 5: Test It!

1. Open [http://localhost:3000](http://localhost:3000)
2. Click **"+ Add New Link"**
3. Enter a URL like: `https://google.com`
4. Enter a custom code like: `google1`
5. Click **"Create Link"**
6. Copy the short URL and test it!

---

## Still Having Issues?

### Error: "DATABASE_URL is not set"
- Make sure you saved the `.env.local` file
- Restart your dev server after changing environment variables

### Error: "Failed to initialize database"
- Check that your Neon connection string is correct
- Make sure your Neon project is active (not suspended)
- Try copying the connection string again from Neon

### Error: "Connection timeout"
- Check your internet connection
- Verify your Neon project is running
- Try the "Pooled connection" string from Neon instead

---

## Quick Commands Reference

```bash
# Install dependencies (if you haven't)
npm install

# Initialize database (after setting DATABASE_URL)
npm run init-db

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## What's Next?

Once everything is working:

1. ✅ Test all features (create, redirect, stats, delete)
2. 📝 Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel
3. 🎥 Record your video walkthrough
4. 📤 Submit your project

Good luck! 🎉
