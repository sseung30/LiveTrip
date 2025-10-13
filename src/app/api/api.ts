const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

type ApiOptions = RequestInit;

/**
 * ✅ HttpOnly 쿠키를 사용하는 인증 방식
 * -> Authorization 헤더를 수동으로 붙이지 않고,
 * -> fetch에 credentials: "include" 옵션을 줘서 브라우저가 자동 전송하도록 함
 */
export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error (${res.status}): ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}
