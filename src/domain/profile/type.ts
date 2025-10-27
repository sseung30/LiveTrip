export interface ProfileEditFormProps {
  nickname: string;
  email: string;
  profileImageUrl: string | null;
}
export interface ProfileEditFormInputs {
  profileImageFile: FileList | null;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
