export default function RegistrationFormSkeleton() {
  return (
    <div className='mx-auto w-full animate-pulse'>
      <div className='-mx-6 md:-mx-8'>
        <div className='mx-auto box-content w-full max-w-[700px] px-6 py-8 md:px-[30px]'>
          <div className='mb-6 h-7 w-40 rounded bg-gray-200' />

          {/* Title */}
          <div className='mb-6'>
            <div className='mb-2 h-4 w-20 rounded bg-gray-200' />
            <div className='h-12 w-full rounded-2xl bg-gray-100' />
          </div>

          {/* Category */}
          <div className='mb-6'>
            <div className='mb-2 h-4 w-20 rounded bg-gray-200' />
            <div className='h-12 w-full rounded-2xl bg-gray-100' />
          </div>

          {/* Description */}
          <div className='mb-6'>
            <div className='mb-2 h-4 w-24 rounded bg-gray-200' />
            <div className='h-28 w-full rounded-2xl bg-gray-100' />
          </div>

          {/* Address */}
          <div className='mb-6'>
            <div className='mb-2 h-4 w-16 rounded bg-gray-200' />
            <div className='h-12 w-full rounded-2xl bg-gray-100' />
          </div>

          {/* Price */}
          <div className='mb-6'>
            <div className='mb-2 h-4 w-12 rounded bg-gray-200' />
            <div className='h-12 w-full rounded-2xl bg-gray-100' />
          </div>

          {/* Time slots */}
          <div className='mb-6'>
            <div className='mb-3 h-4 w-24 rounded bg-gray-200' />
            <div className='flex gap-3'>
              <div className='h-12 flex-1 rounded-2xl bg-gray-100' />
              <div className='h-12 flex-1 rounded-2xl bg-gray-100' />
              <div className='h-12 flex-1 rounded-2xl bg-gray-100' />
            </div>
          </div>

          {/* Images */}
          <div className='mb-8'>
            <div className='mb-3 h-4 w-24 rounded bg-gray-200' />
            <div className='h-40 w-full rounded-2xl bg-gray-100' />
            <div className='mt-4 grid grid-cols-4 gap-3'>
              <div className='h-24 rounded-xl bg-gray-100' />
              <div className='h-24 rounded-xl bg-gray-100' />
              <div className='h-24 rounded-xl bg-gray-100' />
              <div className='h-24 rounded-xl bg-gray-100' />
            </div>
          </div>

          <div className='flex justify-center'>
            <div className='h-10 w-28 rounded-full bg-gray-200' />
          </div>
        </div>
      </div>
    </div>
  );
}
