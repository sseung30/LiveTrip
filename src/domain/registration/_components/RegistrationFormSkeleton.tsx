'use client';

export default function RegistrationFormSkeleton() {
  return (
    <div className="mx-auto w-full animate-pulse">
      <div className="-mx-6 md:-mx-8">
        <div className="mx-auto w-full max-w-[700px] box-content px-6 md:px-[30px] py-8">
          <div className="h-7 w-40 bg-gray-200 rounded mb-6" />

          {/* Title */}
          <div className="mb-6">
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-100 rounded-2xl" />
          </div>

      {/* Category */}
      <div className="mb-6">
        <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
        <div className="h-12 w-full bg-gray-100 rounded-2xl" />
      </div>

      {/* Description */}
      <div className="mb-6">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-28 w-full bg-gray-100 rounded-2xl" />
      </div>

      {/* Address */}
      <div className="mb-6">
        <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
        <div className="h-12 w-full bg-gray-100 rounded-2xl" />
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="h-4 w-12 bg-gray-200 rounded mb-2" />
        <div className="h-12 w-full bg-gray-100 rounded-2xl" />
      </div>

      {/* Time slots */}
      <div className="mb-6">
        <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
        <div className="flex gap-3">
          <div className="h-12 flex-1 bg-gray-100 rounded-2xl" />
          <div className="h-12 flex-1 bg-gray-100 rounded-2xl" />
          <div className="h-12 flex-1 bg-gray-100 rounded-2xl" />
        </div>
      </div>

          {/* Images */}
          <div className="mb-8">
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
            <div className="h-40 w-full bg-gray-100 rounded-2xl" />
            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
              <div className="h-24 bg-gray-100 rounded-xl" />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-10 w-28 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
