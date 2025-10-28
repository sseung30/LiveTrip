export interface ProfileEditFormInputs {
  profileImageFile: FileList | null;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
