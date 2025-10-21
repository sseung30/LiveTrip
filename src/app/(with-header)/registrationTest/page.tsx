'use client';

import { useRef,useState } from 'react';
// 3번 파일에서 Server Action만 임포트합니다.
import { uploadImageAction } from '@/domain/registration/actions/uploadImage'; 

export default function ImageUploadTest() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {return;}

    const formData = new FormData();

    formData.append('image', file); // 이미지 필드명

    setUploading(true);
    console.log(`[Client] 파일 선택됨: ${file.name}. 서버 액션으로 위임...`);

    try {
      // 서버 액션을 호출하여 토큰 인증 및 업로드 작업을 위임
      const response = await uploadImageAction(formData);

      if (response.success) {
        console.log('✅ --- 업로드 성공 ---');
        console.log('반환된 URL:', response.url);
        alert(`업로드 성공! URL을 콘솔에서 확인하세요.`);
      } else {
        console.error('❌ --- 업로드 실패 ---');
        console.error('실패 메시지:', response.message);
        alert(`업로드 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('❌ --- 클라이언트 측 오류 ---', error);
      alert('업로드 중 오류 발생.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {fileInputRef.current.value = '';} 
    }
  };

  const handleButtonClick = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      {/* 숨겨진 파일 입력 필드 (이미지 선택 창을 띄우기 위함) */}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        disabled={uploading}
        onChange={handleFileChange}
      />
      
      {/* 보이는 테스트 버튼 */}
      <button
        disabled={uploading}
        className={`px-8 py-4 text-xl font-bold rounded-xl shadow-lg transition-colors ${
          uploading
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105'
        }`}
        onClick={handleButtonClick}
      >
        {uploading ? '업로드 중...' : '이미지 업로드 테스트 시작'}
      </button>
    </div>
  );
}