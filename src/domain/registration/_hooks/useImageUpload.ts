'use client'

import { getSession } from 'next-auth/react'
import { type ChangeEvent,useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import type { FormValues, UploadedImage } from '@/domain/registration/types'

type ImageFieldNames = 'bannerImage' | 'subImageUrls'

interface UseImageUploadProps {
  formFieldName: ImageFieldNames
  isMulti: boolean
  maxCount: number
}

export function useImageUpload({
  formFieldName,
  isMulti,
  maxCount,
}: UseImageUploadProps) {
  const { setValue, watch } = useFormContext<FormValues>()
  const [images, setImages] = useState<UploadedImage[]>([])

  // ✅ RHF 값 감시
  const formFieldUrls = watch(formFieldName)

  // ✅ watch 값이 바뀔 때마다 이미지 상태를 반영
  useEffect(() => {
    let urls: string[] = []

    if (isMulti) {
      urls = Array.isArray(formFieldUrls)
        ? formFieldUrls
        : []
    } else if (typeof formFieldUrls === 'string' && formFieldUrls) {
      urls = [formFieldUrls]
    }

    setImages(urls.map((url) => ({ id: url, src: url })))
  }, [formFieldUrls, isMulti])

  // ✅ 업로드 mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<{ activityImageUrl: string }> => {
      const session = await getSession()
      const token = (session as { accessToken?: string } | null)?.accessToken;

      if (!token) {throw new Error('로그인이 필요합니다.')}

      const formData = new FormData()

      formData.append('image', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {throw new Error(`이미지 업로드 실패: ${res.status}`)}
      // ✅ 안전한 반환 타입
      const data: { activityImageUrl: string } = await res.json()

      return data
    },

    onSuccess: (uploadRes, file) => {
      const newUrl = uploadRes.activityImageUrl
      const prevValue = watch(formFieldName)

      if (isMulti) {
        const prevArray = Array.isArray(prevValue) ? prevValue : []
        const updated = prevArray.map((url: string) =>
          { return url.startsWith('blob:') && url.includes(file.name)
            ? newUrl
            : url }
        )

        setValue(formFieldName, updated, { shouldValidate: true })
      } else {
        setValue(formFieldName, newUrl, { shouldValidate: true })
      }
    },
  })

  /**
   * ✅ 파일 업로드 핸들러
   */
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files || files.length === 0) {return}

    const filesToUpload = [...files]
    const current = watch(formFieldName)
    let currentArray: string[] = []

    if (Array.isArray(current)) {
      currentArray = current
    } else if (isMulti) {
      currentArray = []
    }

    if (currentArray.length + filesToUpload.length > maxCount) {
      console.error(`최대 ${maxCount}장까지만 업로드할 수 있습니다.`)
      event.target.value = ''

      return
    }

    // ✅ blob 미리보기 즉시 반영
    const previewUrls = filesToUpload.map((file) => URL.createObjectURL(file))
    const newValue = isMulti
      ? [...currentArray, ...previewUrls]
      : previewUrls[0]

    setValue(formFieldName, newValue, { shouldValidate: true })

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
    const current = watch(formFieldName)

    if (isMulti && Array.isArray(current)) {
      const updated = current.filter((url) => url !== idToRemove)

      setValue(formFieldName, updated, { shouldValidate: true })
    } else if (!isMulti) {
      setValue(formFieldName, '', { shouldValidate: true })
    }

    if (idToRemove.startsWith('blob:')) {URL.revokeObjectURL(idToRemove)}
  }

  return {
    images,
    handleUpload,
    removeImage,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  }
}
