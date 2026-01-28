import RegistrationForm from '@/domain/activity/components/management/RegistrationForm';

export default function RegistrationPage() {
  return (
    <div className='mx-auto w-full'>
      {/* Cancel layout padding then apply exact spec padding */}
      <div className='-mx-6 md:-mx-8'>
        <div className='mx-auto box-content w-full max-w-[700px]'>
          <h1 className='mb-6 text-2xl font-semibold'>체험 등록</h1>
          <RegistrationForm mode='create' />
        </div>
      </div>
    </div>
  );
}
