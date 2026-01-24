'use server';

import { ApiError, apiFetch } from '@/api/api';
import { toast } from '@/components/toast';

interface UploadResponse {
  activityImageUrl: string;
}

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('image');

    if (!(file instanceof File)) {
      return { success: false, message: '업로드할 파일이 없습니다.' };
    }

    const serverFormData = new FormData();

    serverFormData.append('image', file);

    const data = await apiFetch<UploadResponse>('/activities/image', {
      method: 'POST',
      body: serverFormData,
    });

    return { success: true, url: data.activityImageUrl };
  } catch (error) {
    if (error instanceof ApiError) {
      toast({ message: error.message, eventType: 'error' });
    }
  }
}
