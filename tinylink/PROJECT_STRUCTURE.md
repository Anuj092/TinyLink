# Project Structure & Design Decisions

## Architecture Overview

This is a full-stack Next.js application using the App Router with server-side API routes and client-side React components.

### Tech Stack Rationale

- **Next.js 16**: Latest version with App Router for better performance and developer experience
- **TypeScript**: Type safety and better IDE support
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **Neon Postgres**: Serverless Postgres with excellent free tier and Vercel integration
- **@neondatabase/serverless**: Optimized for serverless environments with HTTP-based queries

## Directory Structure

```
tinylink/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── healthz/
│   │   │   └── route.ts         # Health check endpoint
│   │   └── links/
│   │       ├── route.ts         # POST (create) & GET (list) links
│   │       └── [code]/
│   │           └── route.ts     # GET (stats) & DELETE specific link
│   ├── code/
│   │   └── [code]/
│   │       └── page.tsx         # Stats page UI
│   ├── healthz/
│   │   └── page.tsx             # Health check page UI
│   ├── [code]/
│   │   └── route.ts             # Redirect handler (catches /:code)
│   ├── page.tsx                 # Dashboard (main page)
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── lib/
│   ├── db.ts                    # Database connection & schema
│   └── utils.ts                 # Utility functions
├── scripts/
│   └── init-db.ts               # Database initialization script
└── public/                      # Static assets
```

## Key Design Decisions

### 1. Database Schema

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

**Decisions:**
- `code` is unique and indexed for fast lookups
- `clicks` counter for analytics
- `last_clicked_at` for tracking engagement
- Simple schema, no user authentication (as per requirements)

### 2. URL Routing Strategy

- `/:code` - Redirect (must be at root level)
- `/code/:code` - Stats page (prefixed to avoid conflicts)
- `/api/*` - API routes (Next.js convention)
- `/healthz` - Health check (common DevOps convention)

### 3. Code Generation

- Auto-generated codes are 6 characters (A-Za-z0-9)
- Custom codes can be 6-8 characters
- Validation regex: `^[A-Za-z0-9]{6,8}$`
- Collision handling: Try up to 10 times before failing

### 4. Error Handling

- 400: Bad Request (invalid input)
- 404: Not Found (link doesn't exist)
- 409: Conflict (duplicate code)
- 500: Internal Server Error

### 5. Client-Side State Management

- No external state library (React hooks sufficient)
- Local state for forms and UI
- Fetch API for server communication
- Optimistic UI updates where appropriate

### 6. Performance Optimizations

- Server-side API routes for database operations
- Client-side rendering for interactive UI
- Efficient database queries with indexes
- Minimal JavaScript bundle size

## Component Breakdown

### Dashboard (`app/page.tsx`)
- Lists all links in a table
- Search/filter functionality
- Add new link form (collapsible)
- Delete links with confirmation
- Copy short URL to clipboard

### Stats Page (`app/code/[code]/page.tsx`)
- Displays detailed link information
- Shows click statistics
- Formatted dates
- Copy functionality

### API Routes

#### POST /api/links
- Validates URL format
- Validates code format (if provided)
- Checks for duplicates (409 if exists)
- Generates code if not provided
- Returns created link

#### GET /api/links
- Returns all links ordered by creation date
- No pagination (can be added later)

#### GET /api/links/:code
- Returns single link details
- 404 if not found

#### DELETE /api/links/:code
- Deletes link
- 404 if not found

#### GET /:code (Redirect)
- Looks up link by code
- Increments click counter
- Updates last_clicked_at
- Returns 302 redirect
- 404 if not found

## Security Considerations

1. **SQL Injection**: Using parameterized queries via Neon client
2. **XSS**: React automatically escapes output
3. **URL Validation**: Checking URL format before saving
4. **Code Validation**: Restricting to alphanumeric characters
5. **Rate Limiting**: Not implemented (can add with Vercel Edge Config)

## Scalability Considerations

1. **Database**: Neon Postgres can scale with paid plans
2. **Caching**: Can add Redis for frequently accessed links
3. **CDN**: Vercel provides global CDN automatically
4. **Analytics**: Can add detailed analytics with separate table
5. **User Auth**: Can add with NextAuth.js if needed

## Future Enhancements

- [ ] User authentication and private links
- [ ] Custom domains
- [ ] QR code generation
- [ ] Link expiration
- [ ] Analytics dashboard with charts
- [ ] Bulk import/export
- [ ] API rate limiting
- [ ] Link preview/thumbnails
- [ ] Tags and categories
- [ ] Link editing

## Testing Strategy

1. **Manual Testing**: Use browser and test all features
2. **API Testing**: Use curl or Postman
3. **Automated Testing**: Can add Jest/Vitest for unit tests
4. **E2E Testing**: Can add Playwright for end-to-end tests

## Deployment Checklist

- [ ] Set up Neon database
- [ ] Configure environment variables
- [ ] Initialize database schema
- [ ] Deploy to Vercel
- [ ] Test all endpoints
- [ ] Verify redirects work
- [ ] Check health endpoint
- [ ] Test on mobile devices
- [ ] Monitor error logs

## Maintenance

- Monitor Neon database usage
- Check Vercel logs for errors
- Update dependencies regularly
- Backup database periodically
- Monitor performance metrics
