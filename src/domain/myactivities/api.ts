import { ApiError, apiFetch } from '@/api/api';

export async function deleteMyActivity(id: number) {
  const body = { status: 'canceled' };

  try {
    await apiFetch(`/my-activities/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(body),
    });
    return { ok: true as const };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false as const, status: error.status };
    }
    return { ok: false as const, status: 500 };
  }
}
