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
    /**
     * ✅ 구조 분해
     */
    const { body, headers: customHeaders } = options; 
  const token = await getToken();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(isFormData
        ? customHeaders // ✅ FormData일 경우 Content-Type 자동 설정에 맡김
        : {
            'Content-Type': 'application/json', // ✅ JSON 요청 기본값
            ...customHeaders,
          }),
    },
  });

  if (!res.ok) {
    throw new Error(`API Error (${res.status}): ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}
