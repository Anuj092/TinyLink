import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isValidUrl, isValidCode, generateCode } from '@/lib/utils';

// POST /api/links - Create a new link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, code } = body;

    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }

    let shortCode = code;
    
    if (shortCode) {
      if (!isValidCode(shortCode)) {
        return NextResponse.json(
          { error: 'Code must be 6-8 alphanumeric characters' },
          { status: 400 }
        );
      }
      
      // Check if code already exists
      const existing = await sql`
        SELECT code FROM links WHERE code = ${shortCode}
      `;
      
      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        );
      }
    } else {
      // Generate a unique code
      let attempts = 0;
      while (attempts < 10) {
        shortCode = generateCode();
        const existing = await sql`
          SELECT code FROM links WHERE code = ${shortCode}
        `;
        if (existing.length === 0) break;
        attempts++;
      }
      
      if (attempts === 10) {
        return NextResponse.json(
          { error: 'Failed to generate unique code' },
          { status: 500 }
        );
      }
    }

    const result = await sql`
      INSERT INTO links (code, target_url)
      VALUES (${shortCode}, ${url})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/links - List all links
export async function GET() {
  try {
    const links = await sql`
      SELECT * FROM links ORDER BY created_at DESC
    `;
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
