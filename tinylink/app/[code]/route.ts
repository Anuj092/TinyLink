import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    
    // Fetch the link
    const result = await sql`
      SELECT * FROM links WHERE code = ${code}
    `;

    if (result.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const link = result[0];

    // Update click count and last clicked time
    await sql`
      UPDATE links 
      SET clicks = clicks + 1, 
          last_clicked_at = CURRENT_TIMESTAMP
      WHERE code = ${code}
    `;

    // Redirect to target URL
    return NextResponse.redirect(link.target_url, 302);
  } catch (error) {
    console.error('Error redirecting:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
