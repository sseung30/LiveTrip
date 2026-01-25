import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tag } = body;

    revalidateTag(tag as string);

    return NextResponse.json(
      { revalidated: true, tag, now: Date.now() },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
