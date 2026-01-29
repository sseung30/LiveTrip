import { useMutation } from '@tanstack/react-query';
import { mutateProfileEdit } from '@/domain/user/api';

export const useProfileEditMutate = () => {
  return useMutation({
    mutationFn: mutateProfileEdit,
  });
};
