import { auth } from '@/app/api/auth/[...nextauth]/route';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

//인증이 필요한 API는 token 옵션을 전달
type ApiOptions = RequestInit & {
  token?: string;
};
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
  options: ApiOptions = {}
): Promise<T> {
  const { headers, ...restOptions } = options;
  const token = await getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(`API Error (${res.status}): ${message}`);
  }

  return res.json() as Promise<T>;
}
