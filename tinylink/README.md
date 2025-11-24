# TinyLink - URL Shortener

A modern URL shortener built with Next.js, TypeScript, and Tailwind CSS. Create short links, track clicks, and manage your URLs with ease.

# Deployed Link - https://tinylink-xzjt.onrender.com/

## Features

- ✨ Create short links with custom or auto-generated codes
- 📊 Track click statistics for each link
- 🔍 Search and filter links
- 📱 Responsive design
- 🚀 Fast redirects with click tracking
- 💾 PostgreSQL database (Neon)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon Postgres database (free tier available at [neon.tech](https://neon.tech))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tinylink
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database URL:
```env
DATABASE_URL=postgresql://user:password@host/database
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Initialize the database:
```bash
npm run init-db
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Create Link
```
POST /api/links
Body: { "url": "https://example.com", "code": "optional" }
Response: 201 Created | 409 Conflict (code exists) | 400 Bad Request
```

### List Links
```
GET /api/links
Response: 200 OK with array of links
```

### Get Link Stats
```
GET /api/links/:code
Response: 200 OK | 404 Not Found
```

### Delete Link
```
DELETE /api/links/:code
Response: 200 OK | 404 Not Found
```

### Health Check
```
GET /api/healthz
Response: { "ok": true, "version": "1.0", "uptime": 123, "timestamp": "..." }
```

### Redirect
```
GET /:code
Response: 302 Redirect | 404 Not Found
```

## Pages

- `/` - Dashboard (list, add, delete links)
- `/code/:code` - Stats page for a specific link
- `/:code` - Redirect to target URL
- `/healthz` - System health check

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository on [Vercel](https://vercel.com)

3. Add environment variables:
   - `DATABASE_URL` - Your Neon Postgres connection string
   - `NEXT_PUBLIC_BASE_URL` - Your deployed URL (e.g., https://your-app.vercel.app)

4. Deploy!

5. After deployment, initialize the database:
```bash
# Set your DATABASE_URL locally or use Vercel CLI
npm run init-db
```

### Database Setup (Neon)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your environment variables

## Code Structure

```
tinylink/
├── app/
│   ├── api/
│   │   ├── healthz/route.ts      # Health check endpoint
│   │   └── links/
│   │       ├── route.ts           # Create/list links
│   │       └── [code]/route.ts    # Get/delete specific link
│   ├── code/[code]/page.tsx       # Stats page
│   ├── [code]/route.ts            # Redirect handler
│   ├── healthz/page.tsx           # Health check page
│   ├── page.tsx                   # Dashboard
│   └── layout.tsx                 # Root layout
├── lib/
│   ├── db.ts                      # Database connection & schema
│   └── utils.ts                   # Utility functions
└── scripts/
    └── init-db.ts                 # Database initialization
```

## Validation Rules

- **URLs**: Must be valid HTTP/HTTPS URLs
- **Codes**: 6-8 alphanumeric characters [A-Za-z0-9]
- **Uniqueness**: Codes are globally unique

## Features Checklist

- ✅ Create short links with custom codes
- ✅ Auto-generate codes if not provided
- ✅ Validate URLs and codes
- ✅ Handle duplicate codes (409 error)
- ✅ Redirect with click tracking
- ✅ Delete links
- ✅ View statistics per link
- ✅ Search/filter links
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ Health check endpoint

## License

MIT
