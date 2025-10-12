export const AuthRegisterKey = {
  nickname: () => {
    return {
      required: '닉네임을 입력하세요',
      minLength: {
        value: 4,
        message: '4자 이상 입력하세요',
      },
      maxLength: {
        value: 10,
        message: '10자 이하로 입력하세요',
      },
      pattern: {
        value: /^[가-힣a-z0-9]+$/i,
        message: '한글, 영문, 숫자만 사용 가능합니다',
      },
    };
  },
  email: () => {
    return {
      required: '이메일을 입력하세요',
      pattern: {
        value: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
    };
  },
  password: () => {
    return {
      required: '비밀번호를 입력하세요',
      minLength: {
        value: 8,
        message: '8자 이상 입력하세요',
      },
      maxLength: {
        value: 20,
        message: '20자 이하로 입력하세요',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Z\d@$!%*?&]+$/i,
        message: '영문, 숫자, 특수문자를 포함해야 합니다',
      },
    };
  },

  confirmPassword: (passwordValue: string) => {
    return {
      required: '비밀번호 확인을 입력하세요',
      validate: (value: string) =>
        value === passwordValue || '비밀번호가 일치하지 않습니다',
    };
  },
};

export const SignUpFormRegisterKey = {
  email: () => AuthRegisterKey.email(),
  nickname: () => AuthRegisterKey.nickname(),
  password: () => AuthRegisterKey.password(),
  confirmPassword: (passwordValue: string) => {
    return AuthRegisterKey.confirmPassword(passwordValue);
  },
};
export const SignInFormRegisterKey = {
  email: () => AuthRegisterKey.email(),
  nickname: () => AuthRegisterKey.nickname(),
  password: () => AuthRegisterKey.password(),
  confirmPassword: (passwordValue: string) => {
    return AuthRegisterKey.confirmPassword(passwordValue);
  },
};
