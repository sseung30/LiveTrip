const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

//인증이 필요한 API는 token 옵션을 전달
type ApiOptions = RequestInit & {
  token?: string;
};

/** 
 *공용 fetch 함수
 */
export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...restOptions } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
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