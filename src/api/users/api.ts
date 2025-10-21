import { apiFetch } from '@/api/api';
import type { UserInfo } from '@/domain/auth/type';

const _PROFILE_EDIT_ENDPOINT = '/users/me';
const _PROFILE_IMAGE_CREATE_ENDPOINT = '/users/me/image';

interface ProfileEditRequest {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}
type ProfileEditResponse = UserInfo;
interface ProfileImageCreateResponse {
  profileImageUrl: string;
}
export const mutateProfileEdit = async (
  profileEditRequest: ProfileEditRequest
): Promise<ProfileEditResponse> => {
  const res = await apiFetch<ProfileEditResponse>(_PROFILE_EDIT_ENDPOINT, {
    method: 'PATCH',
    body: JSON.stringify({
      ...profileEditRequest,
    }),
  });

  return res;
};
export const mutateProfileImageCreate = async (
  imageFile: File
): Promise<ProfileImageCreateResponse> => {
  const formData = new FormData();

  formData.append('image', imageFile);
  const res = await apiFetch<ProfileImageCreateResponse>(
    _PROFILE_IMAGE_CREATE_ENDPOINT,
    {
      method: 'POST',
      body: formData,
    }
  );

  return res;
};
