// Registration/hooks/useImageUpload.ts

import { type ChangeEvent,useState } from 'react';
import { apiFetch } from '@/api/api';
import { toast } from '@/components/toast';

export interface UploadedImage {
  id: string;
  /**
   * 업로드된 URL
   */
  src: string; 
}

export function useImageUpload(maxCount: number) {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const uploadImageToServer = async (file: File) => {
    const formData = new FormData();

    formData.append('image', file);

    const res = await apiFetch('/activities/image', {
      method: 'POST',
      body: formData,
    });

    return (res as { activityImageUrl: string }).activityImageUrl;
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files?.length) {return;}

    const remain = maxCount - images.length;

    if (remain <= 0) {
      toast({ message: `이미지는 최대 ${maxCount}장까지 업로드할 수 있어요.`, eventType: 'error' });
      event.target.value = '';

      return;
    }

    try {
      const slice = [...files].slice(0, remain);
      const uploaded: UploadedImage[] = [];

      for (const file of slice) {
        const url = await uploadImageToServer(file);

        uploaded.push({
          id: `${Date.now()}-${Math.random()}`,
          src: url,
        });
      }

      setImages(prev => [...prev, ...uploaded]);
      toast({ message: '이미지를 업로드했습니다.', eventType: 'success' });
    } catch {
      toast({ message: '이미지 업로드에 실패했습니다.', eventType: 'error' });
    } finally {
      event.target.value = '';
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return { images, setImages, handleUpload, removeImage };
}
