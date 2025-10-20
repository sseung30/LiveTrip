import { apiFetch } from '@/api/api';
import type {
  ProfileEditRequest,
  ProfileEditResponse,
} from '@/domain/profile/type';

const _PROFILE_EDIT_ENDPOINT = '/users/me';

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
