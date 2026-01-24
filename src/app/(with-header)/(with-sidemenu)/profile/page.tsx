import { getUserInfo } from '@/domain/auth/api';
import ProfileEditForm from '@/domain/profile/components/ProfileEditForm';

export default async function ProfilePage() {
  const { nickname, email, profileImageUrl } = await getUserInfo();

  return (
    <>
      <main className='w-full'>
        <div className='mb-5 flex flex-col gap-1 md:mb-6'>
          <h1 className='text-18 font-bold text-gray-950'>내 정보</h1>
          <div className='text-14 font-medium text-gray-500'>
            닉네임과 비밀번호를 수정하실 수 있습니다.
          </div>
        </div>
        <ProfileEditForm
          nickname={nickname}
          email={email}
          profileImageUrl={profileImageUrl}
        />
      </main>
    </>
  );
}
