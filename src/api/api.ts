import { getAuth } from '@/utils/getAuth';

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

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
  if (!BASE_URL) {
    throw new Error(
      'API base URL is not configured. Set NEXT_PUBLIC_API_URL in .env.local.'
    );
  }
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
    const contentType = res.headers.get('content-type') || '';
    const resClone = res.clone();

    let message: string | undefined;
    if (contentType.includes('application/json')) {
      try {
        const data: unknown = await res.json();
        if (data && typeof data === 'object') {
          const obj = data as Record<string, unknown>;
          if (typeof obj.message === 'string') {
            message = obj.message;
          } else if (typeof obj.error === 'string') {
            message = obj.error;
          } else if (Array.isArray(obj.errors) && obj.errors.length > 0) {
            const first = obj.errors[0] as Record<string, unknown>;
            if (typeof first?.message === 'string')
              message = first.message as string;
          } else {
            // 마지막 수단: JSON을 문자열로
            try {
              message = JSON.stringify(data);
            } catch {
              /* noop */
            }
          }
        }
      } catch {
        // JSON 파싱 실패 시 아래에서 텍스트로 재시도
      }
    }

    if (!message) {
      try {
        message = await resClone.text();
      } catch {
        // ignore
      }
    }

    if (res.status === 500) {
      message = '서버에서 오류가 발생했습니다.';
    }
    if (!message) {
      message = '오류가 발생했습니다.';
    }

    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}
