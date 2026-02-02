import { NextResponse } from 'next/server';
import {
  KakaoAlreadySignupError,
  signIn,
} from '@/app/api/auth/[...nextauth]/route';
import { getKaKaoAuthroizeURL } from '@/domain/user/utils/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (error || !code) {
    console.error('카카오 회원가입 에러:', error, errorDescription);

    return NextResponse.redirect(
      new URL('/auth/signup?error=카카오 회원가입 실패', request.url)
    );
  }

  try {
    const nickname = `kakao${crypto.randomUUID().slice(0, 4)}`;

    await signIn('credentials', {
      type: 'kakao-signup',
      nickname,
      token: code,
      redirect: false,
    });

    return NextResponse.redirect(new URL('/?login=success', request.url));
  } catch (error) {
    if (error instanceof KakaoAlreadySignupError) {
      return NextResponse.redirect(
        new URL(
          getKaKaoAuthroizeURL(
            `${process.env.NEXT_PUBLIC_KAKAO_SIGNIN_CALLBACK_URI}`
          )
        )
      );
    }

    return NextResponse.redirect(
      new URL('/auth/signin?error=signup_failed', request.url)
    );
  }
}
