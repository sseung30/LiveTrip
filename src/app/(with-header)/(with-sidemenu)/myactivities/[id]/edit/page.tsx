import { redirect } from 'next/navigation';
import { getActivityDetail } from '@/domain/activities/api';
import RegistrationForm from '@/domain/registration/_components/RegistrationForm';
import { getAuth } from '@/utils/getAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditActivityPage({ params }: Props) {
  const { id } = await params;
  const [session, activity] = await Promise.all([
    getAuth(),
    getActivityDetail(id),
  ]);

  // Only the owner can edit the activity
  if (activity.userId !== session?.user.id) {
    redirect('/myactivities?unauthorized=1');
  }

  return (
    <div className='mx-auto w-full'>
      {/* Cancel layout padding then apply exact spec padding */}
      <div className='-mx-4 md:-mx-12'>
        <div className='mx-auto box-content w-full max-w-[700px]'>
          <h1 className='mb-6 text-2xl font-semibold'>체험 수정</h1>
          <RegistrationForm mode='edit' initialData={activity} />
        </div>
      </div>
    </div>
  );
}
