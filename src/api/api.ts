import { getAuth } from '@/utils/getAuth';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { body, headers: customHeaders } = options;
  const token = await getAuth();

  const isFormData =
    typeof FormData !== 'undefined' && body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token.accessToken}` }),
      ...(isFormData
        ? customHeaders // FormData일 경우 Content-Type 자동
        : {
            'Content-Type': 'application/json',
            ...customHeaders,
          }),
    },
  });

  if (!res.ok) {
    const rawMessage = await res.text();
    const message =
    res.status === 500
      ? '서버에서 오류가 발생했습니다.'
      : rawMessage || '오류가 발생했습니다.';

  throw new ApiError(res.status, message);
}

  return res.json() as Promise<T>;
}
