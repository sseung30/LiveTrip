import { NextResponse } from 'next/server';
import { getAuth } from '@/utils/getAuth';

const BACKEND_URL = 'https://sp-globalnomad-api.vercel.app/17-4/activities/image';

export async function POST(req: Request) {
  const token = await getAuth();
  const formData = await req.formData();

  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    body: formData,
    headers: {
      ...(token && { Authorization: `Bearer ${token.accessToken}` }),
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
