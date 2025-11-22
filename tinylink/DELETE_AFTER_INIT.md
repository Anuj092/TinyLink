# Important: Delete After Database Initialization

After you've successfully initialized your production database by visiting `/api/init`, you MUST delete this file for security:

**Delete this file:**
```
tinylink/app/api/init/route.ts
```

Then commit and push:
```bash
git rm app/api/init/route.ts
git commit -m "Remove init endpoint after database setup"
git push
```

This prevents unauthorized users from resetting your database.
