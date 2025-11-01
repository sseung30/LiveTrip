import RegistrationForm from '@/domain/registration/_components/RegistrationForm';
import { getActivity } from '@/domain/activities/api';
import { getAuth } from '@/utils/getAuth';
import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditActivityPage({ params }: Props) {
  const { id } = await params;
  const [session, activity] = await Promise.all([getAuth(), getActivity(id)]);

  // Only the owner can edit the activity
  if (activity?.userId !== session?.user.id) {
    redirect('/myactivities?unauthorized=1');
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-8 md:px-0'>
      <h1 className='mb-6 text-2xl font-semibold'>체험 수정</h1>
      <RegistrationForm mode='edit' initialData={activity} />
    </div>
  );
}
