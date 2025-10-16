/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { signOut } from '@/app/api/auth/[...nextauth]/route';

export async function logoutAction(prevState: any, formData: FormData) {
  await signOut({ redirect: false });

  return { success: true };
}
