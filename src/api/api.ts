import { auth } from '@/app/api/auth/[...nextauth]/route';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function getToken() {
  const session = await auth();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return session?.accessToken || null;
}
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { body, headers: customHeaders } = options; 
  const token = await getToken();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
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
    let message = "서버 오류가 발생했습니다.";

    switch (res.status) {
      case 400: { message = "입력값이 올바르지 않습니다."; break;
      }
      case 401: { message = "로그인이 필요합니다."; break;
      }
      case 403: { message = "접근 권한이 없습니다."; break;
      }
      case 404: { message = "요청한 리소스를 찾을 수 없습니다."; break;
      }
      case 500: { message = "서버에서 오류가 발생했습니다."; break;
      }
      default: { message = rawMessage || message;
      }
    }

    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}