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

const uploadToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/activities/image', {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {},
  });

  const data = await response.json();

  return data.activityImageUrl; // 서버에서 반환된 실제 이미지 URL
};

export function useImageUpload(maxCount: number) {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files?.length) return;

    const remain = maxCount - images.length;

    if (remain <= 0) {
      event.target.value = '';

      return;
    }

    const slice = [...files].slice(0, remain);

    slice.forEach(async(file) => {
      const tempId = `${Date.now()}-${Math.random()}`;

      // 미리보기용 Blob URL 생성
      const previewImage = {
        id: tempId,
        src: URL.createObjectURL(file),
        file,
        uploading: true,
      };

      setImages((prev) => [...prev, previewImage]);

      
      // 실제 서버 업로드
      const uploadedUrl = await uploadToServer(file); // ✅ 실제 업로드

      setImages((prev) =>
        prev.map((img) =>
          img.id === tempId
            ? {
                ...img,
                src: uploadedUrl, // 이제 Blob URL 대신 실제 서버 URL
                uploading: false, 
              }
            : img
        )
      );
    });

    event.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return { images, setImages, handleUpload, removeImage };
}
