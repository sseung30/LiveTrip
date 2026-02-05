import { getSession } from 'next-auth/react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import type { RegistrationFormValues } from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';
import type { UploadedImage } from '@/domain/activity/types';

/**
 * Configuration for image upload mode
 */
type ImageField = 'subImageUrls' | 'bannerImage';
type ImageUploadMode = 'single' | 'multiple';
export interface ImageUploadConfig {
  field: ImageField;
  mode: ImageUploadMode;
  maxCount?: number;
}

/**
 * Unified image upload hook supporting both single and multiple image modes
 * Replaces useBannerImageUpload and useIntroImageUpload hooks
 */
export function useImageUpload(config: ImageUploadConfig) {
  const { setValue, watch } = useFormContext<RegistrationFormValues>();
  const { field, mode, maxCount = 1 } = config;

  const [images, setImages] = useState<UploadedImage[]>([]);

  // Watch form field for changes
  const formFieldValue = watch(field);

  // Initialize images from form value on mount
  useEffect(() => {
    if (formFieldValue === '') {
      return;
    }
    if (typeof formFieldValue === 'string') {
      setImages([{ id: formFieldValue, src: formFieldValue }]);
    } else {
      setImages(formFieldValue.map((url) => ({ id: url, src: url })));
    }
  }, []);

  // Sync form field with local images state
  useEffect(() => {
    if (mode === 'single') {
      const nextValue = images.length > 0 ? images[0]?.src || '' : '';

      if (nextValue !== formFieldValue) {
        setValue(field, nextValue, { shouldValidate: true });
      }
    } else {
      const nextValue = images.map((img) => img.src);
      const currentValue = Array.isArray(formFieldValue) ? formFieldValue : [];

      const sameLength = currentValue.length === nextValue.length;
      const sameOrder =
        sameLength && currentValue.every((url, i) => url === nextValue[i]);

      if (!sameOrder) {
        setValue(field, nextValue, { shouldValidate: true });
      }
    }
  }, [images, field, mode, setValue, formFieldValue]);

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<{ activityImageUrl: string }> => {
      const session = await getSession();
      const token = session?.accessToken;

      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const formData = new FormData();

      formData.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`이미지 업로드 실패: ${res.status}`);
      }

      return res.json() as Promise<{ activityImageUrl: string }>;
    },

    onSuccess: (uploadRes) => {
      const newUrl = uploadRes.activityImageUrl;

      setImages((prev) => {
        const updated = [...prev];

        if (mode === 'single') {
          // For single mode, replace the existing image
          if (updated.length > 0) {
            const oldUrl = updated[0]?.src || '';

            if (oldUrl.startsWith('blob:')) {
              URL.revokeObjectURL(oldUrl);
            }
          }

          return [{ id: newUrl, src: newUrl }];
        }
        // For multiple mode, replace first blob image or append
        const blobIndex = updated.findIndex((img) =>
          img.src.startsWith('blob:')
        );

        if (blobIndex !== -1) {
          const oldUrl = updated[blobIndex]?.src || '';

          if (oldUrl.startsWith('blob:')) {
            URL.revokeObjectURL(oldUrl);
          }
          updated[blobIndex] = { ...updated[blobIndex], src: newUrl };
        } else if (updated.length < maxCount) {
          updated.push({ id: newUrl, src: newUrl });
        }

        return updated;
      });
    },
  });

  /**
   * Handle file upload
   */
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || files.length === 0) {
      return;
    }

    const filesToUpload = [...files];

    // Check max count for multiple mode
    if (mode === 'multiple') {
      const current = images.length;

      if (current + filesToUpload.length > maxCount) {
        console.error(`최대 ${maxCount}장까지만 업로드할 수 있습니다.`);
        event.target.value = '';

        return;
      }
    }

    // Create blob previews immediately
    const previewImages = filesToUpload.map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
    }));

    if (mode === 'single') {
      // Replace existing image for single mode
      URL.revokeObjectURL(images[0]?.src);
      setImages(previewImages.slice(0, 1));
    } else {
      // Add images for multiple mode
      setImages((prev) => [...prev, ...previewImages]);
    }

    // Upload files asynchronously
    for (const file of filesToUpload) {
      try {
        await uploadMutation.mutateAsync(file);
      } catch (error) {
        console.error('업로드 실패:', error);
      }
    }

    event.target.value = '';
  };

  /**
   * Handle image removal
   */
  const removeImage = (idToRemove?: string) => {
    if (mode === 'single') {
      // For single mode, remove the only image
      const current = images[0];

      if (current.src.startsWith('blob:')) {
        URL.revokeObjectURL(current.src);
      }
      setImages([]);
    } else {
      // For multiple mode, remove specific image
      const updated = images.filter((img) => img.id !== idToRemove);

      // Revoke blob URLs for removed images
      images.forEach((img) => {
        if (img.id !== idToRemove && img.src.startsWith('blob:')) {
          URL.revokeObjectURL(img.src);
        }
      });

      setImages(updated);
    }
  };

  return {
    images,
    handleUpload,
    removeImage,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  };
}
