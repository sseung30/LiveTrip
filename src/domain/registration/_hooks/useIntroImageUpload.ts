'use client'

import { getSession } from 'next-auth/react'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import type { FormValues, UploadedImage } from '@/domain/registration/types'

export function useIntroImageUpload(maxCount: number) {
  const { setValue, watch } = useFormContext<FormValues>()
  const [images, setImages] = useState<UploadedImage[]>([])
  const formFieldName = 'subImageUrls'

  // ✅ RHF 값 감시
  const formFieldUrls = watch(formFieldName)

// images가 바뀔 때마다 RHF 값 동기화
useEffect(() => {
  setValue(
    formFieldName,
    images.map((img) => img.src),
    { shouldValidate: true },
  );
}, [images, formFieldName, setValue]);

  // ✅ 업로드 mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<{ activityImageUrl: string }> => {
      const session = await getSession()
      const token = session?.accessToken

      if (!token) {throw new Error('로그인이 필요합니다.')}

      const formData = new FormData()

      formData.append('image', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {throw new Error(`이미지 업로드 실패: ${res.status}`)}
      const data: { activityImageUrl: string } = await res.json()

      return data
    },

  /**
   * 업로드 성공 시 이미지 상태 업데이트
   */
  onSuccess: (uploadRes) => {
  setImages((prev) => {
    const updated = [...prev];
    const blobIndex = updated.findIndex((img) => img.src.startsWith('blob:'));

    if (blobIndex !== -1) {
      URL.revokeObjectURL(updated[blobIndex].src);
      updated[blobIndex] = { ...updated[blobIndex], src: uploadRes.activityImageUrl };
    } else {
      updated.push({ id: uploadRes.activityImageUrl, src: uploadRes.activityImageUrl });
    }

    return updated;
  });
},
  })

  /**
   * ✅ 파일 업로드 핸들러
   */
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files || files.length === 0) {return}

    const filesToUpload = [...files]
    const current = Array.isArray(formFieldUrls) ? formFieldUrls : []

    if (current.length + filesToUpload.length > maxCount) {
      console.error(`최대 ${maxCount}장까지만 업로드할 수 있습니다.`)
      event.target.value = ''

      return
    }

    // ✅ blob 미리보기 즉시 반영
    const previewUrls = filesToUpload.map((file) => { return {
    id: URL.createObjectURL(file),
    src: URL.createObjectURL(file),
  } });

   setImages((prev) => [...prev, ...previewUrls]);
  setValue(
    formFieldName,
    [...images, ...previewUrls].map((img) => img.src),
    { shouldValidate: true },
  );

    // ✅ 서버 업로드 비동기 진행
    for (const file of filesToUpload) {
      try {
        await uploadMutation.mutateAsync(file)
      } catch (error) {
        console.error('업로드 실패:', error)
      }
    }

    event.target.value = ''
  }

  /**
   * ✅ 이미지 삭제 핸들러
   */
  const removeImage = (idToRemove: string) => {
    const current = Array.isArray(formFieldUrls) ? formFieldUrls : []
    const updated = current.filter((url) => url !== idToRemove)

    setValue(formFieldName, updated, { shouldValidate: true })

    if (idToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(idToRemove)
    }
  }

  return {
    images,
    handleUpload,
    removeImage,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  }
}
