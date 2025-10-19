import { NextResponse } from 'next/server';
import {
  KakaoSigninRequiredError,
  signIn,
} from '@/app/api/auth/[...nextauth]/route';
import { getKaKaoAuthroizeURL } from '@/domain/auth/util';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  if (error || !code) {
    console.error('카카오 로그인 에러:', error, errorDescription);

    return NextResponse.redirect(
      new URL('/auth/signin?error=카카오 로그인 실패', request.url)
    );
  }

  try {
    await signIn('credentials', {
      type: 'kakao-signin',
      token: code,
      redirect: false,
    });

    return NextResponse.redirect(new URL('/?login=success', request.url));
  } catch (error) {
    if (error instanceof KakaoSigninRequiredError) {
      return NextResponse.redirect(
        new URL(
          getKaKaoAuthroizeURL(
            `${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_CALLBACK_URI}`
          )
        )
      );
    }
  }
}
