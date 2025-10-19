import { getSession } from 'next-auth/react';
import { auth } from '@/app/api/auth/[...nextauth]/route';

export async function getAuth() {
  if (typeof window === 'undefined') {
    return await auth();
  }

  return await getSession();
}
