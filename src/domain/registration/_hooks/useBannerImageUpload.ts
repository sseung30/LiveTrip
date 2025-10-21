'use client'

import { getSession } from 'next-auth/react'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import type { FormValues, UploadedImage } from '@/domain/registration/types'

export function useBannerImageUpload() {
  const { setValue, watch } = useFormContext<FormValues>()
  const [image, setImage] = useState<UploadedImage | null>(null)
  const formFieldName = 'bannerImage'

  // ✅ RHF 값 감시
  const formFieldUrl = watch(formFieldName)

  // ✅ watch 값이 바뀔 때마다 이미지 상태를 반영
  useEffect(() => {
    if (typeof formFieldUrl === 'string' && formFieldUrl) {
      setImage({ id: formFieldUrl, src: formFieldUrl })
    } else {
      setImage(null)
    }
  }, [formFieldUrl])

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

    onSuccess: (uploadRes) => {
      setValue(formFieldName, uploadRes.activityImageUrl, { shouldValidate: true })
    },
  })

  /**
   * ✅ 파일 업로드 핸들러
   */
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const { files } = event.target

    if (!files || files.length === 0) {return}

    const file = files[0]

    // ✅ blob 미리보기 즉시 반영
    const blobUrl = URL.createObjectURL(file)

    setImage({ id: blobUrl, src: blobUrl }) 

    setValue(formFieldName, blobUrl, { shouldValidate: true })

    // ✅ 서버 업로드 비동기 진행
    try {
    const uploadRes = await uploadMutation.mutateAsync(file)
    const newUrl = uploadRes.activityImageUrl

    setValue(formFieldName, newUrl, { shouldValidate: true })
  } catch (error) {
    console.error('업로드 실패:', error)
  }

  input.value = ''
}

  /**
   * ✅ 이미지 삭제 핸들러
   */
  const removeImage = () => {
    const current = watch(formFieldName)

    if (typeof current === 'string' && current.startsWith('blob:')) {
      URL.revokeObjectURL(current)
    }
    setValue(formFieldName, '', { shouldValidate: true })
  }

  return {
    image,
    handleUpload,
    removeImage,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  }
}
