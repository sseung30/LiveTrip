// Registration/hooks/useImageUpload.ts

import { type ChangeEvent, useState } from 'react';

export interface UploadedImage {
  id: string;
  /**
   * Blob URL
   */
  src: string; 
  /**
   * 실제 서버 업로드에 사용할 원본 파일
   */
  file: File;  
}

export function useImageUpload(maxCount: number) {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files?.length) {return;}

    const remain = maxCount - images.length;

    if (remain <= 0) {
      event.target.value = '';

      return;
    }

    const slice = [...files].slice(0, remain);

    const newImages = slice.map((file) => { return {
      id: `${Date.now()}-${Math.random()}`,
      src: URL.createObjectURL(file), // 즉시 미리보기용 Blob URL
      file,
    } });

    setImages((prev) => [...prev, ...newImages]);
    event.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return { images, setImages, handleUpload, removeImage };
}
