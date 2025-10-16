import { auth } from '@/app/api/auth/[...nextauth]/route';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

async function getToken() {
  const session = await auth();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return session?.accessToken || null;
}
/**
 *공용 fetch 함수
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers } = options;
  const token = await getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error (${res.status}): ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}
