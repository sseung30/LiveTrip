import Image from 'next/image';

interface LocationInfoProps {
  address: string;
}

export default function LocationInfo({ address }: LocationInfoProps) {
  return (
    <div className='flex items-center gap-2 text-sm text-gray-600'>
      <Image
        src='/icons/icon_locations.svg'
        alt='위치'
        width={12}
        height={12}
        style={{ width: 'auto', height: 'auto' }}
      />
      <span>{address}</span>
    </div>
  );
}
