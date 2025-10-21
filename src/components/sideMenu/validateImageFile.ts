import { toast } from '@/components/toast';

export const validateFileTypeAndToast = (file: File) => {
  const _VALID_IMAGE_TYPES = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  if (!_VALID_IMAGE_TYPES.includes(file.type)) {
    toast({
      message: '이미지 파일(jpg, jpeg, png, gif, webp)만 업로드할 수 있습니다',
      eventType: 'error',
    });

    return false;
  }

  return true;
};
export const validateFileSizeAndToast = (file: File) => {
  const _MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (file.size > _MAX_FILE_SIZE) {
    toast({
      message: '파일 용량은 5MB를 초과할 수 없습니다',
      eventType: 'error',
    });

    return false;
  }

  return true;
};
