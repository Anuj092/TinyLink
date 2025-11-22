import { NextResponse } from 'next/server';

// Temporary debug endpoint - DELETE after troubleshooting
export async function GET() {
  return NextResponse.json({
    env: {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString(),
  });
}
