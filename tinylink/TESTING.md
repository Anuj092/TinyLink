# Testing Guide

## Manual Testing Checklist

### 1. Health Check
- [ ] Visit `/healthz` - should show system status
- [ ] Check API: `GET /api/healthz` - should return `{ "ok": true, "version": "1.0" }`

### 2. Create Links
- [ ] Create link with auto-generated code
- [ ] Create link with custom code (6-8 chars)
- [ ] Try to create duplicate code - should get 409 error
- [ ] Try invalid URL - should get error
- [ ] Try invalid code format - should get error

### 3. List Links
- [ ] Dashboard shows all links
- [ ] Search by code works
- [ ] Search by URL works
- [ ] Empty state shows when no links

### 4. Redirect
- [ ] Visit `/:code` - should redirect to target URL
- [ ] Click count should increment
- [ ] Last clicked time should update
- [ ] Invalid code should return 404

### 5. Stats Page
- [ ] Visit `/code/:code` - should show link details
- [ ] Shows correct click count
- [ ] Shows last clicked time
- [ ] Shows created time
- [ ] Copy button works

### 6. Delete Links
- [ ] Delete link from dashboard
- [ ] Deleted link should return 404 on redirect
- [ ] Deleted link should not appear in list

### 7. UI/UX
- [ ] Responsive on mobile
- [ ] Loading states work
- [ ] Error messages are clear
- [ ] Success messages appear
- [ ] Form validation works
- [ ] Copy buttons work

## API Testing with curl

### Health Check
```bash
curl https://your-app.vercel.app/api/healthz
```

### Create Link (auto-generated code)
```bash
curl -X POST https://your-app.vercel.app/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

### Create Link (custom code)
```bash
curl -X POST https://your-app.vercel.app/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}'
```

### Create Duplicate (should fail with 409)
```bash
curl -X POST https://your-app.vercel.app/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}'
```

### List All Links
```bash
curl https://your-app.vercel.app/api/links
```

### Get Link Stats
```bash
curl https://your-app.vercel.app/api/links/test123
```

### Delete Link
```bash
curl -X DELETE https://your-app.vercel.app/api/links/test123
```

### Test Redirect
```bash
curl -I https://your-app.vercel.app/test123
# Should return 302 redirect
```

## Automated Testing Script

Save this as `test.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"

echo "Testing TinyLink API..."

# Test health check
echo "1. Testing health check..."
curl -s $BASE_URL/api/healthz | grep -q "ok" && echo "✓ Health check passed" || echo "✗ Health check failed"

# Create a link
echo "2. Creating link..."
RESPONSE=$(curl -s -X POST $BASE_URL/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}')
echo $RESPONSE | grep -q "test123" && echo "✓ Link created" || echo "✗ Link creation failed"

# Try duplicate (should fail)
echo "3. Testing duplicate code..."
curl -s -X POST $BASE_URL/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"test123"}' | grep -q "409" && echo "✓ Duplicate rejected" || echo "✗ Duplicate check failed"

# List links
echo "4. Listing links..."
curl -s $BASE_URL/api/links | grep -q "test123" && echo "✓ Link listed" || echo "✗ List failed"

# Get stats
echo "5. Getting stats..."
curl -s $BASE_URL/api/links/test123 | grep -q "test123" && echo "✓ Stats retrieved" || echo "✗ Stats failed"

# Test redirect
echo "6. Testing redirect..."
curl -s -I $BASE_URL/test123 | grep -q "302" && echo "✓ Redirect works" || echo "✗ Redirect failed"

# Delete link
echo "7. Deleting link..."
curl -s -X DELETE $BASE_URL/api/links/test123 | grep -q "success" && echo "✓ Link deleted" || echo "✗ Delete failed"

# Verify deletion
echo "8. Verifying deletion..."
curl -s -I $BASE_URL/test123 | grep -q "404" && echo "✓ Deleted link returns 404" || echo "✗ Deletion verification failed"

echo "Testing complete!"
```

Run with:
```bash
chmod +x test.sh
./test.sh
```

## Expected Responses

### POST /api/links (Success)
```json
{
  "id": 1,
  "code": "abc123",
  "target_url": "https://example.com",
  "clicks": 0,
  "last_clicked_at": null,
  "created_at": "2025-11-21T10:00:00.000Z"
}
```

### POST /api/links (Duplicate - 409)
```json
{
  "error": "Code already exists"
}
```

### GET /api/links
```json
[
  {
    "id": 1,
    "code": "abc123",
    "target_url": "https://example.com",
    "clicks": 5,
    "last_clicked_at": "2025-11-21T10:05:00.000Z",
    "created_at": "2025-11-21T10:00:00.000Z"
  }
]
```

### GET /api/healthz
```json
{
  "ok": true,
  "version": "1.0",
  "uptime": 3600,
  "timestamp": "2025-11-21T11:00:00.000Z"
}
```
