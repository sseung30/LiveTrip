import z from 'zod';

export const nickNameRegex = /^[가-힣a-z0-9]+$/i;
export const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Z\d@$!%*?&]+$/i;

const nicknameSchema = z
  .string()
  .trim()
  .min(1, '닉네임을 입력하세요')
  .min(4, '4자 이상 입력하세요')
  .max(10, '10자 이하로 입력하세요')
  .regex(nickNameRegex, '한글, 영문, 숫자만 사용 가능합니다');

const emailSchema = z
  .string()
  .trim()
  .min(1, '이메일을 입력하세요')
  .regex(emailRegex, '올바른 이메일 형식이 아닙니다');

const passwordSchema = z
  .string()
  .trim()
  .min(1, '비밀번호를 입력하세요')
  .min(8, '8자 이상 입력하세요')
  .max(20, '20자 이하로 입력하세요')
  .regex(passwordRegex, '영문, 숫자, 특수문자를 포함해야 합니다');

export const profileImageSchema = z
  .custom<FileList>()
  .refine(
    (file) =>
      ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
        file[0].type
      ),
    { message: 'png, jpeg, jpg, webp 형식의 이미지만 가능합니다' }
  );

export const profileEditFormSchema = z
  .object({
    profileImageFile: z.union([profileImageSchema, z.null()]),
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });
// SignInForm 스키마
export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// SignUpForm 스키마
export const signUpFormSchema = z
  .object({
    email: emailSchema,
    nickname: nicknameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

// auth credential을 위한 SignIn, SignUp 스키마
export const signInCredentialSchema = z.object({
  ...signInFormSchema.shape,
  type: z.string().optional(),
});
export const signUpCredentialSchema = z.object({
  ...signUpFormSchema.shape,
  type: z.string(),
});

export const signInResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    profileImageUrl: z.union([z.string(), z.null()]),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const newTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
