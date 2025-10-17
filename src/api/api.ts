import { getSession } from 'next-auth/react';
import { auth } from '@/app/api/auth/[...nextauth]/route';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

async function getAuth() {
  if (typeof window === 'undefined') {
    return await auth();
  }

  return await getSession();
}
/**
 *공용 fetch 함수
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...restOptions } = options;

  const authInfo = await getAuth();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(authInfo?.accessToken && {
        Authorization: `Bearer ${authInfo.accessToken}`,
      }),
      ...headers,
    },
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(`API Error (${res.status}): ${message}`);
  }

  return res.json() as Promise<T>;
}
